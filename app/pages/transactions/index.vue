<script setup lang="ts">
import { transactionApi } from "~/apis/0-transaction.api";
import { toast } from "~/components/ui/toast";
import SelectAccountDialog from "~/features/accounts/components/SelectAccountDialog.vue";
import { useSelectAccount } from "~/features/accounts/hooks/use-select-account";
import { useBulkCreateTransaction } from "~/features/transactions/api/use-bulk-create-transaction";
import ImportCard from "~/features/transactions/components/ImportCard.vue";
import TransactionTable from "~/features/transactions/components/TransactionTable.vue";
import UploadButton from "~/features/transactions/components/UploadButton.vue";
import { useNewTransaction } from "~/features/transactions/hooks/use-new-transaction";
import { columns } from "~/pages/transactions/column";
import type { PageInfo } from "~/types/paginate-response.type";
import { convertStringToRegex } from "~/utils/helpers/data.helper";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import {
  convertQueryToPaginationParams,
  getQueryParams,
  URLSearchParamsString,
} from "~/utils/helpers/pagination.helper";
import {
  applyQueryToURL,
  parseQueryToObject,
} from "~/utils/helpers/query.helper";
import type { CreateTransaction } from "~/validations/transaction.validation";

enum VARIANTS {
  List = "LIST",
  Import = "IMPORT",
}
const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const { onOpen } = useNewTransaction();
const { confirm, handleClose } = useSelectAccount();
const { executeCreateMany, error } = useBulkCreateTransaction();

const route = useRoute();
const variant = ref<VARIANTS>(VARIANTS.List);
const importResults = ref(INITIAL_IMPORT_RESULTS);

export interface TransactionFilter {
  payee?: string;
}

// Get filter
const getInitialFilter = (): TransactionFilter => {
  const query = parseQueryToObject(route.query);
  const filter: TransactionFilter = {};

  // filter by search
  if (query.payee) Object.assign(filter, { searchTerm: query.payee });

  return filter;
};

const filter = ref<TransactionFilter>(getInitialFilter());
const onFilterChange = (value: TransactionFilter) => {
  filter.value = value;
  applyQueryToURL(filter.value);
};

const initialState = computed(() => ({
  _sort: getQueryParams(route.query)._sort,
  _limit: getQueryParams(route.query)._limit,
  _page: getQueryParams(route.query)._page,
}));
const paginationWatch = computed(() => {
  return URLSearchParamsString(initialState.value);
});
const onPageChange = (payload?: Pick<PageInfo, "_page" | "_limit">) =>
  applyQueryToURL(payload);

// call api
const paginateCategories = () => {
  const params = convertQueryToPaginationParams({
    ...initialState.value,
    payee: convertStringToRegex(filter.value.payee),
    _populate: ["categoryId", "accountId"],
  });

  return transactionApi.paginate(params);
};

const { data, refresh } = useAsyncData(
  "transactions-pagination",
  paginateCategories,
  {
    watch: [paginationWatch, filter],
  },
);

const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
  variant.value = VARIANTS.Import;
  importResults.value = results;
};

const onCancelImport = () => {
  variant.value = VARIANTS.List;
  importResults.value = INITIAL_IMPORT_RESULTS;
};

const onSubmitImport = async (
  values: Omit<CreateTransaction, "accountId">[],
) => {
  const accountId = await confirm();

  if (!accountId) return;

  const data = values.map((value) => ({
    ...value,
    accountId,
  }));

  await executeCreateMany(data);

  // handle error
  if (error.value) {
    const { description, title } = handleApiError(error.value);
    toast({ description, title, variant: "destructive" });
    return;
  }

  // success
  toast({ title: "Success", description: "Transaction created successfully" });
  refresh();
  handleClose();
  onCancelImport();
};
</script>

<template>
  <div class="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
    <!-- Import  -->
    <div v-if="variant === VARIANTS.Import">
      <SelectAccountDialog />
      <ImportCard
        :data="importResults.data"
        @cancel="onCancelImport"
        @submit="onSubmitImport"
      />
    </div>

    <Card v-if="variant === VARIANTS.List" class="border-none drop-shadow-none">
      <CardHeader
        v-once
        class="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between"
      >
        <CardTitle class="line-clamp-1 text-xl">Transactions History</CardTitle>

        <div class="flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row">
          <Button size="sm" class="w-full lg:w-auto" @click="onOpen">
            <Icon name="carbon:add" class="mr-2 size-4" />
            Add New
          </Button>

          <UploadButton @upload="onUpload" />
        </div>
      </CardHeader>

      <CardContent>
        <!-- List  -->
        <TransactionTable
          v-if="data"
          :columns="columns"
          :data="data.data"
          :page-info="data.pageInfo"
          :initial-state="initialState"
          :filter="filter"
          @filter-change="onFilterChange"
          @page-change="onPageChange"
        />
      </CardContent>
    </Card>
  </div>
</template>

<style lang="scss" scoped></style>

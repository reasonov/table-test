<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>

    <div class="table">
      <div class="table__header">
        <div class="header__item">
          <p class="header__text">ID</p>
        </div>
        <div class="header__item">
          <p class="header__text">Date</p>
        </div>
        <div class="header__item">
          <p class="header__text">Name</p>
        </div>
        <div class="header__item">
          <p class="header__text">Money</p>
        </div>
      </div>
      <div class="table__main" v-for="(item, index) in filteredPage" :key="index">
        <div class="table__item table__item1">
          <p class="item__text">{{ item.id }}</p>
        </div>
        <div class="table__item table__item2">
          <p class="item__text">{{ filterDate(item.date) }}</p>
        </div>
        <div class="table__item table__item3">
          <p class="item__text">{{ item.name }}</p>
        </div>
        <div class="table__item table__item4">
          <p class="item__text">{{ filteredMoney(item.money) }}</p>
        </div>
      </div>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import pagination from '@/components/UI/Pagination.vue';
import { formatMoney } from '@/mixins/formatMoney';

export default {

  name: 'DataTable',
  components: {
    uiPagination: pagination,
  },
  mixins: [formatMoney],

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
    tableData: [],
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    paginationPage() {
      const arr = [];
      this.rows.forEach((item, index) => {
        if (index <= this.page * this.pageSize - 1 && index >= (this.page - 1) * this.pageSize) {
          arr.push(item);
        }
      });
      return arr;
    },
    filteredPage() {
      return this.paginationPage.filter((i) => Number(i.money) >= Number(this.moneyFilter));
    },
  },
  methods: {
    filterDate(item) {
      const numberOfSymbol = item.split('-', item.length - 1);
      let date = item;
      for (let i = 0; i < numberOfSymbol.length - 1; i += 1) {
        date = date.replace('-', '.');
      }
      return date;
    },
    filteredMoney(item) {
      const localeItem = formatMoney.methods.replaceComma(String(item));
      return formatMoney.methods.justFormat(localeItem);
    },
  },
  // watch: {
  //   moneyFilter() {
  //     console.log(this.moneyFilter);
  //   },
  // },
};
</script>

<style scoped>

.table {
  margin: 20px 0;
}

.table__header {
  display: grid;
  grid-template-columns: 0.4fr 0.6fr 1fr 1fr;
}

.header__item {
  padding: 10px 0;
  border: 1px solid #000;
}

.header__item:not(:last-child) {
  border-right: none;
}

.header__text {
  text-align: center;
}

.table__main {
  display: grid;
  grid-template-columns: 0.4fr 0.6fr 1fr 1fr;
}

.table__item {
  padding: 15px 0;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
}

.table__item:last-child {
  border-right: 1px solid #000;
}

.item__text {
  text-align: center;
}

@media (max-width: 768px) {
  .table__header {
    display: none;
  }

  .table__main {
    display: block;
    padding: 10px 20px;
    margin-bottom: 20px;
    border: 1px solid #000;
  }

  .table__item {
    position: relative;
    padding-top: 20px;
    padding-bottom: 30px;
    border: none!important;
  }
  .table__item1::before {
    content: 'ID';
    position: absolute;
    top: 0;
    left: 0;
  }
  .table__item2::before {
    content: 'Date';
    position: absolute;
    top: 0;
    left: 0;
  }
  .table__item3::before {
    content: 'Name';
    position: absolute;
    top: 0;
    left: 0;
  }
  .table__item4::before {
    content: 'Money';
    position: absolute;
    top: 0;
    left: 0;
  }

  .item__text {
    text-align: left;
  }
}
</style>

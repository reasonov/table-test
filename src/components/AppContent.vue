<template>
  <main class="container mt-md-5">

    <!-- Loading spinner -->
    <ui-spinner v-if="isLoading" />

    <template v-else>
      <ui-alert v-if="isCached" type="success" header="Data was cached!">
        <template #default>
          <p>You can clear cache and load data again.</p>
        </template>
        <template #footer>
          <ui-button type="primary" @click="updateData">
            Clear cache
          </ui-button>
        </template>
      </ui-alert>

      <data-table
        :rows="currentData"
        :columns="columns"
      />
    </template>
  </main>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {

  name: 'AppContent',

  data: () => ({
    columns: [
      {
        label: 'ID',
        prop: 'id',
        width: '15%',
      },
      {
        label: 'Date',
        prop: 'date',
        width: '20%',
      },
      {
        label: 'Name',
        prop: 'name',
        width: '30%',
      },
      {
        label: 'Money',
        prop: 'money',
        width: '35%',
      },
    ],
  }),

  computed: {
    ...mapState([
      'isLoading',
      'isCached',
      'data',
    ]),
    currentData() {
      if (localStorage.getItem('data')) {
        return JSON.parse(localStorage.getItem('data'));
      }
      return this.data;
    },
  },

  created() {
    this.load();
    this.takeData();
    this.cachedCheck();
  },

  methods: {
    ...mapActions([
      'load',
      'takeData',
      'removeData',
    ]),
    ...mapMutations([
      'cachedCheck',
    ]),
    updateData() {
      this.removeData();
      this.takeData();
    },
  },
  watch: {
    data: {
      handler() {
        this.cachedCheck();
      },
      deep: true,
    },
  },
};
</script>

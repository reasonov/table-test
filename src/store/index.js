import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import getPayments from '@/mocks/getPayments';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
    setData(state, value) {
      const arr = [];
      value.forEach((item) => {
        state.data.push(item);
        arr.push(item);
      });
      localStorage.setItem('data', JSON.stringify(arr));
      console.log('data updated');
    },
    cachedCheck(state) {
      if (localStorage.getItem('data').length > 10) {
        state.isCached = true;
      } else {
        state.isCached = false;
      }
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('setState', { isLoading: true });

      try {
        const { data } = await api.getPayments(params);

        if (Array.isArray(data)) {
          commit('setState', { data });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
    async takeData({ commit }) {
      try {
        getPayments().then((result) => { commit('setData', result.data); });
      } catch (e) {
        console.log(e);
      } finally {
        console.log('asd');
      }
    },
    removeData({ commit }) {
      localStorage.setItem('data', '');
      commit('cachedCheck');
    },
  },
});

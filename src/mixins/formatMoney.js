export const formatMoney = {
  methods: {
    justFormat(item) {
      const parts = item.toLocaleString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    },
  },
};

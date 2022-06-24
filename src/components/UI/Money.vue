<template>
  <input
    type="text"
    @input="updateNumber()"
    v-model="valueInput"
    class="ui-money"
  />
</template>

<script>
import { formatMoney } from '@/mixins/formatMoney';

export default {

  name: 'UiMoney',
  mixins: [formatMoney],

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: '',
    };
  },
  methods: {
    updateNumber() {
      this.deleteSpace();
      this.formatValue();
      this.replaceComma();
      this.deleteNonNumber();
      this.deleteFirstSymbol();
      this.doubleDots();
      this.fixedNumber();
      this.emitValue();
    },
    formatValue() {
      const arr = this.valueInput.split('');
      let number = '';
      this.deleteSpace();
      number = arr.join('');
      this.valueInput = formatMoney.methods.justFormat(number);
    },
    deleteSpace() {
      const arr = this.valueInput.split('');
      arr.forEach((item) => {
        if (item === ' ') {
          arr.splice(this.valueInput.indexOf(item), 1);
        }
      });
      this.valueInput = arr.join('');
    },
    replaceComma() {
      this.valueInput = formatMoney.methods.replaceComma(this.valueInput);
    },
    deleteNonNumber() {
      const arr = this.valueInput.split('');
      arr.forEach((item) => {
        if (!Number(item) && item !== '.' && item !== ' ' && item !== '0') {
          arr.splice(this.valueInput.indexOf(item), 1);
          this.valueInput = arr.join('');
        }
      });
    },
    deleteFirstSymbol() {
      const arr = this.valueInput.split('');
      if (!Number(arr[0]) || Number(arr[0]) === 0) {
        arr.splice(0, 1);
        this.valueInput = arr.join('');
      }
    },
    doubleDots() {
      const arr = this.valueInput.split('');
      let numberOfDots = 0;
      arr.forEach((item) => {
        if (item === '.') {
          numberOfDots += 1;
        }
      });
      if (numberOfDots > 1) {
        const dotsList = Array.from(arr.entries()).filter((i) => i[1] === '.').map((i) => i[0]);
        // eslint-disable-next-line no-inner-declarations
        function getMaxOfArray(numArray) {
          return Math.max.apply(null, numArray);
        }
        const lastDot = getMaxOfArray(dotsList);
        arr.splice(lastDot, 1);
        this.valueInput = arr.join('');
      }
    },
    fixedNumber() {
      if (this.valueInput.includes('.')) {
        const arr = this.valueInput.split('.');
        if (arr[1].length > 2) {
          const fractionalArr = arr[1].split('');
          fractionalArr.pop();
          // eslint-disable-next-line
          this.valueInput = arr[0] + '.' + fractionalArr.join('');
        }
      }
    },
    emitValue() {
      const arr = this.valueInput.split('');
      let emitVal = this.valueInput;
      arr.forEach((item) => {
        if (item === ' ') {
          arr.splice(emitVal.indexOf(item), 1);
          emitVal = arr.join('');
        }
      });
      if (emitVal === '') {
        emitVal = null;
        this.$emit('input', emitVal);
      } else {
        this.$emit('input', Number(emitVal));
      }
    },
  },
  watch: {
    valueInput() {
      this.updateNumber();
    },
  },
};
</script>

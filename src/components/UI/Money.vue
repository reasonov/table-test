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
      const arr = this.valueInput.split('');
      let number = '';
      arr.forEach((item) => {
        if (item === ' ') {
          arr.splice(this.valueInput.indexOf(item), 1);
        }
        number = arr.join('');
      });
      this.valueInput = formatMoney.methods.justFormat(number);
    },
  },
  watch: {
    valueInput() {
      console.log(this.valueInput);
      const arr = this.valueInput.split('');
      if (this.valueInput.includes(',')) {
        arr[[this.valueInput.indexOf(',')]] = '.';
        this.valueInput = arr.join('');
      }
      // if (this.valueInput.includes('.')) {
      //   arr[[this.valueInput.indexOf('.')]] = ',';
      //   this.valueInput = arr.join('');
      // }
      arr.forEach((item) => {
        if (!Number(item) && item !== '.' && item !== ' ' && item !== '0') {
          arr.splice(this.valueInput.indexOf(item), 1);
          this.valueInput = arr.join('');
        }
      });
      if (!Number(arr[0]) || Number(arr[0]) === 0) {
        arr.splice(0, 1);
        this.valueInput = arr.join('');
      }
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
};
</script>

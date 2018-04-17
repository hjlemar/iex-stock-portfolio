<template>
  <v-list-tile class="test">
    <v-list-tile-content @click="showQuote()">
      <v-list-tile-title>{{ stock }} 10.00</v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <!-- <v-btn ripple round small @click.native.stop="showPopUp">Add</v-btn> -->
      <app-stock-dialog
        :cancel="cancel"
        :item="item"
      ></app-stock-dialog>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapActions } from 'vuex';
import { GET_DETAILS } from '@/store/modules/details/types';
import StockDialog from '@/components/stock/StockDialog';

export default {
  props: ['stock'],
  components: {
    appStockDialog: StockDialog,
  },
  data() {
    return {
      dialog: false,
      item: {},
    };
  },
  methods: {
    ...mapActions({
      getQuote: GET_DETAILS,
    }),
    showQuote() {
      const stock = this.stock;
      this.getQuote(stock)
        .then(() => this.$router.push({ path: `/details/${stock}` }));
    },
    showPopUp() {
      this.item = { symbol: this.stock, shares: 0 };
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
    },
    save() {
      this.dialog = false;
    },
  },
};
</script>

<style>
  .test:hover {
    background-color: #a442f4;
    cursor: pointer;
  }
</style>


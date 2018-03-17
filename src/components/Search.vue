<template>
  <div>
    <v-layout row>
        <v-text-field
          name="stock-search"
          label="Stock Search"
          id="stock-search"
          v-model="stock"
          @keyup.enter="goToDetails()"
        ></v-text-field>
         <v-btn
          id='search-button'
          @click="goToDetails()"
          :disabled="!stock"
          color="primary"
          >Get Quote</v-btn>
    </v-layout>
    <v-layout row>
        <v-alert type="error" :value="failed" transition='slide-x-transition'>
          {{ message }}
        </v-alert>
    </v-layout>
  </div>
</template>

<script>
import { QUERY_STOCK_DQUOTE } from '../store/mutation-types';

export default {
  data() {
    return {
      stock: null,
      failed: false,
      message: null,
    };
  },
  methods: {
    goToDetails() {
      this.failed = false;

      this.$store.dispatch(QUERY_STOCK_DQUOTE, this.stock)
        .then(() => {
          this.stock = null;
          this.$router.push({ path: '/details' });
        })
        .catch((err) => {
          console.log(err);
          this.message = err.response.data;
          this.failed = true;
        });
    },
  },
};
</script>

<style>

</style>


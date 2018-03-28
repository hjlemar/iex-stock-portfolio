<template>
  <div>
    <v-layout row>
        <v-text-field
          name="stock-search"
          label="Stock Search"
          id="stock-search"
          v-model="stock"
          @keyup.enter="goToDetails()"
          :rules="['rules']"
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
import { GET_DETAILS } from '@/store/modules/details/types';

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
      return this.$store.dispatch(GET_DETAILS, this.stock)
        .then(() => {
          this.$router.push({ path: `/details/${this.stock}` });
          this.stock = null;
        })
        .catch((err) => {
          this.message = err.response.data;
          this.failed = true;
        });
    },
    rules(value) {
      const regex = /^[a-zA-Z0-9]+$/;
      return regex.test(value) || 'Only letters and numbers allowed.';
    },
  },
};
</script>

<style>

</style>


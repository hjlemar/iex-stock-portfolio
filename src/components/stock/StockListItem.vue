<template>
  <v-list-tile class="test">
    <v-list-tile-content @click="showQuote()">
      <v-list-tile-title>{{ stock }} 10.00</v-list-tile-title>

    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn ripple round small>Add</v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapActions } from 'vuex';
import { GET_DETAILS } from '@/store/modules/details/types';

export default {
  props: ['stock'],
  methods: {
    ...mapActions({
      getQuote: GET_DETAILS,
    }),
    showQuote() {
      this.getQuote(this.stock)
        .then(() => this.$router.push({ path: `/details/${this.stock}` }));
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


<template>
  <v-date-picker width="290" v-model="date" color="indigo"></v-date-picker>
</template>

<script>

import { mapGetters } from 'vuex';
import { CHANGE_DATE as type } from '../store/mutation-types';

const { get } = {
  ...mapGetters({
    get: 'date',
  }),
};

export default {

  computed: {
    date: {
      get,
      set(date) {
        this.$store.commit({ type, date });
      },
    },
  },
};
</script>

<style>

</style>


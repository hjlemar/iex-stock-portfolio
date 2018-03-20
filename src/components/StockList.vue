<template>
        <v-list dense>
        <v-list-tile v-for='stock in stocks' :key='stock' @click="getQuote(stock)">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ stock }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
</template>

<script>
import { mapActions } from 'vuex';
import { GET_DETAILS } from '@/store/modules/details/types';

export default {
  props: ['stocks'],
  methods: {
    ...mapActions({
      getQuote: GET_DETAILS,
    }),
  },

};
</script>


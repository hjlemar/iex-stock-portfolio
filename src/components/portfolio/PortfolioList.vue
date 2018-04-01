<template>
  <v-layout row wrap>
    <v-flex xs12 v-for="(portfolio,i) in portfolios" :key="i">
      <app-portfolio-list-item
        :portfolio="portfolio"
        @click.native="openPortfolio(portfolio)"
      ></app-portfolio-list-item>
      <v-divider v-if="i < portfolios.length"></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import PortfolioListItem from './PortfolioListItem';

export default {
  props: ['portfolios'],
  components: {
    appPortfolioListItem: PortfolioListItem,
  },
  methods: {
    openPortfolio(portfolio) {
      this.$router.push({ path: `/portfolio/${portfolio}` });
    },
  },
};
</script>

<style>

</style>

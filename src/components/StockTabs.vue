<template>
  <div>
    <v-tabs v-model="active" color="indigo" dark >
      <v-tab ripple>Recent</v-tab>
      <v-tab ripple >Portfolio </v-tab>
      <v-tab-item>
        <v-card flat>
          <app-stock-list :stocks='stocks'></app-stock-list>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <app-porfolio-list :portfolios='portfolios'></app-porfolio-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StockList from '@/components/stock/StockList';
import PortfolioList from '@/components/portfolio/PortfolioList';

export default {
  components: {
    appStockList: StockList,
    appPorfolioList: PortfolioList,
  },
  data() {
    return {
      active: null,
      tabs: [
        { title: 'Recent', component: StockList },
        // {title: 'Portfolio', component: StockList}
      ],
    };
  },
  computed: {
    ...mapGetters({
      stocks: 'recentList',
      portfolios: 'getPortfolios',
    }),
  },
};
</script>

<style>

</style>

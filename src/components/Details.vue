<template>
  <div>
    <div v-if='data'>
      <app-delayed-quote-detail :delayedQuote="data['delayed-quote']"></app-delayed-quote-detail>
      <app-graph :chart="data.chart"></app-graph>
    </div>
    <div v-else>
      <p>No data found</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DelayedQuoteDetail from './DelayedQuoteDetail';
import Graph from './Graph';

export default {
  components: {
    appDelayedQuoteDetail: DelayedQuoteDetail,
    appGraph: Graph,
  },
  computed: {
    ...mapGetters({
      data: 'currentDetails',
    }),
  },
};
</script>

<style>

</style>


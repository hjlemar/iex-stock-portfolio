<template>
        <v-list dense>
        <app-stock-list-item v-for='(stock,i) in stocks'
          :stock="stock"
          :key='i'></app-stock-list-item>
      </v-list>
</template>

<script>
import StockListItem from '@/components/stock/StockListItem';

export default {
  components: {
    appStockListItem: StockListItem,
  },
  props: ['stocks'],
};
</script>


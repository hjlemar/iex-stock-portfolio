<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <app-date-picker></app-date-picker>
      <app-stock-list :stocks='stocks'></app-stock-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout justify-center align-center>
          <app-home></app-home>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import DatePicker from '@/components/DatePicker';
import StockList from '@/components/StockList';
import Home from '@/components/Home';

export default {
  name: 'App',
  components: {
    appDatePicker: DatePicker,
    appStockList: StockList,
    appHome: Home,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters(['stocks']),
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 20px;
}
</style>

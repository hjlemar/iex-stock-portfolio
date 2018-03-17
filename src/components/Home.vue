<template>
  <v-container id="home">
    <v-layout row>
      <v-flex xs6 mx-auto>
        <app-search></app-search>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex mx-auto>
         <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Search from '@/components/Search';

export default {
  components: {
    appSearch: Search,
  },
};
</script>

<style>

</style>


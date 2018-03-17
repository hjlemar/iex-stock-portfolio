<template>
<v-layout justify-center row>
  <v-flex xs4>
    <v-card hover>
      <v-card-title><h4> {{ delayedQuote.symbol }}</h4></v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Price:</v-list-tile-content>
          <v-list-tile-content class="align-end">
            {{ delayedQuote.delayedPrice }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>High:</v-list-tile-content>
          <v-list-tile-content class="align-end">
            {{ delayedQuote.high}}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Low:</v-list-tile-content>
          <v-list-tile-content class="align-end">
            {{  delayedQuote.low}}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Time:</v-list-tile-content>
          <v-list-tile-content class="align-end">
            {{  new Date(delayedQuote.delayedPriceTime) }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
/*
{ "symbol": "O",
"delayedPrice": 48.99,
"high": 49.18,
"low": 47.96,
"delayedSize": 1,
"delayedPriceTime": 1518558095000,
"processedTime": 1518558995023
} */
export default {
  props: ['delayedQuote'],
};
</script>

<style>

</style>


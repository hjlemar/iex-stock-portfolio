<template>

  <v-dialog v-model="dialog"  max-width="500px">
    <v-btn color="primary" dark slot="activator" @click.native="dialog = true" class="mb-2">New Item</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Stock</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout v-if="!portfolio" row>
            <v-flex xs6>
              <v-select
                :items="portfolios"
                v-model="pickedPortfolio"
                label="Portfolio"
                single-line
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Stock name" v-model="item.symbol"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Shares" v-model="item.shares"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="cleanUp()">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="saveIt(item)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { UPDATE_STOCK } from '@/store/modules/portfolio/types';

export default {
  props: {
    cancel: {
      default: () => {},
      type: Function,
    },
    save: {
      default: () => {},
      type: Function,
    },
    item: {
      default: {},
      type: Object,
    },
    // dialog: {
    //   default: true,
    //   type: Boolean
    // },
    portfolio: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      pickedPortfolio: null,
      dialog: false,
    };
  },
  methods: {
    ...mapMutations({
      updateStock: UPDATE_STOCK,
    }),
    saveIt(item) {
      this.updateStock({
        portfolio: this.portfolio || this.pickedPortfolio,
        stock: item,
      });
      this.save(item);
      this.cleanUp();
    },
    cleanUp() {
      setTimeout(() => {
        this.cancel();
        this.pickedPortfolio = null;
      }, 300);
      this.dialog = false;
    },
    activated() {
      console.log('im activated!!');
    },
  },
  computed: {
    ...mapGetters({
      portfolios: 'getPortfolios',
    }),
  },
};
</script>

<style>

</style>


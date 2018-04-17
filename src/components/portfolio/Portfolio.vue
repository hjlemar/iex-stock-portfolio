<template>
    <v-layout row>
      <v-flex xs8 mx-auto>
        <div>

          <app-stock-dialog :dialog="dialog"
            :cancel="cancel"
            :item="editedItem"
            :portfolio="$route.params.portfolio"
          ></app-stock-dialog>
          <v-data-table
            v-if="items && items.length > 0"
            :headers="headers"
            :items="items"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.symbol }}</td>
              <td>{{ props.item.shares }}</td>
              <td>{{ props.item.value }} </td>
              <td>{{ props.item.basis}} </td>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
          <div v-else>
            No stocks yet!  Add one!
          </div>
        </div>
      </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { UPDATE_STOCK, DELETE_STOCK } from '@/store/modules/portfolio/types';
import StockDialog from '@/components/stock/StockDialog';

const defaultItem = {
  symbol: null,
  shares: 0,
};

export default {
  components: {
    appStockDialog: StockDialog,
  },
  data() {
    return {
      headers: [
        {
          text: 'Symbol',
          align: 'left',
          sortable: true,
          value: 'symbol',
        },
        {
          text: 'Shares',
          aligh: 'left',
          sortable: true,
          value: 'shares',
        },
        {
          text: 'Current Value',
          aligh: 'left',
          sortable: true,
          value: 'value',
        },
        {
          text: 'Cost Basis',
          aligh: 'left',
          sortable: true,
          value: 'basis',
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'name',
        },
      ],
      editedItem: { ...defaultItem },
      dialog: false,
    };
  },
  methods: {
    ...mapGetters({
      portfolio: 'getPortfolioStocks',
    }),
    ...mapMutations({
      updateStock: UPDATE_STOCK,
      deleteStock: DELETE_STOCK,
    }),
    cancel() {
      this.dialog = false;
      // without the timeout, the effect isn't bad
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem };
      }, 300);
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteStock({
        symbol: item.symbol,
        portfolio: this.$route.params.portfolio,
      });
    },
  },
  computed: {
    items() {
      return this.portfolio()(this.$route.params.portfolio);
    },
  },
};
</script>

<style>

</style>


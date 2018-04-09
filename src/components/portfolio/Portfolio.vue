<template>
    <v-layout row>
      <v-flex xs8 mx-auto>
        <div>
          <v-btn color="primary" dark @click.stop="dialog = true" class="mb-2">New Item</v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit Stock</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Stock name" v-model="editedItem.symbol"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Shares" v-model="editedItem.shares"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
            <!--
            <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
            -->
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

const defaultItem = {
  symbol: null,
  shares: 0,
};

export default {
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
    close() {
      this.dialog = false;
      // without the timeout, the effect isn't bad
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem };
      }, 300);
    },
    save() {
      // need to update the store. this won't work.
      this.updateStock({
        portfolio: this.$route.params.portfolio,
        stock: this.editedItem,
      });
      this.close();
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


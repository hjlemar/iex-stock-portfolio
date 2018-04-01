<template>
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
        <v-btn color="blue darken-1" flat @click.native="close(editedItem)">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save(editedItem)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['close', 'save', 'editedItem'],
};
</script>

<style>

</style>


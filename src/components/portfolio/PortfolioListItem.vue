<template>
  <v-card >
    <v-card-title border primary-title>
      <div class="headline">{{ portfolio }}</div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['portfolio'],
};
</script>

<style scoped>
  div {
    cursor: pointer;
  }
</style>


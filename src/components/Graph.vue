<template>
  <div id="app">
    <graph2d v-if="chart" ref="timeline" :items="items" :groups="groups" :options="options">
    </graph2d>
  </div>
</template>

<script>
import { Timeline, Graph2d } from 'vue2vis';
import axios from 'axios';

export default {
  props: ['chart'],
  components: {
    timeline: Timeline,
    graph2d: Graph2d,
  },
  data() {
    return {
      groups: [{
        id: 0,
        content: 'Group 1',
      }],
      options: {
        width: '100%',
        end: new Date(),
        moveable: true,
        zoomable: true,
      },
    };
  },

  computed: {
    items() {
      return this.chart.map(item => ({
        x: item.date,
        y: item.close,
        group: 0,
      }));
    },
  },
};
</script>


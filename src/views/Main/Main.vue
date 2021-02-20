<template>
  <v-row justify="center">
    <v-col cols="12" style="padding-top: 0">
      <v-sheet
        color="transparent"
        rounded="lg"
        class="main-container table-container"
        style="padding-top: 0"
      >
        <Table />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  import Table from '@/components/Table/Table.vue';
  export default {
    name: 'Main',
    components: {
      Table,
    },
  };
</script>

<style lang="scss">
  .main-container {
    max-width: map($grid-breakpoints, 'xl');
    margin: 0 auto;
  }
</style>

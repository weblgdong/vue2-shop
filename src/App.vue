<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Tab from 'components/tab/tab.vue';

  export default {
    components: {
      Tab
    }
  };
</script>

<style>

</style>

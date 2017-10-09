<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <global></global>
  </div>
</template>

<script>
  import Tab from 'components/tab/tab.vue';
  import Global from 'components/Global/Global.vue';

  export default {
    components: {
      Tab,
      Global
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    height: 100%
</style>

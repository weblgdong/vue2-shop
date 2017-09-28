<template>
  <div>
    <goods-list :list="list"></goods-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAllGood10E} from 'api/oybuy';
  import {RETURN_CODE} from 'api/config';
  import goodsList from 'base/goods-list/goods-list';

  export default {
    data() {
      return {
        list: []
      };
    },
    created() {
      this._getAllGood10E();
    },
    methods: {
      _getAllGood10E() {
        getAllGood10E().then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.list = res.list10E;
          }
        });
      }
    },
    components: {
      goodsList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

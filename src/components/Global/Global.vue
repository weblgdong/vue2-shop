<template>
  <div></div>
</template>

<script type="text/ecmascript-6">
  import {RETURN_CODE} from 'api/config';
  import {messageQueryMark} from 'api/global';
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {};
    },
    created() {
      setInterval(() => {
        this._messageQueryMark();
      }, 100000);
    },
    methods: {
      _messageQueryMark() {
        messageQueryMark().then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.setMNum(res.data);
          }
        });
      },
      ...mapMutations({
        setMNum: 'SET_MNUM'
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>

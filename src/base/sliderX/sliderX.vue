<template>
  <div ref="wrapper">
    <div class="slider-group" style="position: relative" ref="sliderGroup">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    mounted() {
      setTimeout(() => {
        this._initSlider();
      }, 20);
    },
    methods: {
      _initSlider() {
        if (!this.$refs.wrapper) {
          return;
        }
        var width = this.data.length * 126;
        this.$refs.sliderGroup.style.width = width + 'px';
        this.scrollX = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: false
        });
        this.scrollX.on('scroll', (pos) => {
          console.log(scrollX);
        });
      },
      refresh() {
        var width = this.data.length * 126;
        this.$refs.sliderGroup.style.width = width + 'px';
        this.scrollX && this.scrollX.refresh();
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh();
        }, 20);
      }
    }
  }
  ;
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

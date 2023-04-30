<template>
  <canvas 
    id="screen"
    ref="screen"
    :class="'screen '/*+(solidSettingsService.antiAliasing?'optimizequality':'optimizespeed')*/"
    :width="screen.definition"
    :height="screen.definition"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @mousedown="mouseDown($event)"
  >
  </canvas>
</template>

<script>
import { Coordinate } from '../models/coordinate'
import { Solid } from '../models/solids/solid'
import { Palette } from '../modules/palette'
import { Screen } from '../modules/screen'
import CircleSlider from './CircleSlider.vue'

export default {
  components: { CircleSlider },
  name: "screen",
  created() {
    this.solid = new Solid('icosaedre', 1, 120)
  },
  mounted() {
    const ctx = this.$refs.screen.getContext('2d')
    this.screen = new Screen(this.solid, this.palette, ctx)
    this.screen.definition = this.$refs.screen.clientWidth
    this.screen.play();
    window.addEventListener('resize', ()=>{
      this.screen.definition = this.$refs.screen.clientWidth
    });


    //document.onmouseup = this.mouseUp
    //document.onmousemove = this.mouseMove

},
  data() {
    return {
      solid: Solid,
      screen: Screen
    };
  },
  props: {
    palette: Palette
  },
  methods: {
    touchStart(e) {
      this.screen.state.mouse.downed = true;
    },
    touchMove(e) {
      if (this.screen.state.mouse.downed) {
        // this.screenService.touchMemLastMove = { x: 5 * (e.touches[0].clientX - this.screenService.touchMem.x), y: 5 * (e.touches[0].clientY - this.screenService.touchMem.y) };
        // this.screenService.touchMem = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        // this.screenService.mouse = this.screenService.touchMemLastMove;
      }
    },
    touchEnd(e) {
       this.screen.state.mouse.downed = false;
    },
    mouseUp(e) {
       this.screen.state.mouse.downed = false;
    },
    mouseDown() {
      this.screen.generateCanvas()
      this.screen.state.mouse.downed = true;
    },
    mouseMove(e) {
      if (this.screen.state.mouse.downed) {
        this.screen.state.mouse.position.addPosition(e.movementX * .3, e.movementY * .3);
      }
    },
    getDefinition() {
      return 500;
      // return this.solidSettingsService.definition;
    },
  },
}
</script>
<style scoped> 
@media screen and (orientation:portrait) { 
  *{
    --screen-side: 512px;
    --screen-side-max: 60vw;
  }
}
@media screen and (orientation:landscape) { 
  *{
    --screen-side: 512px;
    --screen-side-max: 60vh;
  }
}
 
.screen{
  max-width: var(--screen-side-max);
  max-height: var(--screen-side-max);
  height: var(--screen-side);
  width: var(--screen-side);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

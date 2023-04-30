<template>
  <div class="option text-2xl font-bold">
    option menu

    <circle-slider
      :dynamicBackground="'#ffffff'"
      :staticBackground="'#000000'"
      :foreground="'#000'"
      :initial-value="direction"
      :size="160"
      @input="changeDirection($event)"
    ></circle-slider>

    <slider
      :dynamicBackground="'#ffffff'"
      :staticBackground="'#000000'"
      :foreground="'#000'"
      :value="speed"
      @input="changeSpeed($event.target.value)"
    ></slider>
  </div>
</template>

<script>
import CircleSlider from '../components/CircleSlider.vue';
import Slider from '../components/Slider.vue';
import { Screen } from '../modules/screen'
export default {
  components: { CircleSlider, Slider },
  name: "option",
  created() {
    this.speed = 100*Math.sqrt(Math.pow(this.screen.state.rotation.x, 2)+Math.pow(this.screen.state.rotation.y, 2))
    this.direction = ((Math.atan2(this.screen.state.rotation.y,  this.screen.state.rotation.x) / Math.PI * 180)+450)%360
		
  },
  data() {
    return {
      direction: 0,
      speed: 0
    };
  },
  props: {
    screen: Screen
  },
  methods: {
    changeDirection(direction){
      this.direction = direction
      this.screen.setDirection(this.direction, this.speed/100)
    },
    changeSpeed(speed){
      this.speed = parseInt(speed)
      this.screen.setDirection(this.direction, this.speed/100)
    }
  },
  mounted() {
  },
}
</script>
<style scoped>
.option{
  width: 100%;
  min-width: 200px;
  min-height: 200px;
}
</style>
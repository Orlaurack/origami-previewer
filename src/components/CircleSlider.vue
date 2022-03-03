<template>
  <div 
    class="circle mx-4"
    ref="circle"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @mousemove="mouseMove" 
    :style="`background:${staticBackground}; --size:${size}px`"
  >
    <span 
      class="label text-2xl font-bold"
      :style="'background:'+dynamicBackground+'; color:'+foreground"
    >
      {{value}}°
    </span>
    <div 
      class="slider-container" 
      ref="slider-container"
      :style="'transform: rotate('+value+'deg)'"
    >
      <div class="slider" ref="slider" :style="'background:'+foreground">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "circle-slider",
  created() {},
  mounted() {
    this.container = this.$refs['circle'];
    this.slider = this.$refs['slider'];
    if(this.size == undefined){
      this.size = 100;
    }

    const sc = this.$refs['slider-container']
    const updatev = this.updateValue
    window.addEventListener('DOMMouseScroll', function(e) {
      if(e.target == sc){
        updatev(e.detail, true);
      }
    }, false)
  },
  computed: {
    
  },  
  props: {
    initialValue: {
      type: Number,
      default: 0,
    },
    dynamicBackground: {
      type: String
    },
    staticBackground: {
      type: String
    },
    foreground: {
      type: String
    },
    size: {
      type: Number,
      default: 160
    }
  },
  data() {
    return {
      value: this.initialValue,
      container: Element,
      slider: Element,
      mouseDowned: false,
      lastAngle: 0
    };
  },
  methods: {
    mouseDown(e){this.mouseDowned = true; this.mouseMove(e)},
    mouseUp(){this.mouseDowned = false},
    mouseMove(e){
      if(this.mouseDowned){
        var radius = this.size/2;
        var deg = 0
        var elPos = { x: this.container.offsetLeft, y: this.container.offsetTop};
        var mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
        var atan = Math.atan2(mPos.x-radius, mPos.y-radius);
        deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
        this.updateValue(deg)
      }
    },
    updateValue(deg, addMode = false){
      var newValue = deg;
      if(addMode){
        newValue = deg + this.value;
      }
      this.value = Math.round(newValue);
      while(this.value<0)this.value+=360
      while(this.value>360)this.value-=360
      
      this.$emit('input', this.value)
    }

  },
}
</script>
<style scoped>
.circle {
  --size: 100px;

  align-content: center;
  position: relative;
  width:var(--size);
  height:var(--size);
  background:transparent;
  border-radius: 100%;
  background-clip: padding-box;
}
.slider-container{
  width:var(--size);
  height:var(--size);
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: center;
  border-radius: 100%;
  z-index: 90;
}
.slider {
  position:absolute;
  margin-top: .25em;
  height:.5em;
  width: .1em;
}
.label{
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(var(--size) - .5em);
  height: calc(var(--size) - .5em);
  line-height: calc(var(--size) - .5em);
  border-radius: 100%;
  margin:0px;
}
</style>
<template>
  <div
    class="color slider rounded m-4"
    :style="'background:'+staticBackground+'; color:'+foreground"
  >
    <input
      type="range"
      ref="color-slider"
      class="form-range appearance-none w-full h-0 p-0"
      :style="'background:'+dynamicBackground"
      min="0"
      :max="max"
      :value="value"
    />
    <span class="value">{{ value }}{{ unit }}</span>
  </div>
</template>

<script>
export default {
  name: "slider",
  mounted() {
    const cs = this.$refs['color-slider']
    window.addEventListener('DOMMouseScroll', function(e) {
      if(e.target == cs){
        console.log(cs)
        this.value=(parseInt(this.value)-e.detail)
      }
    }, false)
  },
  updated() { },
  data() {
    return {
    };
  },
  computed: {},  
  props: {
    value: Number,
    staticBackground: String,
    dynamicBackground: String,
    foreground: String,
    unit: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 100
    }
  },
  methods: {
    change(event){
      this.$emit('input', parseInt(event.target.value))
    },
  },
}
</script>

<style>

.color{
  display: flex;
  flex-direction: row;
  padding: .5em 0;
  height: 1.5em;
  align-items: center;
  justify-content: flex-end;
  min-width: 160px;
}
.color .value{
  float:right;
  position: absolute;
  pointer-events: none;
}
.form-range{
  min-height: 1em;
  padding: 0.25em;
  background-color: transparent;
}
.form-range::-moz-range-thumb{
  width: 0;
  height: calc(1em - 1px);
  border:currentColor .5px solid;
  background-color: transparent;
  padding:0;
}
</style>
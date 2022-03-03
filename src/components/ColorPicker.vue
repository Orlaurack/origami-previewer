<template>
  <div 
    class="option rounded pb-2 text-2xl font-bold"
    :style="`
    --red: ${red};
    --green: ${green};
    --blue:${blue};
    --selection: ${contrastedColor}a;
    `"
  >
    <div class="flex-1 h-10 flex items-center justify-center menu flex space-x-4 p-1">
      <span :class="getMenuStyle('rgb')" @click="changeMode('rgb')">rgb</span>
      <span :class="getMenuStyle('hsl')" @click="changeMode('hsl')">hsl</span>
      <span :class="getMenuStyle('hex')" @click="changeMode('hex')">hex</span>
    </div>
    <span class="hex rounded-full w-0 text-xl" :style="`color:${hexadecimal}; background-color: ${contrastedColor}`">{{hexadecimal}}</span>
    <div class="rgb" v-show="mode=='rgb'">
      <slider
        :staticBackground="'linear-gradient(to right, #000, #f00)'"
        :foreground="'#800'"
        :dynamicBackground="`linear-gradient(to right, rgb(0, ${green}, ${blue}), rgb(255, ${green}, ${blue}))`"
        :max="255"
        :value="red"
        @input="red=parseInt($event.target.value)"
      ></slider>

      <slider
        :staticBackground="'linear-gradient(to right, #000, #0f0)'"
        :foreground="'#080'"
        :dynamicBackground="`linear-gradient(to right, rgb(${red}, 0, ${blue}), rgb(${red}, 255, ${blue}))`"
        :max="255"
        :value="green"
        @input="green=parseInt($event.target.value)"
      ></slider>
      <slider
        :staticBackground="'linear-gradient(to right, #000, #00f)'"
        :foreground="'#008'"
        :dynamicBackground="`linear-gradient(to right, rgb(${red}, ${green}, 0), rgb(${red}, ${green}, 255))`"
        :max="255"
        :value="blue"
        @input="blue=parseInt($event.target.value)"
      ></slider>
    </div>

    <div class="hsl" v-show="mode=='hsl'">
      <circle-slider
        class="hue"
        :staticBackground="'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)'"
        :foreground="contrastedColor"
        :dynamicBackground="`conic-gradient(hsl(0, ${saturation}%, ${lightness}%), hsl(60, ${saturation}%, ${lightness}%), hsl(120, ${saturation}%, ${lightness}%), hsl(180, ${saturation}%, ${lightness}%), hsl(240, ${saturation}%, ${lightness}%), hsl(300, ${saturation}%, ${lightness}%), hsl(360, ${saturation}%, ${lightness}%))`"
        :initial-value="hue"
        :size="88"
        @input="hue=$event; hslUpdate()"
      ></circle-slider>
      <slider
        :staticBackground="`linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%))`"
        :dynamicBackground="`linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`"
        :foreground="'#888'"
        :unit="'%'"
        :value="saturation"
        @input="saturation=parseInt($event.target.value); hslUpdate()"
      ></slider>

      <slider
        :staticBackground="'linear-gradient(to right, #000, #fff)'"
        :dynamicBackground="`linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))`"
        :foreground="'#000'"
        :unit="'%'"
        :value="lightness"
        @input="lightness=parseInt($event.target.value); hslUpdate()"
      ></slider>
    </div>

    <div class="hex flex" v-if="mode=='hex'">
      <input class="
        form-control
        px-0
        py-1
        mb-0
        bg-transparent
        transition
        ease-in-out
        text-center
        font-bold
        border border-solid
        rounded
        focus:outline-none"
        :style="`color:${contrastedColor}; border-color: ${contrastedColor}`"
        type="text"
        v-model="hexInput"
        :ref="'hex'"
        @input="checkHex" />
        <ClipboardCopyIcon
          class="inline p-0 h-10 w-10 cursor-pointer"
          :style="`color: ${contrastedColor}`"
          @click="clipboardCopy"
        ></ClipboardCopyIcon>
    </div>
  </div>
</template>

<script>
import CircleSlider from './CircleSlider.vue';
import Slider from './Slider.vue';
import { ClipboardCopyIcon, ClipboardIcon } from '@heroicons/vue/outline'

export default {
  components: { Slider, CircleSlider, ClipboardIcon, ClipboardCopyIcon },
  name: "color-picker",
  created() {
    this.hexToColor(this.value)
    if(localStorage.colorPickerMode) this.mode = localStorage.colorPickerMode;
  },
  mounted() {
    if(this.mode=='hex') this.setFocusHexInput()
  },
  updated() {
    this.$emit('update', this.hexadecimal);
  },
  data() {
    return {
      mode: 'rgb',
      red: 0,
      green: 0,
      blue: 0,
      hue: 0,
      saturation: 0,
      lightness: 0,
      hexInput: ''
    };
  },
  computed: {
    hexadecimal(){
      return "#" + ((1 << 24) + ((this.red << 16) + (this.green << 8) + (this.blue << 0))).toString(16).slice(1).toUpperCase();
    },
    contrastedColor(){
      var yiq = ((this.red*.299)+(this.green*.587)+(this.blue*.114))/128;

      return (yiq>1) ? '#000' : '#fff';
    }
  },  
  props: {
    value: {
      type: String,
      default: "#000000",
    }
  },
  methods: {
    getMenuStyle(name){
      const defaultStyle = 'rounded-full px-4 cursor-pointer '
      if(name==this.mode)
        return defaultStyle + 'bg-black text-white'
      return defaultStyle + 'bg-white text-black'
    },
    hslUpdate(){
      let h = this.hue
      let s = this.saturation
      let l = this.lightness
      s /= 100;
      l /= 100;
      const k = n => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      
      this.red = Math.round(255 * f(0))
      this.green = Math.round(255 * f(8))
      this.blue =  Math.round(255 * f(4))

      // const k = n => (n + this.hue / 30) % 12;
      // const a = (this.saturation * Math.min(this.lightness, 100 - this.lightness))/100
      // const f = n => (this.lightness/100) - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    },

    changeMode(mode){
      this.mode = mode
      localStorage.colorPickerMode = mode
      this.hexInput = this.hexadecimal
      if(mode=='hex') this.setFocusHexInput()
    },
    checkHex(e){
      const selection = e.target.selectionStart;
      this.hexInput = this.hexInput.replace(/[^0-9a-fA-F]/g, '');
      if(this.hexInput.length>6){
        this.hexInput=this.hexInput.substr(0, 6)
      }
      if(e.data!=null && !'0123456789abcdefABCDEF'.includes(e.data)){
        setTimeout(() => {
          e.target.setSelectionRange(selection-1, selection-1)
        }, 1);
      }
      this.hexInput = '#'+this.hexInput
      this.hexToColor(this.hexInput, false)
      
    },
    hexToColor(hex, updateHexInput = true){
      hex= hex.substring(1)
      
      let result = '';
      switch (hex.length) {
        case 6:
          result = /^([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex);
          this.red = parseInt(result[1], 16)
          this.green = parseInt(result[2], 16)
          this.blue = parseInt(result[3], 16)
          break;
        case 3:
          result = /^([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])$/i.exec(hex);
          this.red = parseInt(result[1], 16)*17
          this.green = parseInt(result[2], 16)*17
          this.blue = parseInt(result[3], 16)*17
      }
      
      let r = this.red/255
      let g = this.green/255
      let b = this.blue/255

      const l = Math.max(r, g, b);
      const s = l - Math.min(r, g, b);
      const h = s
        ? l === r
          ? (g - b) / s
          : l === g
          ? 2 + (b - r) / s
          : 4 + (r - g) / s
        : 0

      this.hue = Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h)
      this.saturation = Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0))
      this.lightness = Math.round((100 * (2 * l - s)) / 2)
      if(updateHexInput) this.hexInput = this.hexadecimal;
    },
    setValue(value){
      this.setFocusHexInput()
      this.hexToColor(value);
    },
    clipboardCopy(){
      navigator.clipboard.writeText(this.hexInput);
    },
    setFocusHexInput(){
      setTimeout(() => {
        if(this.$refs.hex){
          this.$refs.hex.focus()
          this.$refs.hex.setSelectionRange(0, 7)
        }
      }, 1);
    }
  },
}
</script>
<style>

.option *::selection{
  color: rgb(var(--red), var(--green), var(--blue)) !important;
  background: var(--selection) !important;
}

</style>
<style scoped>
.option{
  width: 100%;
  background-color: rgb(var(--red), var(--green), var(--blue));
  transition: 300ms background-color;
}
  
 
.color{
  display: flex;
  flex-direction: row;
  padding: .5em 0;
  align-items: center;
  justify-content: flex-end;
}
.color .value{
  float:right;
  position: absolute;
  pointer-events: none;
}
.form-range{
  height: 1em;
  padding: 0.25em;
  background-color: transparent;
}
.form-range::-moz-range-thumb{
  width: 0;
  height: calc(2em - 2px);
  border:black 1px solid;
  background-color: transparent;
  padding:0;
}
.hue{
  float:left
}
@media screen and (max-width: 320px) {
  .hue{
    float:none;
    margin-left: auto;
    margin-right: auto;
  }
}
.hex{
  min-width: 120px;
  display: block;
  margin: 5px auto 20px;
}
</style>
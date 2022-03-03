<template>
  <div class="palette text-4xl font-bold">
    <div class="palette" >
      {{ menuTitle }}
      <div class="presets">
        <button 
          v-for="(preset, index) in palette.palettePreset"
          :key="index"
          :class="`preset text-base font-bold inline-block rounded-full px-2 mx-1 bg-white text-black'`" 
          @click="selectPreset(preset.name)"
        >
        {{preset.name}}
        </button>
      </div>

      <div class="themes">
        <span 
          v-for="(theme, index) in themes"
          :key="index"
          :class="`theme text-base inline-block rounded-full px-2 mx-1 ${palette.theme==theme?'selected bg-black text-white':'bg-white text-black'}`" 
          @click="selectTheme(theme)"
        >
        {{theme}}
        </span>
      </div>
      <div 
        v-for="(color, index) in palette.colors"
        v-show="index<palette.number"
        :key="index"
        :class="`color inline-block rounded ${selectedColor==index?'selected':''}`" 
        :style="`color:${color}`"
        @click="selectColor(index)"
      >
      </div>
    <color-picker
      ref="color-picker"
      v-if="selectedColor!=null"
      
      :value="this.palette.colors[selectedColor]"
      @update="this.palette.colors[selectedColor]=$event"
    ></color-picker>
    </div>
  </div>
</template>

<script>
import CircleSlider from '../components/CircleSlider.vue';
import ColorPicker from '../components/ColorPicker.vue';
import { Palette } from '../modules/palette';
export default {
  components: { ColorPicker, CircleSlider },
  name: "palette",
  created() {
    this.themes = this.palette.getModeList()
  },
  data() {
    return {
      menuTitle: 'palette menu',
      themes: [],
      selectedColor: null,
    };
  },
  props: {
    palette: Palette
  },
  methods: {
    selectColor(index){
      if(index == this.selectedColor){
        this.selectedColor = null
      }else{
        this.selectedColor = index  
        if(this.$refs['color-picker']){
          this.$refs['color-picker'].setValue(this.palette.colors[this.selectedColor])
        }
      }
    },
    selectTheme(theme){
      this.selectedColor = null
      this.palette.theme = theme
    },
    selectPreset(preset){
      this.selectedColor = null
      this.palette.changePreset(preset)

    }
  },
}
</script>
<style scoped>
.palette{
  background-color: #1f2937;
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
}
.color{
  background-color: currentColor;
  height: 0;
  width: 0;
  min-width: 0;
  background-clip: padding-box;
  transition: 300ms;
  border: 15px currentColor solid;
  margin: 2.5px;
  padding: 1px;
  box-shadow: 0 0 3px 1px transparent;

}
.color.selected{
  background-color: white;
  box-shadow: 0 0 3px 1px white;
}
</style>

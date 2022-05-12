<template>
  <div class="palette text-4xl font-bold">
    <div class="palette" >
      <span class="mt-4 w-full block">Presets</span>
      <div class="presets">
        <button 
          v-for="(preset, index) in palette.palettePreset"
          :key="index"
          :class="`preset text-base font-bold inline-block rounded-full hover:bg-gray-300 hover:text-gray-900 active:text-gray-200 active:bg-gray-900 focus:outline-none px-2 mx-1 bg-white text-black'`" 
          @click="selectPreset(preset.name)"
        >
        {{preset.name}}
        </button>
        <RefreshIcon 
          class="inline p-2 h-10 w-10 cursor-pointer"
          @click="random"
        ></RefreshIcon>
      </div>

      <span class="mt-4 w-full block">Theme</span>
      <div class="themes">
        <button 
          v-for="(theme, index) in themes"
          :key="index"
          :class="`theme text-base font-bold inline-block rounded-full active:text-gray-200 active:bg-gray-900 focus:outline-none px-2 mx-1  ${palette.theme==theme?'selected bg-black text-white hover:hover:text-gray-200 ':'bg-white text-black hover:bg-gray-300 hover:text-gray-900'}`" 
          @click="selectTheme(theme)"
        >
        {{theme}}
        </button>
      </div>

      <span class="mt-4 w-full block">Palette</span>
      <div 
        v-for="(color, index) in palette.colors"
        v-show="index<palette.number"
        :key="index"
        :class="`color inline-block rounded ${screen.selectedColor==index?'selected':''}`" 
        :style="`color:${color}`"
        @click="selectColor(index)"
      >
      </div>
    <color-picker
      ref="color-picker"
      v-if="screen.selectedColor!=null"
      
      :value="this.palette.colors[screen.selectedColor]"
      @update="this.palette.colors[screen.selectedColor]=$event"
      @close="screen.selectedColor = null"
    ></color-picker>
    </div>
  </div>
</template>

<script>
import CircleSlider from '../components/CircleSlider.vue';
import ColorPicker from '../components/ColorPicker.vue';
import { Palette } from '../modules/palette';
import { RefreshIcon } from '@heroicons/vue/outline'
export default {
  components: { ColorPicker, CircleSlider, RefreshIcon },
  name: "palette",
  created() {
    this.themes = this.palette.getModeList()
  },
  data() {
    return {
      menuTitle: 'palette menu',
      themes: [],
    };
  },
  props: {
    palette: Palette,
    screen: Screen
  },
  methods: {
    selectColor(index){
      if(index == this.screen.selectedColor){
        this.screen.selectedColor = null
      }else{
        this.screen.selectedColor = index

        if(this.$refs['color-picker']){
          this.$refs['color-picker'].setValue(this.palette.colors[this.screen.selectedColor])
        }
      }
    },
    selectTheme(theme){
      this.screen.selectedColor = null
      this.palette.theme = theme
    },
    selectPreset(preset){
      this.screen.selectedColor = null
      this.palette.changePreset(preset)

    },
    random(){
      const array = Array.from(Array(30)).map(()=>'#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
      console.log(array)
      this.palette.colors = array
      
      
    }
  }
}

</script>
<style scoped>
.palette{
  background-color: transparent;
  width: 100%;
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

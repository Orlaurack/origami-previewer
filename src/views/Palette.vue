<template>
  <div class="palette text-4xl font-bold">
    {{ menuTitle }}
    <div class="palette" >
      <div 
        v-for="(color, index) in palette.colors"
        :key="index"
        :class="`color p-1 inline-block rounded ${selectedColor==index?'selected':''}`" 
        :style="`color:${color}`"
        @click="select(index)"
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
    this.palette = new Palette();
  },
  data() {
    return {
      menuTitle: 'palette menu',
      selectedColor: null,
      palette: Palette
    };
  },
  props: {
    propTest: String
  },
  methods: {
    select(index){
      if(index == this.selectedColor){
        this.selectedColor = null
      }else{
        this.selectedColor = index  
        if(this.$refs['color-picker']){
          this.$refs['color-picker'].setValue(this.palette.colors[this.selectedColor])
        }
      }
    },
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
  border: 10px currentColor solid;
  margin: 4px;
}
.color.selected{
  background-color: white;
  box-shadow: 0 0 0 2px white;
}
</style>

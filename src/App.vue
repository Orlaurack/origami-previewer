<template>
  <div class="app">
    <Background></Background>
    <Screen prop-test="sdilfhads" :palette="palette" ref="screen">{{}}</Screen>
    <div class="content overflow-hidden">
      <Menu @select="selectedMenu=$event"></Menu>
      <Palette class="overflow-auto" v-if="selectedMenu=='palette'" :palette="palette" :screen="this.screen"></Palette>
      <Option class="overflow-auto" v-if="selectedMenu=='option'" :screen="this.screen"></Option>
      <Download class="overflow-auto" v-if="selectedMenu=='download'" title="download menu"></Download>
    </div>
  </div>
</template>
<script setup>
import Screen from './components/Screen.vue'
import Menu from './components/Menu.vue'
import Palette from './views/Palette.vue'
import Option from './views/Option.vue'
import Download from './views/Download.vue'
import { Palette as PaletteModule } from './modules/palette'
import { Screen as ScreenModule } from './modules/screen'
import Background from './views/Background.vue'


</script>
<script>

export default {
  name: "app",
  components: [
    Screen,
    Menu,
    Palette,
    Option,
    Download,
    Background
  ],
  created() {
    this.palette = new PaletteModule()
  },
  data() {
    return {
      selectedMenu: 'palette',
      palette: PaletteModule,
      screen: ScreenModule
    }; 
  },
  mounted() {
    if(this.$refs.screen){
      this.screen = this.$refs.screen.screen
    }
  },
  props: {},
  methods: {},
}
</script>
<style>
@media screen and (orientation:portrait) { 
  *{
    --orientation: column;
  }
}
@media screen and (orientation:landscape) { 
  *{
    --orientation: row;
  }
}
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app{
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: var(--orientation);

  align-items: center;
  justify-content: center;
}
.content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

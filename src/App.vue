<template>
  <div class="app">
    <Background></Background>
    <Screen class="screen" :class="{visible: screenVisible}" prop-test="sdilfhads" :palette="palette" ref="screen">{{}}</Screen>
    <div class="content overflow-hidden hidden">
      <Menu @select="selectedMenu=$event"></Menu>
      <Palette class="overflow-auto" v-if="selectedMenu=='palette'" :palette="palette" :screen="screen"></Palette>
      <Option class="overflow-auto" v-if="selectedMenu=='option'" :screen="screen"></Option>
      <Download class="overflow-auto" v-if="selectedMenu=='download'" :screen="screen" title="download menu"></Download>
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
      screen: ScreenModule,
			background: Background,
			option: Option,
			screenVisible: true
    }; 
  },
  mounted() {
    if(this.$refs.screen){
      this.screen = this.$refs.screen.screen
    }




		setInterval(() => {
			this.screenVisible = false
			setTimeout(() => {
				this.palette.changePreset('default')
				
				const randomPalette = ['mixe 3', 'mixe 5', 'mixe 6', 'gradient 4', 'gradient 10'][Math.floor(Math.random() * 5)]
				this.palette.theme = randomPalette
	
				//const randomColors = Array.from(Array(30)).map(()=>'#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
				//this.palette.colors = randomColors
				const num = parseInt(randomPalette.substring(randomPalette.indexOf(' ') + 1))
	
				const colors = this.generateColors('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), num)
				console.log(colors)
				this.palette.colors = colors 
				
				setTimeout(() => {
					this.screenVisible = true
				}, 500);
			}, 1000);
			
		}, 10000);
  },
  props: {},
  methods: {
		
		generateColors(startColor, endColor, n){
	    let start = {
	        r: parseInt(startColor.slice(1, 3), 16),
	        g: parseInt(startColor.slice(3, 5), 16),
	        b: parseInt(startColor.slice(5, 7), 16)
	    }
	    let end = {
	        r: parseInt(endColor.slice(1, 3), 16),
	        g: parseInt(endColor.slice(3, 5), 16),
	        b: parseInt(endColor.slice(5, 7), 16)
	    }
	    let diff = {
	        r: end.r - start.r,
	        g: end.g - start.g,
	        b: end.b - start.b
	    }
	    let step = {
	        r: diff.r / (n - 1),
	        g: diff.g / (n - 1),
	        b: diff.b / (n - 1)
	    }
	    
	    let colors = [];
	    for (let i = 0; i < n; i++){
	        let color = {
	            r: Math.round(start.r + (step.r * i)),
	            g: Math.round(start.g + (step.g * i)),
	            b: Math.round(start.b + (step.b * i))
	        }
	        let rStr = ('0' + color.r.toString(16)).slice(-2);
	        let gStr = ('0' + color.g.toString(16)).slice(-2);
	        let bStr = ('0' + color.b.toString(16)).slice(-2);
	        let rgbStr = '#' + rStr + gStr + bStr;
	        colors.push(rgbStr);
	    }
			for(let i = n; i < 30; i++){
				colors.push('#888888')
			}
	    return colors;
		}
	},
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
.screen{
	transition: 1000ms;
	opacity: 0;
	max-width: 512px;
	max-height: 512px;
}
.screen.visible{
	opacity: 1
}
</style>

<template>
  <div class="app">
		<h1 class="title">@norledia_orlaurack</h1>
    <Background ref="background"></Background>
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

    if(this.$refs.background){
			this.background = this.$refs.background
		}
		
		setInterval(() => {
			this.screenVisible = false // step 1 duration 1000
	
			let bg_colors, colors, c

			const randomPalette = ['mixe 3', 'mixe 5', 'mixe 6', 'gradient 4', 'gradient 10'][Math.floor(Math.random() * 5)]
			const num = parseInt(randomPalette.substring(randomPalette.indexOf(' ') + 1))
			if(Math.random()>0.5){
				const c1 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
				const c2 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
				c = this.generateColors(c1, c2, Math.max(num, 5))
				console.log('a->b mode', c)
			}else{
				c = this.generateColorsH(Math.max(num, 5))
				console.log('hue mode', c)
			}
			colors = [...c]
			for(let i = c.length; i < 30; i++){
				colors.push('#888888')
			}
			
			bg_colors = [...c].sort(function () {return Math.random() - 0.5}).slice(0, 5)

			setTimeout(() => { // step 2
				this.background.updateColors(bg_colors)
			}, 1250);

			setTimeout(() => {
				this.palette.theme = randomPalette
				this.palette.colors = colors 
				this.screen.setDirection(Math.random()*360, 0.2)
			}, 1000);

			setTimeout(() => {
				this.screenVisible = true
			}, 2000);
		}, 10000);
  },
  props: {},
  methods: {
		generateColorsH(n) {
		  const colors = []
		  let hue = Math.floor(Math.random() * 360) // génération aléatoire de la teinte (entre 0 et 360)
			const saturation = Math.floor(Math.random() * 60) + 40 // génération aléatoire de la saturation (entre 0 et 100)
			const lightness = Math.floor(Math.random() * 60) + 20 // génération aléatoire de la luminosité (entre 25 et 75)
			const add = Math.floor((Math.random()*30)+10)
		  for (let i = 0; i < n; i++) {
		    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)` // création de la couleur HSL
				hue+=add
				if(hue > 360){
					hue-=360
				}
		    const hexColor = this.hslToHex(color) // conversion de la couleur HSL en code hexadécimal
		    colors.push(hexColor)
		  }

		  return colors
		},
	  hslToHex(hslColor) {
		  const [h, s, l] = hslColor.slice(4, -1).split(',').map(parseFloat) // récupération des valeurs H, S et L
		  const hue = h / 360;
		  const saturation = s / 100;
		  const lightness = l / 100;
		  let r, g, b;

		  if (saturation === 0) {
		    r = g = b = lightness; // gris
		  } else {
		    const hueToRgb = (p, q, t) => {
		      if (t < 0) t += 1;
		      if (t > 1) t -= 1;
		      if (t < 1 / 6) return p + (q - p) * 6 * t;
		      if (t < 1 / 2) return q;
		      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		      return p;
		    };

		    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
		    const p = 2 * lightness - q;
		    r = hueToRgb(p, q, hue + 1 / 3);
		    g = hueToRgb(p, q, hue);
		    b = hueToRgb(p, q, hue - 1 / 3);
		  }

		  const rgbColor = [r, g, b].map((x) => Math.round(x * 255)); // conversion des valeurs R, G et B en entiers entre 0 et 255
		  const hexColor = rgbColor.map((x) => {
		    const hex = x.toString(16);
		    return hex.length === 1 ? `0${hex}` : hex; // ajout d'un zéro en tête si le code hexadécimal ne contient qu'un seul caractère
		  });

		  return `#${hexColor.join('')}`;
		},
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
	transition: 1000ms opacity;
	opacity: 0;
	max-width: 256px;
	max-height: 256px;
}
.screen.visible{
	opacity: 1
}
.title{
	position:absolute;
	bottom: 20px;
	font-size: 32px;
	color: white;
}
</style>

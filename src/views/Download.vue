<template>
	<div class="text-4xl font-bold">
		<span class="mt-4 w-full block">Download</span>
		<div class="download">
			<button @click="generateGif()">GIF</button>
			<button @click="generateWebP()">webP</button>
		</div>
	</div>
</template>

<script>
import * as GIF from '../modules/generate_gif'
import { Solid } from '../models/solids/solid'

import { Screen } from '../modules/screen'
export default {
	created() {},
	data() {
		return {
			
		};
	},
	props: {
		title: String,
    screen: Screen
	},
	methods: {
		generateGif(){
      const steps = 72;
      const finalDelay = 1000/24;
      const fullLoop = 720;
			console.log(this.screen)
      const hyp = Math.hypot(this.screen.state.rotation.x, this.screen.state.rotation.y)
      const newhyp = fullLoop / steps;
      const x = this.screen.state.rotation.x * (newhyp / hyp)
      const y = this.screen.state.rotation.y * (newhyp / hyp)
      const memDef = this.screen.definition
      this.screen.definition = 512
      const memSize = this.screen.size
      this.screen.size = 2

      function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
      }

      let gif = new GIF({
        workers: 4,
        quality: 1, 
        transparent: null,
        background: null,
        globalPalette: flatten(this.screen.palette.colors.map((color) => {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
          return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
          ]
        }).concat([0, 0, 0])),
        dither: false,
        width: this.screen.definition,
        height: this.screen.definition,
      });
      
      for (let index = 0; index < steps; index++) {
				this.screen.state.mouse.position.x += this.screen.state.rotation.x;
        this.screen.state.mouse.position.y += this.screen.state.rotation.y;
        const ctx = this.screen.generateCanvas();

        gif.addFrame(
          ctx,
          {
            delay: finalDelay,
          }
        );
      }
      
      gif.render()
      
      gif.on('finished', (blob) => {
        console.log(blob);
        this.screen.definition = memDef
      })
		},
		generateWebP(){

      const steps = 72;
      const finalDelay = 1000/24;
      const fullLoop = 720;
			console.log(this.screen)
      const hyp = Math.hypot(this.screen.state.rotation.x, this.screen.state.rotation.y)
      const newhyp = fullLoop / steps;
      const x = this.screen.state.rotation.x * (newhyp / hyp)
      const y = this.screen.state.rotation.y * (newhyp / hyp)
      const memDef = this.screen.definition
      this.screen.definition = 512
      const memSize = this.screen.solid.size
      this.screen.solid.size = 1.4
			console.log(this.screen)

      function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
      }

			const frames = []
      
      for (let index = 0; index < steps; index++) {
				this.screen.state.mouse.position.x += this.screen.state.rotation.x;
        this.screen.state.mouse.position.y += this.screen.state.rotation.y;
        const ctx = this.screen.generateCanvas(true);

				frames.push(ctx.canvas.toDataURL('image/webp'))
      }
      
      
			var link = document.createElement('a');
		  link.download = 'origami_preview.webp';
		  link.href = frames[0];
		  link.click();
			
			setTimeout(() => {
				this.screen.definition = memDef
				this.screen.solid.size = memSize
			}, 10000);
		}
	},
}
</script>

<style lang="sass" scoped>
.download
	width: 100%
	min-width: 200px
	min-height: 200px
	display: flex
	gap: 20px
	flex-direction: column
	align-items: flex-start
	margin: 20px 0

</style>
<template>
  <div class="background-container center">
    <!--span v-for="(point, index) of points" :key="index" class="point" :style="`top:${point.y}px; left:${point.x}px;`"></span-->
    <svg class="background" @click="this.reload()" :style="`top: ${-size/2}; left: ${-size/2}`">
      <polygon
        v-for="(triangle, index) of orderedTriangles"
        :key="index"
        :style="`
          filter: drop-shadow(0px 0px ${value(triangle.center)}px #00000080);
          transform: 
            scale(${100-value(triangle.center)}%)
            rotate(${value(triangle.center)*0.2}deg);
          transform-origin: ${triangle.center.x/2.3}px ${triangle.center.y/2.3}px;`"
        :fill="getColor(triangle)"
        :stroke="getColor(triangle)"
        stroke-width="2px"
        :id="index"
        :points="`${triangle.a.x},${triangle.a.y} ${triangle.b.x},${triangle.b.y} ${triangle.c.x},${triangle.c.y}`" 
        />

    </svg>
  </div>
</template>
<script>
import CircleSlider from '../components/CircleSlider.vue'
import Slider from '../components/Slider.vue'
import { Coordinate } from '../models/coordinate'
import { Screen } from '../modules/screen'
export default {
  components: { CircleSlider, Slider },
  name: "option",
  created() {
    this.points = {}
    this.generateRow(new Coordinate(0,0,0), this.width)
  },
  data() {
    return {
      points: [],
      width: 0,
      height: 0,
      max_width: 0,
      max_height:0,
      size: 50,
      random: 100,
      colors: [],
      pointer_scope: 500,
      color_scope: 400,
      mouse: {pos:new Coordinate(0,0), hovered: true}

    };
  },
  computed: {
    orderedTriangles(){
      return this.triangles.sort((a,b) => this.value(a.center) < this.value(b.center)/*Math.random() < .5*/)

    },
    triangles(){
      const triangles = []
      for (const coordinate in this.points) {
        const point = this.points[coordinate]
        const c = coordinate.split(':').map(n=>parseInt(n))
        const inv = this.points[`${c[0]+1}:${c[1]+1}`]
        function center(a, b, c) {
          return new Coordinate(a.x+b.x+c.x/3, a.y+b.y+c.y/3)
        }
        if(inv){
          const alpha = this.points[`${c[0]+1}:${c[1]}`]

          if(alpha){
            triangles.push({a:alpha, b:inv, c:point, center: center(alpha, inv, point)})
          }

          const beta = this.points[`${c[0]}:${c[1]+1}`]
          if(beta){
            triangles.push({a:beta, b:inv, c:point, center: center(beta, inv, point)})
          }
        }
      }

      return triangles
    },
    value() {
      return center => 0;

      function distance (pa, pb){
	      return Math.sqrt(Math.pow(pa.x - pb.x, 2) + Math.pow(pa.y - pb.y, 2));
      }

      return center => (this.pointer_scope - Math.min(this.pointer_scope, distance(center, this.mouse.pos)))/this.color_scope*100
    },
  },
  props: {
    screen: Screen
  },
  methods: {
    generateRow(coordinate, number){
      while(number>=0)
      {
        const x = coordinate.x+number
        const y = coordinate.y
        const z = x-y
        const coord = this.getCoord(x, y, z, number)
        this.points[`${x}:${y}`] = coord
        this.generateColumn(new Coordinate(x,y,z), this.height)
        
        number--
      }
    },
    generateColumn(coordinate, number){
      while(number>=0){
        const x = coordinate.x+Math.floor(number/2)
        const y = coordinate.y+number
        const z = x-y
       
        const coord = this.getCoord(x, y, z, number)
        this.points[`${x}:${y}`] = coord

        number--
      }
    },
    getCoord(x,y,z, number){
      let new_x = 0
      let new_y = 0
      const r = this.random/100*this.size
      if((x+z)/2>this.width-1)
        new_x = this.size*this.width*2
      else if(x+z>0)
        new_x = (x*this.size)+(z*this.size)+((2*r*Math.random())-r); 
      
      if(y >= this.height)
        new_y = (this.height*Math.sqrt(3))*this.size
      else if(y != 0)
        new_y = (y*this.size*Math.sqrt(3))+((2*r*Math.random())-r); 
      
      return new Coordinate(new_x, new_y)
    },
    getColor(triangle){
      let color = {r:0, g:0, b:0}
      const moy = new Coordinate((triangle.a.x+triangle.b.x+triangle.c.x)/3, (triangle.a.y+triangle.b.y+triangle.c.y)/3)

      for(const c in this.colors){
        const dist = Math.sqrt(Math.pow(this.colors[c].coordinate.x - moy.x, 2) + Math.pow(this.colors[c].coordinate.y - moy.y, 2));

        color.r += Math.max(0, this.colors[c].distance-dist)/this.colors[c].distance * this.colors[c].color.r
        color.g += Math.max(0, this.colors[c].distance-dist)/this.colors[c].distance * this.colors[c].color.g
        color.b += Math.max(0, this.colors[c].distance-dist)/this.colors[c].distance * this.colors[c].color.b
      }

      return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`
    },
    reload(){
      this.points = {}
      this.colors = [
        {
          color: {r:Math.random()*255, g:Math.random()*255, b:Math.random()*255},
          coordinate: new Coordinate(0,0),
          distance: this.color_scope
        },
        {
          color: {r:Math.random()*255, g:Math.random()*255, b:Math.random()*255},
          coordinate: new Coordinate(this.width*this.size*2,0),
          distance: this.color_scope
        },
        {
          color: {r:Math.random()*255, g:Math.random()*255, b:Math.random()*255},
          coordinate: new Coordinate(0,this.size*this.height*1.8),
          distance: this.color_scope
        },
        {
          color: {r:Math.random()*255, g:Math.random()*255, b:Math.random()*255},
          coordinate: new Coordinate(this.width*this.size*2,this.size*this.height*1.8),
          distance: this.color_scope
        },
        {
          color: {r: 128+Math.random()*128, g: 128+Math.random()*128, b: 128+Math.random()*128},
          coordinate: new Coordinate(this.width*this.size,this.size*this.height*0.9),
          distance: this.color_scope
        },
      ]
      // this.colors.push({
      //     color: {r: 120, g: 120, b:120},
      //     coordinate: new Coordinate(0,0),
      //     distance: 300
      //   })
      /*for (let index = 0; index < Math.round(10); index++) {
        this.colors.push({
          color: {r: Math.random()*100, g: Math.random()*100, b:Math.random()*100},
          coordinate: new Coordinate(Math.random()*40*25, Math.random()*40*15),
          distance: Math.random()*300+300
        })
        
      }*/
      this.generateRow(new Coordinate(0,0,0), this.width)
    },
    checkCoord (c, list){
      for (const point of list)
        if(c.x==point.x && c.y == point.y && c.z == point.z)
          return false
      
      return true
    },
  },
  mounted() {
    this.max_width = document.body.clientWidth
    this.max_height = document.body.clientHeight
    this.width = Math.ceil(this.max_width / this.size / 2)+1
    this.height = Math.ceil(this.max_height / this.size / 2)+2
    //window.addEventListener('mousemove', e => {
    //  this.mouse.pos.x = e.offsetX*2.3
    //  this.mouse.pos.y = e.offsetY*2.3
    // // this.colors[0].coordinate= new Coordinate(x,y)
    //})
    this.reload();
  },
}
</script>
<style scoped>
.background-container{
  overflow: visible;
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: #fff;
  z-index: -1;

}
.background{
  position : absolute;
  width: 100%;
  height: 100%;
  margin: 0px;
  cursor: none;
}
.point{
  width: 2px;
  height:2px;
  border-radius: 100%;
  border: #fff solid 2px;
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>
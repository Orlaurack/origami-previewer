import palettePreset from '../assets/palettePreset.json'
import modePreset from '../assets/modePreset.json'

export class Palette {
  colors: string[]
  theme: string
  number: number
  palettePreset: { name: string, type: string, palette: string[] }[]
  modePreset: any

  constructor() {
    this.palettePreset = palettePreset;
    this.modePreset = modePreset;
    this.colors = this.palettePreset[0].palette;
    this.theme = 'default'
    this.number = 30
  }
  changePreset(name:string){
    const index = this.palettePreset.findIndex((p)=>p.name==name);
    if(index != -1){
      this.colors = this.palettePreset[index].palette
      this.theme = this.palettePreset[index].type
    }
  }
  changeColor(index: number, value: string){
    this.colors[index] = value;
  }

  getPalette(){
    if (this.modePreset[this.theme])
      return this.getColors(this.modePreset[this.theme])
    else
      return this.getColors(this.modePreset['default'])
  }
  getModeList(){
    return Object.keys(this.modePreset)
  }
  private getColors(shema: number[]) {
    let max = 0;
    const palette = []
    for (const index of shema) {
      palette.push(this.colors[index])
      if(index > max) max = index
    }
    this.number = max+1
    return palette
  } 

  
  //this.SHEMAS = {
    //unic1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //grad2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    //grav2: [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0],
    //line2: [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    //spca2: [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    //grad3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2],
    //grav3: [1, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 1, 1],
    //mixe3: [0, 1, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 0, 1, 2, 1, 0, 2, 1, 0, 1, 0, 2, 1, 2, 1, 0, 2, 2, 0],
    //spca3: [0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 2, 0, 2, 0, 2, 2, 2, 1, 1, 2, 1],
    //line4: [1, 0, 2, 2, 3, 3, 3, 0, 0, 2, 2, 3, 3, 3, 0, 0, 3, 2, 2, 3, 3, 0, 0, 3, 2, 2, 3, 3, 1, 0],
    //grad4: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 3, 3, 3, 3, 3],
    //grav4: [1, 1, 1, 2, 2, 3, 3, 2, 2, 0, 1, 0, 0, 0, 0, 1, 2, 3, 2, 3, 3, 3, 2, 1, 1, 2, 0, 1, 2, 1],
    //mixe5: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 1, 2, 3, 0, 4, 2, 0, 1, 4, 2, 3, 1, 4, 0, 3, 2, 4, 1, 0, 3],
    //grad5: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 3, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 4, 4, 4, 4, 4],
    //grav5: [1, 1, 2, 3, 3, 4, 4, 3, 2, 0, 1, 0, 0, 0, 0, 1, 2, 4, 3, 4, 4, 4, 3, 2, 1, 2, 0, 1, 3, 2],
    //spca5: [0, 1, 2, 0, 3, 1, 4, 0, 1, 3, 2, 4, 3, 1, 3, 0, 4, 2, 3, 4, 2, 1, 3, 4, 1, 2, 3, 4, 0, 1],
    //grad6: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 2, 4, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 5, 5, 5, 5, 5],
    //grav6: [2, 1, 2, 3, 4, 5, 4, 3, 3, 1, 1, 0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 4, 4, 2, 2, 3, 1, 1, 3, 2],
    //mixe6: [0, 1, 2, 3, 1, 4, 3, 0, 4, 2, 5, 4, 5, 1, 0, 3, 5, 2, 4, 5, 1, 0, 5, 3, 2, 1, 3, 4, 2, 0],
    //line7: [1, 0, 2, 2, 6, 4, 4, 0, 5, 3, 2, 4, 6, 4, 0, 0, 6, 2, 3, 4, 6, 0, 0, 6, 2, 2, 6, 4, 1, 5],
    //grav7: [2, 2, 3, 4, 4, 6, 5, 4, 3, 1, 2, 0, 0, 0, 1, 2, 3, 5, 4, 6, 6, 5, 4, 3, 2, 3, 1, 2, 4, 3],
    //grav8: [3, 2, 3, 4, 5, 7, 6, 4, 4, 1, 2, 0, 0, 0, 1, 3, 4, 6, 5, 7, 7, 6, 5, 3, 3, 4, 1, 2, 4, 3],
    //grav9: [3, 2, 4, 5, 6, 8, 7, 5, 4, 1, 2, 0, 0, 0, 1, 3, 4, 7, 6, 8, 8, 7, 6, 4, 3, 4, 1, 2, 5, 4],
    //grav10: [3, 2, 4, 6, 7, 9, 8, 6, 5, 1, 2, 0, 0, 0, 1, 3, 5, 8, 7, 9, 9, 8, 7, 4, 3, 5, 1, 2, 6, 4],
    //mixe15: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 5, 13, 7, 14, 10, 9, 11, 12, 1, 13, 14, 3, 2, 4, 6, 0, 8],
    //mixe30: ,
    //mixe90: Array.from(Array(90).keys()),
    //mixe270: Array.from(Array(270).keys())
  //};
  
}
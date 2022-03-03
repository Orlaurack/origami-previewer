import { SuspenseProps } from "vue"

export class Coordinate{
  x: number
  y: number
  z: number
  constructor(x: number = 0, y:number = 0, z: number = 0){
    this.x = x
    this.y = y
    this.z = z
  }

  setPosition(x:number, y:number, z:number = 0){
    this.x = x
    this.y = y
    this.z = z
  }

  addPosition(x:number, y:number, z:number = 0){
    this.x+=x
    this.y+=y
    this.z+=z
  }
}
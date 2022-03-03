import { Module } from "../module"
import { Icosaedre } from "./icosaedre";

export class Solid{
  staredSolid: Module[]
  name: string
  picSize: number
  size: number

  constructor (name: string, size: number, picSize: number){
    this.name = name
    this.picSize = picSize
    this.size = size

    this.staredSolid = this.getSolid()
  }
  updateSolidName(name: string){
    this.name = name
    this.updateSolid(this.size, this.picSize)
  }

  updateSolid(size: number, picSize: number){
    this.size = size
    this.picSize = picSize
    this.staredSolid = this.getSolid()
  }
  private getSolid(){
    switch (this.name) {
      //case 'tetraedre':
      //  return new Tetraedre().getTetraedre(this.size, this.picSize);
      //  break;
      //case 'octaedre':
      //  return new Octaedre().getOctaedre(this.size, this.picSize);
      //  break;
      //case 'icosaedre120':
      //  return new Icosaedre120().getIcosaedre120(this.size, this.picSize);
      //  break;
      //case 'icosaedre270':
      //  return new Icosaedre270().getIcosaedre270(this.size, this.picSize);
      //  break;
      case 'icosaedre':
      default:
        return new Icosaedre().getIcosaedre(this.size, this.picSize)
        break;
    }
  }
}

import { Coordinate } from '../models/coordinate';
import { Solid } from '../models/solids/solid';

export class Rotation {
  lastRotation = [new Coordinate(), new Coordinate()];

  constructor(/*solidSettingsService: SolidSettingsService*/) {
    //this.solidSettingsService = solidSettingsService;
  }

  rotatePoints(solid: Solid, mouseRotation?: Coordinate, mouseDowned?: boolean, inertia: number = 0.90) {
    let rotation = mouseRotation
    if (rotation === undefined) {
      rotation = this.lastRotation[0];
    }

    if(mouseDowned){
      rotation.x *= inertia
      rotation.y *= inertia
    }else{ 
      rotation.x = this.lastRotation[0].x * inertia;
      rotation.y = this.lastRotation[0].y * inertia;
      this.lastRotation[0] = rotation;
    }

    const rx = (rotation.y) % 360 * (Math.PI / 180) * 1;
    const ry = - (rotation.x) % 360 * (Math.PI / 180) * 1;

    const sinAnglex = Math.sin(rx);
    const cosAnglex = Math.cos(rx);
    const sinAngley = Math.sin(ry);
    const cosAngley = Math.cos(ry);
    const newSolid: Solid = new Solid(solid.name, solid.size, solid.picSize);
    const star = solid.staredSolid
    const newStar = newSolid.staredSolid
    for (const index in star) {
      if (Object.prototype.hasOwnProperty.call(star, index)) {
        const module = star[index];
        module.forEachPoints((point: Coordinate)=>{
          const pointMem = new Coordinate(point.x, point.y, point.z) // (clone)
          const y = pointMem.y * cosAnglex - pointMem.z * sinAnglex;
          let z = pointMem.z * cosAnglex + pointMem.y * sinAnglex;
          const x = pointMem.x * cosAngley + z * sinAngley;
          z = z * cosAngley - pointMem.x * sinAngley;
          return new Coordinate(x, y, z)
        })
        
        newStar[index] = module
      }
    }
    return newSolid
  }
}

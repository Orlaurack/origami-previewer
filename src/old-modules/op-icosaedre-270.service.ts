import { Injectable } from '@angular/core';
import { Coordinate } from './op-coordinate';
import { OrigamiModule } from './op-module';
import { SolidSettingsService } from './op-solid-settings.service';

@Injectable({
  providedIn: 'root'
})
export class OpIcosaedre270Service {

  solidSettingsService: SolidSettingsService;
  constructor(solidSettingsService: SolidSettingsService) {
    this.solidSettingsService = solidSettingsService;
  }

  getIcosaedre(size: number, picHeight: number) {

    const distance = (((Math.sqrt(5) + 1) / 2) * 200 / 2) * (size * 1.6);
    const demiscale = (200 / 2) * (size * 1.8);
    const solid = [
        new Coordinate(0, -demiscale, -distance),
        new Coordinate(0, demiscale, -distance),
        new Coordinate(-distance, 0, -demiscale),
        new Coordinate(-distance, 0, demiscale),
        new Coordinate(demiscale, -distance, 0),
        new Coordinate(demiscale, distance, 0),
        new Coordinate(distance, 0, -demiscale),
        new Coordinate(-demiscale, distance, 0),
        new Coordinate(-demiscale, -distance, 0),
        new Coordinate(0, demiscale, distance),
        new Coordinate(0, -demiscale, distance),
        new Coordinate(distance, 0, demiscale)
    ];
    const staredSolid = [];
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[0], solid[1], solid[2], solid[6]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[0], solid[2], solid[8], solid[1]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[1], solid[2], solid[0], solid[7]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[2], solid[7], solid[3], solid[1]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[1], solid[7], solid[2], solid[5]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[5], solid[7], solid[1], solid[9]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[1], solid[5], solid[7], solid[6]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[5], solid[6], solid[11], solid[1]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[1], solid[6], solid[5], solid[0]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[0], solid[6], solid[1], solid[4]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[4], solid[6], solid[0], solid[11]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[0], solid[4], solid[6], solid[8]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[0], solid[8], solid[4], solid[2]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[4], solid[8], solid[10], solid[0]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[2], solid[8], solid[0], solid[3]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[3], solid[8], solid[2], solid[10]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[2], solid[3], solid[8], solid[7]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[3], solid[7], solid[9], solid[2]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[3], solid[9], solid[10], solid[7]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[7], solid[9], solid[3], solid[5]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[5], solid[9], solid[7], solid[11]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[9], solid[11], solid[10], solid[5]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[5], solid[11], solid[9], solid[6]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[6], solid[11], solid[5], solid[4]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[4], solid[11], solid[6], solid[10]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[10], solid[11], solid[4], solid[9]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[4], solid[10], solid[11], solid[8]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[8], solid[10], solid[4], solid[3]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[9], solid[10], solid[3], solid[11]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight / 3, solid[3], solid[10], solid[8], solid[9]));

    return staredSolid;
  }
  multiplyBy4(picHeight: number, A: Coordinate, B: Coordinate, AB: Coordinate, BA: Coordinate) {
    //    ab       ab
    //    /\       /\
    //   /  \     /\/\
    //  /    \   /\/\/\
    // a------b a------b
    //  \    /   \/\/\/
    //   \  /     \/\/
    //    \/       \/
    //    ba       ba

    return [
      new OrigamiModule(picHeight, this.tierOf(AB, A), this.tierOf(AB, B), AB, this.centerOf(this.tierOf(A, AB), this.tierOf(B, AB))),
      new OrigamiModule(picHeight, this.tierOf(A,  AB), this.centerOf(this.tierOf(A, AB), this.tierOf(B, AB)), this.tierOf(AB, A), this.tierOf(A, B)),
      new OrigamiModule(picHeight, this.centerOf(this.tierOf(A, AB), this.tierOf(B, AB)), this.tierOf(B,  AB), this.tierOf(AB, B), this.tierOf(B, A)),

      new OrigamiModule(picHeight, A, this.tierOf(A, B), this.tierOf(A, AB), this.tierOf(A, BA)),
      new OrigamiModule(picHeight, this.tierOf(A, B), this.tierOf(B, A), this.centerOf(this.tierOf(A, AB), this.tierOf(B, AB)), this.centerOf(this.tierOf(A, BA), this.tierOf(B, BA))),
      new OrigamiModule(picHeight, this.tierOf(B, A), B, this.tierOf(B, AB), this.tierOf(B, BA)),

      new OrigamiModule(picHeight, this.tierOf(BA, A), this.tierOf(BA, B), this.centerOf(this.tierOf(A, BA), this.tierOf(B, BA)), BA),
      new OrigamiModule(picHeight, this.tierOf(A,  BA), this.centerOf(this.tierOf(A, BA), this.tierOf(B, BA)), this.tierOf(A, B), this.tierOf(BA, A)),
      new OrigamiModule(picHeight, this.centerOf(this.tierOf(A, BA), this.tierOf(B, BA)), this.tierOf(B,  BA), this.tierOf(B, A), this.tierOf(BA, B)),
    ];
  }

  centerOf(a: Coordinate, b: Coordinate) {
    const x = a.x + b.x;
    const y = a.y + b.y;
    const z = a.z + b.z;
    return new Coordinate(x / 2, y / 2, z / 2);
  }

  tierOf(a: Coordinate, b: Coordinate) {
    const x = a.x + a.x + b.x;
    const y = a.y + a.y + b.y;
    const z = a.z + a.z + b.z;
    return new Coordinate(x / 3, y / 3, z / 3);
  }
}

import { Coordinate } from '../coordinate';
import { Module } from '../module';
//import { SolidSettingsService } from './op-solid-settings.service';

export class Icosaedre {

  //solidSettingsService: SolidSettingsService;
  constructor(/*solidSettingsService: SolidSettingsService*/) {
    //this.solidSettingsService = solidSettingsService;
  }

  getIcosaedre(size: number, picHeight: number) {

    const distance = (((Math.sqrt(5) + 1) / 2) * 200 / 2) * size;
    const demiscale = (200 / 2) * size;
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
    const staredSolid = [
      new Module(picHeight, solid[0], solid[1], solid[2], solid[6]),
      new Module(picHeight, solid[0], solid[2], solid[8], solid[1]),
      new Module(picHeight, solid[1], solid[2], solid[0], solid[7]),
      new Module(picHeight, solid[2], solid[7], solid[3], solid[1]),
      new Module(picHeight, solid[1], solid[7], solid[2], solid[5]),
      new Module(picHeight, solid[5], solid[7], solid[1], solid[9]),
      new Module(picHeight, solid[1], solid[5], solid[7], solid[6]),
      new Module(picHeight, solid[5], solid[6], solid[11], solid[1]),
      new Module(picHeight, solid[1], solid[6], solid[5], solid[0]),
      new Module(picHeight, solid[0], solid[6], solid[1], solid[4]),
      new Module(picHeight, solid[4], solid[6], solid[0], solid[11]),
      new Module(picHeight, solid[0], solid[4], solid[6], solid[8]),
      new Module(picHeight, solid[0], solid[8], solid[4], solid[2]),
      new Module(picHeight, solid[4], solid[8], solid[10], solid[0]),
      new Module(picHeight, solid[2], solid[8], solid[0], solid[3]),
      new Module(picHeight, solid[3], solid[8], solid[2], solid[10]),
      new Module(picHeight, solid[2], solid[3], solid[8], solid[7]),
      new Module(picHeight, solid[3], solid[7], solid[9], solid[2]),
      new Module(picHeight, solid[3], solid[9], solid[10], solid[7]),
      new Module(picHeight, solid[7], solid[9], solid[3], solid[5]),
      new Module(picHeight, solid[5], solid[9], solid[7], solid[11]),
      new Module(picHeight, solid[9], solid[11], solid[10], solid[5]),
      new Module(picHeight, solid[5], solid[11], solid[9], solid[6]),
      new Module(picHeight, solid[6], solid[11], solid[5], solid[4]),
      new Module(picHeight, solid[4], solid[11], solid[6], solid[10]),
      new Module(picHeight, solid[10], solid[11], solid[4], solid[9]),
      new Module(picHeight, solid[4], solid[10], solid[11], solid[8]),
      new Module(picHeight, solid[8], solid[10], solid[4], solid[3]),
      new Module(picHeight, solid[9], solid[10], solid[3], solid[11]),
      new Module(picHeight, solid[3], solid[10], solid[8], solid[9]),
    ];
    return staredSolid;
  }
}

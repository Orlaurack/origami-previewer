import { Coordinate } from './coordinate'

export class Module {
  ap: Coordinate
  an: Coordinate
  ac: Coordinate
  bp: Coordinate
  bn: Coordinate
  cp: Coordinate
  cn: Coordinate
  dp: Coordinate
  dn: Coordinate
  ep: Coordinate
  en: Coordinate
  fp: Coordinate
  fn: Coordinate
  gp: Coordinate
  gn: Coordinate
  hp: Coordinate
  hn: Coordinate
  ip: Coordinate
  in: Coordinate
  jp: Coordinate
  jn: Coordinate
  kp: Coordinate
  kn: Coordinate
  
  picsHeight: number

  constructor(
    picsHeight: number,
    leftPrimary: Coordinate,
    rightPrimary: Coordinate,
    leftSecond: Coordinate,
    rightSecond: Coordinate
  ){
    this.picsHeight = picsHeight;
    const leftVertex: Coordinate = this.calculVertex(leftPrimary, rightPrimary, leftSecond);
    const rightVertex: Coordinate = this.calculVertex(rightPrimary, leftPrimary, rightSecond);
    const moyenne = (coordinates: Coordinate[]) => {
      let x = 0;
      let y = 0;
      let z = 0;
      for (const coordinate of coordinates) {
        x += coordinate.x;
        y += coordinate.y;
        z += coordinate.z;
      }
      return new Coordinate(x / coordinates.length, y / coordinates.length, z / coordinates.length);
    };

    this.ap = rightPrimary;
    this.an = leftPrimary;
    this.ac = moyenne([rightPrimary, leftPrimary]);
    this.bp = moyenne([moyenne([rightPrimary, leftPrimary]), moyenne([rightPrimary, leftPrimary, leftVertex])]);
    this.bn = moyenne([moyenne([rightPrimary, leftPrimary]), moyenne([rightPrimary, leftPrimary, rightVertex])]);
    this.cp = moyenne([rightPrimary, leftPrimary, leftVertex]);
    this.cn = moyenne([rightPrimary, leftPrimary, rightVertex]);
    this.dp = moyenne([leftPrimary, leftVertex]);
    this.dn = moyenne([rightPrimary, rightVertex]);
    this.ep = moyenne([moyenne([leftPrimary, leftSecond, leftVertex]), moyenne([leftPrimary, leftSecond])]);
    this.en = moyenne([moyenne([rightPrimary, rightSecond, rightVertex]), moyenne([rightPrimary, rightSecond])]);
    this.fp = moyenne([leftPrimary, leftSecond, leftVertex]);
    this.fn = moyenne([rightPrimary, rightSecond, rightVertex]);
    this.gp = moyenne([moyenne([leftPrimary, leftVertex]), moyenne([leftSecond, leftVertex])]);
    this.gn = moyenne([moyenne([rightPrimary, rightVertex]), moyenne([rightSecond, rightVertex])]);
    this.hp = moyenne([leftSecond, leftVertex]);
    this.hn = moyenne([rightSecond, rightVertex]);
    this.ip = leftVertex;
    this.in = rightVertex;
    this.jp = moyenne([leftSecond, rightPrimary, leftVertex, leftVertex]);
    this.jn = moyenne([rightSecond, leftPrimary, rightVertex, rightVertex]);
    this.kp = moyenne([rightPrimary, leftVertex, leftSecond]);
    this.kn = moyenne([leftPrimary, rightVertex, rightSecond]);
  }
  calculVertex(A: Coordinate, B: Coordinate, C: Coordinate) {
    const length = 1 + (this.picsHeight / 80);
    const center = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3, z: (A.z + B.z + C.z) / 3 };

    return new Coordinate(center.x * length, center.y * length, center.z * length);
  }
  forEachPoints(callback: (point: Coordinate)=>Coordinate){
    this.ap = callback(this.ap)
    this.an = callback(this.an)
    this.ac = callback(this.ac)
    this.bp = callback(this.bp)
    this.bn = callback(this.bn)
    this.cp = callback(this.cp)
    this.cn = callback(this.cn)
    this.dp = callback(this.dp)
    this.dn = callback(this.dn)
    this.ep = callback(this.ep)
    this.en = callback(this.en)
    this.fp = callback(this.fp)
    this.fn = callback(this.fn)
    this.gp = callback(this.gp)
    this.gn = callback(this.gn)
    this.hp = callback(this.hp)
    this.hn = callback(this.hn)
    this.ip = callback(this.ip)
    this.in = callback(this.in)
    this.jp = callback(this.jp)
    this.jn = callback(this.jn)
    this.kp = callback(this.kp)
    this.kn = callback(this.kn)
  }
}
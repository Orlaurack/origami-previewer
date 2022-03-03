
import { Coordinate } from '../models/coordinate';
import { Solid } from '../models/solids/solid';
import { Palette } from './palette';
import { Rotation } from './rotation';
let dix = 10

export class Screen {
  readonly size: number
  solid: Solid // | other
  rotation: Rotation
  palette: Palette
  definition: number
  state: {
    play: boolean
    rotation: Coordinate,
    frameInterval: any,
    firstFrame: boolean,
    mouse: {
      position: Coordinate,
      downed: boolean
    }
    fps: number
  }
  ctx: CanvasRenderingContext2D
  readonly second= 1000

  constructor(solid: Solid, palette: Palette,  ctx: CanvasRenderingContext2D) {
    this.solid = solid
    this.rotation = new Rotation()
    this.palette = palette
    this.definition = 500
    this.size = 1
    this.state = {
      play: false,
      rotation: new Coordinate(0.3, 0),
      frameInterval: null,
      firstFrame: true,
      fps: 24,
      mouse: {
        position: new Coordinate(0, 0),
        downed: false
      }
    }
    this.ctx = ctx
  }

  generateCanvas() {
    /*if (gifMode) {
      ctx = document.createElement("canvas").getContext('2d');
      ctx.canvas.width = solidSettingsService.definition;
      ctx.canvas.height = solidSettingsService.definition;
    }*/
    const fov = 2.5
    const scale = 1
    const precision = 3
    const digits = Math.pow(10, precision);

    const getCoord = (coordinate: Coordinate) => {
      const project = (v: number) => {
        const f = (1000 / fov) /
          (2000 / fov + coordinate.z) *
          (scale * this.definition / 500);
        return v * f;
      }
      const round = (v: number) => {
        return Math.round(v * digits) / digits;
      }

      return {
        x: round(project(coordinate.x) + (this.definition / 2)),
        y: round(project(coordinate.y) + (this.definition / 2))
      };
    };
    const list: any[] = [];
    const draw = (a: ()=>void, z: number) => {
      const o = { action: a, z };
      let stop = true;
      let index = 0;
      while (stop) {
        if (list.length <= index || z >= list[index].z) {
          list.splice(index, 0, o); // insert at good place
          stop = false;
        }
        index++;
      }
    };
    if (this.ctx !== undefined) {
      this.ctx.clearRect(
        0,
        0,
        this.definition,
        this.definition
      )
    }
    this.ctx.strokeStyle = '#18212f'
    this.ctx.lineWidth = this.definition / 300
    
    let i = 0
    const star = this.solid.staredSolid
    const palette = this.palette.getPalette()


    for (const s in star) {
      if (star.hasOwnProperty(s)) {
        const module = star[s];
        //color = colorManagerService.showedColors[Math.floor((i++) / repetition)].color;
        const color = palette[i++]

        let c = { x: 0, y: 0 };
        draw(() => {
          this.ctx.fillStyle = color;
          this.ctx.lineCap = 'butt';
          this.ctx.lineJoin = 'bevel';
          this.ctx.beginPath();
          c = getCoord(module.ac); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.ap); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.bp); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.beginPath();
          c = getCoord(module.an); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.cp); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.ac); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.an); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.beginPath();
          c = getCoord(module.an); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.dp); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.cp); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
        }, (module.cp).z);
        draw(() => {
          this.ctx.fillStyle = color;
          this.ctx.lineCap = 'butt';
          this.ctx.lineJoin = 'bevel';
          this.ctx.beginPath();
          // m r b
          c = getCoord(module.ac); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.an); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.bn); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.beginPath();
          // c m v c
          c = getCoord(module.ap); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.ac); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.cn); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.ap); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.beginPath();
          // c j v
          c = getCoord(module.ap); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.dn); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.cn); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
        }, (module.cn).z);
        draw(() => {
          this.ctx.fillStyle = color;
          this.ctx.lineCap = 'butt';
          this.ctx.lineJoin = 'bevel';
          this.ctx.beginPath();
          c = getCoord(module.hp); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.fp); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.ep); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.an); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.dp); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.gp); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.beginPath();
          c = getCoord(module.hp); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.gp); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.ip); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.hp); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill()
        }, (module.fp).z);
        draw(() => {
          this.ctx.fillStyle = color;
          this.ctx.lineCap = 'butt';
          this.ctx.lineJoin = 'bevel';
          this.ctx.beginPath();
          c = getCoord(module.gn); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.dn); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.ap); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.en); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.fn); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.hn); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.beginPath();
          c = getCoord(module.gn); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.in); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.hn); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.gn); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
        }, (module.fn).z);
        draw(() => {
          this.ctx.fillStyle = color;
          this.ctx.lineCap = 'butt';
          this.ctx.lineJoin = 'bevel';
          this.ctx.beginPath();
          c = getCoord(module.ip); this.ctx.moveTo(c.x, c.y);
          c = getCoord(module.jp); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.hp); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
        }, (module.kp).z);
        draw(() => {
          this.ctx.fillStyle = color;
          this.ctx.lineCap = 'butt';
          this.ctx.lineJoin = 'bevel';
          this.ctx.beginPath();
          c = getCoord(module.jn); this.ctx.moveTo(c.x, c.y);
          c = getCoord(module.in); this.ctx.lineTo(c.x, c.y);
          c = getCoord(module.hn); this.ctx.lineTo(c.x, c.y);
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();
        }, (module.kn).z);
      }
    }
    for (const action of list) {
      action.action();
    }
    // if (gifMode) {
    //   return ctx;
    // }
  }

  updateSolid(solidName: string) {
    this.solid.updateSolidName(solidName)
  }

  pause() {
    this.state.play = false;
  }
  play() {
    this.state.play = true;
    this.state.frameInterval = setInterval(() => {
      if (this.state.mouse.downed) {
        this.state.mouse.position.x *= 1;
        this.state.mouse.position.y *= 1;
      } else {
        this.state.mouse.position.x += this.state.rotation.x;
        this.state.mouse.position.y += this.state.rotation.y;
      }
      
      if (this.state.firstFrame) {
        this.state.firstFrame = false;
        this.solid = this.rotation.rotatePoints(this.solid, new Coordinate());//Math.random()*720, y:Math.random()*720});
      } else {
        this.solid = this.rotation.rotatePoints(this.solid, this.state.mouse.position, this.state.mouse.downed);
      }

      this.generateCanvas();
      if (!this.state.play) {
        clearInterval(this.state.frameInterval);
      }
    }, this.second / this.state.fps);
  }

  setDirection(direction: number, speed: number){
    
    this.state.rotation = new Coordinate(Math.cos((direction-90) * Math.PI / 180)*speed, Math.sin((direction-90) * Math.PI / 180)*speed)

  }

}
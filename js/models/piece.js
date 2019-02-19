import DataBus from '../databus'
import Bezier from '../libs/bezier'

const PIECE_WRAPPER_SRC = 'images/wrap.png'
const PIECE_WRAPPER_WIDTH = 300
const PIECE_WRAPPER_HEIGHT = 300

const ANI_SPEED=0.2
let databus=new DataBus()
let easeOut=Bezier(0.42,0,0.58,1)

function getPositionXY(position){
  let width=databus.contentWidth/databus.stage
  let result={}
  result.x=databus.contentPadding + (position % databus.stage) * width
  result.y=databus.contentPaddingTop+Math.floor(position/databus.stage)*width
  return result
}
export default class Piece{
  constructor(index = 0,position = 0){
    this.index=index
    this.position=position
    this.visible=true

    let cut =databus.puzzleImg.width/databus.stage
    let width=databus.contentWidth/databus.stage

    this.img=new Image()
    this.img.src=databus.puzzleImg.src
    this.sx=(index % databus.stage) *cut
    this.sy=Math.floor(index / databus.stage) *cut
    this.swidth=cut
    this.sheight=cut

    let positionXY=getPositionXY(position)
    this.x=positionXY.x
    this.y=positionXY.y
    this.width=width
    this.height=width
    
    this.oldX=positionXY.x
    this.oldY=positionXY.y
    this.newX=positionXY.x
    this.newY=positionXY.y
    this.ani=1

    this.wrapperImg=new Image()
    this.wrapperImg.src=PIECE_WRAPPER_SRC
  }
  move(position=0){
    this.ani=0
    this.position=position
    let positionXY=getPositionXY(position)
    this.newX=positionXY.x
    this.newY=positionXY.y
    this.oldX=this.x
    this.oldY=this.y
  }
  update(){
    if(this.ani>=1){
      this.ani =1
      this.x=this.newX
      this.y=this.newY
      return
    }
    this.ani+=ANI_SPEED
    this.x=this.oldX+(this.newX-this.oldX)*easeOut(this.ani)
    this.y=this.oldY+(this.newY-this.oldY)*easeOut(this.ani)
  }
  render(ctx){
    if(!this.visible)
    return
    ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      this.swidth,
      this.sheight,
      this.x,
      this.y,
      this.width,
      this.height
    )

    ctx.drawImage(
      this.wrapperImg,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
 import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';
import blank  from './images/blank.png';
import blue from './images/blue-candy.png';
import green from './images/green-candy.png';
import orange from './images/orange-candy.png';
import purple from './images/purple-candy.png';
import red from './images/red-candy.png';
import yello from './images/yellow-candy.png';
import scoreboared from './component/scoreboared';

 

  const  width =6;
  const candycolor=[
    red,orange,blue,green
  ]

  const  App=()=> {
 const [Currentcolor, setCurrentcolor] = useState([])
const [Draggable, setDraggable] = useState(null)
const [ReplaceDrag, setReplaceDrag] = useState(null)
const [scoredisplay, setscoredisplay] = useState(0)

//Checking Colomns
const colomnthree =() =>{
  for(let i = 0; i <=22; i++){
    const Threemove =[i, i + width, i + width * 2]
    const decidecolors = Currentcolor[i]
    const isblanck =Currentcolor[i] === blank
    if(Threemove.every(squre=> Currentcolor[squre]===  decidecolors && !isblanck)){
      setscoredisplay(()=>scoredisplay + 3)
      Threemove.forEach(squre=> Currentcolor[squre]=blank)
      return true
    }
  }
}
const colomnfour =() =>{
  for(let i = 0; i <=28; i++){
    const fourmove =[i, i + width, i + width * 2,i + width * 3]
    const decidecolors = Currentcolor[i]
    const isblanck =Currentcolor[i] === blank
    if(fourmove.every(squre=> Currentcolor[squre]===  decidecolors && !isblanck)){
      fourmove.forEach(squre=> Currentcolor[squre]=blank)
      return true
    }
  }
}
//Row of three
const  rowThree = ()=>{
  for(let i = 0; i < 36; i++){
  const ThreeCheck =[i,i + 1, i +2];
  const decidecolor = Currentcolor[i]
  const isblanck =Currentcolor[i] === blank
const invalid =[4,5,10,11,16,17,22,23,28,29,34,35]
if(invalid.includes(i))continue
if(ThreeCheck.every(squre=> Currentcolor[squre]===decidecolor && !isblanck)){
  ThreeCheck.forEach(squre => Currentcolor[squre]=blank)
  return true
}

}}

const   fourRaw= ()=>{
  for(let i = 0; i < 36; i++){
  const ThreeCheck =[i,i + 1, i +2 , i + 3];
  const decidecolor = Currentcolor[i]
  const isblanck =Currentcolor[i] === blank
const invalid =[4,5,10,11,16,17,22,23,28,29,34,35]
if(invalid.includes(i))continue
if(ThreeCheck.every(squre=> Currentcolor[squre]===decidecolor && !isblanck)){
  ThreeCheck.forEach(squre => Currentcolor[squre]=blank)
  return true
}

}}

 
 
//movedoen function 
const movedown =()=>{

  for(let i=0; i< 36 -width; i++){
    const firstRow =[0,1,2,3,4,5,6];
    const isrow= firstRow.includes(i);
    if(isrow && Currentcolor[i]===blank){
      const Randocolor=candycolor[Math.floor(Math.random() * candycolor.length)]
 Currentcolor[i] =Randocolor
  }
  if(Currentcolor[i + width]== blank){
    Currentcolor[i + width] =Currentcolor[i];
    Currentcolor[i]=blank
  }
  }
}




//Drag function
const onDragStart=(e)=>{
 setDraggable(e.target)
 console.log(Draggable)
}

const Drop =(e)=>{
  setReplaceDrag(e.target)
  console.log(ReplaceDrag)
}
const DragEnd=()=>{
  const ReplaceId = parseInt(ReplaceDrag.getAttribute('data-id'))
const DraggedId =parseInt(Draggable.getAttribute('data-id'))

  console.log(ReplaceId)
  console.log(DraggedId)

  Currentcolor[ReplaceId] =Draggable.getAttribute('src')
  Currentcolor[DraggedId] =ReplaceDrag.getAttribute('src')

  const Validmoves =[
     DraggedId - 1,
     DraggedId - width,
     DraggedId  + 1,
     DraggedId - width
  ]
  const  ValidMove = Validmoves.includes(ReplaceId)
  const isColomfour=colomnfour ()
         const  iscolomntre= colomnthree ()
         const isrothree= rowThree()
         const isRowfour = fourRaw()

         if(ReplaceId &&ValidMove &&  (isColomfour || iscolomntre ||isRowfour|| isrothree)){
          setDraggable(null),
          setReplaceDrag(null)
         } else {
          Currentcolor[ReplaceId]= ReplaceDrag.getAttribute('src')
          Currentcolor[DraggedId ]= Draggable.getAttribute('src')
         }
          
}
//function creating the board
    const Board=()=>{

      let Randomselection=[]

      for(let i =0; i < width * width ;i++){

const Randomcolor = candycolor[Math.floor(Math.random() * candycolor.length)]

Randomselection.push(Randomcolor)
setCurrentcolor(Randomselection);

      }
    }



    useEffect(()=>{
     
        Board()
    },[])

    useEffect(() => {
      const time= setInterval(()=>{
        colomnfour ()
        fourRaw()
        colomnthree ()
        rowThree()
        movedown()
    
      setCurrentcolor([...Currentcolor])
},100)
   
   return()=>clearInterval(time)
  }, [colomnthree,colomnfour ,movedown ,fourRaw  , rowThree,Currentcolor])

  return (
    <>
     <motion.div className="Board">

      <div className="InnerBoard">
          {Currentcolor.map((color,index)=>(

<img  src ={color}  alt={color} key={index} 
data-id={index}
draggable={true}
onDragStart={onDragStart}
onDragEnter={(e)=>e.preventDefault()}
onDragLeave={(e)=>e.preventDefault()}
onDragOver={(e)=>e.preventDefault()}
onDrop={Drop}
onDragEnd={DragEnd}/>
          ))} 
  
  </div>      
  <scoreboared  scores={scoredisplay}/>
      </motion.div> 
    
    </>
  )
}

export default App

 import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';

 

  const  width =6;
  const candycolor=[
    "red","orange","blue","green",
  ]

  const  App=()=> {
 const [Currentcolor, setCurrentcolor] = useState([])
const [Draggable, setDraggable] = useState(null)
const [ReplaceDrag, setReplaceDrag] = useState(null)


//Checking Colomns
const colomnthree =() =>{
  for(let i = 0; i <=22; i++){
    const Threemove =[i, i + width, i + width * 2]
    const decidecolors = Currentcolor[i]
//const isblannk =Currentcolor[i] = ''
    if(Threemove.every(squre=> Currentcolor[squre]===  decidecolors)){
      Threemove.forEach(squre=> Currentcolor[squre]='')
      return true
    }
  }
}
const colomnfour =() =>{
  for(let i = 0; i <=16; i++){
    const fourmove =[i, i + width, i + width * 2,i + width * 3]
    const decidecolors = Currentcolor[i]
//const isblannk =Currentcolor[i] = ''
    if(fourmove.every(squre=> Currentcolor[squre]===  decidecolors)){
      fourmove.forEach(squre=> Currentcolor[squre]='')
      return true
    }
  }
}
//Row of three
const  rowThree = ()=>{
  for(let i = 0; i < 36; i++){
  const ThreeCheck =[i,i + 1, i +2];
  const decidecolor = Currentcolor[i]
//const isblannk =Currentcolor[i] = ''
const invalid =[4,5,10,11,16,17,22,23,28,29,34,35]
if(invalid.includes(i))continue
if(ThreeCheck.every(squre=> Currentcolor[squre]===decidecolor)){
  ThreeCheck.forEach(squre => Currentcolor[squre]='')
  return true
}

}}

//Rowfour
const Rowfour = ()=>{
  const Fourmove =[i,i + 1, i +2,i+3];
  const decidedcolor = Currentcolor[i];

  //const isblannk =Currentcolor[i] = ''
 
  if(Fourmove.every(squre=>Currentcolor[squre]===decidedcolor)){
    Fourmove.forEach(squre=>Currentcolor[squre]='')
    return true
  }

}
//movedoen function 
const movedown =()=>{


  for(let i=0; i< 36 -width; i++){
    const firstRow =[0,1,2,3,4,5,6];
    const isrow= firstRow.includes(i);
    if(isrow && Currentcolor[i]===''){
      const Randocolor=candycolor[Math.floor(Math.random() * candycolor.length)]
 Currentcolor[i] =Randocolor
  }
  if(Currentcolor[i + width]== ''){
    Currentcolor[i + width] =Currentcolor[i];
    Currentcolor[i]=''
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

  Currentcolor[ReplaceId] =Draggable.style.backgroundColor;
  Currentcolor[DraggedId] =ReplaceDrag.style.backgroundColor;

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

         if(ReplaceId &&ValidMove &&  (isColomfour || iscolomntre || isrothree)){
          setDraggable(null),
          setReplaceDrag(null)
         } else {
          Currentcolor[ReplaceId]= ReplaceDrag.style.backgroundColor;
          Currentcolor[DraggedId ]= Draggable.style.backgroundColor
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
//Rowfour ()
        colomnthree ()
        rowThree()
        movedown()
    
      setCurrentcolor([...Currentcolor])
},100)
   
   return()=>clearInterval(time)
  }, [colomnthree,colomnfour ,movedown  , rowThree,Currentcolor])

  return (
    <>
     <motion.div className="Board">

      <div className="InnerBoard">
          {Currentcolor.map((color,index)=>(

<img alt="color" key={index} style={{backgroundColor:color}}
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
      </motion.div> 
    </>
  )
}

export default App

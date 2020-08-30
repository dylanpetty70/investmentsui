import React, { useCallback, useState, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import DraggableBox from './DraggableBox'
import update from 'immutability-helper'
import { connect } from 'react-redux';
import {handleUpdateNote} from '../../../actions/notes';

const styles = {
  width: '83vw',
  height: '100vh',
  border: '1px solid black',
  position: 'relative',
  left: '195px',
  margin: '5px',
  top: '55px'
}
function renderBox(item, key, updateBoxes, updateBoxes1) {
  return <DraggableBox key={key} id={key} updateBoxes={updateBoxes} updateBoxes1={updateBoxes1} {...item} />
}
const Container = (props) => {
    let current = [ props.notesOptions.current.campaign, props.notesOptions.current.notepad, props.notesOptions.current.subnotepad];
  const [boxes, setBoxes] = useState(props.boxes)
  const [items, setItems] = useState(props.items)

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )

  const updateBoxes = useMemo(() => {
          let tempItems = [];
          if(current[2] !== '' & Object.keys(props.notepads).length > 0){
              for(let i = 0; i < props.notepads[current[1]].length; i++){
                  if(props.notepads[current[1]][i].subnotepad === current[2]){
                    if(props.notepads[current[1]][i].notes){
                        tempItems = props.notepads[current[1]][i].notes;
			        }
	              }
              }
          }
        setItems(tempItems);
      let temp = {};
       if(items.length > 0){
        for(let i = 0; i < items.length; i++){
        temp[['id' + i]] = {id: 'id'+i, top: Number(items[i].pTop), left: Number(items[i].pLeft), object: items[i].object, size: items[i].size};
        }
        setBoxes(temp);
       } else {
           temp = {};  
           setBoxes(temp);
	   }
  }, [props.notepads, props.notesOptions.current.campaign, props.notesOptions.current.notepad, props.notesOptions.current.subnotepad]);

    const updateBoxes1 = () => {
         let tempItems = [];
          if(current[2] !== '' & Object.keys(props.notepads).length > 0){
              for(let i = 0; i < props.notepads[current[1]].length; i++){
                  if(props.notepads[current[1]][i].subnotepad === current[2]){
                    if(props.notepads[current[1]][i].notes){
                        tempItems = props.notepads[current[1]][i].notes;
			        }
	              }
              }
          }
        setItems(tempItems);
      let temp = {};
      if(items.length > 0){
        for(let i = 0; i < items.length; i++){
        temp[['id' + i]] = {id: 'id'+i, top: Number(items[i].pTop), left: Number(items[i].pLeft), object: items[i].object, size: items[i].size};
        }
        setBoxes(temp);
    } else {
        temp = {};  
        setBoxes(temp);
	}
  };

  const [, drop] = useDrop({
    accept: ['1','0','2','3','4','5','6','7'],
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      moveBox(item.id, left, top)
      let index = Number(item.id.replace('id', ''));
        items[index].pLeft = left;
        items[index].pTop = top;
        props.handleUpdateNote(props.notesOptions.current.campaign, props.notesOptions.current.notepad, props.notesOptions.current.subnotepad, items);
       updateBoxes1();
    },
  })

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => renderBox(boxes[key], key, updateBoxes, updateBoxes1))}
    </div>
  )
}


const mapStateToProps = state => {
	return{
        notepads: state.notepads,
        notesOptions: state.notesOptions
	}
}

export default connect(mapStateToProps, {handleUpdateNote})(Container);
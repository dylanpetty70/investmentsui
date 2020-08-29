import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import {MdDelete} from 'react-icons/md';
import {connect} from 'react-redux';
import {handleUpdateNote} from '../../../actions/notes';
import colors from './Colors';

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}
const DraggableBox = (props) => {
  const { id, left, top, object, size } = props
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: object, id, left, top, size, title: object, object: object },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  })
  let items = [];
  if(props.notesOptions.current.subnotepad !== '' & Object.keys(props.notepads).length > 0){
      for(let i = 0; i < props.notepads[props.notesOptions.current.notepad].length; i++){
          if(props.notepads[props.notesOptions.current.notepad][i].subnotepad === props.notesOptions.current.subnotepad){
            if(props.notepads[props.notesOptions.current.notepad][i].notes){
                items = props.notepads[props.notesOptions.current.notepad][i].notes;
			}
	      }
      }
  }
  if(items.length > 0){
        return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
          <div>
			<img src={'images/postit/'+colors[object]+'.png'}  style={{width: '98px', height: '98px', bottom: '0'}} alt='note'/>
			<img src={'images/postit/thumbtack.png'} style={{position: 'relative', width: '20px', height: '30px', left: '-60px', top: '-30px'}} alt="tack"/>
		</div>
	      {/*<MdDelete  onClick={() => {props.handleUpdateCurrent(props.envOptions.current, props.draggable.current.filter((x,i) => i !== Number(props.id.replace('id',''))))}}/>
        */}</div>
      )
  } else {
        return(
      <div>
      </div>
      )
  }

}


const mapStateToProps = state => ({
    notepads: state.notepads,
    notesOptions: state.notesOptions
});

export default connect(mapStateToProps,{handleUpdateNote})(DraggableBox)
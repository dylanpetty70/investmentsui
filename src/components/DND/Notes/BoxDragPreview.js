import React, { memo } from 'react';
import { connect } from 'react-redux';
import colors from './Colors';

const BoxDragPreview = memo((props) => {
  return (
        <div style={{display: 'inline-block', transform: 'rotate(-7deg)', WebkitTransform: 'rotate(-7deg)', opacity: '.5', position: 'absolute'}}>
			<img src={'/images/postit/'+colors[props.title]+'.png'}  style={{width: '98px', height: '98px', bottom: '0'}} alt='note'/>
			<img src={'/images/postit/thumbtack.png'} style={{position: 'relative', width: '20px', height: '30px', left: '-60px', top: '-30px'}} alt="tack"/>
		</div>
  )
})

const mapStateToProps = state => {
	return{
        
	}
}

export default connect(mapStateToProps)(BoxDragPreview);
import React from 'react';
import './Boxes.css';
import PropTypes from 'prop-types'

const Box = props => {
    return (
        <div className='boxes-block__box' onClick={()=>props.clickBox(props.xPoint,props.yPoint)}>
            <div className={props.element? "animation" :"none"}>{props.element}</div>
        </div>
    )
};



Box.propTypes ={
    xPoint:PropTypes.number.isRequired,
    yPoint:PropTypes.number.isRequired,
    clickBox:PropTypes.func.isRequired
};

export default Box
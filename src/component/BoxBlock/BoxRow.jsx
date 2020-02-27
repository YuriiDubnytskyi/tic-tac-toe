import React from 'react';
import './Boxes.css';
import PropTypes from 'prop-types'
import Box from "./Box"

const BoxRow = props => {
    return (
        <div>
            <div className='boxes-block__row'>
                {props.array.map((element,index)=> <Box element={element} xPoint={props.rowIndex} yPoint={index} key={index} clickBox={props.clickBox}/>)}
            </div>
        </div>
    )
};

BoxRow.propTypes ={
    array:PropTypes.array.isRequired,
    clickBox:PropTypes.func.isRequired
};

export default BoxRow
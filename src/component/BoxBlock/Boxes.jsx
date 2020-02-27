import React from 'react';
import './Boxes.css';
import PropTypes from 'prop-types'
import BoxRow from './BoxRow'

const Boxes = props => {
    return (
        <div>
            <div className='boxes-block'>
                {props.game.map((element,index) => <BoxRow array={element} rowIndex={index} key={index} clickBox={props.clickBox}/>)}
            </div>
        </div>
    )
};

Boxes.propTypes ={
    game:PropTypes.array.isRequired,
    clickBox:PropTypes.func.isRequired
};

export default Boxes
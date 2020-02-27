import React from 'react';
import './Header.css';
import PropTypes from 'prop-types'

const Header =(props) => {
    return (
        <div>
            <header className="header-title">Tic - Tac - Toe</header>
                <button className="choice" onClick={props.gameX} disabled={props.disable}>X</button>
                <button className="choice" onClick={props.gameO} disabled={props.disable}>O</button>
                <br/>
                <button className="start"
                        onClick={props.startRetryGame}>{props.retry ? "Retry" : "Start"}</button>
                <section className="box-info">
                    <div className="user">
                        <p>User</p>
                        <div>
                            <p>Win - {props.win}</p>
                            <p>Lose - {props.lose}</p>
                            <p>Draw - {props.draw}</p>
                        </div>
                    </div>
                    <div className="comp">
                        <p>Comp</p>
                        <div>
                            <p>Win - {props.lose}</p>
                            <p>Lose - {props.win}</p>
                            <p>Draw - {props.draw}</p>
                        </div>
                    </div>
                </section>
                <section className="text-finish" id="finish">
                    <div>{props.winName}</div>
                </section>
        </div>
    )
};

Header.propTypes ={
    gameX:PropTypes.func,
    gameO:PropTypes.func,
    disable:PropTypes.bool,
    startRetryGame:PropTypes.func,
    win:PropTypes.number,
    lose:PropTypes.number,
    draw:PropTypes.number,
    winName:PropTypes.string
};

export default Header
import React ,{Component}from 'react';
import './App.css';
import Header from './component/Header/Header'
import Boxes from './component/BoxBlock/Boxes'
import {checkWinPlayer,lines,getBotStepPoints} from './component/functions'

class  App extends Component{
    constructor(props){
        super(props);
        this.state = {
            game: [
                [false,false,false],
                [false,false,false],
                [false,false,false]
            ],
            userPoint: [],
            compPoint: [],
            win: 0,
            lose: 0,
            draw: 0,
            user: null,
            comp: null,
            retry: false,
            disable: true,
            winName: null
        };
    }

    firstBotStep = () => {
        const {game, userPoint, compPoint, comp} = this.state;
        let points = getBotStepPoints(game, userPoint, compPoint);
        this.showAndSetPoints(points.x, points.y, comp)
    };

    gameX = () => {
        this.setState({
            user: "x",
            comp: "o",
            retry: true,
            disable: true
        })
    };

    gameO = () => {
        this.setState({
            user: "o",
            comp: "x",
            retry: true,
            disable: true
        },
            () => this.firstBotStep()
        )
    };

    startRetryGame = () => {
        this.setState({
            user: null,
            comp: null,
            retry: true,
            game: [
                [false,false,false],
                [false,false,false],
                [false,false,false]
            ],
            userPoint: [],
            compPoint: [],
            disable: false,
            winName: null
        });
    };

    showAndSetPoints = (x, y, opponent, variant) => {
        const {game, userPoint, compPoint} = this.state;
        game[x][y] = opponent;
        if(variant === 'first') {
            userPoint.push([x, y]);
            this.setState({
                game: game,
                userPoint: userPoint
            });
        }else{
            compPoint.push([x, y]);
            this.setState({
                game: game,
                compPoint: compPoint
            });
        }
    };

    winSetState = (nameChange,nameWin) => {
        this.setState({
            [nameChange]: this.state[nameChange] + 1,
            user: null,
            winName: nameWin
        })
    };

    showWin = (whoWin) => {
        if(whoWin === "Draw"){
            this.winSetState("draw","Draw");
        }else if(whoWin === "User"){
            this.winSetState("win","User");
        }else if(whoWin === "Comp"){
            this.winSetState("lose","Computer");
        }
        return true
    };

    clickBox = (x,y) => {
        const {game, userPoint, compPoint, user, comp} = this.state;
        if(!game[x][y] && user) {
            this.showAndSetPoints(x, y, user, "first");
            let points =getBotStepPoints(game, userPoint, compPoint);
            if(points !== undefined) {
                this.showAndSetPoints(points.x, points.y, comp);
            }
            if(userPoint.length+compPoint.length >= 5) {
                for(const element of lines){
                    let showWinPlayer=checkWinPlayer(element,userPoint,compPoint);
                    if(showWinPlayer){
                        this.showWin(showWinPlayer);
                        return
                    }
                }
            }
            if(userPoint.length+compPoint.length === 9){
                this.showWin("Draw");
            }
        }
    };

    render(){
        const {win, lose, draw, retry, disable, winName, game} = this.state;
        return (
            <div className="App">
                <Header gameX={this.gameX}
                        gameO={this.gameO}
                        startRetryGame={this.startRetryGame}
                        win={win}
                        lose={lose}
                        draw={draw}
                        retry={retry}
                        disable={disable}
                        winName={winName}
                />
                <Boxes clickBox={this.clickBox}
                       game={game}
                />
            </div>
        );
    }
}

export default App;
const lines = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
];
const getBotStepPoints = (game,userPoint,botPoint) =>{
    if(userPoint.length === 1 || userPoint.length === 0){
        const points = firstPoint(game);
        return {x:points.x,y:points.y}
    }else{
        let didBotCanWin = botStartSearchPoints(findPoints,game,botPoint);
        if(!!didBotCanWin){
            return {x: didBotCanWin.x, y: didBotCanWin.y}
        }
        let didUserCanWin = botStartSearchPoints(findPoints,game,userPoint);
        if(!!didUserCanWin) {
            return {x: didUserCanWin.x, y: didUserCanWin.y}
        }else{
            return botStartSearchPoints(getBotPoints,game,game)
        }
    }
};

const firstPoint = (arr) => {
    if(!arr[1][1]){
        return {x:1,y:1}
    }else if(!arr[0][2]){
        return {x:0,y:2}
    }else{
        return {x:2,y:2}
    }
};

const botStartSearchPoints = (nameFun,game, array) => {
    for(const element of lines){
        const check = nameFun(element, array, game);
        if (check.result === true) {
            return {x: check.x, y: check.y}
        }
    }
};


const findPoints = (arr1,arr2,arrGame) => {
    let answer,answerCheck = 0;
    arr2.forEach( el2 => arr1.filter( el1 => { if(arraysCompare(el2, el1)){ answerCheck++; if( answerCheck === 2 ){ answer = getBotPoints(arr1,arrGame); } } }) );
    if(answer!==undefined&&answer.length!==0&&answer.result) {
        return {x: answer.x, y: answer.y, result: true}
    }else{
        return {result:false}
    }
};

const arraysCompare = (arr1, arr2) => arr1.every((element,index) => element === arr2[index]);

const getBotPoints = (arr,arrGame) => {
    const answer = arr.filter(el=>{ if(!arrGame[el[0]][el[1]]){ return {x:el[0],y:el[1],result:true} } });
    if(answer.length!==0) {
        return {x: answer[0][0], y: answer[0][1], result: true}
    }else{
        return {result:false}
    }
}


const checkWinPlayer = (lines,userPoint,compPoint) => {
    if(lines.every((lineElement)=>userPoint.some((userElement)=>arraysCompare(userElement,lineElement))) ){
        return "User"
    }else if(lines.every((lineElement)=>compPoint.some((userElement)=>arraysCompare(userElement,lineElement)))){
        return "Comp"
    }else{
        return false
    }
};



export {checkWinPlayer,lines,getBotStepPoints}
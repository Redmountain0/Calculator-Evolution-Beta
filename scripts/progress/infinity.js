function calcInfinity() {
    if (game.t4toggle && !game.money.isFinite()) infinity();
}

function infinity() {
    game.t5resets = game.t5resets.add(1);
    game.infinityPoint = game.infinityPoint.add(D(5).add(6*3600*1000 / (new Date().getTime() - game.t5resetTime)).floor(0));
    game.t5resetTime = new Date().getTime();
    infinityReset();

    commandAppend(`Go Infinity (${ordNum(game.t5resets)})`, (30+game.t5resets.toNumber()*1)%360, 1);
}

function renderInfinity() {
    document.getElementById("ipDisplay").innerHTML = `You have ${dNotation(game.infinityPoint, 4, 0)} Infinity Point`;
}
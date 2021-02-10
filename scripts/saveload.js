(function(){
  savePoint = 'CalculatorEvolution2';
})();

tempGame = {
  gameSpeed: 1,
  lastRestoreSaved: 0,
  saveRestorePoint: 0,
  startTime: new Date().getTime(),
  number: D(0),
  rebootNum: D(0),
  base: D(2),
  digits: D(1),
  mDigits: D(6),
  tLast: new Date().getTime(),
  programActive: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  money: D(0),
  shopBought: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  researchPoint: D(0),
  researchSpeed: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  researchLevel: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  researchProgress: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  rebootTime: new Date().getTime(),
  t2toggle: 0,
  t2resets: D(0),
  optionToggle: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  achievements: [],
  durability: D(1),
  t3toggle: 0,
  t3resets: D(0),
  quantumLab: D(0),
  qubit: D(0),
  qubitProgress: D(0),
  quantumUpgradeBought: [],
  quantumUpgradePreset: {},
  quantumAutomateToggle: [1, 1, 1, 1, 1, 1],
  quantumTime: new Date().getTime(),
  t4toggle: 0,
  t4resets: D(0),
  singularityTime: new Date().getTime(),
  singularityMachineInventory: {},
  singularityGrid: {},
  singularityGridActivate: 0,
  singularityPower: D(0),
  wormholeChallengeDone: []
};
game = {};

function save(c=1) {
  if ((new Date().getTime())-game.lastRestoreSaved >= 1000*3600) {
    localStorage[`CalculatorEvolution2_restore${game.saveRestorePoint%24}`] = JSON.stringify(game);
    game.saveRestorePoint++;
    game.lastRestoreSaved = new Date().getTime();
  }
  localStorage[savePoint] = JSON.stringify(game);
  if (c) commandAppend('save', 70);
}
function load(c=1) {
  // type fix
  // Number -> Deciamal
  for (const i in tempGame) {
    if (tempGame[i] instanceof Decimal) {
      game[i] = D(tempGame[i]);
    } else {
      game[i] = tempGame[i];
    }
  }
  if (localStorage[savePoint] !== undefined) {
    tempLoad = JSON.parse(localStorage[savePoint]);
  } else {
    tempLoad = {};
  }
  for (const i in game) {
    if (tempLoad[i] !== undefined) {
      if (tempGame[i] instanceof Decimal) {
        game[i] = D(tempLoad[i]);
      } else {
        game[i] = tempLoad[i];
      }
    }
  }
  // singularityGrid
  for (var i in game.singularityGrid) {
    game.singularityGrid[i] = new SingularityMachine(game.singularityGrid[i]);
    game.singularityGrid[i].value = D(game.singularityGrid[i].value);
  }

  // fill save
  for (var i = 0, l = machineIdx.length; i < l; i++) if (typeof game.singularityMachineInventory == "undefined") game.singularityMachineInventory[machineIdx[i]] = {quantity: 0};

  // old version fix
  if (game.researchSpeed.length == 5) {
    for (var i = 0; i < 4; i++) {
      game.researchSpeed.push(0);
      game.researchLevel.push(0);
      game.researchProgress.push(0);
    }
  }
  if (game.t4resets.gte(1)) {
    var tempObj = game.singularityMachineInventory;
    if (tempObj.MoneyBoost.quantity == 0) tempObj.MoneyBoost.quantity = 1;
    if (tempObj.Incrementer.quantity == 0) tempObj.Incrementer.quantity = 1;
    if (tempObj.Output.quantity == 0) tempObj.Output.quantity = 1;
  }

  if (c) commandAppend('load', 70);
}
function hardReset() {
  for (const i in tempGame) {
    game[i] = tempGame[i];
  }
  save();
}

function exportGame() {
  copyText(btoa(JSON.stringify(game)));
  commandAppend('export game to clipboard');
}
function importGame() {
  var recSaveFile = atob(window.prompt("Import Savefile here", ""));
  try {
    game = JSON.parse(recSaveFile);
    save(0);
    load(0);
    commandAppend('import string to game');
  } catch (e) {
    commandAppend('invaild savefile!', -110, 1);
  }
}

import { gameMenu } from "./gameMainMenu.js";
import * as utils from "./gameUtils.js";
import { createBattleField } from "./gameBattleFieldCreator.js";




const letsPlayBtn = document.querySelector( "#Lets-Play-Btn" );

letsPlayBtn.addEventListener( "click", () => {    
    utils.resetStatsAndContent();
    createBattleField();
    utils.toggleHiddenElement ( gameMenu );
})

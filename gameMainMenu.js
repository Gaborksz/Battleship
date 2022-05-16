
import * as utils from "./gameUtils.js";

export const gameMenu = document.querySelector( "#Game-Menu-Cover" );




const startGameBtn = document.querySelector( "#Start-Game-Btn" );

startGameBtn.addEventListener( "click", () => {
    utils.toggleHiddenElement ( gameMenu );   
});
import * as utils from "./gameUtils.js";
import { notificationDisplay } from "./gameLogic.js";


const okButton = document.querySelector("#OKButton");


okButton.addEventListener( "click", () => {
    utils.toggleHiddenElement ( notificationDisplay );
});

okButton.addEventListener( "click", () => {
    utils.resetStatsAndContent ();
});
import { shipFrontLocation, shipMiddleLocation, shipRearLocation, resetShipLocation } from "./gameShipLocationGenerator.js";
import { battleField } from "./gameBattleFieldCreator.js";
import { resetShotsAndHitsToZero, numberOfShotsDisplay, numberOfHitsDisplay, hitEvaluator } from "./gameLogic.js";




export function toggleHiddenElement (element) {
    element.classList.toggle( "hidden" );
}




export function contentUpdater ( element, value ) {
    element.innerHTML = value;
}



export function fieldBlockStatusChanger ( clickedBlockID, currentClass, newClass ) {    

    const fieldBlock = document.querySelector( `#${clickedBlockID}` );

    fieldBlock.classList.replace( currentClass, newClass );
}




export function randomNumberGeneratorBetweenMinAndMax ( min, max ) {
    
    return Math.floor( Math.random() * ( max - min )) + min;
}




export function fieldBlockFormatter ( event ) {

    let clickedBlockID = event.target.id;    
    let clickedBlockNumber = Number(clickedBlockID.match( /\d/g ).join( "" ));

    const clickedBlock = document.querySelector( `#${clickedBlockID}` );

    switch ( clickedBlockNumber ) {

        case shipFrontLocation:
            clickedBlock.style.backgroundImage = "url('./Assets/Shipparts/Front2.PNG')";
            break;
            
        case shipMiddleLocation:
            clickedBlock.style.backgroundImage = "url('./Assets/Shipparts/Middle2.PNG')";
            break;
                
        case shipRearLocation:
            clickedBlock.style.backgroundImage = "url('./Assets/Shipparts/Rear2.PNG')";                     
            break;                        
    }   

    clickedBlock.style.backgroundSize = "cover";    
    clickedBlock.style.backgroundRepeat = "no-repeat";
    clickedBlock.style.backgroundPosition = "center";
}




export function removeEventListeners ( event ) {
    
    let clickedBlockID = event.target.id;
    let clickedBlock = document.querySelector( `#${clickedBlockID}` );

    clickedBlock.removeEventListener( "click", hitEvaluator );
    clickedBlock.removeEventListener( "click", fieldBlockFormatter );
    clickedBlock.removeEventListener( "click", removeEventListeners );
}



export function resetStatsAndContent () {    
   
    resetShipLocation();
    resetShotsAndHitsToZero()
    numberOfShotsDisplay.innerHTML = 0;
    numberOfHitsDisplay.innerHTML = 0;
    battleField.innerHTML = "";
}


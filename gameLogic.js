import { shipFrontLocation, shipMiddleLocation, shipRearLocation } from "./gameShipLocationGenerator.js";
import * as utils from "./gameUtils.js";
export { notificationDisplay, resetShotsAndHitsToZero, numberOfShotsDisplay, numberOfHitsDisplay, hitEvaluator };


const numberOfShotsDisplay = document.querySelector( "#numberOfShotsDisplay" );
const numberOfHitsDisplay = document.querySelector( "#numberOfHitsDisplay" );
const notificationDisplay = document.querySelector( "#Notification-Display-Cover" );
const notificationContent = document.querySelector( "#Notification-Content" );


let numberOfShots = 0,
    numberOfHits = 0;




function hitEvaluator ( event ) { 
    
    let clickedBlockID = event.target.id;    
    let clickedBlockNumber = Number(clickedBlockID.match( /\d/g ).join( "" ));

    switch ( clickedBlockNumber ) {

        case shipFrontLocation:                
        case shipMiddleLocation:
        case shipRearLocation:
                increaseNumberOfShots();
                increaseNumberOfHits();
                displayNotification();                                                
            break;

        default:
            increaseNumberOfShots();
            utils.fieldBlockStatusChanger( clickedBlockID, "unShot", "shot" )               
    }   
}




function displayNotification () {
    
    if ( numberOfHits == 3 ) {
        utils.contentUpdater( notificationContent, "You have won!" ); 
        utils.toggleHiddenElement( notificationDisplay );
    } 
}





function increaseNumberOfShots () {    
    numberOfShots++;
    utils.contentUpdater( numberOfShotsDisplay, numberOfShots );
}


function increaseNumberOfHits () {    
    numberOfHits++;
    utils.contentUpdater( numberOfHitsDisplay, numberOfHits );
}


function resetShotsAndHitsToZero () {
    numberOfShots = 0,
    numberOfHits = 0;
}
    



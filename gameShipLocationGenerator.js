import * as utils from "./gameUtils.js";
export { shipFrontLocation, shipMiddleLocation, shipRearLocation, shipLocationGenerator, resetShipLocation }

let shipFrontLocation = 0,
    shipMiddleLocation = 0,
    shipRearLocation = 0;



function shipLocationGenerator ( gridSize ) {   

    let gridSquare = gridSize * gridSize;

    shipMiddleLocationGenertor ( gridSize, gridSquare )
    shipFrontLocationAndRearLocationGenerator( gridSize, gridSquare )   
}



function shipMiddleLocationGenertor ( gridSize, gridSquare ) {    
    
    /* shipMiddleLocation generated between min: 2 and max: gridSquare - 1      
    Example: If shipMiddleLocation is 2, shipFrontLocation can be 1;  If shipMiddleLocation is gridSquare - 1 than square can be shipRearLocation */
    shipMiddleLocation = utils.randomNumberGeneratorBetweenMinAndMax ( 2, (gridSquare - 1 ))    
    
    // shipMiddleLocation cannot be at the end of the first row as it would have to be a curved ship
    if (shipMiddleLocation === gridSize) shipMiddleLocation -= 1

    // shipMiddleLocation cannot be at the beginning of the last row as it would have to be a curved ship
    if (shipMiddleLocation === gridSquare - gridSize + 1) shipMiddleLocation += 1   
}


function shipFrontLocationAndRearLocationGenerator ( gridSize, gridSquare ) {

    switch (true) {

        // if shipMiddleLocation is in the first row or in the last row then shipFrontLocation and shipRearLocation must be next to it.
        case ( shipMiddleLocation < gridSize || shipMiddleLocation > gridSquare - gridSize) : 
            shipFrontLocation = shipMiddleLocation - 1;
            shipRearLocation = shipMiddleLocation + 1 
            break;

        // if shipMiddleLocation % gridSize === 0 ||  ( shipMiddleLocation - 1 ) % gridSize === 0 than shipFrontLocation and shipRearLocation must be above/under it
        case ( shipMiddleLocation % gridSize === 0 || (shipMiddleLocation - 1) % gridSize === 0) :
            shipFrontLocation = shipMiddleLocation - gridSize;
            shipRearLocation = shipMiddleLocation + gridSize;
            break;         
  
        
        // Generate shipfrontLoshipFrontLocation between shipMiddleLocation - (gridSize + 1) and shipMiddleLocation - (gridSize - 1)
        default:            
            let shipFrontLocationMin = shipMiddleLocation - gridSize - 1;
            let shipFrontLocationMax = shipMiddleLocation - gridSize + 2;
        
            shipFrontLocation = utils.randomNumberGeneratorBetweenMinAndMax( shipFrontLocationMin, shipFrontLocationMax )    
        
            // ShipRearlshipRearLocation calculation  If shipMiddleLocation - gridSize > shipFrontLocation then shipRearLocation must be shipMiddleLocation + 1 
            if (( shipMiddleLocation - gridSize ) == shipFrontLocation ) shipRearLocation = shipMiddleLocation + gridSize;
            if (( shipMiddleLocation - gridSize ) > shipFrontLocation ) shipRearLocation = shipMiddleLocation + gridSize + 1;
            if (( shipMiddleLocation - gridSize ) < shipFrontLocation ) shipRearLocation = shipMiddleLocation + gridSize - 1;
    }
}


function resetShipLocation () {
    
    shipFrontLocation = 0,
    shipMiddleLocation = 0,
    shipRearLocation = 0;
}


const startGameBtn = document.querySelector( "#Start-Game-Btn" );
const letsPlayBtn = document.querySelector( "#Lets-Play-Btn" );

const battleField = document.querySelector( "#Battlefield" );
const hiddenMenu = document.querySelector( "#Game-Menu-Cover" );

const numberOfShotsDisplay = document.querySelector( "#numberOfShotsDisplay" );
const numberOfHitsDisplay = document.querySelector( "#numberOfHitsDisplay" );

const gridSizeInput = document.querySelector( "#gridSizeInput" );


let numberOfShots = 0,
    numberOfHits = 0,
    shipFront = 0,
    shipMiddle = 0,
    shipRear = 0;






letsPlayBtn.addEventListener( "click", createBattleField )

function createBattleField () {    
    
    let gridSize = Number(gridSizeInput.value);
    
    createBattleFieldRows( gridSize );
    formatBattlefield( gridSize );        
    toggleHiddenMenu();
    shipLocationGenerator( gridSize );
}


function createBattleFieldRows ( gridSize ) {
    
    let idCount = 1
    
    for (let i = 1; i <= gridSize; i++) {
        idCount = createBattleFieldRowBlocks ( gridSize, idCount )
    }   
}


function createBattleFieldRowBlocks ( gridSize, idCount ) {
       
    for (let i = 1; i <= gridSize; i++) {
        
        let fieldBlock = document.createElement( "div" );
        fieldBlock.setAttribute( "class", "field unShot" );
        fieldBlock.setAttribute( "id", "field" + idCount );
        fieldBlock.innerHTML = idCount;

        addBattleFieldBlockEventListeners ( fieldBlock )
        
        battleField.appendChild( fieldBlock );
        
        idCount++
    }
    return idCount
}


function addBattleFieldBlockEventListeners ( fieldBlock ) {
    
    fieldBlock.addEventListener( "click", increaseNumberOfShots );
    fieldBlock.addEventListener( "click", shotClassStatusChanger );
    fieldBlock.addEventListener( "click", compareShotWithShipPosition );
    fieldBlock.addEventListener( "click", removeBattleFieldBlockEventListeners );
}



function formatBattlefield ( gridSize ) {
    battleField.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}


function increaseNumberOfShots () {    
    numberOfShots++;
    numberOfShotsDisplay.innerHTML = numberOfShots;
}


function shotClassStatusChanger ( event ) {
    let clickedBlockID = event.target.id;
    let clickedBlock = document.querySelector( `#${clickedBlockID}` );
    
    clickedBlock.classList.replace( "unShot", "shot" );
}


function removeBattleFieldBlockEventListeners ( event ) {
    let clickedBlockID = event.target.id;
    let clickedBlock = document.querySelector( `#${clickedBlockID}` );
    
    clickedBlock.removeEventListener( "click", removeBattleFieldBlockEventListeners );
    clickedBlock.removeEventListener( "click", shotClassStatusChanger );
    clickedBlock.removeEventListener( "click", increaseNumberOfShots );
    clickedBlock.removeEventListener( "click", compareShotWithShipPosition );
}








startGameBtn.addEventListener( "click", toggleHiddenMenu );
startGameBtn.addEventListener( "click", resetStatsAndContent );


function toggleHiddenMenu () {
    hiddenMenu.classList.toggle( "hidden" );
}


function resetStatsAndContent () {
    battleField.innerHTML = "";
    
    numberOfShots = 0;
    numberOfShotsDisplay.innerHTML = numberOfShots;

    numberOfHits = 0;
    numberOfHitsDisplay.innerHTML = numberOfHits;
    
    shipFront = 0;
    shipMiddle = 0;
    shipRear = 0;
}







function randomNumberGeneratorBetweenMinAndMax ( min, max ) {
    
    return Math.floor( Math.random() * ( max - min )) + min    
}




function shipLocationGenerator ( gridSize ) {
    
    let gridSquare = gridSize * gridSize;

    shipCentreLocationGenertor ( gridSize, gridSquare )
    shipFrontAndRearLocationGenerator( gridSize, gridSquare )   
}



function shipCentreLocationGenertor ( gridSize, gridSquare ) {    
    
    /* shipMiddle generated between min: 2 and max: gridSquare - 1      
    Example: If shipMiddle is 2, shipFront can be 1;  If shipMiddle is gridSquare - 1 than square can be shipRear */
    shipMiddle = randomNumberGeneratorBetweenMinAndMax ( 2, (gridSquare - 1 ))    
    
    // shipMiddle cannot be at the end of the first row as it would have to be a curved ship
    if (shipMiddle === gridSize) shipMiddle -= 1

    // shipMiddle cannot be at the beginning of the last row as it would have to be a curved ship
    if (shipMiddle === gridSquare - gridSize + 1) shipMiddle += 1

    
}


function shipFrontAndRearLocationGenerator ( gridSize, gridSquare ) {

    switch (true) {

        // if shipMiddle is in the first row or in the last row then shipFront and shipRear must be next to it.
        case ( shipMiddle < gridSize || shipMiddle > gridSquare - gridSize) : 
            shipFront = shipMiddle - 1;
            shipRear = shipMiddle + 1 
            break;

        // if shipMiddle % gridSize === 0 ||  ( shipMiddle - 1 ) % gridSize === 0 than shipFront and shipRear must be above/under it
        case ( shipMiddle % gridSize === 0 || (shipMiddle - 1) % gridSize === 0) :
            shipFront = shipMiddle - gridSize;
            shipRear = shipMiddle + gridSize;
            break;         
  
        
        // Generate shipfront between shipMiddle - (gridSize + 1) and shipMiddle - (gridSize - 1)
        default:            
            let shipFrontMin = shipMiddle - gridSize - 1;
            let shipFrontMax = shipMiddle - gridSize + 2;
        
            shipFront = randomNumberGeneratorBetweenMinAndMax( shipFrontMin, shipFrontMax )    
        
            // ShipRear calculation  If shipMiddle - gridSize > shipFront then shipRear must be shipMiddle + 1 
            if (( shipMiddle - gridSize ) == shipFront ) shipRear = shipMiddle + gridSize;
            if (( shipMiddle - gridSize ) > shipFront ) shipRear = shipMiddle + gridSize + 1;
            if (( shipMiddle - gridSize ) < shipFront ) shipRear = shipMiddle + gridSize - 1;
    }
}







function compareShotWithShipPosition ( event ) {
    let clickedBlockID = event.target.id;
    
    let id = Number(clickedBlockID.match(/\d/g).join("")); 

    if ( id == shipFront || id == shipMiddle || id == shipRear ) {
        numberOfHits ++;
        numberOfHitsDisplay.innerHTML = numberOfHits;        
    }
}


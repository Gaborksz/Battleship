import * as gameLogic from "./gameLogic.js";
import * as utils from "./gameUtils.js";
import { shipLocationGenerator } from "./gameShipLocationGenerator.js";


export { battleField, gridSize, createBattleField }


const battleField = document.querySelector( "#Battlefield" );

const gridSizeInput = document.querySelector( "#gridSizeInput" );
let gridSize



function createBattleField () {    
    
    gridSize = Number(gridSizeInput.value);
    
    createBattlefieldColumns();        
    createBattleFieldRows();
    shipLocationGenerator( gridSize );
}




function createBattlefieldColumns () {
    battleField.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}




function createBattleFieldRows () {
    
    let idCount = 1
    
    for (let i = 1; i <= gridSize; i++) {
        idCount = createBattleFieldRowBlocks ( idCount )
    }   
}




function createBattleFieldRowBlocks ( idCount ) {
       
    for (let i = 1; i <= gridSize; i++) {
        
        let fieldBlock = document.createElement( "div" );
        fieldBlock.setAttribute( "class", "field unShot" );
        fieldBlock.setAttribute( "id", "field" + idCount );
        fieldBlock.innerHTML = idCount;
      
        addEventListeners( fieldBlock );
        
        battleField.appendChild( fieldBlock );
        
        idCount++
    }
    return idCount
}


function addEventListeners ( fieldBlock ) {    

    fieldBlock.addEventListener( "click", gameLogic.hitEvaluator );
    fieldBlock.addEventListener( "click", utils.fieldBlockFormatter );
    fieldBlock.addEventListener( "click", utils.removeEventListeners );    
}

// can just trim the snake array to snake length each time it moves to keep it from leaving a trail


var snakeHead = [3,3];

var snake = [[7,7]] //row, col




var scriptProperties = PropertiesService.getScriptProperties();

scriptProperties.setProperties({
  'snake' : JSON.stringify(snake)
});


    var snake = JSON.parse(scriptProperties.getProperty('snake'));
    var snakeLength = JSON.parse(scriptProperties.getProperty('snakeLength'));

function onOpen(){
  
scriptProperties.setProperties({
  'snakeLength' : 1
});
  
  scriptProperties.setProperties({
  'snakeCells' : JSON.stringify(snake)
});
  
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("GameBoard").setBackground("white");
  SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("red");
  
  Logger.log("end of onOpen");


}

function onEdit(e){
  
  snakeCells = JSON.parse(scriptProperties.getProperty('snakeCells'));
  snakeLength = scriptProperties.getProperty('snakeLength');
 // Browser.msgBox("just retreived snakeLength and it is " + snakeLength);
  
  var sheet = SpreadsheetApp.getActiveSheet();
  
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
  var direction = [0,0];
  
    switch(e.value) {
    case "w":
        //Browser.msgBox("up");
        direction = [-1,0];
        break;
    case "s":
        //Browser.msgBox("down");
        direction = [1,0];
        break;
    case "a":
        //Browser.msgBox("left");
        direction = [0,-1];
        break;      
    case "d":
        //Browser.msgBox("right");
        direction = [0,1];
        break;
    default:
        //Browser.msgBox("nope");
    }
        
  snakeMove(direction, snakeLength, headRow, headCol);
  
  //// Increase snake length by 1      -- eventually needs to be dependent on something other than moving
  snakeLength++;
  scriptProperties.setProperties({
  'snakeLength' : snakeLength
});
  
  //// Add new cell to the snake's list of cells
  Browser.msgBox("headRow is " + headRow + " and headCol is " + headCol + ".");
  var test = [headRow, headCol];
  snakeCells = snakeCells.concat(test);
  
  
  Browser.msgBox("The snake is " + snakeLength + " cells long!        The snake is comprised of the following cells: " + snakeCells + ". Is that logical?");
  
}

function snakeMove(direction, snakeLength, headRow, headCol){

  //Browser.msgBox("Initialized headRow is " + headRow + " and headCol is " + headCol);
  
  // Calculate head position after movement
  headRow = headRow + direction[0];
  headCol = headCol + direction[1];
  Browser.msgBox("New headRow is " + headRow + " and headCol is " + headCol);
  
  // Set snake head position in the cells on the sheet
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").setValue(headRow);
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").setValue(headCol);
  
  // Color new head position
  SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("red");
  

  
  // Should probably deal with the snake's length here, but I'll get to that
             // Could go through the array of the snake's cells and for any with an array number longer than the snakeLength, turn the cell white. Then when it's gone through all, trim the array
  
  
  // Here's what I was using to color the bg white again (at the time I was resetting headRow and headCol last so they'd refer to the old one and this worked for a length 1 snake
  //        SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("white");
 
  return headRow;
  return headCol;
}


function moveUp2(snakeLength){
  
    Logger.log("Snake length is %s cells long and the snake info is %s", snakeLength, snake[1][0]);
  
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
      SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("white");
      SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").setValue(headRow-1);
      SpreadsheetApp.getActiveSheet().getRange(headRow-1, headCol).setBackground("red");
    snakeLength++;
 // Browser.msgBox("storing property snakeLength as " + snakeLength);
  scriptProperties.setProperty('snakeLength', snakeLength);
  
  return snakeLength;
}





// should move curser back to same cell after eachedit and reset cell
// also need to reset snake length and position on open
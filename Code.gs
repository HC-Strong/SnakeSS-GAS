// can just trim the snake array to snake length each time it moves to keep it from leaving a trail

var initPos = [[7,7]] //row, col



var scriptProperties = PropertiesService.getScriptProperties();

scriptProperties.setProperties({
  'snake' : JSON.stringify(initPos)
});


    var snake = JSON.parse(scriptProperties.getProperty('snake'));
    var snakeLength = JSON.parse(scriptProperties.getProperty('snakeLength'));

function onOpen(){
  
scriptProperties.setProperties({
  'snakeLength' : 1
});
  
scriptProperties.setProperties({
  'snakeCells' : JSON.stringify(initPos)
});
  
  
  //// Reset snake position
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("headRow").setValue(initPos[0][0]);
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("headCol").setValue(initPos[0][1]);

  //// Reset colors
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("GameBoard").setBackground("white");
  SpreadsheetApp.getActiveSheet().getRange(initPos[0][0], initPos[0][1]).setBackground("red");
  
  Logger.log("end of onOpen");


}

function onEdit(e){
  var curSheet = SpreadsheetApp.getActiveSheet();
  if(curSheet.getName() == "GameBoard" ){
    snakeCells = JSON.parse(scriptProperties.getProperty('snakeCells'));
                                                                                  Logger.log("At point 1 the cells in the snake are " + snakeCells);
    snakeLength = scriptProperties.getProperty('snakeLength');

    var curSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var headCell = [curSpreadsheet.getRangeByName("HeadRow").getValue(), curSpreadsheet.getRangeByName("HeadCol").getValue()];
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

    headCell = snakeMove(direction, snakeLength, headCell);

    //// Increase snake length by 1      -- eventually needs to be dependent on something other than moving
    if(snakeLength < 3) {            /// currently setting a short max length since it grows each move
      snakeLength++;
      scriptProperties.setProperties({
         'snakeLength' : snakeLength
      });
    }

    //// Add new cell to the snake's list of cells
    Logger.log("At point 2 the cells in the snake are " + snakeCells);
    var temp = [headCell];
    //Browser.msgBox(temp);
    snakeCells = temp.concat(snakeCells);
                                                                               //Browser.msgBox("The snake is " + snakeLength + " cells long!        The snake is comprised of the following cells: " + snakeCells + ". Is that logical?");
                                                                                 Logger.log("At point 3 the cells in the snake are " + snakeCells);
    if(snakeCells.length > snakeLength) {
                                                                                       Logger.log("Snake is being trimmed to length");
       snakeCells = trimSnake(snakeLength, snakeCells);
    } else {
                                                                                 Logger.log("Snake is not at max length. It's length is " + snakeLength); 
    }    
                                                                                 //Browser.msgBox("After a trim, the snake is " + snakeLength + " cells long!        The snake is comprised of the following cells: " + snakeCells + ". Is that logical?");
                                                                                 Logger.log("At point 6 the cells in the snake are " + snakeCells + " (a length of " + snakeCells.length + ") and snake length is " + snakeLength);
    
    //// Save new snake list of cells
    scriptProperties.setProperties({
       'snakeCells' : JSON.stringify(snakeCells)
    });
  } else {
    //Browser.msgBox("wrong sheet!");
  }
}


function snakeMove(direction, snakeLength, headCell)
{
  
  // Calculate head position after movement
  headCell[0] = headCell[0] + direction[0];
  headCell[1] = headCell[1] + direction[1];
  
  // Set snake head position in the cells on the sheet
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").setValue(headCell[0]);
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").setValue(headCell[1]);
  
  // Color new head position
  SpreadsheetApp.getActiveSheet().getRange(headCell[0], headCell[1]).setBackground("red");
  
  // Should probably deal with the snake's length here, but I'll get to that
             // Could go through the array of the snake's cells and for any with an array number longer than the snakeLength, turn the cell white. Then when it's gone through all, trim the array
  
  // Here's what I was using to color the bg white again (at the time I was resetting headRow and headCol last so they'd refer to the old one and this worked for a length 1 snake
  //        SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("white");
 
  return headCell;
}




function trimSnake(length, cells) {
                                                                                   Logger.log("At point 4 the cells in the snake are " + cells);

  var toErase = cells[(length*1)];
  var range = SpreadsheetApp.getActiveSheet().getRange(toErase[0], toErase[1]);

  range.setBackground("pink");
  
  cells.length = length;
                                                                                     Logger.log("At point 5 the cells in the snake are " + cells);

  return cells;
}




// should move curser back to same cell after eachedit and reset cell
// also need to reset snake length and position on open

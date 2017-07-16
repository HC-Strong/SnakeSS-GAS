// can just trim the snake array to snake length each time it moves to keep it from leaving a trail


var snakeHead = [3,3];
  var snakeLength = 1;

var snake = [[7,7], [8,7]] //row, col



var scriptProperties = PropertiesService.getScriptProperties();

scriptProperties.setProperties({
  'snake' : JSON.stringify(snake),
  'snakeLength' : 1
});


    var snake = JSON.parse(scriptProperties.getProperty('snake'));
  var snakeLength = JSON.parse(scriptProperties.getProperty('snakeLength'));

function onOpen(){
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("GameBoard").setBackground("white");
  SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("red");
  
  Logger.log("end of onOpen");


}

function onEdit(e){
  
    snake = JSON.parse(scriptProperties.getProperty('snake'));
  snakeLength = scriptProperties.getProperty('snakeLength');
  Browser.msgBox("just retreived snakeLength and it is " + snakeLength);
  
  var sheet = SpreadsheetApp.getActiveSheet();
  
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
 
  switch(e.value) {
    case "w":
        //Browser.msgBox("up");
      snakeLength = moveUp2(snakeLength);
        break;
    case "s":
        //Browser.msgBox("down");
      moveDown();
        break;
    case "a":
        //Browser.msgBox("left");
      moveLeft();
        break;      
    case "d":
        //Browser.msgBox("right");
      moveRight();
        break;
    default:
        //Browser.msgBox("nope");      
   }
   Browser.msgBox("The snake is " + snakeLength + " cells long!");
  
}

function moveUp2(snakeLength){

  


  
    Logger.log("Snake length is %s cells long and the snake info is %s", snakeLength, snake[1][0]);
  
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
      SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("white");
      SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").setValue(headRow-1);
      SpreadsheetApp.getActiveSheet().getRange(headRow-1, headCol).setBackground("red");
    snakeLength++;
  Browser.msgBox("storing property snakeLength as " + snakeLength);
  scriptProperties.setProperty('snakeLength', snakeLength);
  
  return snakeLength;
}





// should move curser back to same cell after eachedit and reset cell
// also need to reset snake length and position on open

function moveUp(){
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();            // this is a mess to have this repeated for all the cases, it was much better up by the switch (wher eit still is in case I go back)
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
      SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("white");                //!!!!!!!!!!!!!!!!needs to only be this if the snake is length 1, but that comes later, and should be a single function, not the same crap for each option
      SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").setValue(headRow-1);
      SpreadsheetApp.getActiveSheet().getRange(headRow-1, headCol).setBackground("red");
}

function moveDown(){
    var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
      SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("white");                //!!!!!!!!!!!!!!!!It'sreally sad how I'm essentially doing the same thing twice each time (adding/subtracting from HeadRow/Col)
      SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").setValue(headRow+1);
      SpreadsheetApp.getActiveSheet().getRange(headRow+1, headCol).setBackground("red");
}

function moveLeft(){
    var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
  SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("white");                    //!!!!!!!!!!!!I also had "sheet" instead of SpreadsheetApp.getActiveSheet here on the first and third rows when this was all in the switch, but it DNE in this context
      SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").setValue(headCol-1);
      SpreadsheetApp.getActiveSheet().getRange(headRow, headCol-1).setBackground("red");
}

function moveRight(){
    var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
      SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("white");
      SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").setValue(headCol+1);
      SpreadsheetApp.getActiveSheet().getRange(headRow, headCol+1).setBackground("red");
}

function myFunction() {
  Browser.msgBox(ScriptProperties.getProperty('0'));
}
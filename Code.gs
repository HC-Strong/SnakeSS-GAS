// Hello World!

function onOpen(){
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
  
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName("GameBoard").setBackground("white");
  SpreadsheetApp.getActiveSheet().getRange(headRow, headCol).setBackground("red");
  
  //var snakeHead = [3,3];
  //var snakeLength = 1;
}

function onEdit(e){
  
  var sheet = SpreadsheetApp.getActiveSheet();
  
  var headRow = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadRow").getValue();
  var headCol = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("HeadCol").getValue();
 
  switch(e.value) {
    case "w":
        //Browser.msgBox("up");
      moveUp();
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
   Browser.msgBox(snakeLength);
  
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

// woah sorry this is bad, everything in this script is bad, scrapping is bad, fuck da life
// nothing here is bulletproof the most minimal thing will make this unusable

"use strict";

function htmlTableToArray() {
  /* this function "converts" the table to a 2d array 
  (jagged arrays because no native support for 2d arrays)
  each position in the cells array contains an array that represents
  all the courses the workweek in a specified hour
  for example cells[0] -> contains all the courses scheduled at 1:30
              cells[1] -> contains all the courses scheduled at 2:00

  cells[0][0] -> contains the hour 1:30
  schdule[0][n] -> contains a course that its cellsd at 1:30 at day 1 (monday for example)
  cells[1][0] -> contains the hour 2:00
  cells[1][2] -> contains a course that its scheduled at 2:00 at day 2
  */
  console.log("Extracting data from table");

  var uselessTr = $("#id_divEncRep");
  var mainTable = uselessTr.parent();

  uselessTr.remove();

  var rows = $(mainTable).children();

  var cells = [];

  rows.each(function(index) {
    var currentRow = $(this);
    var currentRowIndex = index;
    var columnsInCurrentRow;

    cells[currentRowIndex] = []; // array inside an array #fun #inception #yolo #scary
    columnsInCurrentRow = $(this).children();

    columnsInCurrentRow.each(function(index) {
      var currentColumn = $(this);
      var currentColumnIndex = index;
      var cellContent = currentColumn.html();
      var cellInfo = {};
      cellInfo.yCoord = currentRowIndex;
      cellInfo.xCoord = currentColumnIndex;
      cellInfo.content = cellContent;
      cellInfo.times  = extractTimeFromString($(columnsInCurrentRow[0]).html());
      cells[currentRowIndex].push(cellInfo);
    });
  });

  return cells || null;
}

function getAllCoursesNames() {
  console.log("Extracting courses names");
  var rawScheduleData = $("td").filter("[align=left][valign=MIDDLE]");
  var coursesNamesList = [];
  var courses = [];

  rawScheduleData.each(function() {
    var str = $(this).html();
    coursesNamesList.push(str);
  });

  var coursesNamesListLen = coursesNamesList.length;

  for (i=0; i < coursesNamesListLen; i+=2) {
    var course = {};
    var courseShortName = coursesNamesList[i];
    var courseFullName = coursesNamesList[i+1];
    course.shortName = courseShortName;
    course.fullName = courseFullName;
    courses.push(course);
  }

  return courses;
}

function isPM(str) {
  var detectPMreg =  /(p\.m|pm)/g;
  return (detectPMreg.exec(str) != null) ? true : false;
}

function to24Hours(timeString) {
  // all the regexes here are somewhat hardcore i dont care, i plan to use them in another things
  // this thing just matches pm hours, it should return 4 groups 
  // first group complete match e.g 2:00 pm or 2:00pm
  // second group hours 2
  // third group minutes 00
  // and fourth group should be pm|am|p.m|a.m
  var reg = /([\d]{1,2}\s*?):\s*?([\d]{1,2})\s*(p\.m|pm|a\.m|am)/g;
  var res = reg.exec(timeString);
  var hour, minutes;
  
  if (res != null) {
    hour = res[1];
    minutes = res[2];
    if (res[1] < 12 && isPM(res[3])) {
      hour = parseInt(res[1]) + 12;
    }
    else if (res[1] == 12 && !isPM(res[3])){
      hour = 0;
    }
  }
  return hour + ":" + minutes;
}

function extractTimeFromString(str) {
  // if there is time in a string, return matches
  var res = str.match(/(([\d]{1,2}\s*?):\s*?([\d]{1,2}))\s*(p\.m|pm|a\.m|am)/g);
  return res;
}

function isLab(str) {
  var res = str.search("LB");
  return (res > -1) ? true : false; 
}

function isCourseScheduled(courseToSearch, strToInspect) {
  var res = strToInspect.search(escapeRegExp(courseToSearch));
  return (res > -1) ? true : false; 
}

function extractGroupAndClassroom(str) {
  var reg = /(?:<br>)(\d+)(?:<b>\s\/\s<\/b>)(\w+)/g
  var res = reg.exec(str); // returns match and capture groups
  var data = {};
  data.group = res[1]; 
  data.classroom = res[2];
  return data;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var courses = getAllCoursesNames();
var table = htmlTableToArray();
var totalCourses = courses.length;
var data = [];
var listOfCells = [];
var i, j;

var rows = table.length;
for (i=0; i<rows; i++) {
  var columns = table[i].length;
  for (j=0; j<columns; j++) {
    listOfCells.push(table[i][j]);
  }
}

// each cell object contains x and y coordinates, html data, and time

var listOfCellsLength = listOfCells.length;

console.log("Creating JSON OMG!!!11");
for(i=0; i<totalCourses; i++) {
  var currentCourse = courses[i];
  var entry  = {};
  entry.fullName = currentCourse.fullName;
  entry.shortName = currentCourse.shortName;
  entry.days = [];
  entry.frequency = 0;
  for(j=0; j<listOfCellsLength; j++) {
    var cellToInspect = listOfCells[j];

    if (isCourseScheduled(currentCourse.shortName, cellToInspect.content)) {
      var groupAndClassroom = extractGroupAndClassroom(cellToInspect.content);
      var day = {};
      day.weekdayNumber = cellToInspect.xCoord; // the x axis represents the day number
      day.turn = cellToInspect.yCoord + 1; // y axis represents the hour but it can also represent the order of the courses
                                           // i dont want to say turn 0 so increment 1
      day.group = groupAndClassroom.group;
      day.classroom = groupAndClassroom.classroom;
      day.startTime = to24Hours(cellToInspect.times[0]);
      day.endTime = to24Hours(cellToInspect.times[1]);
      entry.days.push(day);
      entry.frequency++;
    }
  }
  data.push(entry);
}

console.log("THAT WAS HARD BUT HER YOU GO");
var go = confirm("Stringify data and print?");
if (go) {
  document.write(JSON.stringify(data));
}

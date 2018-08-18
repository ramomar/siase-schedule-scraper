"use strict";

function printJSON(json) {
  if (confirm("Export data to JSON?")) {
      document.writeln(JSON.stringify(json, null, 2));
  } else {
    console.log(json);
  }
}

function isPM(str) {
  var detectPMreg =  /(p\.m|pm)/g;
  return (detectPMreg.exec(str) !== null) ? true:false;
}

function to24Hours(timeString) {
   // This thing only matches pm hours, it should return 4 groups
   // first group complete match e.g 2:00 pm or 2:00pm
   // second group hours 2
   // third group minutes 00
   // and fourth group should be pm|am|p.m|a.m
  var reg = /([\d]{1,2}\s*?):\s*?([\d]{1,2})\s*(p\.m|pm|a\.m|am)/g;
  var res = reg.exec(timeString);
  var hour, minutes, match;

  if (res !== null) {
    hour = parseInt(res[1], 10);
    minutes = res[2];
    match = res[3];
    if (hour < 12 && isPM(match)) {
      hour += 12;
    }
    else if (hour === 12 && !isPM(match)){
      hour = 0;
    }
  }
  return hour + ":" + minutes;
}

 // If there is time in a string, return matches
function extractTimeFromString(str) {
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
  var reg = /(?:<br>)(\d+)(?:<b>\s\/\s<\/b>)(\w+)/g;
  var res = reg.exec(str); // returns match and capture groups
  var data = {};
  data.group = res[1];
  data.classroom = res[2];
  return data;
}

// Timmy where did you get this nice function? Uhh... internet? All right. :p
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}

// SIASE uses a lots of frames,
// the schedule and all the relevant data is in a frame called "center"
var centerFrame = window.frames.center;

// With this function we return an array that contains all the cells
// of the html table.
function htmlTableToArray() {
  console.log("Extracting cells from table");

  // We use this <tr> to get the <table> element that contains the
  // schedule, we do it this way because there is no document id
  // associated
  var uselessTr = centerFrame.document.getElementById("id_divEncRep");

  // Now we have the table (actually we get a <tbody>)
  var schedule = uselessTr.parentNode;

  // The tr is garbage
  uselessTr.remove();

  // We'll use an array to store all the cells
  var cells = [];

  var rows = nodeListToArray(schedule.children);

  rows.forEach(function(currentRow, currentRowIndex) {
    var columnsInCurrentRow = nodeListToArray(currentRow.children);

    columnsInCurrentRow.forEach(function(currentColumn, currentColumnIndex) {
      cells.push(
        {
          x:     currentRowIndex,
          y:     currentColumnIndex,
          html:  currentColumn.innerHTML,
          times: extractTimeFromString(columnsInCurrentRow[0].innerHTML)
        }
      );
    });
  });
  return cells || null;
}

// This function returns an array of objects that contain the short name of
// the course and the long name.
function getCoursesNamesInSchedule() {
  console.log("Extracting the names of all the courses in the schedule");

  // We select the elements that contain the names of the courses
  var elems =
  centerFrame.document.querySelectorAll("[align=left][valign=MIDDLE]");

  var coursesNames = [];
  var courses = [];

  // With the selector we get a nodeList that contain the course names
  // and its abbreviations, we need to get the names from the innerHTML
  // of the elements
  nodeListToArray(elems).forEach(function(elem) {
    coursesNames.push(elem.innerHTML);
  });

  // We have an array of this form
  // ["CULING", "CULTURA INGLESA", "MATIII", "MATEMATICAS III"]
  // we need to create an object that contains both the short name
  // and the long name
  var coursesNamesLen = coursesNames.length;
  for (var i=0; i<coursesNamesLen; i+=2) {
    courses.push( {shortName: coursesNames[i], longName: coursesNames[i+1]} );
  }
  return courses || null;
}

// This script first extracts the names of all courses, next it extracts
// all the cells contained in the schedule table.
// Then we map each course with its corresponding cells.
// Remember, the schedule is a matrix and each cell of the matrix contains
// the short name of the course.
// Basically for each course we match a cell that contains its short name.
var courses = getCoursesNamesInSchedule();
var cells = htmlTableToArray();

var schedule = courses.map(function(currentCourse) {
  var c = {
    longName:  currentCourse.longName,
    shortName: currentCourse.shortName,
    sessions: [],
    frequency: 0
  };

  cells.forEach(function(currentCell) {
    if (isCourseScheduled(currentCourse.shortName, currentCell.html)) {
      var groupAndClassroom = extractGroupAndClassroom(currentCell.html);
      c.sessions.push(
        {
          weekday:   currentCell.y,
          turn:      currentCell.x + 1,
          group:     groupAndClassroom.group,
          classroom: groupAndClassroom.classroom,
          startTime: to24Hours(currentCell.times[0]),
          endTime:   to24Hours(currentCell.times[1])
        }
      );
     c.frequency++;
    }
  });
  return c;
});

printJSON(schedule);

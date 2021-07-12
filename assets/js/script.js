'use strict';

// Moment
var timeCurrent = parseInt(moment().format('H'));
var dateToday = moment().format('MMMM Do YYYY');

// Section: Header
var headerDate = document.querySelector('h2');

// Section: Main
var textArea = document.querySelectorAll('textarea');
var timeLabel = document.querySelectorAll('label');
var btnSave = document.querySelectorAll('button');

// # of Hours In A Workday
var workDayHours = 9;

// ----------------------------------------------------------------------
// HEADER DATE
// ----------------------------------------------------------------------

headerDate.innerHTML = dateToday;

// ----------------------------------------------------------------------
// LOOP TO CHANGE TEXT AREA BACKGROUND COLOR ACCORDING TO TIME OF DAY
// ----------------------------------------------------------------------

for (let i = 0; i < workDayHours; i++) {
  if (i + workDayHours === timeCurrent) {
    textArea[i].classList.add('present');
    timeLabel[i].classList.add('present-time');
  } else if (i + workDayHours < timeCurrent) {
    textArea[i].classList.add('past');
  } else {
    textArea[i].classList.add('future');
  }
}

// ----------------------------------------------------------------------
// LOOP TO SAVE TO LOCAL STORAGE
// ----------------------------------------------------------------------

for (let i = 0; i < workDayHours; i++) {
  btnSave[i].addEventListener('click', () => {
    localStorage.setItem(String(`${i + workDayHours}`), JSON.stringify(textArea[i].value));
  });
}

// ----------------------------------------------------------------------
// LOOP TO LOAD FROM LOCAL STORAGE
// ----------------------------------------------------------------------

for (let i = 0; i < workDayHours; i++) {
  // JSON.parse so that quotations arent retrieved when empty
  var retrieveNotes = JSON.parse(localStorage.getItem(String(`${i + workDayHours}`)));

  if (localStorage.getItem(String(`${i + workDayHours}`))) {
    textArea[i].append(retrieveNotes);
  }
}

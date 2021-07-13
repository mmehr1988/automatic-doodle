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

// Method #1: for Loop ----------------------------

// for (let i = 0; i < workDayHours; i++) {
//   if (i + workDayHours === timeCurrent) {
//     textArea[i].classList.add('present');
//     timeLabel[i].classList.add('present-time');
//   } else if (i + workDayHours < timeCurrent) {
//     textArea[i].classList.add('past');
//   } else {
//     textArea[i].classList.add('future');
//   }
// }

// Method #2: forEach Loop ----------------------------

// the '_' in the function is a throwaway variable
textArea.forEach(function (_, i, r) {
  if (i + workDayHours === timeCurrent) {
    textArea[i].classList.add('present');
    timeLabel[i].classList.add('present-time');
  } else if (i + workDayHours < timeCurrent) {
    textArea[i].classList.add('past');
  } else {
    textArea[i].classList.add('future');
  }
});

// ----------------------------------------------------------------------
// LOOP TO SAVE TO LOCAL STORAGE
// ----------------------------------------------------------------------

// Method #1: for Loop ----------------------------

for (let i = 0; i < workDayHours; i++) {
  btnSave[i].addEventListener('click', () => {
    localStorage.setItem(String(`${i + workDayHours}`), JSON.stringify(textArea[i].value));
  });
}

// Method #2: forEach Loop ----------------------------

// the '_' in the function is a throwaway variable
// btnSave.forEach(function (_, i, r) {
//   btnSave[i].addEventListener('click', () => {
//     localStorage.setItem(String(`${i}`), JSON.stringify(textArea[i].value));
//   });
// });

// ----------------------------------------------------------------------
// LOOP TO LOAD FROM LOCAL STORAGE
// ----------------------------------------------------------------------

// Method #1: for Loop ----------------------------

for (let i = 0; i < workDayHours; i++) {
  // JSON.parse so that quotations arent retrieved when empty
  var retrieveNotes = JSON.parse(localStorage.getItem(String(`${i + workDayHours}`)));

  if (localStorage.getItem(String(`${i + workDayHours}`))) {
    textArea[i].append(retrieveNotes);
  }
}

// Method #2: forEach Loop ----------------------------

// Object.keys(localStorage).forEach(function (savedNotes, i, r) {
//   textArea[i].append(JSON.parse(localStorage.getItem(savedNotes)));
// });

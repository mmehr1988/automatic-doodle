'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  var textArea = document.querySelectorAll('textarea');
  var timeLabel = document.querySelectorAll('label');
  var btnSave = document.querySelectorAll('button');
  var timeCurrent = parseInt(moment().format('H'));
  var dateToday = moment().format('MMMM Do YYYY');
  var headerDate = document.querySelector('h2');
  var randomQuoteText = document.querySelector('.quoteText');
  var randomQuoteAuthor = document.querySelector('.quoteAuthor');

  // Setting current date in header
  headerDate.innerHTML = dateToday;

  // ----------------------------------------------------------------------
  // LOOP TO CHANGE TEXT AREA BACKGROUND COLOR ACCORDING TO TIME OF DAY
  // ----------------------------------------------------------------------

  for (let i = 0; i < dayTime.length; i++) {
    if (dayTime[i].time === timeCurrent) {
      textArea[i].classList.add('current');
      timeLabel[i].classList.add('current-time');
    } else if (dayTime[i].time < timeCurrent) {
      textArea[i].classList.add('earlier');
    } else {
      textArea[i].classList.add('remaining');
    }
  }

  // ----------------------------------------------------------------------
  // SAVE TO LOCAL STORAGE
  // ----------------------------------------------------------------------

  for (let i = 0; i < btnSave.length; i++) {
    btnSave[i].addEventListener('click', () => {
      localStorage.setItem(String(`${dayTime[i].time}`), JSON.stringify(textArea[i].value));
    });
  }

  // ----------------------------------------------------------------------
  // LOAD FROM LOCAL STORAGE
  // ----------------------------------------------------------------------

  for (let i = 0; i < dayTime.length; i++) {
    // JSON.parse so that quotations arent retrieved when empty
    var retrieveNotes = JSON.parse(localStorage.getItem(String(`${dayTime[i].time}`)));

    if (localStorage.getItem(String(`${dayTime[i].time}`))) {
      textArea[i].append(retrieveNotes);
    }
  }

  // ----------------------------------------------------------------------
  // RANDOM QUOTE GENERATOR
  // ----------------------------------------------------------------------

  function getQuote() {
    // Insert the API url to get a list of your repos
    var requestUrl = 'https://api.quotable.io/random';

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        randomQuoteText.innerHTML = `${data.content}`;
        randomQuoteAuthor.innerHTML = `—${data.author}`;
      });
  }
  getQuote();
});

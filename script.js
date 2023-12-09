"use strict";

const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let saveCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// date-picker min = today
const today = new Date().toISOString().split("T").at(0);
dateEl.setAttribute("min", today);

// update DOM
const updateDom = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // change visual container
    inputContainer.hidden = true;

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);

      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // put time in countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      // change visual container
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
};

// Value from input
const updateCountdown = (e) => {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value
    ? e.srcElement[0].value
    : "New Countdown";
  countdownDate = e.srcElement[1].value;

  //   localStorage
  saveCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(saveCountdown));

  if (countdownDate === "") {
    alert("Please select a date");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
};

const reset = () => {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";

  localStorage.removeItem("countdown");
};

const restorePreviousCountdown = () => {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;

    saveCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = saveCountdown.title;
    countdownDate = saveCountdown.date;

    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
};

// addEventListener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePreviousCountdown();

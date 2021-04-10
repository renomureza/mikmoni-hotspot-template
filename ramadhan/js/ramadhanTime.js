import prayTimes from "./prayTimes.js";
import config from "./config.js";

// DateTime
// Clock
const currentTime = () => {
  const date = new Date();
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());

  document.querySelector(
    ".clock"
  ).innerText = `${hours} : ${minutes} : ${seconds}`;

  setTimeout(() => {
    currentTime();
  }, 1000);
};

const addZero = (time) => {
  return time < 10 ? `0${time}` : time;
};

const currentDate = () => {
  document.querySelector(".date").innerText = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(new Date());
};

currentDate();
currentTime();

// Pray Time
const prayTimesResult = prayTimes.getTimes(new Date(), [
  config.prayTime.latitude || -6.1783056,
  config.prayTime.longtitude || 106.6318889,
]);

const insertPrayerTime = () => {
  document.querySelectorAll(".prayerTime > div").forEach((e) => {
    e.children[1].innerHTML = prayTimesResult[e.id];
  });
};

insertPrayerTime();

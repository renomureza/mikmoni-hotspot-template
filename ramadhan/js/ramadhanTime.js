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

// Pray Time
prayTimes.adjust({ imsak: "10 min", fajr: 20, asr: "Standard", isha: 18 });
prayTimes.tune({
  imsak: 2.5,
  fajr: 2.5,
  dhuhr: 3.5,
  asr: 2,
  maghrib: 3.5,
  isha: 2.5,
});

const prayTimesResult = prayTimes.getTimes(new Date(), [
  config.prayTime.latitude || -6.1783056,
  config.prayTime.longtitude || 106.6318889,
]);

const insertPrayerTime = () => {
  document.querySelectorAll(".prayerTime > div").forEach((e) => {
    e.children[1].innerHTML = prayTimesResult[e.id];
  });
};

currentDate();
currentTime();
insertPrayerTime();

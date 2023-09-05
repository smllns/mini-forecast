//importing images for forecast and displaying them through the weather function
import rain from "../../imgs/rain.svg";
import snow from "../../imgs/snow.svg";
import clearday from "../../imgs/clear-day.svg";
import clearnight from "../../imgs/clear-night.svg";
import partlycloudyday from "../../imgs/partly-cloudy-day.svg";
import partlycloudynight from "../../imgs/partly-cloudy-night.svg";
import cloudy from "../../imgs/cloudy.svg";
import sleet from "../../imgs/sleet.svg";
import wind from "../../imgs/wind.svg";
import fog from "../../imgs/fog.svg";
import thunderstorms from "../../imgs/thunderstorms.svg";
import hail from "../../imgs/hail.svg";
import tornado from "../../imgs/tornado.svg";
import haze from "../../imgs/haze.svg";

export const weather = function (name) {
  const newNname = name.replace(/-/g, "");
  const weathers = {
    rain,
    snow,
    clearday,
    clearnight,
    partlycloudyday,
    partlycloudynight,
    cloudy,
    sleet,
    wind,
    fog,
    thunderstorms,
    hail,
    tornado,
    haze,
  };
  if (weathers.hasOwnProperty(newNname)) {
    return weathers[newNname];
  }
};

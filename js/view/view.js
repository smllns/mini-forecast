import thermometer from "../../imgs/thermometer.svg";
import wind from "../../imgs/wind.svg";
import humidity from "../../imgs/humidity.svg";
import pressurelow from "../../imgs/pressure-low.svg";
import uvindex from "../../imgs/uv-index.svg";
import dustday from "../../imgs/dust-day.svg";
import sunrise from "../../imgs/sunrise.svg";
import sunset from "../../imgs/sunset.svg";
import { weather } from "./weatherIcons.js";

// Class responsible for rendering current forecast
export class WeatherView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.placeholder = document.getElementById("searchInput");
  }
  // Setting sunrise/sunset time to needed format
  formatSunriseTime(sun) {
    const parsedTime = new Date(`2000-01-01T${sun}`);
    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}h`;
  }
  // Changing searchs placeholder
  changePlaceholder(weatherData) {
    this.placeholder.placeholder = `${weatherData.city}`;
  }

  //Rendering city's weather forecast
  renderWeatherData(weatherData) {
    const img = weatherData.icon;
    const markup = `
      <div class="forecast__head">
                    <div class="forecast__head--text">
                      <div class="forecast__head--city">${
                        weatherData.city
                      }</div>
                      <div class="forecast__head--country">${
                        weatherData.country
                      }</div>
                    </div>
                    <button class="forecast__head--btn btn">
                      <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.54112 3.44746C5.26943 2.17576 3.21207 2.16958 1.94588 3.43578C0.679686 4.70197 0.685866 6.75933 1.95756 8.03102L6.66505 12.7385C6.86031 12.9338 7.1769 12.9338 7.37216 12.7385L12.0552 8.05824C13.3184 6.78793 13.3144 4.73634 12.0425 3.46442C10.7686 2.19045 8.71024 2.18427 7.44178 3.45273L6.99452 3.90085L6.54112 3.44746ZM11.3461 7.35311L7.01861 11.6779L2.66467 7.32391C1.78255 6.4418 1.77827 5.0176 2.65299 4.14288C3.5277 3.26817 4.9519 3.27245 5.83402 4.15456L6.64337 4.96392C6.84197 5.16252 7.16514 5.15862 7.35889 4.9553L8.14889 4.15984C9.02587 3.28286 10.451 3.28714 11.3354 4.17153C12.2178 5.05387 12.2205 6.47382 11.3461 7.35311Z"
                          fill="white"
                        />
                      </svg>
                      <p class="head__btn--text">Add to Favourites</p>
                    </button>
                  </div>
                  <div class="forecast__middle">
                    <p class="forecast__middle--text">Today</p>
                    <div class="forecast__middle--inner">
                      <img
                        class="middle__inner--icon"
                        src="${weather(img)}"
                        alt="weather icon"
                      />
                      <div class="middle__inner--forecast">
                        <p class="middle__weather">${weatherData.conditions}</p>
                        <p class="middle__celsius">${weatherData.temp}°C</p>
                      </div>
                    </div>
                  </div>
                  <div class="forecast__many">
                    <div class="forecast__many--grid">
                      <div class="grid-item">
                        <p class="grid-heading">Feels like</p>
                        <div class="grid-content">
                          <img
                            class="grid-content--img"
                            src="${thermometer}"
                            alt="feels like"
                          />
                          <p class="grid-content--weather">${
                            weatherData.feelsLike
                          }°C</p>
                        </div>
                      </div>
                      <div class="grid-item">
                        <p class="grid-heading">Wind</p>
                        <div class="grid-content">
                          <img
                            class="grid-content--img"
                            src="${wind}"
                            alt="feels like"
                          />
                          <p class="grid-content--weather">${
                            weatherData.wind
                          }km/h</p>
                        </div>
                      </div>
                      <div class="grid-item">
                        <p class="grid-heading">Humidity</p>
                        <div class="grid-content">
                          <img
                            class="grid-content--img"
                            src="${humidity}"
                            alt="feels like"
                          />
                          <p class="grid-content--weather">${
                            weatherData.humidity
                          }%</p>
                        </div>
                      </div>
                      <div class="grid-item">
                        <p class="grid-heading">Pressure</p>
                        <div class="grid-content">
                          <img
                            class="grid-content--img"
                            src="${pressurelow}"
                            alt="feels like"
                          />
                          <p class="grid-content--weather">${
                            weatherData.pressure
                          }hPa</p>
                        </div>
                      </div>
                      <div class="grid-item">
                        <p class="grid-heading">UV index</p>
                        <div class="grid-content">
                          <img
                            class="grid-content--img"
                             src="${uvindex}"

                            alt="feels like"
                          />
                          <p class="grid-content--weather">${
                            weatherData.uvIndex
                          }</p>
                        </div>
                      </div>
                      <div class="grid-item">
                        <p class="grid-heading">Visibility</p>
                        <div class="grid-content">
                          <img
                            class="grid-content--img"
                            src="${dustday}"
                            alt="feels like"
                          />
                          <p class="grid-content--weather">${
                            weatherData.visibility
                          }km</p>
                        </div>
                      </div>
                      <div class="grid-item">
                        <p class="grid-heading">Sunrise</p>
                        <div class="grid-content">
                          <img
                            class="grid-content--img"
                            src="${sunrise}"
                            alt="feels like"
                          />
                          <p class="grid-content--weather">${this.formatSunriseTime(
                            weatherData.sunrise
                          )}</p>
                        </div>
                      </div>
                      <div class="grid-item">
                        <p class="grid-heading">Sunset</p>
                        <div class="grid-content">
                          <img
                            class="grid-content--img"
                            src="${sunset}"
                            alt="feels like"
                          />
                          <p class="grid-content--weather">${this.formatSunriseTime(
                            weatherData.sunset
                          )}</p>
                        </div>
                      </div>
                    </div>
                  </div>
    `;
    this.container.innerHTML = markup;
  }
}
export const weatherView = new WeatherView(".current__forecast--inner");

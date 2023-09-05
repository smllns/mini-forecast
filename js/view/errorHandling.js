import sadgrey from "../../imgs/sad_grey.svg";
import graysad from "../../imgs/gray_sad.svg";
import sadorange from "../../imgs/sag_orange.svg";

// A class that is responsible for handling common errors
class ErrorHandling {
  constructor() {
    this.locationDropdown = document.querySelector(".location-dropdown");
    this.thatSpinner = document.querySelector(".spinner-container");
    this.thatSuggestions = document.querySelector(".suggestions-container");
    this.thatSuggestionsList = document.querySelector(".suggestions");
    this.thatCurrentForecast = document.querySelector(
      ".current__forecast--inner"
    );
    this.thatPlaceholder = document.getElementById("searchInput");
    this.thatLilForecast = document.querySelector(".weekly__forecast");
  }

  // Handling a non existent city in suggsted cities error
  dropdownError() {
    this.locationDropdown.classList.add("error-dropdown");
    this.thatSpinner.style.display = "none";
    this.thatSuggestions.style.display = "block";
    this.thatSuggestionsList.style.display = "block";
    this.clearSuggestionsList();
    this.addErrorLi();
  }
  // Rendering an error when current forecast can't be loaded
  locationLoadingError() {
    this.thatCurrentForecast.classList.add("another-crystal");
    this.thatCurrentForecast.innerHTML = `
    <div class="forecast__head">
                    <div class="forecast__head--text">
                      <div class="forecast__head--city">No City</div>
                      <div class="forecast__head--country">And No Country</div>
                    </div>
                    <button class=" no-signal btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
  <path d="M6.54112 3.44749C5.26943 2.1758 3.21207 2.16962 1.94588 3.43581C0.679686 4.702 0.685866 6.75936 1.95756 8.03105L6.66505 12.7385C6.86031 12.9338 7.1769 12.9338 7.37216 12.7385L12.0552 8.05827C13.3184 6.78796 13.3144 4.73637 12.0425 3.46446C10.7686 2.19048 8.71024 2.1843 7.44178 3.45276L6.99452 3.90088L6.54112 3.44749ZM11.3461 7.35314L7.01861 11.6779L2.66467 7.32395C1.78255 6.44183 1.77827 5.01763 2.65299 4.14292C3.5277 3.26820 4.9519 3.27248 5.83402 4.15459L6.64337 4.96395C6.84197 5.16255 7.16514 5.15865 7.35889 4.95533L8.14889 4.15987C9.02587 3.28289 10.451 3.28717 11.3354 4.17156C12.2178 5.05390 12.2205 6.47385 11.3461 7.35314Z" fill="#515A6E"/>
</svg>
                      <p class="head__btn--text">Can’t add it to Favourites</p>
                    </button>
                  </div>

                  <div class="forecast__middle">
                    <p class="forecast__middle--text">Today</p>
                    <div class="forecast__middle--inner">
                      <img
                        class="middle__inner--icon"
                        src="${sadorange}"
                        alt="no weather icon"
                      />
                      <div class="middle__inner--forecast">
                        <p class="middle__weather">Feks like</p>
                        <p class="middle__celsius">Homeless°C</p>
                      </div>
                    </div>
                  </div>
                  <div class="forecast__many">
                  <p class="crystal">Uh-oh! Our crystal ball 🔮 is napping and needs a latte ☕! Turn on your location to wake it up and get your weather magic back on track!</p>
                  </div>`;
    this.thatPlaceholder.placeholder = `Secret 👀`;
  }

  // Rendering an error when favourites can't be loaded
  favouritesError() {
    const favourites = document.querySelector(".favs");

    const htmlContent = `
    <div class="favs_problems"><img class="sad_img"
    src="${sadgrey}"
    alt="sad icon"
    />
    <p class="error_text">
    There're no favourites yet. <br>Start adding by pressing “Add to Favourites” button 
    </p>
    </div>
    `;
    favourites.insertAdjacentHTML("beforeend", htmlContent);
    console.log("im in error");
  }
  // Rendering an error when 7 days forecast can't be loaded
  lilForecastError() {
    let repeatedHTML = "";
    let dates = [
      "Tomorrow",
      "Day After Tomorrow",
      "In Three Days",
      "In Four Days",
      "In Five Days",
      "In Six Days",
      "In Seven Days",
    ];
    for (let i = 0; i < 7; i++) {
      repeatedHTML += `
        <div class="lil__forecast">
          <p class="lil__date">
            ${dates[i]}
          </p>
          <img
            class="lil__img"
            src="${graysad}"
            alt="error img"
          />
          <p class="lil__weather">Location</p>
          <p class="lil__celsius">IDK</p>
        </div>`;
    }
    this.thatLilForecast.innerHTML = repeatedHTML;
  }

  // Removing error state from suggested cities
  resetErrorState() {
    this.locationDropdown.classList.remove("error-dropdown");
    this.clearErrorLi();
  }

  addErrorLi() {
    const errorLi = document.createElement("li");
    errorLi.classList.add("error-li");
    errorLi.textContent = "Oops! Couldn't find it. Try again!";
    this.thatSuggestionsList.appendChild(errorLi);
  }

  clearSuggestionsList() {
    this.thatSuggestionsList.innerHTML = "";
  }

  clearErrorLi() {
    const errorLi = this.thatSuggestionsList.querySelector(".error-li");
    if (errorLi) {
      this.thatSuggestionsList.removeChild(errorLi);
    }
  }
}

export const errorHandler = new ErrorHandling();

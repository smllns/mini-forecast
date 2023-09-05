import { countryEmojiMap } from "../countryEmojiMap.js";
import { async } from "regenerator-runtime";

// Class responsible for suggestions of cities in the search
export class LocationView {
  constructor(inputSelector, suggestionsSelector) {
    this.input = document.querySelector(inputSelector);
    this.suggestionsContainer = document.querySelector(suggestionsSelector);
    this.displayedCities = new Set(); // Keeping track of displayed cities

    // Spinner element
    this.spinnerContainer =
      this.suggestionsContainer.querySelector(".spinner-container");
    this.spinner = this.suggestionsContainer.querySelector(".spinner");

    // Suggestions list element
    this.suggestionsList =
      this.suggestionsContainer.querySelector(".suggestions");

    this.input = document.querySelector(".location-input");
    this.locationDropdown = document.querySelector(".location-dropdown");
    this.labelInSearch = document.querySelector(".location-label");
  }

  // Rendering new forecast if Enter is pressed in search
  keypressEnter(newForecastGeneration, errorHandler) {
    this.input.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        try {
          const inputCity = event.target.value;
          await newForecastGeneration(inputCity);
        } catch (error) {
          console.error("Async function error:", error);
          errorHandler.dropdownError();
        }
      }
    });
  }

  // Rendering forecast for users current location if it's clicked
  handleLocationDropdownClick(createWeatherData) {
    this.locationDropdown.addEventListener("click", (event) =>
      this.workingLocationDropdownClick(createWeatherData, event)
    );
  }
  workingLocationDropdownClick = async function (createWeatherData, event) {
    if (event.target.contains(this.labelInSearch)) {
      try {
        await createWeatherData();
      } catch (error) {
        console.error("Error handling location label click:", error);
      }
    }
  };

  // Logic of suggested cities
  handleInput(errorHandler, fetchSuggestions) {
    this.input.addEventListener("input", (event) =>
      this.workingInput(errorHandler, fetchSuggestions, event)
    );
  }
  workingInput = async function (errorHandler, fetchSuggestions, event) {
    const query = event.target.value;
    errorHandler.resetErrorState();

    if (query.length >= 2) {
      this.showSpinner(); // Showing spinner while fetching suggestions
      try {
        const suggestions = await fetchSuggestions(query);
        this.displaySuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        const liTems = document.querySelector(".suggestions");
        if (liTems.innerHTML === "") {
          this.showSpinner();
        }
        if (liTems.innerHTML !== "") {
          this.hideSpinner();
        }
      }
    } else {
      this.hideSuggestions(); // Hiding suggestions container
      this.hideSpinner(); // Hiding spinner
    }
  };

  // Handling suggestions dropdown style
  openDropdown() {
    this.input.addEventListener("focus", () => {
      this.locationDropdown.classList.add("another-dropdown");
    });
  }

  closeDropdown() {
    this.input.addEventListener("blur", () => {
      this.locationDropdown.classList.remove("another-dropdown");
    });
  }

  // Clearing input
  clearInput() {
    this.input.value = "";
  }

  // Displaying suggestions
  displaySuggestions(suggestions) {
    this.suggestionsList.innerHTML = ""; // Clearing previous suggestions
    suggestions.forEach((suggestion) => {
      if (!this.displayedCities.has(suggestion.name)) {
        const suggestionItem = document.createElement("li");
        const countryFlag = countryEmojiMap[suggestion.country] || ""; // Getting Emoji flag
        suggestionItem.textContent = `${countryFlag} ${suggestion.name}, ${suggestion.country}`;
        this.suggestionsList.appendChild(suggestionItem);
        this.displayedCities.add(suggestion.name); // Adding city to the displayed set
      }
    });
    this.hideSpinner();
    this.suggestionsList.style.display = "block";
    this.suggestionsContainer.classList.add("active");
  }

  showSpinner() {
    this.spinnerContainer.style.display = "block";
  }

  hideSpinner() {
    this.spinnerContainer.style.display = "none";
  }

  hideSuggestions() {
    this.suggestionsList.innerHTML = "";
    this.suggestionsList.style.display = "none";
    this.suggestionsContainer.classList.remove("active");
  }
}

export const locationView = new LocationView(
  ".location-input",
  ".suggestions-container"
);

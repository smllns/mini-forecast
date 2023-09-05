//importing background images
import morning from "../../imgs/morning.svg";
import day from "../../imgs/day.svg";
import evening from "../../imgs/evening.svg";
import night from "../../imgs/night.svg";
import bg from "../../imgs/bg.svg";

//function responsible for displaying background image
export const bgChange = function (currentHour) {
  if (currentHour >= 6 && currentHour < 12) {
    // Morning (6:00 AM to 11:59 AM)
    document.body.style.backgroundImage = `url(${morning})`;
  } else if (currentHour >= 12 && currentHour < 18) {
    // Day (12:00 PM to 5:59 PM)
    document.body.style.backgroundImage = `url(${day})`;
  } else if (currentHour >= 18 && currentHour < 21) {
    // Evening (6:00 PM to 8:59 PM)
    document.body.style.backgroundImage = `url(${evening})`;
  } else {
    // Night (9:00 PM to 5:59 AM)
    document.body.style.backgroundImage = `url(${night})`;
  }
};

//function responsible for selecting background image
export const btnBgChange = function () {
  const dropdownContainer = document.querySelector(".header__bg");
  const dropdown = document.querySelector(".header__bg--dropdown");

  // Open the dropdown on click
  dropdownContainer.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // Closing the dropdown when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!dropdownContainer.contains(event.target)) {
      dropdown.classList.remove("active");
    }
  });

  // Changing dropdown svg on click
  document.addEventListener("click", (event) => {
    if (dropdown.classList.contains("active")) {
      dropdownContainer.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6928 2.31143C15.8128 2.11478 14.9147 2.01041 14.0131 2C13.0891 2.01065 12.19 2.11498 11.3089 2.31131C10.9245 2.39697 10.637 2.71797 10.5933 3.11011L10.3844 4.98787C10.3244 5.52521 10.0133 6.00258 9.54617 6.27409C9.07696 6.54875 8.50793 6.58162 8.01296 6.36398L6.29276 5.60685C5.93492 5.44935 5.51684 5.53522 5.24971 5.82108C4.00637 7.15157 3.08038 8.74728 2.54142 10.4881C2.42513 10.8638 2.55914 11.272 2.87529 11.5051L4.40162 12.6305C4.83721 12.9512 5.09414 13.4597 5.09414 14.0006C5.09414 14.5415 4.83721 15.05 4.40219 15.3703L2.8749 16.4976C2.55922 16.7307 2.42533 17.1383 2.54122 17.5136C3.07924 19.2561 4.00474 20.8536 5.24806 22.1858C5.51493 22.4718 5.93281 22.558 6.29071 22.4009L8.01859 21.6424C8.51117 21.4269 9.07783 21.4585 9.54452 21.728C10.0112 21.9976 10.3225 22.473 10.3834 23.0093L10.5908 24.8855C10.6336 25.2729 10.9148 25.5917 11.2933 25.6819C13.0725 26.106 14.9263 26.106 16.7055 25.6819C17.084 25.5917 17.3651 25.2729 17.408 24.8855L17.6157 23.0065C17.675 22.4692 17.9858 21.9923 18.4529 21.7219C18.92 21.4514 19.4876 21.4197 19.9818 21.6364L21.7093 22.3947C22.0671 22.5518 22.4849 22.4657 22.7517 22.1799C23.9944 20.8491 24.9198 19.2536 25.4586 17.513C25.5748 17.1376 25.441 16.7296 25.1251 16.4964L23.5988 15.3697C23.1628 15.0488 22.9059 14.5402 22.9059 13.9994C22.9059 13.4585 23.1628 12.9499 23.5978 12.6297L25.1228 11.5034C25.4386 11.2702 25.5723 10.8623 25.4561 10.4869C24.9172 8.74605 23.9912 7.15034 22.7478 5.81984C22.4807 5.53399 22.0626 5.44812 21.7048 5.60562L19.9843 6.36288C19.769 6.45832 19.5385 6.50694 19.3055 6.50657C18.4387 6.50566 17.7116 5.85214 17.617 4.98931L17.4079 3.11011C17.3643 2.71817 17.077 2.39728 16.6928 2.31143ZM14 18C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10C16.2091 10 18 11.7909 18 14C18 16.2091 16.2091 18 14 18Z" fill="white"/>
</svg>
`;
    } else {
      dropdownContainer.innerHTML = `
    <svg
    class="settings"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 9.5C11.5147 9.5 9.5 11.5147 9.5 14C9.5 16.4853 11.5147 18.5 14 18.5C15.3488 18.5 16.559 17.9066 17.3838 16.9666C18.0787 16.1745 18.5 15.1365 18.5 14C18.5 13.5401 18.431 13.0962 18.3028 12.6783C17.7382 10.838 16.0253 9.5 14 9.5ZM11 14C11 12.3431 12.3431 11 14 11C15.6569 11 17 12.3431 17 14C17 15.6569 15.6569 17 14 17C12.3431 17 11 15.6569 11 14ZM21.7093 22.3947L19.9818 21.6364C19.4876 21.4197 18.9071 21.4514 18.44 21.7219C17.9729 21.9923 17.675 22.4692 17.6157 23.0065L17.408 24.8855C17.3651 25.2729 17.084 25.5917 16.7055 25.6819C14.9263 26.106 13.0725 26.106 11.2933 25.6819C10.9148 25.5917 10.6336 25.2729 10.5908 24.8855L10.3834 23.0093C10.3225 22.473 10.0112 21.9976 9.54452 21.728C9.07783 21.4585 8.51117 21.4269 8.01859 21.6424L6.29071 22.4009C5.93281 22.558 5.51493 22.4718 5.24806 22.1858C4.00474 20.8536 3.07924 19.2561 2.54122 17.5136C2.42533 17.1383 2.55922 16.7307 2.8749 16.4976L4.40219 15.3703C4.83721 15.05 5.09414 14.5415 5.09414 14.0006C5.09414 13.4597 4.83721 12.9512 4.40162 12.6305L2.87529 11.5051C2.55914 11.272 2.42513 10.8638 2.54142 10.4881C3.08038 8.74728 4.00637 7.15157 5.24971 5.82108C5.51684 5.53522 5.93492 5.44935 6.29276 5.60685L8.01296 6.36398C8.50793 6.58162 9.07696 6.54875 9.54617 6.27409C10.0133 6.00258 10.3244 5.52521 10.3844 4.98787L10.5933 3.11011C10.637 2.71797 10.9245 2.39697 11.3089 2.31131C12.19 2.11498 13.0891 2.01065 14.0131 2C14.9147 2.01041 15.8128 2.11478 16.6928 2.31143C17.077 2.39728 17.3643 2.71817 17.4079 3.11011L17.617 4.98931C17.7116 5.85214 18.4387 6.50566 19.3055 6.50657C19.5385 6.50694 19.769 6.45832 19.9843 6.36288L21.7048 5.60562C22.0626 5.44812 22.4807 5.53399 22.7478 5.81984C23.9912 7.15034 24.9172 8.74605 25.4561 10.4869C25.5723 10.8623 25.4386 11.2702 25.1228 11.5034L23.5978 12.6297C23.1628 12.9499 22.9 13.4585 22.9 13.9994C22.9 14.5402 23.1628 15.0488 23.5988 15.3697L25.1251 16.4964C25.441 16.7296 25.5748 17.1376 25.4586 17.513C24.9198 19.2536 23.9944 20.8491 22.7517 22.1799C22.4849 22.4657 22.0671 22.5518 21.7093 22.3947ZM16.263 22.1965C16.4982 21.4684 16.9889 20.8288 17.6884 20.4238C18.5702 19.9132 19.6536 19.8546 20.5841 20.2626L21.9281 20.8526C22.791 19.8537 23.4593 18.7013 23.8981 17.4551L22.7095 16.5777L22.7086 16.577C21.898 15.9799 21.4 15.0276 21.4 13.9994C21.4 12.9718 21.8974 12.0195 22.7073 11.4227L22.7085 11.4217L23.8957 10.545C23.4567 9.29874 22.7881 8.1463 21.9248 7.14764L20.5922 7.73419L20.5899 7.73521C20.1844 7.91457 19.7472 8.00716 19.3039 8.00657C17.6715 8.00447 16.3046 6.77425 16.1261 5.15459L16.1259 5.15285L15.9635 3.69298C15.3202 3.57322 14.6677 3.50866 14.013 3.50011C13.3389 3.50885 12.6821 3.57361 12.0377 3.69322L11.8751 5.15446C11.7625 6.16266 11.1793 7.05902 10.3019 7.5698C9.41937 8.08554 8.34453 8.14837 7.40869 7.73688L6.07273 7.14887C5.20949 8.14745 4.54092 9.29977 4.10196 10.5459L5.29181 11.4232C6.11115 12.0268 6.59414 12.9836 6.59414 14.0006C6.59414 15.0172 6.11142 15.9742 5.29237 16.5776L4.10161 17.4565C4.54002 18.7044 5.2085 19.8584 6.07205 20.8587L7.41742 20.2681C8.34745 19.8613 9.41573 19.9214 10.2947 20.4291C11.174 20.9369 11.7593 21.8319 11.8738 22.84L11.8744 22.8445L12.0362 24.3087C13.3326 24.5638 14.6662 24.5638 15.9626 24.3087L16.1247 22.8417C16.1491 22.6217 16.1955 22.4054 16.263 22.1965Z"
      fill="white"
    />
  </svg>
    `;
    }
  });

  // Preventing h3 "Change Theme" from being clickable
  document
    .querySelector(".header__bg--dropdown h3")
    .addEventListener("click", (event) => {
      event.stopPropagation();
    });

  const liItems = document.querySelectorAll(".header__bg--ul li");

  // Removing the selected class from list items
  const changeTheme = (theme) => {
    liItems.forEach((item) => {
      item.classList.remove("selected");
    });

    // Adding the selected class to the clicked list item
    liItems.forEach((item) => {
      if (item.textContent === theme) {
        item.classList.add("selected");
      }
    });

    // Handling the theme change
    let hours;
    if (theme === "Morning") {
      hours = 7;
      bgChange(hours);
    }
    if (theme === "Day") {
      hours = 13;
      bgChange(hours);
    }
    if (theme === "Evening") {
      hours = 19;
      bgChange(hours);
    }
    if (theme === "Night") {
      hours = 23;
      bgChange(hours);
    }
    if (theme === "Auto") {
      document.body.style.backgroundImage = `url(${bg})`;
    }
  };

  liItems.forEach((li) => {
    li.addEventListener("click", () => {
      liItems.forEach((item) => {
        item.classList.remove("selected");
      });

      // Adding the selected class to the clicked list item
      li.classList.add("selected");

      // Handling click for each li item
      const theme = li.textContent;
      changeTheme(theme);
    });
  });

  // Calling the function to set the dot to green based on the current hour
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 12) {
    changeTheme("Morning");
  } else if (currentHour >= 12 && currentHour < 18) {
    changeTheme("Day");
  } else if (currentHour >= 18 && currentHour < 21) {
    changeTheme("Evening");
  } else {
    changeTheme("Night");
  }
};

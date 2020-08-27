const hamburgerToggle = document.querySelector(".hamburger-toggle");
const navbarCollapsibleGroup = document.querySelector(
  ".navbar__collapsible-group"
);

const toggleHamburgerMenu = () => {
  navbarCollapsibleGroup.classList.toggle("navbar__collapsible-group--is-open");
  hamburgerToggle.setAttribute(
    "aria-expanded",
    `${hamburgerToggle.ariaExpanded === "true" ? "false" : "true"}`
  );
};

hamburgerToggle.addEventListener("click", toggleHamburgerMenu);

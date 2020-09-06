import debounce from "lodash.debounce";

const post = document.querySelector(".post");
const tooltipContainer = document.querySelector(".tooltip-container");

let isTooltipVisible = false;
const setIsTooltipVisible = (newState) => {
  isTooltipVisible = newState;
};

const tooltipContainerStylesShape = {
  top: "",
  left: "",
  additionalClasses: [],
  enterAnimation: "",
  exitAnimation: "",
};
let tooltipContainerStyles = tooltipContainerStylesShape;
const setTooltipContainerStyles = (newState) => {
  tooltipContainerStyles = newState;
};

const resetTooltipContainerStylesInDOM = () => {
  tooltipContainer.style.left = tooltipContainerStylesShape.left;
  tooltipContainer.style.top = tooltipContainerStylesShape.top;
  // note that here we specifically remove the classes previously added
  tooltipContainer.classList.remove(
    ...tooltipContainerStyles.additionalClasses
  );
  tooltipContainer.style.animation = tooltipContainerStylesShape.enterAnimation;
};

const updateTooltipContainerStylesInDOM = () => {
  tooltipContainer.style.left = tooltipContainerStyles.left;
  tooltipContainer.style.top = tooltipContainerStyles.top;
  tooltipContainer.classList.add(...tooltipContainerStyles.additionalClasses);
  tooltipContainer.style.animation = tooltipContainerStyles.enterAnimation;
};

const getTopAlignedTooltipContainerStyles = (tooltipTriggerRect, tooltip) => ({
  // 5 and 22.47 represent additional spacing for aesthetics
  top: `${
    tooltipTriggerRect.top + window.scrollY - tooltip.offsetHeight + 5
  }px`,
  left: `${tooltipTriggerRect.right + window.scrollX - 22.47}px`,
  additionalClasses: [
    "tooltip-container--is-active",
    "tooltip-container--is-top",
  ],
  enterAnimation: "300ms ease 1 forwards slideInDown",
  exitAnimation: "300ms ease-out 1 forwards slideOutUp",
});

const getBottomAlignedTooltipContainerStyles = (tooltipTriggerRect) => ({
  // 6 and 22.47 represent additional spacing for aesthetics
  top: `${tooltipTriggerRect.bottom + window.scrollY + 6}px`,
  left: `${tooltipTriggerRect.right + window.scrollX - 22.47}px`,
  additionalClasses: [
    "tooltip-container--is-active",
    "tooltip-container--is-bottom",
  ],
  enterAnimation: "300ms ease 1 forwards slideInUp",
  exitAnimation: "300ms ease-out 1 forwards slideOutDown",
});

const getIsTopAligned = (tooltipTriggerRect, tooltip) =>
  tooltipTriggerRect.top - tooltip.offsetHeight >= 0;

const getFootnoteText = (e) => {
  const footnoteFullText = document.querySelector(e.target.hash).textContent;
  // we don't want the nested arrow and additional spacing, hence subtract 4
  return footnoteFullText.slice(0, footnoteFullText.length - 4);
};

const createToolTip = (e) => {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");

  const tooltipParagraph = document.createElement("p");
  tooltipParagraph.textContent = getFootnoteText(e);
  tooltipParagraph.classList.add("tooltip-text");

  tooltip.appendChild(tooltipParagraph);
  return tooltip;
};

const insertTooltipIntoDOM = (tooltip, tooltipTrigger) => {
  tooltipContainer.appendChild(tooltip);

  const tooltipTriggerRect = tooltipTrigger.getBoundingClientRect();
  const isTopAligned = getIsTopAligned(tooltipTriggerRect, tooltip);
  const newTooltipContainerStyles = isTopAligned
    ? getTopAlignedTooltipContainerStyles(tooltipTriggerRect, tooltip)
    : getBottomAlignedTooltipContainerStyles(tooltipTriggerRect);

  setTooltipContainerStyles(newTooltipContainerStyles);
  updateTooltipContainerStylesInDOM();
  setIsTooltipVisible(true);
};

const removeTooltipFromDOM = () => {
  tooltipContainer.style.animation = tooltipContainerStyles.exitAnimation;
  setIsTooltipVisible(false);
};

const footnoteHoverHandler = (e) => {
  // if tooltip isn't visible, we should be listening for create event
  if (!isTooltipVisible) {
    if (!e.target.parentElement.classList.contains("footnote-ref")) {
      return;
    }
    const tooltip = createToolTip(e);
    insertTooltipIntoDOM(tooltip, e.target);
    return;
  }

  // if tooltip is visible, we should be listening for destroy event
  // if hovering within tooltip or tooltip trigger, keep tooltip alive and return
  if (
    e.target.parentElement.classList.contains("footnote-ref") ||
    e.target.classList.contains("tooltip-container") ||
    e.target.classList.contains("tooltip") ||
    e.target.classList.contains("tooltip-text")
  ) {
    return;
  }
  removeTooltipFromDOM();
};

const debouncedFootnoteHoverHandler = debounce(footnoteHoverHandler, 250);

const tooltipAnimationEndHandler = () => {
  // if (at end of animation) tooltip is not visible
  if (!isTooltipVisible) {
    resetTooltipContainerStylesInDOM();
    tooltipContainer.removeChild(tooltipContainer.firstChild);
    // reset state
    setTooltipContainerStyles(tooltipContainerStylesShape);
  }
};

export {
  post,
  tooltipContainer,
  debouncedFootnoteHoverHandler,
  tooltipAnimationEndHandler,
};

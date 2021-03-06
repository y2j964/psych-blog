import debounce from "lodash.debounce";

const post = document.querySelector(".post");
const tooltipContainer = document.querySelector(".tooltip-container");

let isTooltipVisible = false;
const setIsTooltipVisible = (newState) => {
  isTooltipVisible = newState;
};

const tooltipContainerStylesShape = {
  top: "",
  additionalClasses: [],
  enterAnimation: "",
  exitAnimation: "",
};
let tooltipContainerStyles = tooltipContainerStylesShape;
const setTooltipContainerStyles = (newState) => {
  tooltipContainerStyles = newState;
};

const resetTooltipContainerStylesInDOM = () => {
  tooltipContainer.style.left = "";
  tooltipContainer.style.right = "";
  tooltipContainer.style.top = tooltipContainerStylesShape.top;
  // note that here we specifically remove the classes previously added
  tooltipContainer.classList.remove(
    ...tooltipContainerStyles.additionalClasses
  );
  tooltipContainer.style.animation = tooltipContainerStylesShape.enterAnimation;
};

const updateTooltipContainerStylesInDOM = () => {
  tooltipContainer.style.top = tooltipContainerStyles.top;
  tooltipContainer.classList.add(...tooltipContainerStyles.additionalClasses);
  tooltipContainer.style.animation = tooltipContainerStyles.enterAnimation;
};

const getTopAlignedTooltipContainerStyles = (
  tooltipTriggerRect,
  tooltip,
  horizontalClass
) => ({
  // 5 and 22.47 represent additional spacing for aesthetics
  top: `${
    tooltipTriggerRect.top + window.scrollY - tooltip.offsetHeight + 5
  }px`,
  additionalClasses: [
    "tooltip-container--is-active",
    "tooltip-container--is-top",
    horizontalClass,
  ],
  enterAnimation: "300ms ease 1 forwards slideInDown",
  exitAnimation: "300ms ease-out 1 forwards slideOutUp",
});

const getBottomAlignedTooltipContainerStyles = (
  tooltipTriggerRect,
  horizontalClass
) => ({
  // 6 and 22.47 represent additional spacing for aesthetics
  top: `${tooltipTriggerRect.bottom + window.scrollY + 6}px`,
  additionalClasses: [
    "tooltip-container--is-active",
    "tooltip-container--is-bottom",
    horizontalClass,
  ],
  enterAnimation: "300ms ease 1 forwards slideInUp",
  exitAnimation: "300ms ease-out 1 forwards slideOutDown",
});

// isTopAligned means the tooltip is positioned to the
// top of the trigger
const getIsTopAligned = (tooltipTriggerRect, tooltip) =>
  tooltipTriggerRect.top - tooltip.offsetHeight >= 0;

// isRightAligned means that the tooltip is positioned to the
// right of the trigger
const getIsRightAligned = (tooltipTriggerRect, maxWidth = 360) =>
  window.innerWidth - tooltipTriggerRect.right >= maxWidth;

const getTooltipLeftPosition = (tooltipTriggerRect) =>
  // 23.47 is for additional spacing
  `${tooltipTriggerRect.right + window.scrollX - 23.47}px`;

const getTooltipRightPosition = (tooltipTriggerRect) =>
  // 28 is for additional spacing
  `${
    window.innerWidth - tooltipTriggerRect.right - tooltipTriggerRect.width - 28
  }px`;

const getFootnoteItemParagraphFrags = (e) => {
  const footnoteItemParagraphs = document.querySelector(e.target.hash).children;
  const pFrags = document.createDocumentFragment();

  for (let i = 0; i < footnoteItemParagraphs.length; i += 1) {
    const tooltipParagraph = document.createElement("p");
    tooltipParagraph.classList.add("tooltip__text");

    if (i < footnoteItemParagraphs.length - 1) {
      tooltipParagraph.textContent = footnoteItemParagraphs[i].textContent;
      pFrags.appendChild(tooltipParagraph);
    } else {
      // on last paragraph, we need to slice out the return anchor and spacing
      tooltipParagraph.textContent = footnoteItemParagraphs[
        i
      ].textContent.slice(0, footnoteItemParagraphs[i].textContent.length - 3);
      pFrags.appendChild(tooltipParagraph);
    }
  }

  return pFrags;
};

const createToolTip = (e) => {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  const tooltipParagraphFrags = getFootnoteItemParagraphFrags(e);
  tooltip.appendChild(tooltipParagraphFrags);

  return tooltip;
};

const insertTooltipIntoDOM = (tooltip, tooltipTrigger) => {
  tooltipContainer.appendChild(tooltip);
  const tooltipTriggerRect = tooltipTrigger.getBoundingClientRect();

  // horizontal placement must be set before top is calculated
  const isRightAligned = getIsRightAligned(tooltipTriggerRect);
  let horizontalClass;
  if (isRightAligned) {
    tooltipContainer.style.left = getTooltipLeftPosition(tooltipTriggerRect);
    horizontalClass = "tooltip-container--is-right";
  } else {
    tooltipContainer.style.right = getTooltipRightPosition(tooltipTriggerRect);
    horizontalClass = "tooltip-container--is-left";
  }

  const isTopAligned = getIsTopAligned(tooltipTriggerRect, tooltip);
  const newTooltipContainerStyles = isTopAligned
    ? getTopAlignedTooltipContainerStyles(
        tooltipTriggerRect,
        tooltip,
        horizontalClass
      )
    : getBottomAlignedTooltipContainerStyles(
        tooltipTriggerRect,
        horizontalClass
      );

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
    e.target.classList.contains("tooltip__text")
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

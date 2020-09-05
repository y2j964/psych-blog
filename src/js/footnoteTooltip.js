import debounce from "lodash.debounce";
import getElAbsolutePosition from "./getElAbsolutePosition";

const post = document.querySelector(".post");
const tooltipContainer = document.querySelector(".tooltip-container");
let isTooltipVisible = false;

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

  // update tooltipContainer styles/position
  const [footnoteRefLeft, footnoteRefTop] = getElAbsolutePosition(
    tooltipTrigger
  );
  tooltipContainer.style.left = `${footnoteRefLeft - 14}px`;
  tooltipContainer.style.top = `${
    footnoteRefTop - tooltipContainer.offsetHeight - 6
  }px`;
  // sub by offsetheight to fix it atop of footnote
  // sub 6 for additional padding

  tooltipContainer.classList.add("tooltip-container--is-active");
  tooltipContainer.style.animation = "300ms ease 1 forwards slideInDown";

  isTooltipVisible = true;
};

const removeTooltipFromDOM = () => {
  tooltipContainer.style.animation = "300ms ease-out 1 forwards slideOutUp";
  isTooltipVisible = false;
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
    tooltipContainer.classList.remove("tooltip-container--is-active");
    tooltipContainer.removeChild(tooltipContainer.firstChild);
  }
};

if (post) {
  post.addEventListener("mouseover", debouncedFootnoteHoverHandler);
  tooltipContainer.addEventListener("animationend", tooltipAnimationEndHandler);
}

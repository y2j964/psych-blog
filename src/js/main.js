import initNetlifyIdentity from "./netlifyIdentity";
import { hamburgerToggle, toggleHamburgerMenu } from "./hamburgerToggle";
import {
  post,
  debouncedFootnoteHoverHandler,
  tooltipContainer,
  tooltipAnimationEndHandler,
} from "./footnoteTooltip";

initNetlifyIdentity();
hamburgerToggle.addEventListener("click", toggleHamburgerMenu);

if (post) {
  post.addEventListener("mouseover", debouncedFootnoteHoverHandler);
  tooltipContainer.addEventListener("animationend", tooltipAnimationEndHandler);
}

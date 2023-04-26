import {
  clamp,
  isTargetValid,
  setStyle,
} from "./";
import {
  computePosition,
  offset,
  arrow,
  autoPlacement
} from "@floating-ui/dom";

const keepinview = ({ padding = 0 }) => ({
  name: "keepinview",
  fn({ x, y, rects, middlewareData, platform }) {
    const documentDimentions = platform.getDimensions(window);
    const _x = clamp(x, padding, documentDimentions.width - rects.floating.width - padding);
    const _y = clamp(y, padding, documentDimentions.height - rects.floating.height - padding);
    const dx = x - _x;
    const dy = y - _y;
    const { arrow } = middlewareData;
    if (arrow) {
      if (arrow.x && dx) arrow.x += dx;
      if (arrow.y && dy) arrow.y += dy;
    }
    return { x: _x, y: _y };
  }
});

const positionInView = ({ placement }) => ({
  name: "positionInView",
  fn({ x, y, rects, platform }) {
    let _x = x, _y = y;
    const documentDimentions = platform.getDimensions(window);
    const [align_y, align_x] = placement.split("-");
    switch (align_x) {
      case "start": _x = 0; break;
      case "center": _x = (documentDimentions.width / 2) - (rects.floating.width / 2); break;
      case "end": _x = documentDimentions.width - rects.floating.width; break;
    }
    switch (align_y) {
      case "top": _y = 0; break;
      case "middle": _y = (documentDimentions.height / 2) - (rects.floating.height / 2); break;
      case "bottom": _y = documentDimentions.height - rects.floating.height; break;
    }
    return ({ x: _x, y: _y });
  }
});

const highlight = (options) => ({
  name: "highlight",
  options,
  fn(state) {
    const { isValidTarget, element, padding = 0 } = options || {};
    const { rects } = state;
    if (!isTargetValid(element)) {
      return {};
    }
    let data = {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    };
    if (isValidTarget) {
      data.top = `${rects.reference.y - padding}px`;
      data.left = `${rects.reference.x - padding}px`;
      data.width = `${rects.reference.width + padding * 2}px`;
      data.height = `${rects.reference.height + padding * 2}px`;
    }
    setStyle(element, data);
    return ({
      data
    });
  }
});

function offsetAssist(props) {
  const side = props.placement.split("-")[0];
  switch (side) {
    case "top":
      return 32;
    case "left":
    case "right":
      return 24;
    default: return 6;
  }
}

export function positionTooltip(target, tooltipEl, arrowEl, highlightEl, step, context) {
  const isValidTarget = isTargetValid(target);
  computePosition(
    isValidTarget
      ? target
      : context.,
    tooltipEl,
    {
      // placement: 'bottom-start',
      middleware: [
        // flip(),
        isValidTarget
          ? autoPlacement({
            alignment: step.alignment || "bottom-start",
          })
          : positionInView({
            placement: step.placement || "center-middle"
          }),
        offset(offsetAssist),
        highlight({
          element: highlightEl,
          padding: step.context.options.padding,
          isValidTarget
        }),
        arrow({
          element: arrowEl,
          padding: 8
        }),
        keepinview({
          padding: 24
        })],
    }
  ).then(({ x, y, middlewareData, placement }) => {
    setStyle(tooltipEl, {
      left: `${x}px`,
      top: `${y}px`,
    });
    if (middlewareData.arrow && isValidTarget) {
      const side = placement.split("-")[0];
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[side];
      setStyle(arrowEl, {
        left: middlewareData.arrow.x != null ? `${middlewareData.arrow.x}px` : "",
        top: middlewareData.arrow.y != null ? `${middlewareData.arrow.y}px` : "",
        right: "",
        bottom: "",
        [staticSide]: `${-arrowEl.offsetWidth / 2}px`,
      });
    } else {
      setStyle(arrowEl, {
        display: "none"
      });
    }
  });
}
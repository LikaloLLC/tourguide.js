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

const viewFinder = {
  getBoundingClientRect: () => {
    const top = window.scrollY;
    const left = window.scrollX;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const bottom = top + height;
    const right = left + width;
    return {
      x: left,
      y: top,
      left,
      top,
      bottom,
      right,
      width,
      height
    };
  }
};

const keepinview = ({ padding = 0 }) => ({
  name: "keepinview",
  fn({ x, y, rects, middlewareData }) {
    const viewDimentions = viewFinder.getBoundingClientRect();
    const _x = clamp(x, viewDimentions.left + padding, viewDimentions.right - rects.floating.width - padding);
    const _y = clamp(y, viewDimentions.top + padding, viewDimentions.bottom - rects.floating.height - padding);
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

const positionInView = ({ placement, padding = 0 }) => ({
  name: "positionInView",
  fn({ x, y, rects }) {
    let _x = x, _y = y;
    const viewDimentions = viewFinder.getBoundingClientRect();
    const [align_y, align_x] = placement.split("-");
    switch (align_x) {
      case "start": _x = viewDimentions.left + padding; break;
      case "center": _x = viewDimentions.left + (viewDimentions.width / 2) - (rects.floating.width / 2); break;
      case "end": _x = viewDimentions.right - rects.floating.width - padding; break;
    }
    switch (align_y) {
      case "top": _y = viewDimentions.top + padding; break;
      case "middle": _y = viewDimentions.top + (viewDimentions.height / 2) - (rects.floating.height / 2); break;
      case "bottom": _y = viewDimentions.bottom - rects.floating.height - padding; break;
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
      : viewFinder,
    tooltipEl,
    {
      // placement: 'bottom-start',
      middleware: [
        // flip(),
        isValidTarget
          ? autoPlacement({
            alignment: step.alignment || "bottom-start",
            padding: 24
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
        // keepinview({
        //   padding: 24
        // })
      ],
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
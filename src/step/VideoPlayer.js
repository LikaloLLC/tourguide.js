import PopoverBaseStep from "./PopoverStep";
import {
  assert,
} from "../utils";

export default class VideoPlayer extends PopoverBaseStep {
  get _image() {
    return this.context._u(`<figure class="guided-tour-step-image">${this.video ? `<video width="100%" height="auto" controls><source src="${this.video}"></video>` : ""}</figure>`);
  }
  constructor(data, context) {
    super(data, context);
    this.alignment = data.alignment || context.options.alignment || VideoPlayer.defaults.alignment;
    this.placement = data.placement || context.options.placement || VideoPlayer.defaults.placement;
    this.autoplay = typeof data.autoplay === "boolean"
      ? data.autoplay
      : VideoPlayer.defaults.autoplay;
  }
  _validate(data) {
    assert((
      data.hasOwnProperty("title")
    ),
      "missing required step parameter: title\n" +
      JSON.stringify(data, null, 2) + "\n" +
      "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
    );
    assert((
      data.hasOwnProperty("content")
    ),
      "missing required step parameter: content\n" +
      JSON.stringify(data, null, 2) + "\n" +
      "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
    );
    assert((
      data.hasOwnProperty("video")
    ),
      "missing required step parameter: video\n" +
      JSON.stringify(data, null, 2) + "\n" +
      "see this doc for more detail: https://github.com/LikaloLLC/tourguide.js#json-based-approach"
    );
  }
  show() {
    const result = super.show();
    if (result) this.container.find(".guided-tour-step-image video").first().play();
    return result;
  }
  hide() {
    const result = super.hide();
    if (result) this.container.find(".guided-tour-step-image video").first().pause();
    return result;
  }
}
VideoPlayer.defaults = {
  alignment: "bottom-start",
  placement: "middle-center",
  autoplay: true
};
VideoPlayer.type = "videoplayer";
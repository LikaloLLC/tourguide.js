import { TourStyle } from "../../@types";
import { Color } from "../../src/utils/color";
import { defaultStyle } from "../../src/Tour";

describe("TourStyle", () => {
    describe("setAutoColors", () => {
        it("should set auto colors based on default and options style", () => {
            const optionsStyle: Partial<TourStyle> = { accentColor: "#00FF00" };
            expect(Color.setAutoColors(defaultStyle, optionsStyle)).toEqual( {
                   "accentColor": "#00FF00",
                   "backgroundColor": "#fff",
                   "bulletColor": "#75ef75",
                   "bulletCurrentColor": "#00FF00",
                   "bulletVisitedColor": "#7ab77a",
                   "focusColor": "#00FF00",
                   "fontFamily": "sans-serif",
                   "fontSize": "14px",
                   "overlayColor": "rgb(0 100 255 / 25%)",
                   "stepButtonCloseColor": "#517a51",
                   "stepButtonCompleteColor": "#00FF00",
                   "stepButtonNextColor": "#00FF00",
                   "stepButtonPrevColor": "#517a51",
                   "stepCardPadding": "5px",
                   "textColor": "#333",
                   "tooltipWidth": "40vw",
                 });
        });
    });
});

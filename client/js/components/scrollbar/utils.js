import { CONSTANTS } from '../../lib/constants';
import {
    distanceFromPageTop,
    viewportHeight,
    viewportWidth,
    visibleDocumentHeightPercentage
} from '../../lib/utils';

const { SCROLLBAR_HIDDEN_HEIGHT, SCROLLBAR_HIDDEN_WIDTH } = CONSTANTS;

export const calculateNewPosition = ({ documentHeight, scrollbarHeight }, offsetY) => {
    const clickedScrollPercentage = offsetY / scrollbarHeight;

    return clickedScrollPercentage * documentHeight;
};

export const calculateScrollerMargin = context => {
    return percentageOfPageToScrollBarPixels(context, distanceFromPageTop());
};

const calculateScrollerHeight = ({ scrollbarHeight }) => {
    return scrollbarHeight * visibleDocumentHeightPercentage();
};

const percentageOfPageToScrollBarPixels = ({ documentHeight, scrollbarHeight }, currentHeight) => {
    const percentageOfPageScrolled = currentHeight / documentHeight;

    return scrollbarHeight * percentageOfPageScrolled;
};

export const scrollBarIsVisible = () => {
    return viewportHeight() > SCROLLBAR_HIDDEN_HEIGHT && viewportWidth() > SCROLLBAR_HIDDEN_WIDTH;
};

const setScrollerHeight = (scroller, calculatedHeight) => {
    scroller.style.height = calculatedHeight + 'px';
};

export const setScrollerMarginTop = (scroller, calculatedMarginTop) => {
    scroller.style.marginTop = calculatedMarginTop + 'px';
};

export const setNewScrollerStyles = (scroller, context) => {
    setScrollerHeight(scroller, calculateScrollerHeight(context));
    setScrollerMarginTop(scroller, calculateScrollerMargin(context));
};
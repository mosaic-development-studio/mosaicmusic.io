import { distanceFromPageTop, visibleDocumentHeightPercentage } from '../lib/utils';

const percentageOfPageToScrollBarPixels = ({ documentHeight, scrollBarHeight }, currentHeight) => {
    const percentageOfPageScrolled = currentHeight / documentHeight;

    return scrollBarHeight * percentageOfPageScrolled;
};

export const calculateNewPosition = ({ documentHeight, scrollBarHeight }, offsetY) => {
    const clickedScrollPercentage = offsetY / scrollBarHeight;

    return clickedScrollPercentage * documentHeight;
};

export const calculateScrollerMargin = context => {
    return percentageOfPageToScrollBarPixels(context, distanceFromPageTop());
};

const calculateScrollerHeight = ({ scrollBarHeight }) => {
    return scrollBarHeight * visibleDocumentHeightPercentage();
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
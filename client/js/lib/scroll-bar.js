import {
    distanceFromPageTop,
    documentHeight,
    elementOffsetHeight,
    visibleDocumentHeightPercentage
} from './dom-utils';

const scrollBarState = {};

const percentageOfPageToScrollBarPixels = currentHeight => {
    const percentageOfPageScrolled = currentHeight / scrollBarState.documentHeight;

    return scrollBarState.scrollBarHeight * percentageOfPageScrolled;
};

const calculateScrollerMargin = () => {
    return percentageOfPageToScrollBarPixels(distanceFromPageTop());
};

const calculateScrollerHeight = () => {
    return scrollBarState.scrollBarHeight * visibleDocumentHeightPercentage();
};

const setScrollerHeight = (scroller, calculatedHeight) => {
    scroller.style.height = calculatedHeight + 'px';
};

const setScrollerMarginTop = (scroller, calculatedMarginTop) => {
    scroller.style.marginTop = calculatedMarginTop + 'px';
};

const setNewScrollerStyles = scroller => {
    setScrollerHeight(scroller, calculateScrollerHeight());
    setScrollerMarginTop(scroller, calculateScrollerMargin());
};

export const scrollBarInitializer = (scrollBarNode, scrollerNode) => {
    scrollBarState.documentHeight = documentHeight();
    scrollBarState.scrollBarHeight = elementOffsetHeight(scrollBarNode);

    setNewScrollerStyles(scrollerNode);

    window.addEventListener('resize', () => {
        scrollBarState.documentHeight = documentHeight();

        setNewScrollerStyles(scrollerNode);
    });

    window.addEventListener('scroll', () => {
        setScrollerMarginTop(scrollerNode, calculateScrollerMargin());
    });
};

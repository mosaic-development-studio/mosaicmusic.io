import { CONSTANTS } from '../../lib/constants';
import {
    distanceFromPageTop,
    viewportHeight,
    viewportWidth,
    visibleDocumentHeightPercentage
} from '../../lib/utils';
import { scrollToY } from '../../lib/utils';

const { SCROLLBAR_HIDDEN_HEIGHT, SCROLLBAR_HIDDEN_WIDTH } = CONSTANTS;

const calculateNewPosition = ({ documentHeight, scrollBarHeight }, offsetY) => {
    const clickedScrollPercentage = offsetY / scrollBarHeight;

    return clickedScrollPercentage * documentHeight;
};

export const calculateScrollerMargin = context => {
    return percentageOfPageToScrollBarPixels(context, distanceFromPageTop());
};

const calculateScrollerHeight = ({ scrollBarHeight }) => {
    return scrollBarHeight * visibleDocumentHeightPercentage();
};

export const dragScroller = function dragScroller(e) {
    if (this.mouseDown) {
        document.body.classList.add('user-select-none');

        scrollToNewPosition.bind(this)(e);
    }

    window.addEventListener('mouseup', endScrollerDrag.bind(this));
};

const endScrollerDrag = function endScrollerDrag() {
    this.mouseDown = false;
    document.body.classList.remove('user-select-none');

    window.removeEventListener('mousemove', endScrollerDrag);
};

const percentageOfPageToScrollBarPixels = ({ documentHeight, scrollBarHeight }, currentHeight) => {
    const percentageOfPageScrolled = currentHeight / documentHeight;

    return scrollBarHeight * percentageOfPageScrolled;
};

export const scrollBarIsVisible = () => {
    return viewportHeight() > SCROLLBAR_HIDDEN_HEIGHT && viewportWidth() > SCROLLBAR_HIDDEN_WIDTH;
};

export const scrollToNewPosition = function scrollToNewPosition({ offsetY }) {
    scrollToY(calculateNewPosition(this, offsetY));
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
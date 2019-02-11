import { documentHeight, elementOffsetHeight } from '../lib/dom-utils';
import {
    calculateNewPosition,
    calculateScrollerMargin,
    setScrollerMarginTop,
    setNewScrollerStyles
} from './utils';
import { scrollToY } from '../lib/scroll-utils';

const scrollToNewPosition = function scrollToNewPosition({ offsetY }) {
    scrollToY(calculateNewPosition(this, offsetY));
};

export const scrollBarInitializer = function(scrollBarNode, scrollerNode) {
    this.documentHeight = documentHeight();
    this.mouseDown = false;
    this.scrollBarHeight = elementOffsetHeight(scrollBarNode);

    setNewScrollerStyles(scrollerNode, this);

    scrollBarNode.addEventListener('click', scrollToNewPosition.bind(this));

    window.addEventListener('resize', () => {
        this.documentHeight = documentHeight();

        setNewScrollerStyles(scrollerNode, this);
    });

    window.addEventListener('scroll', () => {
        setScrollerMarginTop(scrollerNode, calculateScrollerMargin(this));
    });
}.bind({});

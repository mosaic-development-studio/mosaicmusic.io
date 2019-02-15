import { documentHeight, elementOffsetHeight, scrollToY } from '../lib/utils';
import {
    calculateNewPosition,
    calculateScrollerMargin,
    setScrollerMarginTop,
    setNewScrollerStyles
} from './utils';

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

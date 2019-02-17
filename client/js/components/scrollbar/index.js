import { documentHeight, elementOffsetHeight, scrollToY } from '../../lib/utils';
import {
    calculateNewPosition,
    calculateScrollerMargin,
    setScrollerMarginTop,
    scrollBarIsVisible,
    setNewScrollerStyles
} from './utils';

const scrollToNewPosition = function scrollToNewPosition({ offsetY }) {
    scrollToY(calculateNewPosition(this, offsetY));
};

export const scrollbarInitializer = function(scrollBarNode, scrollerNode) {
    this.documentHeight = documentHeight();
    this.scrollBarHeight = elementOffsetHeight(scrollBarNode);

    setNewScrollerStyles(scrollerNode, this);

    scrollBarNode.addEventListener('click', scrollToNewPosition.bind(this));

    window.addEventListener('resize', () => {
        if (scrollBarIsVisible() && !this.scrollBarHeight) {
            this.documentHeight = documentHeight();
            this.scrollBarHeight = elementOffsetHeight(scrollBarNode);

            setNewScrollerStyles(scrollerNode, this);
        }
    });

    window.addEventListener('scroll', () => {
        setScrollerMarginTop(scrollerNode, calculateScrollerMargin(this));
    });
}.bind({});

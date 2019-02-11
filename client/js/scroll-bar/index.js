import { documentHeight, elementOffsetHeight } from '../lib/dom-utils';
import {
    calculateNewPosition,
    calculateScrollerMargin,
    setScrollerMarginTop,
    setNewScrollerStyles
} from './utils';

export const scrollBarInitializer = function(scrollBarNode, scrollerNode) {
    this.documentHeight = documentHeight();
    this.scrollBarHeight = elementOffsetHeight(scrollBarNode);

    setNewScrollerStyles(scrollerNode, this);

    window.addEventListener('resize', () => {
        this.documentHeight = documentHeight();

        setNewScrollerStyles(scrollerNode, this);
    });

    window.addEventListener('scroll', () => {
        setScrollerMarginTop(scrollerNode, calculateScrollerMargin(this));
    });

    scrollBarNode.addEventListener('click', ({ offsetY }) => {
        window.scrollTo(0, calculateNewPosition(this, offsetY));
    });
}.bind({});

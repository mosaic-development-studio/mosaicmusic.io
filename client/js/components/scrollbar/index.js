import { documentHeight, elementOffsetHeight } from '../../lib/utils';
import {
    calculateScrollerMargin,
    dragScroller,
    setScrollerMarginTop,
    scrollBarIsVisible,
    scrollToNewPosition,
    setNewScrollerStyles
} from './utils';

export const scrollbarInitializer = function(scrollBarNode, scrollerNode) {
    this.documentHeight = documentHeight();
    this.scrollBarHeight = elementOffsetHeight(scrollBarNode);

    setNewScrollerStyles(scrollerNode, this);

    scrollBarNode.addEventListener('click', scrollToNewPosition.bind(this));
    scrollBarNode.addEventListener('mousedown', e => {
        e.preventDefault();
        this.mouseDown = true;

        scrollBarNode.addEventListener('mousemove', dragScroller.bind(this));
    });

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

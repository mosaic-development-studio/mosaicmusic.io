import { documentHeight, elementOffsetHeight, scrollToY } from '../../lib/utils';
import {
    calculateNewPosition,
    calculateScrollerMargin,
    setScrollerMarginTop,
    scrollBarIsVisible,
    setNewScrollerStyles
} from './utils';
import { State } from '../../lib/State';

export class Scrollbar extends State {
    constructor(scrollbarNode) {
        super();
        this.scrollbarNode = scrollbarNode;
        this.scrollerNode = this.scrollbarNode.querySelector('.mosaic-scroll-bar-scroller');
        this.state = {
            documentHeight: documentHeight(),
            mouseDown: false,
            scrollbarHeight: elementOffsetHeight(scrollbarNode)
        };

        this.addEventListeners = this.addEventListeners.bind(this);
        this.dragScroller = this.dragScroller.bind(this);
        this.endScrollerDrag = this.endScrollerDrag.bind(this);
        this.scrollToNewPosition = this.scrollToNewPosition.bind(this);

        setNewScrollerStyles(this.scrollerNode, this.state);

        this.addEventListeners();
    }

    addEventListeners() {
        this.scrollbarNode.addEventListener('click', this.scrollToNewPosition);
        this.scrollbarNode.addEventListener('mousedown', e => {
            e.preventDefault();
            this.setState({ mouseDown: true });

            this.scrollbarNode.addEventListener('mousemove', this.dragScroller);
        });

        window.addEventListener('resize', () => {
            if (scrollBarIsVisible() && !this.scrollbarHeight) {
                this.setState({
                    documentHeight: documentHeight(),
                    scrollBarHeight: elementOffsetHeight(this.scrollbarNode)
                });

                setNewScrollerStyles(this.scrollerNode, this.state);
            }
        });

        window.addEventListener('scroll', () => {
            setScrollerMarginTop(this.scrollerNode, calculateScrollerMargin(this.state));
        });
    }

    dragScroller(e) {
        if (this.state.mouseDown) {
            this.scrollToNewPosition(e);
        }

        window.addEventListener('mouseup', this.endScrollerDrag);
    }

    endScrollerDrag() {
        this.setState({ mouseDown: false });

        window.removeEventListener('mousemove', this.endScrollerDrag);
    }

    scrollToNewPosition({ offsetY }) {
        scrollToY(calculateNewPosition(this.state, offsetY));
    }
}
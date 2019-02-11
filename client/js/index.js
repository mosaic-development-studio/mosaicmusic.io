import { Audio } from './lib/audio-player';
import { clickScroller } from './lib/scroll-utils';
import { scrollBarInitializer } from './scroll-bar';
import { tracks } from './lib/tracks';

window.onload = () => {
    new Audio(document.querySelector('.mosaic-player'), tracks);
    clickScroller(document.getElementById('mosaic-footer-logo'), 0);
    scrollBarInitializer(
        document.querySelector('.mosaic-scroll-bar'),
        document.querySelector('.mosaic-scroll-bar-scroller')
    );
};

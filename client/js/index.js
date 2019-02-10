import { Audio } from './lib/audio-player';
import { scrollBarInitializer } from './lib/scroll-bar';
import { tracks } from './lib/tracks';

window.onload = () => {
    new Audio(document.querySelector('.mosaic-player'), tracks);
    scrollBarInitializer(
        document.querySelector('.mosaic-scroll-bar'),
        document.querySelector('.mosaic-scroll-bar-scroller')
    );
};

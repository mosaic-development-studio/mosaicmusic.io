import { AudioPlayer } from './components/AudioPlayer';
import { clickScroller } from './lib/scroll-utils';
import { scrollBarInitializer } from './scroll-bar';

const initializeApplication = () => {
    new AudioPlayer({
        currentTime: 0,
        node: document.querySelector('.mosaic-player'),
        src: '../audio/1.mp3'
    });
    clickScroller(document.getElementById('mosaic-footer-logo'), 0);
    scrollBarInitializer(
        document.querySelector('.mosaic-scroll-bar'),
        document.querySelector('.mosaic-scroll-bar-scroller')
    );
};

window.addEventListener('load', initializeApplication);
import { audioInitializer } from './components/audio';
import { clickScroller } from './lib/utils';
import { scrollbarInitializer } from './components/scrollbar';

const initializeApplication = () => {
    audioInitializer(document.querySelector('.mosaic-player'));
    clickScroller(document.getElementById('mosaic-footer-logo'), 0);
    scrollbarInitializer(
        document.querySelector('.mosaic-scroll-bar'),
        document.querySelector('.mosaic-scroll-bar-scroller')
    );
};

window.addEventListener('load', initializeApplication);
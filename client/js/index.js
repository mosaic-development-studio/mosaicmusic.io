import { AudioPlayer } from './components/audio/AudioPlayer';
import { clickScroller } from './lib/utils';
import { Scrollbar } from './components/scrollbar/Scrollbar';
import { trackList } from './lib/trackList';

const initializeApplication = () => {
    new AudioPlayer({
        currentTime: 0,
        node: document.querySelector('.mosaic-player'),
        trackList
    });
    new Scrollbar(document.querySelector('.mosaic-scroll-bar'));

    clickScroller(document.getElementById('mosaic-footer-logo'), 0);
};

window.addEventListener('load', initializeApplication);
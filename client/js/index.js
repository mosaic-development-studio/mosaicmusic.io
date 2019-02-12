import { Audio } from './lib/audio-player';
import { AudioPlayer } from './components/AudioPlayer';
import { clickScroller } from './lib/scroll-utils';
import { scrollBarInitializer } from './scroll-bar';
import { tracks } from './lib/tracks';

const initializeApplication = () => {
    // new Audio(document.querySelector('.mosaic-player'), tracks);
    new AudioPlayer({
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

/*

window.onload = () => {
    clickScroller(document.getElementById('mosaic-footer-logo'), 0);
    scrollBarInitializer(
        document.querySelector('.mosaic-scroll-bar'),
        document.querySelector('.mosaic-scroll-bar-scroller')
    );
    new Playlist({
        Description: new Description({

        }),
        Player: new Player({
            playerNode: document.querySelector('player-node)
            src: '../path/to/src
        }),
        tracks

    });

    -   Separate player and playlist and create interface that bridges the gaps.
        Playlist returns song data, has previous/next functionality and player
        plays, pauses, returns time.
    -   Maybe it should return actual time.
    -   Create playlist structure in class.
};




*/

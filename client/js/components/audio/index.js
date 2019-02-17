import { AudioPlayer } from './AudioPlayer';
import { trackList } from '../../lib/trackList';

export const audioInitializer = node => {
    new AudioPlayer({
        currentTime: 0,
        node,
        src: '../audio/1.mp3',
        trackList
    });
};
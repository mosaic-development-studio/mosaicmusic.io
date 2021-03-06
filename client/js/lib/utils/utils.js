import { NEXT_BUTTON, PREVIOUS_BUTTON, TRACK_ACTIONS } from '../../components/audio/AudioPlayer';

export const findIndexOfNextTrack = (action, currentTrack, trackList) => {
    const indexOfCurrentTrack = trackList.map(track => track.src).indexOf(currentTrack.src);
    const highTrackIndex = trackList.length - 1;

    switch(action) {
        case TRACK_ACTIONS[NEXT_BUTTON]:
            if (indexOfCurrentTrack < highTrackIndex) {
                return indexOfCurrentTrack + 1;
            }

            return 0;
        case TRACK_ACTIONS[PREVIOUS_BUTTON]:
            if (indexOfCurrentTrack > 0) {
                return indexOfCurrentTrack - 1;
            }

            return highTrackIndex;
    }
};

export const formatPlaybackTime = timeInSeconds => {
    let intTimeInSeconds = parseInt(timeInSeconds, 10);
    let hours = Math.floor(intTimeInSeconds / 3600);
    let minutes = Math.floor((intTimeInSeconds - (hours * 3600)) / 60);
    let seconds = intTimeInSeconds - (hours * 3600) - (minutes * 60);

    if (hours < 10 && hours > 0) {
        hours = '0' + hours + ':';
    } else {
        hours = '';
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return hours + minutes + ':' + seconds;
};

export const isObject = object =>
    object === Object(object)
        && typeof object === 'object'
        && !Array.isArray(object);
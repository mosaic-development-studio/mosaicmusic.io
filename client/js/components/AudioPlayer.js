import { formatPlaybackTime, isObject } from '../lib/utils';

const AUDIO_PLAYER = {
    PLAY_BUTTON_CLASSNAME: 'mosaic-play'
};

const {
    PLAY_BUTTON_CLASSNAME
} = AUDIO_PLAYER;

export class AudioPlayer {
    constructor({ node, src }) {
        this.node = node;
        this.audio = node.querySelector('audio');
        this.currentTimeNode = node.querySelector('.mosaic-current-time');
        this.durationNode = node.querySelector('.mosaic-duration');
        this.src = src;
        this.state = {
            currentTime: 0,
            duration: this.audio.duration,
            paused: true
        };

        this.eventDelegator = this.eventDelegator.bind(this);

        this.node.addEventListener('click', this.eventDelegator);
        this.audio.addEventListener('durationchange', this.eventDelegator);
        this.audio.addEventListener('timeupdate', this.eventDelegator);


        this.audio.load();
    }

    eventDelegator({ target, target: { className }, type }) {
        switch(type) {
            case 'click':
                if (className === PLAY_BUTTON_CLASSNAME) {
                    this.playbackHandler();
                }
                return;
            case 'durationchange':
                this.updateDuration(target.duration);
                this.updateTime(this.durationNode, target.duration);
                return;
            case 'timeupdate':
                this.updateCurrentTime(target.currentTime);
                this.updateTime(this.currentTimeNode, target.currentTime);
                return;
        }
    }

    pause() {
        this.audio.pause();
    }

    play() {
        this.audio.play();
    }

    playbackHandler() {
        if (this.state.paused) {
            this.play();
        }

        else {
            this.pause();
        }

        this.setState({ paused: !this.state.paused });
    }

    setState(newState = {}) {
        if (isObject(newState)) {
            this.state = {
                ...this.state,
                ...newState
            };
        }
    }

    updateCurrentTime(currentTime) {
        this.setState({ currentTime });
    }

    updateDuration(duration) {
        this.setState({ duration });
    }

    updateTime(node, time) {
        if (time) {
            node.innerHTML = formatPlaybackTime(time);
        }
    }
}
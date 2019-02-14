import { formatPlaybackTime, isObject } from '../lib/utils';
import { handleOffsetParent } from '../lib/dom-utils';

const AUDIO_PLAYER = {
    PLAY_BUTTON_CLASSNAME: 'mosaic-play',
    PLAYBAR_CLASSNAME: 'mosaic-play-bar',
    PROGRESS_BAR_CLASSNAME: 'mosaic-progress'
};

const {
    PLAY_BUTTON_CLASSNAME,
    PLAYBAR_CLASSNAME,
    PROGRESS_BAR_CLASSNAME
} = AUDIO_PLAYER;

export class AudioPlayer {
    constructor({ currentTime = 0, node, src }) {
        this.node = node;
        this.audio = node.querySelector('audio');
        this.currentTimeNode = node.querySelector('.mosaic-current-time');
        this.durationNode = node.querySelector('.mosaic-duration');
        this.playhead = this.node.querySelector('.mosaic-play-bar');
        this.seekBar = this.node.querySelector('.mosaic-seek-bar');
        this.timeline = node.querySelector('.mosaic-progress');
        this.src = src;
        this.state = {
            currentTime,
            duration: this.audio.duration,
            paused: true,
            timelineWidth: this.timeline.offsetWidth - this.playhead.offsetWidth
        };

        this.eventDelegator = this.eventDelegator.bind(this);

        this.audio.addEventListener('durationchange', this.eventDelegator);
        this.audio.addEventListener('timeupdate', this.eventDelegator);
        this.node.addEventListener('click', this.eventDelegator);
        this.timeline.addEventListener('mouseover', this.eventDelegator);

        this.audio.load();
    }

    addHover(e) {
        const positionOffset = handleOffsetParent(this.timeline);
        const paddingRight = e.pageX - positionOffset;

        this.seekBar.style.paddingRight = paddingRight + 'px';
    }

    addMouseoverEventListeners() {
        this.timeline.addEventListener('mousemove', this.addHover.bind(this), false);
        this.timeline.addEventListener('mouseout', this.removeHover.bind(this), false);
    }

    eventDelegator(e) {
        const { target, target: { className }, type } = e;

        switch(type) {
            case 'click':
                switch(className) {
                    case PLAY_BUTTON_CLASSNAME:
                        this.playbackHandler();
                        return;
                    case PLAYBAR_CLASSNAME:
                    case PROGRESS_BAR_CLASSNAME:
                        this.setAudioCurrentTime(
                            this.playbarOffsetLeftPercentage(e) * this.state.duration
                        );
                        return;
                }
                return;
            case 'durationchange':
                this.updateDuration(target.duration);
                this.updateTime(this.durationNode, target.duration);
                return;
            case 'mouseover':
                this.addMouseoverEventListeners();
                return;
            case 'timeupdate':
                this.updateCurrentTime(target.currentTime);
                this.updateTime(this.currentTimeNode, target.currentTime);
                this.movePlayhead();
                return;
            default:
                return;
        }
    }

    movePlayhead() {
        const percentageOfTrackPlayed = this.state.currentTime / this.state.duration;

        this.playhead.style.paddingRight = (
            percentageOfTrackPlayed * this.state.timelineWidth
        ) + 'px';
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

    playbarOffsetLeftPercentage(e) { // percentage of playbar to the left of click
        const positionOffset = handleOffsetParent(this.timeline);

        return (e.pageX - positionOffset) / this.state.timelineWidth;
    }

    removeHover() {
        this.seekBar.style.paddingRight = '0px';
    }

    setAudioCurrentTime(currentTime) {
        this.audio.currentTime = currentTime;
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

    updateTime(node, time) { // could be moved into a TimeHandlers class
        if (typeof time === 'number') {
            node.innerHTML = formatPlaybackTime(time);
        }
    }
}
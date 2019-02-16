import {
    findCurrentTrackFromNode,
    findIndexOfNextTrack,
    formatPlaybackTime,
    handleOffsetParent,
    isObject
} from '../lib/utils';

const AUDIO_PLAYER_CLASSNAMES = {
    NEXT_BUTTON: 'mosaic-next',
    PAUSE: 'fa-pause',
    PLAY_BUTTON: 'mosaic-play',
    PLAY: 'fa-play',
    PLAYBAR: 'mosaic-play-bar',
    PREVIOUS_BUTTON: 'mosaic-previous',
    PROGRESS_BAR: 'mosaic-progress'
};

export const {
    NEXT_BUTTON,
    PAUSE,
    PLAY_BUTTON,
    PLAY,
    PLAYBAR,
    PREVIOUS_BUTTON,
    PROGRESS_BAR
} = AUDIO_PLAYER_CLASSNAMES;

export const TRACK_ACTIONS = {
    [NEXT_BUTTON]: 'NEXT',
    [PREVIOUS_BUTTON]: 'PREVIOUS'
};

export class AudioPlayer {
    constructor({ currentTime = 0, node, src, trackList }) {
        this.node = node;
        this.src = src;
        this.trackList = trackList;

        this.audio = this.node.querySelector('audio');
        this.audioSource = this.node.querySelector('source');
        this.currentTimeNode = this.node.querySelector('.mosaic-current-time');
        this.durationNode = this.node.querySelector('.mosaic-duration');
        this.playButtonIcon = this.node.querySelector('.mosaic-play i');
        this.playhead = this.node.querySelector('.mosaic-play-bar');
        this.seekBar = this.node.querySelector('.mosaic-seek-bar');
        this.timeline = this.node.querySelector('.mosaic-progress');
        this.title = this.node.querySelector('.mosaic-title');

        this.state = {
            currentTime,
            currentTrack: findCurrentTrackFromNode(this.audioSource, this.trackList),
            duration: this.audio.duration,
            paused: true,
            timelineWidth: this.timeline.offsetWidth - this.playhead.offsetWidth
        };

        this.eventDelegator = this.eventDelegator.bind(this);

        this.audio.addEventListener('durationchange', this.eventDelegator);
        this.audio.addEventListener('timeupdate', this.eventDelegator);
        this.node.addEventListener('click', this.eventDelegator);
        this.timeline.addEventListener('mouseover', this.eventDelegator);
        window.addEventListener('resize', this.eventDelegator);

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

    changeAudioSource(track) {
        this.audioSource.setAttribute('src', track);
    }

    changeTrackTitle(title) {
        this.title.textContent = title;
    }

    eventDelegator(e) {
        const { target, target: { className }, type } = e;

        switch(type) {
            case 'click':
                switch(className) {
                    case NEXT_BUTTON:
                    case PREVIOUS_BUTTON:
                        this.trackChange(e);
                        this.updateTrackDOM();
                        return;
                    case PLAY_BUTTON:
                        this.playbackHandler();
                        this.iconToggle();
                        return;
                    case PLAYBAR:
                    case PROGRESS_BAR:
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
            case 'resize':
                this.resizeProgressBar();
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

    iconToggle() {
        if (this.state.paused) {
            this.playButtonIcon.classList.remove(PAUSE);
            this.playButtonIcon.classList.add(PLAY);
        }

        else {
            this.playButtonIcon.classList.remove(PLAY);
            this.playButtonIcon.classList.add(PAUSE);
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

    playbarOffsetLeftPercentage(e) {
        const positionOffset = handleOffsetParent(this.timeline);

        return (e.pageX - positionOffset) / this.state.timelineWidth;
    }

    removeHover() {
        this.seekBar.style.paddingRight = '0px';
    }

    resizeProgressBar() {
        const padding = this.playhead.style.paddingRight
            ? parseInt(
                this.playhead.style.paddingRight.substring(
                    0,
                    this.playhead.style.paddingRight.length - 2
                ), 10
            ) : 0;

        this.state.timelineWidth = (
            this.timeline.offsetWidth - this.playhead.offsetWidth
        ) + padding;
        this.movePlayhead();
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

    trackChange({ target: { className }}) {
        const nextTrackIndex = findIndexOfNextTrack(
            TRACK_ACTIONS[className],
            this.state.currentTrack,
            this.trackList
        );

        this.updateCurrentTrack(this.trackList[nextTrackIndex]);
    }

    updateCurrentTime(currentTime) {
        this.setState({ currentTime });
    }

    updateCurrentTrack(currentTrack) {
        this.setState({ currentTrack });
    }

    updateDuration(duration) {
        this.setState({ duration });
    }

    updateTime(node, time) {
        if (typeof time === 'number') {
            node.innerHTML = formatPlaybackTime(time);
        }
    }

    updateTrackDOM() {
        this.changeAudioSource(this.state.currentTrack.src);
        this.changeTrackTitle(this.state.currentTrack.title);
        this.audio.load();

        if (!this.state.paused) {
            this.play();
        }
    }
}
'use strict';

import { formatPlaybackTime } from './utils';
import { handleOffsetParent } from './dom-utils';

export class Audio {
    constructor(node, tracks) {
        this.node = node;
        this.tracks = tracks;
        this.current = this.node.querySelector('source');
        this.description = this.node.querySelector('.mosaic-description');
        this.duration = this.node.querySelector('.mosaic-time-holder');
        this.hover = this.node.querySelector('.mosaic-seek-bar');
        this.nextButton = this.node.querySelector('.mosaic-next');
        this.playButton = this.node.querySelector('.mosaic-play');
        this.playhead = this.node.querySelector('.mosaic-play-bar');
        this.prevButton = this.node.querySelector('.mosaic-previous');
        this.scrubber = false;
        this.source = this.node.querySelector('audio');
        this.sub = 'px';
        this.timeline = this.node.querySelector('.mosaic-progress');
        this.timelineWidth = this.timeline.offsetWidth - this.playhead.offsetWidth;
        this.title = this.node.querySelector('.mosaic-title');

        this.nextButton.addEventListener('click', this.next.bind(this));
        this.playButton.addEventListener('click', this.play.bind(this));
        this.playhead.addEventListener('mousedown', this.mouseDown.bind(this));
        this.prevButton.addEventListener('click', this.previous.bind(this));
        this.source.addEventListener('durationchange', this.returnDuration.bind(this));
        this.source.addEventListener('timeupdate', this.updateTime.bind(this));
        this.source.addEventListener('timeupdate', this.handlePlayhead.bind(this));
        this.timeline.addEventListener('mousedown', this.mouseDown.bind(this));
        this.timeline.addEventListener('mouseover', this.handleHover.bind(this));

        this.source.load();

        window.addEventListener('mouseup', this.mouseUp.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    addHover(e) {
        let positionOffset = handleOffsetParent(this.timeline);
        let newMargLeft = e.pageX - positionOffset;

        if (newMargLeft >= 0 && newMargLeft <= this.timelineWidth) {
            this.hover.style.width = `${newMargLeft}px`;
        }

        if (newMargLeft < 0) {
            this.hover.style.width = '0px';
        }

        if (newMargLeft > this.timelineWidth) {
            this.hover.style.width = `${this.timelineWidth}px`;
        }
    }

    handleClick(e) {
        let positionOffset = handleOffsetParent(this.timeline);

        return (e.pageX - positionOffset) / this.timelineWidth;
    }

    handleHover() {
        this.timeline.addEventListener('mousemove', this.addHover.bind(this), false);
        this.timeline.addEventListener('mouseout', this.removeHover.bind(this), false);
    }

    handlePlayhead() {
        let playPercent = this.timelineWidth * (this.source.currentTime / this.source.duration);
        this.playhead.style.paddingLeft = `${playPercent}px`;
    }

    handleResize() {
        let padding = this.playhead.style.paddingLeft;
        let p;

        !padding ? p = 0 : p = parseInt(padding.substring(0, padding.length - 2), 10);
        this.timelineWidth = (this.timeline.offsetWidth - this.playhead.offsetWidth) + p;
        this.handlePlayhead();
    }

    mouseDown() {
        this.scrubber = true;
        this.source.removeEventListener('timeupdate', this.handlePlayhead.bind(this), false);
    }

    mouseUp(e) {
        if (!this.scrubber) {
            return;
        }

        this.movePlayhead(e);
        window.removeEventListener('mousemove', this.movePlayhead.bind(this), true);
        this.source.currentTime = this.source.duration * this.handleClick(e);
        this.source.addEventListener('timeupdate', this.handlePlayhead.bind(this), false);
        this.scrubber = false;
    }
    movePlayhead(e) {
        let positionOffset = handleOffsetParent(this.timeline);
        let newMargLeft = e.pageX - positionOffset;

        if (newMargLeft >= 0 && newMargLeft <= this.timelineWidth) {
            this.playhead.style.paddingLeft = `${newMargLeft}px`;
        }

        if (newMargLeft < 0) {
            this.playhead.style.paddingLeft = '0px';
        }

        if (newMargLeft > this.timelineWidth) {
            this.playhead.style.paddingLeft = `${this.timelineWidth}px`;
        }
    }

    next() {
        let count = this.current.getAttribute('src')[6];
        let wasPaused = false;

        if (count === this.tracks.length) {
            this.current.setAttribute('src', `audio/${this.tracks[0].src}.mp3`);
            this.title.innerHTML = this.tracks[0].title;
            this.description.innerHTML = this.tracks[0].description;
        } else {
            this.current.setAttribute('src', `audio/${this.tracks[count].src}.mp3`);
            this.title.innerHTML = this.tracks[count].title;
            this.description.innerHTML = this.tracks[count].description;
        }

        if (this.source.paused) {
            wasPaused = true;
        }

        this.source.load();

        if (!wasPaused) {
            this.source.play();
        }

        this.playhead.style.paddingLeft = '0px';
    }

    play() {
        if (this.source.paused) {
            this.source.play();
            this.timeline.classList.toggle('active');
            this.nextButton.classList.toggle('active');
            this.prevButton.classList.toggle('active');
            this.playButton.classList.toggle('active');
            this.playButton.children[0].classList = '';
            this.playButton.children[0].classList = 'fa fa-pause';
        } else {
            this.source.pause();
            this.timeline.classList.toggle('active');
            this.nextButton.classList.toggle('active');
            this.prevButton.classList.toggle('active');
            this.playButton.classList.toggle('active');
            this.playButton.children[0].classList = '';
            this.playButton.children[0].classList = 'fa fa-play';
        }
    }

    previous() {
        let count = this.current.getAttribute('src')[6];
        let wasPaused = false;

        if (count === 1) {
            this.current.setAttribute(
                'src',
                `audio/${this.tracks[this.tracks.length - 1].src}.mp3`
            );
            this.title.innerHTML = this.tracks[this.tracks.length - 1].title;
            this.description.innerHTML = this.tracks[this.tracks.length - 1].description;
        } else {
            this.current.setAttribute(
                'src',
                `audio/${this.tracks[count - 2].src}.mp3`
            );
            this.title.innerHTML = this.tracks[count - 2].title;
            this.description.innerHTML = this.tracks[count - 2].description;
        }

        if (this.source.paused) {
            wasPaused = true;
        }

        this.source.load();

        if (!wasPaused) {
            this.source.play();
        }

        this.playhead.style.paddingLeft = '0px';
    }

    removeHover() {
        this.hover.style.width = '0px';
    }

    returnDuration() {
        this.duration.innerHTML = formatPlaybackTime(this.source.duration);
        this.updateTime();
    }

    updateTime() {
        this.duration.innerHTML =
            `${formatPlaybackTime(this.source.currentTime)} / ${formatPlaybackTime(this.source.duration)}`; // eslint-disable-line max-len

        if (this.source.currentTime === this.source.duration) {
            this.next();
            this.play();
            this.timeline.classList.toggle('active');
            this.nextButton.classList.toggle('active');
            this.prevButton.classList.toggle('active');
            this.playButton.classList.toggle('active');
        }
    }
}

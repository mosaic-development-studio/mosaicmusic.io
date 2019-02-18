import {
    clickScroller,
    distanceFromPageTop,
    documentHeight,
    elementOffsetHeight,
    findCurrentTrackFromNode,
    findIndexOfNextTrack,
    formatPlaybackTime,
    handleOffsetParent,
    isObject,
    scrollToY,
    viewportHeight,
    viewportWidth,
    visibleDocumentHeightPercentage
} from '../../client/js/lib/utils';

describe.skip('clickScroller', () => {
    const mockElementId = 'mock-element';

    document.body.innerHTML = `<div id="${mockElementId}"></div>`;

    const element = document.getElementById(mockElementId);

    jest.mock('../../client/js/lib/utils', () => ({
        scrollToY: jest.fn(targetPixelValue => targetPixelValue)
    }));
    const spy = jest.spyOn(element, 'addEventListener');

    clickScroller(element, 0);
    // expect(scrollToY).toHaveBeenCalledWith(0);

    // expect(spy).toHaveBeenCalledWith('click', () => scrollToY(0));

    spy.mockRestore();
});

describe('distanceFromPageTop', () => {
    it('should return the window.pageYOffset value', () => {
        const mockPageYOffset = 5000;

        Object.defineProperty(window, 'pageYOffset', {
            get: jest.fn().mockImplementationOnce(() => mockPageYOffset)
        });

        expect(distanceFromPageTop()).toBe(mockPageYOffset);
    });
});

describe('documentHeight', () => {
    it('should return the value of the boody offsetHeight', () => {
        const [body, html] = ['body', 'html'].map(node => document.querySelector(node));

        Object.defineProperties(body, {
            offsetHeight: {
                get: jest.fn().mockImplementationOnce(() => 200)
            },
            scrollHeight: {
                get: jest.fn().mockImplementationOnce(() => 300)
            }
        });

        Object.defineProperties(html, {
            clientHeight: {
                get: jest.fn().mockImplementationOnce(() => 50)
            },
            offsetHeight: {
                get: jest.fn().mockImplementationOnce(() => 100)
            },
            scrollHeight: {
                get: jest.fn().mockImplementationOnce(() => 400)
            }
        });

        expect(documentHeight()).toBe(400);
    });
});

describe('elementOffsetHeight', () => {
    it('should return the offsetHeight of the input element', () => {
        const mockElementId = 'mock-element';

        document.body.innerHTML = `<div id="${mockElementId}"></div>`;

        const element = document.getElementById(mockElementId);
        const mockOffsetHeight = 50;

        Object.defineProperty(element, 'offsetHeight', {
            get: jest.fn().mockImplementationOnce(() => mockOffsetHeight)
        });

        expect(elementOffsetHeight(element)).toBe(mockOffsetHeight);
    });
});

describe('findCurrentTrackFromNode', () => {
    it('should return the track object that matches the current audio node source', () => {
        const mockTrackList = [
            {
                src: './audio/1.mp3',
                title: '"Through the Sunken Glades"'
            },
            {
                src: './audio/2.mp3',
                title: '"The Ruined City of Quil"'
            },
            {
                src: './audio/3.mp3',
                title: '"Mable: The Journey"'
            }
        ];
        const mockAudioElementId = 'mock-audio-element';
        const expectedTrack = mockTrackList[1];

        document.body.innerHTML =
            `<audio id="${mockAudioElementId}" src=${expectedTrack.src}></audio>`;

        expect(findCurrentTrackFromNode(
            document.getElementById(mockAudioElementId),
            mockTrackList
        )).toEqual(expectedTrack);
    });
});

describe.skip(findIndexOfNextTrack, () => {});

describe.skip(formatPlaybackTime, () => {});

describe.skip('handleOffsetParent', () => {
    it('should return the combined valuee of all node offset parents', () => {
        document.body.innerHTML = `
            <main id="main">
                <section id="section">
                    <h1 id="header">Title</h1>
                </section>
            </main>
        `;

        const [header, main, section] = [
            'header',
            'main',
            'section'
        ].map(node => document.getElementById(node));
        const mockProps = (offsetLeft, offsetParent) => ({
            offsetLeft: {
                get: jest.fn().mockImplementationOnce(() => offsetLeft)
            },
            offsetParent: {
                get: jest.fn().mockImplementationOnce(() => offsetParent)
            }
        });

        Object.defineProperties(header, { ...mockProps(300, section) });
        Object.defineProperties(section, { ...mockProps(150, main) });
        Object.defineProperties(main, { ...mockProps(50, document.body) });

        expect(handleOffsetParent(header)).toBe(500);
    });
});

describe('isObject', () => {
    it('should return false if input is not an object', () => {
        expect(isObject({})).toBe(true);
    });

    it('should return false if the input is not an object', () => {
        expect(isObject('string')).toBe(false);
        expect(isObject(1)).toBe(false);
        expect(isObject(() => {})).toBe(false);
        expect(isObject([])).toBe(false);
        expect(isObject(null)).toBe(false);
        expect(isObject(undefined)).toBe(false);
        expect(isObject(NaN)).toBe(false);
    });
});

describe.skip('scrollToY', () => {
    expect(scrollToY);
});

describe.skip('viewportHeight', () => {
    Object.defineProperty(document, 'documentElement', {
        clientHeight: { get: jest.fn().mockImplementationOnce(() => 200)}
    });

    Object.defineProperty(window, 'innerWidth', {
        get: jest.fn().mockImplementationOnce(() => 100)
    });

    expect(viewportHeight()).toBe(200);
});

describe.skip('viewportWidth', () => {
    expect(viewportWidth);
});

describe.skip('visibleDocumentHeightPercentage', () => {
    expect(visibleDocumentHeightPercentage);
});
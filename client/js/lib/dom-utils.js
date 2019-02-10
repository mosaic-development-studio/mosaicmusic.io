export const distanceFromPageTop = () => window.pageYOffset;

export const documentHeight = () => {
    const body = document.querySelector('body');
    const html = document.querySelector('html');

    return Math.max(
        body.offsetHeight,
        body.scrollHeight,
        html.clientHeight,
        html.offsetHeight,
        html.scrollHeight
    );
};

export const elementOffsetHeight = element => element.offsetHeight;

export const handleOffsetParent = node => {
    let n = node;
    let o = 0;

    while (n.offsetParent !== null) {
        o = o + n.offsetLeft;
        n = n.offsetParent;
    }

    return o;
};

const viewportHeight = () => Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

export const visibleDocumentHeightPercentage = () => {
    return viewportHeight() / documentHeight();
};

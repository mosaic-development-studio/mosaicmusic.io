export const scrollToY = (targetPixelYValue = 0, speed = 200, easing = 'easeOutSine') => {
    const scrollY = window.scrollY;
    const time = Math.max(0.1, Math.min(Math.abs(scrollY - targetPixelYValue) / speed, 0.8));

    let currentTime = 0;

    const easingEquations = {
        easeOutSine: pos => Math.sin(pos * (Math.PI / 2)),
        easeInOutSine: pos => -0.5 * (Math.cos(Math.PI * pos) - 1),
        easeInOutQuint: pos => (pos /= 0.5) < 1
            ? 0.5 * Math.pow(pos, 5)
            : 0.5 * (Math.pow((pos - 2), 5) + 2)
    };

    const animationLoop = () => {
        currentTime += 1 / 60;

        const p = currentTime / time;
        const t = easingEquations[easing](p);

        if (p < 1) {
            window.requestAnimationFrame(animationLoop);
            window.scrollTo(0, scrollY + ((targetPixelYValue - scrollY) * t));
        }

        else {
            window.scrollTo(0, targetPixelYValue);
        }
    };

    animationLoop();
};
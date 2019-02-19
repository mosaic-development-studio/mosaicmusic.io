import { audioInitializer } from './components/audio';
import { clickScroller } from './lib/utils';
import { scrollbarInitializer } from './components/scrollbar';

import { Scrollbar } from './components/scrollbar/Scrollbar';

Scrollbar.initialize(document.querySelector('.mosaic-scroll-bar'));

// const initializeApplication = () => {
//     audioInitializer(document.querySelector('.mosaic-player'));
//     clickScroller(document.getElementById('mosaic-footer-logo'), 0);
//     scrollbarInitializer(
//         document.querySelector('.mosaic-scroll-bar'),
//         document.querySelector('.mosaic-scroll-bar-scroller')
//     );
// };

// window.addEventListener('load', initializeApplication);
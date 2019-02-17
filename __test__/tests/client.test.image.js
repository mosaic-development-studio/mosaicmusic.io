import puppeteer from 'puppeteer';
import { SCREEN_SIZES } from '../constants';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('Client style regression tests', () => {
    const TEST_CASES = Object.keys(SCREEN_SIZES).reduce((testCases, key) => {
        return [
            ...testCases,
            {
                dimensions: SCREEN_SIZES[key],
                scenario: `that ${key.toLowerCase()} styles have not changed`
            }
        ];
    }, []);

    for (const { dimensions, scenario } of TEST_CASES) {
        test(scenario, async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto('http://localhost:3000', {
                timeout: 5000,
                waitUntil: 'networkidle0'
            });
            await page.setViewport(dimensions);

            const screenshot = await page.screenshot({ fullPage: true });

            await browser.close();

            expect.assertions(1);
            expect(screenshot).toMatchImageSnapshot();
        });
    }
});
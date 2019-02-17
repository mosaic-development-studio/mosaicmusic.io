const fs = require('fs');

describe('Client HTML snapshot', () => {
    it('should match the existing client snapshot', () => {
        const snapshot = JSON.stringify(
            fs.readFileSync(process.cwd() + '/dist/index.html', 'utf-8')
        );

        expect(snapshot).toMatchSnapshot();
    });
});
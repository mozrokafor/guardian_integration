const { test, expect } = require('@playwright/test');
const { supportedLocales } = require('../fixtures/locales')

// C1538755 - Verify that PN and TOS are translated for each one of the new regions 
test.describe('guardian basics, C1538755', () => {    
    test.use({ viewport: { width: 1980, height: 1080 } });
    for (const locale of supportedLocales){
        test.beforeEach(async ({ page }) => {    
          await page.goto(`https://www.mozilla.org/${locale.lang}/products/vpn/?geo=${locale.geo}`, { waitUntil: 'networkidle' })  
        });

        test(`Verify locale handling in ${locale.name} for terms`, async ({ page }) => { 
            const termsLink = page.locator('.vpn-footer-list > li:nth-child(2) > a:nth-child(1)')            
            await Promise.all([termsLink.click(), page.waitForNavigation({ waitUntil: 'networkidle' })])  
            const mainSection = page.locator('section h1')                                 
            expect(await mainSection.screenshot()).toMatchSnapshot(`${locale.name}-terms.png`);
        });
     }
});
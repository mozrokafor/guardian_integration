const { test, expect } = require('@playwright/test');
const { supportedLocales } = require('../fixtures/locales')

// C1538755 - Verify that PN and TOS are translated for each one of the new regions 
test.describe('guardian basics', () => {    
    test.use({ viewport: { width: 1980, height: 1080 } });
    for (const locale of supportedLocales){
        test.beforeEach(async ({ page }) => {    
          await page.goto(`https://www.mozilla.org/${locale.lang}/products/vpn/?geo=${locale.geo}`, { waitUntil: 'networkidle' })  
        });

        test(`Verify locale handling in ${locale.name} for payment page`, async ({ page }, testInfo) => { 
            const monthPlanButton = page.locator('a.js-vpn-cta-link:nth-child(4)')            
            await Promise.all([monthPlanButton.click(), page.waitForNavigation({ waitUntil: 'networkidle' })])   
            const expectedUrl = testInfo.project.use.defaultBrowserType === 'firefox' ? "https://accounts.firefox.com/subscriptions/" : "https://subscriptions.firefox.com/checkout"            
            expect(page.url()).toContain(expectedUrl)
        });
     }
});
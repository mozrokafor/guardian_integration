// @ts-check
const { test, expect } = require('@playwright/test');

const supportedLocales = [
    { lang: 'de', geo: 'at', name: 'Austria' }, // currently returns USD instead of EURO
    { lang: 'nl', geo: 'be', name: 'Belgium' },
    { lang: 'en-US', geo: 'ca', name: 'Canada' },
    { lang: 'de', geo: 'ch', name: 'Switzerland',  },
    { lang: 'de', geo: 'de', name: 'Germany'  },
    { lang: 'es-US', geo: 'es', name: 'Spain' },
    { lang: 'fr', geo: 'fr', name: 'France'  },
    { lang: 'en-US', geo: 'gb', name: 'UK' }, // shouldn't this be in pounds?
    { lang: 'it', geo: 'it', name: 'Italy' },
    { lang: 'en-US', geo: 'my', name: 'Malaysia' },
    { lang: 'en-US', geo: 'nz', name: 'New Zealand' },
    { lang: 'en-US', geo: 'sg', name: 'Singapore' },
    { lang: 'en-US', geo: 'US', name: 'United States' },
]

// C1538755 - Verify that PN and TOS are translated for each one of the new regions 
test.describe('guardian basics', () => {    
    test.use({ viewport: { width: 1980, height: 1080 } });
    for (const locale of supportedLocales){
        test.beforeEach(async ({ page }) => {    
          await page.goto(`https://www.mozilla.org/${locale.lang}/products/vpn/?geo=${locale.geo}`, { waitUntil: 'networkidle' })  
        });

        test(`Verify locale handling in ${locale.name} for privacy notice`, async ({ page }) => { 
            const privacyLink = page.locator('.vpn-footer-list > li:nth-child(1) > a:nth-child(1)')            
            await Promise.all([privacyLink.click(), page.waitForNavigation({ waitUntil: 'networkidle' })])                         
            expect(await page.screenshot()).toMatchSnapshot(`${locale.name}-privacy.png`);
        });
     }
});
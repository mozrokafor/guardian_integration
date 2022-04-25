// @ts-check
const { test, expect } = require('@playwright/test');

const supportedLocales = [
    { lang: 'de', geo: 'at', name: 'Austria', expect: 'US$4.99/Monat' }, // currently returns USD instead of EURO
    { lang: 'nl', geo: 'be', name: 'Belgium', expect: 'US$4.99/maand' },
    { lang: 'en-US', geo: 'ca', name: 'Canada', expect: 'US$4.99/month' },
    { lang: 'de', geo: 'ch', name: 'Switzerland', expect: 'US$4.99/Monat' },
    { lang: 'de', geo: 'de', name: 'Germany', expect: 'US$4.99/Monat' },
    { lang: 'es-US', geo: 'es', name: 'Spain', expect: 'US$4.99/month' },
    { lang: 'fr', geo: 'fr', name: 'France', expect: 'US$4.99/mois' },
    { lang: 'en-US', geo: 'gb', name: 'UK', expect: 'US$4.99/month' }, // shouldn't this be in pounds?
    { lang: 'it', geo: 'it', name: 'Italy', expect: 'US$4.99 al mese' },
    { lang: 'en-US', geo: 'my', name: 'Malaysia', expect: 'US$4.99/month' },
    { lang: 'en-US', geo: 'nz', name: 'New Zealand', expect: 'US$4.99/month' },
    { lang: 'en-US', geo: 'sg', name: 'Singapore', expect: 'US$4.99/month' },
    { lang: 'en-US', geo: 'US', name: 'United States', expect: 'US$4.99/month' },
]

// C1538755 - Verify that PN and TOS are translated for each one of the new regions 
test.describe('guardian basics', () => {    
    for (const locale of supportedLocales){
        test.use({ viewport: { width: 1980, height: 1080 } });
        test.beforeEach(async ({ page }) => {    
          await page.goto(`https://www.mozilla.org/${locale.lang}/products/vpn/?geo=${locale.geo}`, { waitUntil: 'networkidle' })  
        });

        test(`Verify locale handling in ${locale.name} for privacy notice`, async ({ page }) => { 
            const privacyLink = page.locator('.vpn-footer-list > li:nth-child(1) > a:nth-child(1)')            
            await Promise.all([privacyLink.click(), page.waitForNavigation()])             
            expect(await page.screenshot()).toMatchSnapshot(`${locale.name}-privacy.png`, { threshold: 0.7 });
        });

        test(`Verify locale handling in ${locale.name} for terms`, async ({ page }) => { 
            const termsLink = page.locator('.vpn-footer-list > li:nth-child(2) > a:nth-child(1)')            
            await Promise.all([termsLink.click(), page.waitForNavigation()])                         
            expect(await page.screenshot()).toMatchSnapshot(`${locale.name}-terms.png`, { threshold: 0.7 });
        });

        test(`Verify locale handling in ${locale.name} for payment page`, async ({ page }) => { 
            const monthPlanButton = page.locator('a.js-vpn-cta-link:nth-child(4)')            
            await Promise.all([monthPlanButton.click(), page.waitForNavigation()])                         
            expect(await page.screenshot()).toMatchSnapshot(`${locale.name}-terms.png`, { threshold: 0.7 });
        });
     }
});
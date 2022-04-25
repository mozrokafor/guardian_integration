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

test.describe('guardian localization by ip addresses', () => {
    for (const locale of supportedLocales){
        test.describe(`${locale.name} - https://www.mozilla.org/${locale.lang}/products/vpn/?geo=${locale.geo}`, () => {  
            test.beforeEach(async ({ page, context }) => {
                // await context.grantPermissions
                await context.grantPermissions(['geolocation']);
                await context.setGeolocation({ longitude: 2.268510, latitude: 48.884831 });    
                // browserContext.grantPermissions(permissions[, options])
                // await page.goto(`https://maps.google.com`, { waitUntil: 'networkidle' });
                await page.goto(`https://www.mozilla.org/products/vpn/`, { waitUntil: 'networkidle' });
                // await page.locator('#mylocation').click()
            });

            test(`Verify locale handling in ${locale.timezoneId}`, async ({ page }) => { 
                await page.pause()
                const monthPlanPrice = page.locator('#pricing .vpn-monthly-price-display').first()
                const actualPrice = await monthPlanPrice.textContent()
                expect(actualPrice, `${actualPrice} for ${locale.name} did not match expected ${locale.expect}`).toEqual(locale.expect)
            });
        });        
    }
});
// @ts-check
const { test, expect } = require('@playwright/test');
const { supportedLocalesWithCurrency } = require('../fixtures/locales')

// C1538754 - Verify that 3 subscriptions plans are displayed correctly in VPN homepage for each of the new regions
// C1601703 -  Verify that pricing and currency are displayed correctly in VPN homepage for each of the new regions
test.describe('guardian localization by urls', () => {
    for (const locale of supportedLocalesWithCurrency){
        test.describe(`${locale.name} - https://www.mozilla.org/${locale.lang}/products/vpn/?geo=${locale.geo}`, () => {            
            test.beforeEach(async ({ page }) => {
                await page.goto(`https://www.mozilla.org/${locale.lang}/products/vpn/?geo=${locale.geo}`, { waitUntil: 'networkidle' });
            });

            test(`Verify locale handling in ${locale.timezoneId}`, async ({ page }) => { 
                const pricingTables = await page.locator('#pricing .vpn-content-block').count()      
                expect(pricingTables).toEqual(3)

                const monthPlanPrice = page.locator('#pricing .vpn-monthly-price-display').first()
                const actualPrice = await monthPlanPrice.textContent()
                expect(actualPrice, `${actualPrice} for ${locale.name} did not match expected ${locale.expect}`).toEqual(locale.expect)
            });
        });        
    }
});
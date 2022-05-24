const { test, expect } = require('@playwright/test')
const { supportedLocalesWithCurrency } = require('../fixtures/locales')

const baseURL = process.env.TEST_EXPECT_URL

test.describe.configure({ mode: 'parallel' })

// C1538754 - Verify that 3 subscriptions plans are displayed correctly in VPN homepage for each of the new regions
// C1601703 -  Verify that pricing and currency are displayed correctly in VPN homepage for each of the new regions
test.describe('guardian localization by urls, C1538754, C1601703', () => {
  for (const locale of supportedLocalesWithCurrency) {
    test.describe(
      `${locale.name} - ${baseURL}/${locale.lang}/products/vpn/?geo=${locale.geo}`,
      () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(`${baseURL}/${locale.lang}/products/vpn/?geo=${locale.geo}`, {
            waitUntil: 'networkidle',
          })
        })

        test(`Verify locale handling in ${locale.name}`, async ({ page }) => {
          const pricingTables = await page.locator('#pricing .vpn-content-block').count()
          expect(pricingTables).toEqual(3)

          const monthPlanPrice = page.locator('#pricing .vpn-monthly-price-display').first()
          const actualPrice = await monthPlanPrice.textContent()
          expect(
            actualPrice,
            `${actualPrice} for ${locale.name} did not match expected ${locale.expect}`,
          ).toEqual(locale.expect)
        })
      },
    )
  }
})

const { test, expect } = require('@playwright/test')
const { supportedLocales } = require('../fixtures/locales')

const baseUrl = process.env.TEST_EXPECT_URL

test.describe.configure({ mode: 'parallel' })

// C1538755 - Verify that PN and TOS are translated for each one of the new regions
test.describe('guardian basics - terms, C1538755', () => {
  test.use({ viewport: { width: 1980, height: 1080 } })
  for (const locale of supportedLocales) {
    test.describe(`terms locale check for ${locale.name}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`${baseUrl}/${locale.lang}/products/vpn/?geo=${locale.geo}`, {
          waitUntil: 'networkidle',
        })
      })

      test(`Verify locale handling in ${locale.name} for terms`, async ({ page }) => {
        const termsLink = page.locator('.vpn-footer-list > li:nth-child(2) > a:nth-child(1)')
        await Promise.all([termsLink.click(), page.waitForNavigation({ waitUntil: 'networkidle' })])
        const termsTitle = await page.locator('section h1').textContent()
        expect(termsTitle).toContain(locale.expectedTermsTitle)
      })
    })
  }
})

const { test, expect } = require('@playwright/test')
const { supportedLocales } = require('../fixtures/locales')

const baseUrl = process.env.TEST_EXPECT_URL

test.describe.configure({ mode: 'parallel' })

// C1538755 - Verify that PN and TOS are translated for each one of the new regions
test.describe('guardian basics - privacy, C1538755', () => {
  test.use({ viewport: { width: 1980, height: 1080 } })
  for (const locale of supportedLocales) {
    test.describe('Checking locales for different langs and geos', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`${baseUrl}/${locale.lang}/products/vpn/?geo=${locale.geo}`, {
          waitUntil: 'networkidle',
        })
      })

      test(`Verify locale handling in ${locale.name} for privacy notice`, async ({ page }) => {
        const privacyLink = page.locator('.vpn-footer-list > li:nth-child(1) > a:nth-child(1)')
        await Promise.all([
          privacyLink.click(),
          page.waitForNavigation({ waitUntil: 'networkidle' }),
        ])
        const privacyTitle = await page.locator('.privacy-title').textContent()
        expect(privacyTitle).toContain(locale.expectedPrivacyTitle)
      })
    })
  }
})

const { test, expect } = require('@playwright/test')
const { supportedLocales } = require('../fixtures/locales')
const { allure } = require('allure-playwright')
const { getRequest } = require('../utils/helpers')
const { envVariables } = require('../fixtures/envVariables')

let GuardianSpecs
test.describe.configure({ mode: 'parallel' })

envVariables.forEach(env => {
  const baseUrl = env.TEST_EXPECT_URL

  test.describe(`guardian basics ${env.TEST_ENV} - terms, C1538755`, () => {
    test.beforeAll(async () => {
      const _res = await getRequest(`${env.TEST_BASE_URL}/__version__`)
      GuardianSpecs = _res
    })

    for (const locale of supportedLocales) {
      test.describe(`terms locale check for ${locale.name}`, () => {
        test.beforeEach(async ({ page }) => {
          allure.suite(
            `${env.TEST_ENV} - Version: ${GuardianSpecs.version}, Commit: ${GuardianSpecs.commit}`,
          )
          await page.goto(`${baseUrl}/${locale.lang}/products/vpn/?geo=${locale.geo}`, {
            waitUntil: 'networkidle',
          })
        })

        test(`Verify locale handling in ${locale.name} for terms`, async ({ page }) => {
          const termsLink = page.locator('.vpn-footer-list > li:nth-child(2) > a:nth-child(1)')
          await Promise.all([
            termsLink.click(),
            page.waitForNavigation({ waitUntil: 'networkidle' }),
          ])
          const termsTitle = await page.locator('section h1').textContent()
          expect(termsTitle).toContain(locale.expectedTermsTitle)
        })
      })
    }
  })
})

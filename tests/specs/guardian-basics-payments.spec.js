const { test, expect } = require('@playwright/test')
const { allure } = require('allure-playwright')
const { getRequest } = require('../utils/helpers')
const { envVariables } = require('../fixtures/envVariables')
const { supportedLocales } = require('../fixtures/locales')

let GuardianSpecs
test.describe.configure({ mode: 'parallel' })

envVariables.forEach(env => {
  const baseUrl = env.TEST_EXPECT_URL

  test.beforeAll(async () => {
    const _res = await getRequest(`${env.TEST_BASE_URL}/__version__`)
    GuardianSpecs = _res
  })

  // C1538755 - Verify that PN and TOS are translated for each one of the new regions
  test.skip(`${env.TEST_ENV} - guardian basics - payments, C1538755`, () => {
    test.use({ viewport: { width: 1980, height: 1080 } })
    for (const locale of supportedLocales) {
      test.describe(`guardian payments locale check for ${locale.name}`, () => {
        test.beforeEach(async ({ page }) => {
          allure.suite(
            `${env.TEST_ENV} - Version: ${GuardianSpecs.version}, Commit: ${GuardianSpecs.commit}`,
          )
          await page.goto(`${baseUrl}/${locale.lang}/products/vpn/?geo=${locale.geo}`, {
            waitUntil: 'networkidle',
          })
        })

        test(`Verify locale handling in ${locale.name} for payment page`, async ({
          page,
        }, testInfo) => {
          const monthPlanButton = page.locator('a.js-vpn-cta-link:nth-child(4)')
          await Promise.all([
            monthPlanButton.click(),
            page.waitForNavigation({ waitUntil: 'networkidle' }),
          ])

          const expectedUrl =
            testInfo.project.use.defaultBrowserType === 'firefox'
              ? 'accounts.firefox.com'
              : 'subscriptions.firefox.com'
          expect(page.url()).toContain(expectedUrl)
        })
      })
    }
  })
})

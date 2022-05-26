const { test, expect } = require('@playwright/test')
const { verifyRedirectUrl } = require('../utils/helpers')
const { allure } = require('allure-playwright')

const baseUrl = process.env.TEST_BASE_URL
const expectedBaseUrl = process.env.TEST_EXPECT_URL

test.describe.configure({ mode: 'parallel' })

test.describe('guardian redirects', () => {
  test.describe(`redirects for ${baseUrl} origin`, () => {
    test(`Verify redirect for ${baseUrl}, C1538764`, async ({ page }) => {
      const givenBaseUrl =
        process.env.TEST_ENV === 'stage'
          ? `${baseUrl}/vpn/invite/success`
          : `${expectedBaseUrl}/products/vpn`
      const givenExpectedUrl =
        process.env.TEST_ENV === 'stage'
          ? `${expectedBaseUrl}/en-US/products/vpn/invite/`
          : `${expectedBaseUrl}/en-US/products/vpn/`
      await verifyRedirectUrl(page, givenBaseUrl, givenExpectedUrl)
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/invite, C1539666`, async ({ page }) => {
      if (process.env.TEST_ENV === 'prod') {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/vpn/invite`,
          `${expectedBaseUrl}/en-US/products/vpn/invite/`,
        )
      }
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/invite/success, C1539667`, async ({ page }) => {
      const givenBaseUrl =
        process.env.TEST_ENV === 'stage'
          ? `${baseUrl}/vpn/invite/success`
          : `${baseUrl}/r/vpn/invite/success`

      const expectedUrl =
        process.env.TEST_ENV === 'stage'
          ? `${expectedBaseUrl}/en-US/products/vpn/invite/`
          : `${baseUrl}/r/vpn/invite/success`

      await verifyRedirectUrl(page, givenBaseUrl, expectedUrl)
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/subscribe, C1539668`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/subscribe`,
        `${expectedBaseUrl}/en-US/products/vpn/#pricing`,
      )
    })
  })

  test.describe('Misc redirects', () => {
    test(`Verify redirect for ${baseUrl}/r/vpn/client/feedback, C1539670`, async ({ page }) => {
      if (process.env.TEST_ENV === 'prod') {
        await page.goto(`${baseUrl}/r/vpn/client/feedback`, { waitUntil: 'networkidle' })

        expect(page.url()).toContain('surveygizmo.com')
      }
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/account, C1539671`, async ({ page }) => {
      const givenExpectedUrl =
        process.env.TEST_ENV === 'stage'
          ? 'https://accounts.stage.mozaws.net/'
          : 'https://accounts.firefox.com/'

      await verifyRedirectUrl(page, `${baseUrl}/r/vpn/account`, givenExpectedUrl)
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/subscription, C1539672`, async ({
      page,
    }, testInfo) => {
      const expectedUrl =
        process.env.TEST_ENV === 'stage'
          ? 'https://accounts.stage.mozaws.net/'
          : 'https://accounts.firefox.com/'
      const givenExpectedUrl =
        testInfo.project.use.defaultBrowserType === 'firefox'
          ? `${expectedUrl}subscriptions/`
          : `${expectedUrl}`
      await verifyRedirectUrl(page, `${baseUrl}/r/vpn/subscription`, givenExpectedUrl)
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/support, C1539673`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/support`,
        'https://support.mozilla.org/en-US/users/auth?next=%2Fen-US%2Fquestions%2Fnew%2Ffirefox-private-network-vpn%2Fform',
      )
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/subscriptionBlocked, C1539674`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/subscriptionBlocked`,
        'https://support.mozilla.org/en-US/users/auth?next=%2Fen-US%2Fquestions%2Fnew%2Ffirefox-private-network-vpn%2Fform',
      )
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/contact, C1539675`, async ({ page }, testInfo) => {
      const expectedUrl =
        testInfo.project.use.defaultBrowserType === 'firefox'
          ? 'https://accounts.firefox.com/support'
          : 'https://accounts.firefox.com/'
      await verifyRedirectUrl(page, `${baseUrl}/r/vpn/contact`, expectedUrl)
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/terms, C1539676`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/terms`,
        'https://www.mozilla.org/en-US/about/legal/terms/mozilla-vpn/',
      )
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/, C1539677`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/privacy`,
        'https://www.mozilla.org/en-US/privacy/mozilla-vpn/',
      )
    })
  })

  test.describe('download redirects', () => {
    test(`Verify redirect for ${baseUrl}/r/vpn/download/linux, C1539669`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/download/linux`,
        'https://support.mozilla.org/en-US/kb/how-install-mozilla-vpn-linux-computer',
      )
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/update/linux, C1539669`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/update/linux`,
        'https://support.mozilla.org/en-US/kb/how-install-mozilla-vpn-linux-computer',
      )
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/update/macos, C1539669`, async ({ page }) => {
      await verifyRedirectUrl(page, `${baseUrl}/r/vpn/update/macos`, `${baseUrl}/vpn/download`)
    })

    test('Verify redirect for ${baseUrl}/r/vpn/update/windows, C1539669', async ({ page }) => {
      await verifyRedirectUrl(page, `${baseUrl}/r/vpn/update/windows`, `${baseUrl}/vpn/download`)
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/update/ios, C1539669`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/update/ios`,
        'https://apps.apple.com/us/app/firefox-private-network-vpn/id1489407738',
      )
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/update/android, C1539669`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/update/android`,
        'https://play.google.com/store/apps/details?id=org.mozilla.firefox.vpn',
      )
    })
  })
})

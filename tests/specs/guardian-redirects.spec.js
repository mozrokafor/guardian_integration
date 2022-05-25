const { test, expect } = require('@playwright/test')
const { verifyRedirectUrl } = require('../utils/helpers')

const baseUrl = 'https://vpn.mozilla.org'
const expectedBaseUrl = 'https://www.mozilla.org'

test.describe.configure({ mode: 'parallel' })

test.describe('guardian redirects', () => {
  test.describe(`redirects for ${baseUrl} origin`, () => {
    test(`Verify redirect for ${baseUrl}, C1538764`, async ({ page }) => {
      console.log('env', process.env.TEST_ENV)
      expect(process.env.baseUrl).toEqual('baseurle')
      await verifyRedirectUrl(
        page,
        `${expectedBaseUrl}/products/vpn`,
        `${expectedBaseUrl}/en-US/products/vpn/`,
      )
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/invite, C1539666`, async ({ page }) => {
      expect(process.env.expectedBaseUrl).toEqual('expectedurldf2')

      if (process.env.TEST_ENV === 'prod') {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/vpn/invite`,
          `${expectedBaseUrl}/en-US/products/vpn/invite/`,
        )
      }
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/invite/success, C1539667`, async ({ page }) => {
      expect(JSON.stringify(process.env)).toEqual('process.env')

      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/invite/success`,
        `${baseUrl}/r/vpn/invite/success`,
      )
    })

    // doesn't exist anymore, verify
    test.skip(`Verify redirect for ${baseUrl}/r/vpn/subscribe, C1539668`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/subscribe`,
        `${baseUrl}/en-US/products/vpn/#pricing`,
      )
    })
  })

  test.describe('Misc redirects', () => {
    test(`Verify redirect for ${baseUrl}/r/vpn/client/feedback, C1539670`, async ({ page }) => {
      await page.goto(`${baseUrl}/r/vpn/client/feedback`, { waitUntil: 'networkidle' })
      expect(JSON.stringify(process.env.TEST_ENV)).toEqual('test_env')

      expect(page.url()).toContain('surveygizmo.com')
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/account, C1539671`, async ({ page }) => {
      await verifyRedirectUrl(page, `${baseUrl}/r/vpn/account`, 'https://accounts.firefox.com/')
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/subscription, C1539672`, async ({
      page,
    }, testInfo) => {
      const expectedUrl =
        testInfo.project.use.defaultBrowserType === 'firefox'
          ? 'https://accounts.firefox.com/subscriptions/'
          : 'https://accounts.firefox.com/'
      await verifyRedirectUrl(page, `${baseUrl}/r/vpn/subscription`, expectedUrl)
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
        `${expectedBaseUrl}/en-US/about/legal/terms/mozilla-vpn/`,
      )
    })

    test(`Verify redirect for ${baseUrl}/r/vpn/, C1539677`, async ({ page }) => {
      await verifyRedirectUrl(
        page,
        `${baseUrl}/r/vpn/privacy`,
        `${expectedBaseUrl}/en-US/privacy/mozilla-vpn/`,
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

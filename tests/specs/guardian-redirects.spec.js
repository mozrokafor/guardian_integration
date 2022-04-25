// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('guardian redirects', () => {
    
    test.describe('redirects to mozilla.org', () => {    
        test('Verify redirect for https://vpn.mozilla.org', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://www.mozilla.org/en-US/products/vpn/')
        }); 
        
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/invite', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/invite', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://vpn.mozilla.org/r/vpn/invite')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/invite/success', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/invite/success', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://vpn.mozilla.org/r/vpn/invite/success')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/subscribe', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/subscribe', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://www.mozilla.org/en-US/products/vpn/#pricing')
        });
    })

    test.describe('Misc redirects', () => {
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/client/feedback', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/client/feedback', { waitUntil: 'networkidle' });
            expect(page.url()).toContain('surveygizmo.com')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/account', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/account', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://accounts.firefox.com/')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/subscription', async ({ page }, testInfo) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/subscription', { waitUntil: 'networkidle' });
            const expectedUrl = testInfo.project.use.defaultBrowserType === 'firefox' ? "https://accounts.firefox.com/subscriptions/" : "https://accounts.firefox.com/"
            checkRedirect(page, expectedUrl)
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/support', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/support', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://support.mozilla.org/en-US/users/auth?next=%2Fen-US%2Fquestions%2Fnew%2Ffirefox-private-network-vpn%2Fform')
        });
    
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/subscriptionBlocked', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/subscriptionBlocked', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://support.mozilla.org/en-US/users/auth?next=%2Fen-US%2Fquestions%2Fnew%2Ffirefox-private-network-vpn%2Fform')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/contact', async ({ page }, testInfo) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/contact', { waitUntil: 'networkidle' });
            const expectedUrl = testInfo.project.use.defaultBrowserType === 'firefox' ? "https://accounts.firefox.com/support" : "https://accounts.firefox.com/"
            checkRedirect(page, expectedUrl)
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/terms', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/terms', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://www.mozilla.org/en-US/about/legal/terms/mozilla-vpn/')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/privacy', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/privacy', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://www.mozilla.org/en-US/privacy/mozilla-vpn/')
        });
    })

    test.describe('download redirects', () => {
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/download/linux', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/download/linux', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://support.mozilla.org/en-US/kb/how-install-mozilla-vpn-linux-computer')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/update/linux', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/update/linux', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://support.mozilla.org/en-US/kb/how-install-mozilla-vpn-linux-computer')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/update/macos', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/update/macos', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://vpn.mozilla.org/vpn/download')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/update/windows', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/update/windows', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://vpn.mozilla.org/vpn/download')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/update/ios', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/update/ios', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://apps.apple.com/us/app/firefox-private-network-vpn/id1489407738')
        });
    
        test('Verify redirect for https://vpn.mozilla.org/r/vpn/update/android', async ({ page }) => {
            await page.goto('https://vpn.mozilla.org/r/vpn/update/android', { waitUntil: 'networkidle' });
            checkRedirect(page, 'https://play.google.com/store/apps/details?id=org.mozilla.firefox.vpn')
        });
    })

});

async function checkRedirect(page, expectedUrl) {  
    await expect(page.url()).toEqual(expectedUrl);
}
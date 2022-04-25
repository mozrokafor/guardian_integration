// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('guardian integration', () => {    
    test.describe('has sbuscription should redirect to downloads page', () => {   
        test.beforeEach(async ({ page }) => {    
            await page.goto('https://vpn.mozilla.org/vpn/', { waitUntil: 'domcontentloaded' })  
          });         
        test.skip('Should be able to login to VPN', async ({ page }, context) => {            
            if(context.project.name == 'webkit'){
                await Promise.all([page.locator('#c-navigation-items >> text=Already a subscriber?').click(), page.waitForNavigation()])
                expect(page.url()).toContain('https://vpn.mozilla.org/vpn/download')
            }            
        });
     });


     test.describe('has sbuscription should be about to login', () => {   
        test.beforeEach(async ({ page }) => {    
            await page.goto('https://accounts.firefox.com/oauth/signin?client_id=e6eb0d1e856335fc&redirect_uri=https%3A%2F%2Ffpn.firefox.com%2Foauth%2Fsuccess&response_type=code&state=pkce2-85087fb9943f7f46aee2d51bd4b0f94e00cbb993a9b73648050236aac191d51afb47a44e71f592b6&scope=profile%2Bhttps%3A%2F%2Fidentity.mozilla.com%2Faccount%2Fsubscriptions%2Fiap%2Bhttps%3A%2F%2Fidentity.mozilla.com%2Faccount%2Fsubscriptions&access_type=offline&action=email&referrer=https%3A%2F%2Fwww.mozilla.org%2F&utm_campaign=vpn-product-page&utm_medium=referral&utm_source=www.mozilla.org-vpn-product-page&device_id=54f9ce2dd7a745e4a619d20932f01d02&flow_begin_time=1650231824386&flow_id=60b1268c6b8a564f16a67b0464d386dcc6d54c615a4389f068b3f1f26a508b06&user_agent=MozillaVPN%2F2.7.1%2B(sys%3Aosx%2B12.0)', { waitUntil: 'domcontentloaded' })  
          });         
        test('Should be able to login to VPN via website', async ({ page }, context) => {  
            // page.on('request', request => console.log('>>', request.method(), request.url()));
            // page.on('response', response => console.log('<<', response.status(), response.url()));

            await page.locator('.email').fill('${{ secrets.testUserEmail }}')            
            await page.locator('#submit-btn').click()
            await page.locator('#password').fill('${{ secrets.testUserPassword }}')
            await Promise.all([page.locator('#submit-btn').click(), page.waitForNavigation()])
            // await page.pause();
        });
     });

});


// @ts-check
const { test, expect } = require('@playwright/test');
const { delay } = require('../utils/helpers');

test.describe('guardian integration', () => {    
    test.describe('has sbuscription should redirect to downloads page', () => {   
        test.beforeEach(async ({ page }) => {    
            await page.goto('https://vpn.mozilla.org/vpn/', { waitUntil: 'domcontentloaded' })  
          });         
        test('Should be able to login to VPN', async ({ page }, context) => {            
            if(context.project.name == 'webkit'){
                await Promise.all([page.locator('#c-navigation-items >> text=Already a subscriber?').click(), page.waitForNavigation()])
                expect(page.url()).toContain('https://vpn.mozilla.org/vpn/download')
            }            
        });
     });


     test.describe('has a valid subscription', () => {   
        test.beforeEach(async ({ page }) => {    
            await page.goto('https://www.mozilla.org/en-US/products/vpn/', { waitUntil: 'domcontentloaded' })
         });         
        
        test('Should be able to login to VPN via website', async ({ page }) => {                      
            await Promise.all([page.locator('a.js-vpn-cta-link:nth-child(4)').click(), page.waitForNavigation({ waitUntil: 'networkidle' })])                          
            await Promise.all([page.locator('.sign-in-copy > a:nth-child(1)').click(), page.waitForNavigation({ waitUntil: 'networkidle' })])
            // page.on('request', request => console.log('>>', request.method(), request.url()));
            // page.on('response', response => console.log('<<', response.status(), response.url()));
         
            await page.locator('.email').fill('rokafor@mozilla.com')            
            await page.locator('#submit-btn').click()            
            await page.locator('#password').fill('1#TestAccount')
            await Promise.all([page.locator('#submit-btn').click(), page.waitForNavigation({ waitUntil: 'networkidle' })])
            expect(page.url()).toContain('accounts.firefox.com')            
        });
     });

});


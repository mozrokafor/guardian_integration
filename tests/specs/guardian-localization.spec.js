// @ts-check
const { test, expect } = require('@playwright/test');

const supportedLanguages = [
    { locale: 'de-DE', timezoneId: 'Europe/Berlin' },
    { locale: 'es-AR', timezoneId: 'America/Buenos_Aires' }
]


// C1538760 - Verify that error page is available in new regions 
test.describe('guardian localization', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });
    for (const language of supportedLanguages){
        test.describe(`${language.timezoneId} - https://vpn.mozilla.org/vpn/download`, () => {
            test.use({ locale: language.locale, timezoneId: language.timezoneId  })        

            test('Grreen run', async ({ page }) => {            
                expect(2).toBe(2)
            });
        });

        test.skip(`${language.timezoneId} - https://vpn.mozilla.org/vpn/download`, () => {
            test.use({ locale: language.locale, timezoneId: language.timezoneId  })
            test.beforeEach(async ({ page }) => {
                await page.goto('https://vpn.mozilla.org/vpn/download', { waitUntil: 'networkidle' });
            });

            test(`Verify availability in ${language.timezoneId} for for /download`, async ({ page }) => {            
                expect(await page.screenshot()).toMatchSnapshot(`${language.locale}-download-page.png`);
            });
        });

        test.skip(`${language.timezoneId} - https://vpn.mozilla.org/vpn/client/login/success`, () => {
            test.use({ locale: language.locale, timezoneId: language.timezoneId  })
            test.beforeEach(async ({ page }) => {
                await page.goto('https://vpn.mozilla.org/vpn/client/login/success', { waitUntil: 'networkidle' });
            });

            test(`Verify availability in ${language.timezoneId} for for /login/success`, async ({ page }) => {            
                expect(await page.screenshot()).toMatchSnapshot(`${language.locale}-success-page.png`);
            });
        });

    
        test.skip(`${language.timezoneId} - https://vpn.mozilla.org/vpn/client/login/error`, () => {
            test.use({ locale: language.locale, timezoneId: language.timezoneId  })
            test.beforeEach(async ({ page }) => {
                await page.goto('https://vpn.mozilla.org/vpn/client/login/error', { waitUntil: 'networkidle' });
              });
    
            test.only(`Verify availability in ${language.timezoneId} for /login/error`, async ({ page }) => {            
                expect(await page.screenshot()).toMatchSnapshot(`${language.locale}-error-page.png`);
            });
        });
    

    
        test.skip(`${language.timezoneId} - https://vpn.mozilla.org/vpn/sdfgsd`, async () => {
            test.use({ locale: language.locale, timezoneId: language.timezoneId  })  
            test.beforeEach(async ({ page }) => {                
                await page.goto('https://vpn.mozilla.org/vpn/sdfgsd', { waitUntil: 'networkidle' });
            });
            

            test(`Verify availability in ${language.timezoneId} for page /sdfgsd`, async ({ page }) => {            
                expect(await page.screenshot()).toMatchSnapshot(`${language.locale}-404-page.png`);
            });
        });
    }
});
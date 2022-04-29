const { expect } = require('@playwright/test');

const verifyUrl = async (page, expectedUrl) =>  await expect(page.url()).toEqual(expectedUrl);

const delay = (timeInMilliSeconds) => new Promise(function(resolve) { setTimeout(resolve, timeInMilliSeconds) });
 

module.exports = {
    verifyUrl,
    delay
}
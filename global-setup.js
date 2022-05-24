module.exports = async () => {
  process.env['TEST_EXPECT_URL'] = 'https://www.mozilla.org'
  if (process.env.TEST_ENV === 'prod') {
    process.env['TEST_BASE_URL'] = 'https://vpn.mozilla.org'
    process.env['TEST_EXPECT_URL'] = 'https://www.mozilla.org'
  } else if (process.env.TEST_ENV === 'stage') {
    console.log('its staggeeeee')
    process.env['TEST_BASE_URL'] = 'https://www-dev.allizom.org'
    process.env['TEST_EXPECT_URL'] = 'https://www-dev.allizom.org'
  } else {
    process.env['TEST_BASE_URL'] = 'http://localhost:8080'
  }
}

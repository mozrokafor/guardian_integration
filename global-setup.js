module.exports = async config => {
  if (process.env.TEST_ENV === 'prod') {
    process.env['TEST_BASE_URL'] = 'https://www.mozilla.org'
  } else if (process.env.TEST_ENV === 'stage') {
    process.env['TEST_BASE_URL'] = 'https://www-dev.allizom.org'
  } else {
    process.env['TEST_BASE_URL'] = 'http://localhost:8080'
  }
}

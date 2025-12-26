module.exports = {
  routes : [
    {
      method: 'GET',
      path: '/landing/home',
      handler: 'landing.home',
      config : { auth: false }
    }
  ]
}
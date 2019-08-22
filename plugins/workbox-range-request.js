workbox.routing.registerRoute(
  /.*\.(jpeg|png|jpg)/,
  workbox.strategies.cacheFirst({
    plugins: [
      new workbox.rangeRequests.Plugin(),
    ],
  }),
  'GET'
)
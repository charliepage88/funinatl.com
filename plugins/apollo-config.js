require('dotenv').config()

export default function(context) {
  try {
    const { app, res } = context
    const token = app.$cookies.get('funinatl')
      ? app.$cookies.get('funinatl')
      : res.get('funinatl')

    return {
      // required
      httpEndpoint: process.env.GRAPHQL_ENDPOINT,
      // optional
      // See https://www.apollographql.com/docs/link/links/http.html#options
      // httpLinkOptions: {
      //   credentials: 'include'
      // },
      // headers: {
      //   'Authorization: Bearer': 'TzDnhXuLrKMVTFqMLJTy5rDo1lvYSX3OF3Zau3e0'
      // },
      // You can use `wss` for secure connection (recommended in production)
      // Use `null` to disable subscriptions
      // wsEndpoint: 'ws://localhost:4000', // optional
      wsEndpoint: null,
      // LocalStorage token
      // tokenName: 'funinatl', // optional
      // Enable Automatic Query persisting with Apollo Engine
      persisting: true, // Optional
      // Use websockets for everything (no HTTP)
      // You need to pass a `wsEndpoint` for this to work
      // websocketsOnly: false // Optional,
      getAuth: () => `Bearer ${token}`
    }
  } catch (err) {
    console.log(err)
  }
}

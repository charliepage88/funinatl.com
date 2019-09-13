export default (error, context) => {
  console.error(error)

  context.error({ statusCode: 500, message: 'Server error' })
}

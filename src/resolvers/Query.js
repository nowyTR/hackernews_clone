async function feed(root, args, context, info) {
  const where = args.filter
    ? {
        OR: [{ description_contains: args.filter }, { url_contains: args.filter }]
      }
    : {}

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  })
  return links
}

function info() {
  return 'This is the api of a Hackernews clone'
}

function link(root, args, context, info) {
  return context.prisma.links().find(link => args.id === link.id)
}

module.exports = {
  info,
  feed,
  link
}

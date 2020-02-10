function feed(root, args, context, info) {
  return context.prisma.links()
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

function defaultMeta(title, keywords, description) {
  return (
    `<title>${title}</title>
    <meta charset="utf-8" />
    <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">`
  )
}

export default defaultMeta

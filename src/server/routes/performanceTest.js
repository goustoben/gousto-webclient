function renderPerformanceTestPage() {
  return `
    <!doctype html>
     <html lang="en-GB">
      <head>
        <title>Performance test</title>
        <meta charset="utf-8" />
        <meta name="robots" content="noindex">
      </head>
      <body>
      </body>
    </html>
  `
}

export const performanceTestPage = async (ctx, next) => {
  if (ctx.path === '/performance-test') {
    ctx.body = renderPerformanceTestPage()
    ctx.set('X-Robots-Tag', 'noindex')
  } else {
    await next()
  }
}

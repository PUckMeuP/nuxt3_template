export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    // console.log('%cmy-plugin.ts line:4 html', 'color: #007acc;', html);
    // html.head.push('<link rel="stylesheet" href="/element/index.css">')
  })
})

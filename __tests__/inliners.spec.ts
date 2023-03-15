import { inlineCss, inlineJs } from '../src/core/inliners'

describe('Inliner functions', () => {
  describe('Inline CSS', () => {
    const html = `<head>\n\t<link rel="stylesheet" href="style.css">\n</head>`
    const css = `html{margin:0;}body{margin:0;}.container{display:flex;}\t\t\t`

    it('Remove `<script>` tag from HTML template', () => {
      const htmlClean = `<head>\n\t\n</head>`

      const [newHtml] = inlineCss(html, 'style.css', '')

      expect(newHtml).toStrictEqual(htmlClean)
    })

    it('Create a formatted CSS tag', () => {
      const cssFormated = `\n\t\t\thtml{margin:0;}body{margin:0;}.container{display:flex;}\n\t\t`

      const [_, cssTag] = inlineCss(html, 'style.css', css)

      expect(cssTag.children).toStrictEqual(cssFormated)
      expect(cssTag).toStrictEqual({
        tag: 'style',
        children: cssFormated,
        injectTo: 'head'
      })
    })
  })


  describe('inline JS', () => {
    const htmlStream = `<body>\n\t<script type="module" src="main.ts"></script>\n</body>`
    const jsStream = `function func(){return 'It works!'};\t\t`

    it('Remove `<script>` tag from HTML template', () => {
      const newHtml = `<body>\n\t\n</body>`

      const [html] = inlineJs(htmlStream, 'main.ts', '')

      expect(html).toStrictEqual(newHtml)
    })

    it('Create a formated JS tag', () => {
      const newJs = `\n\t\t\t(function(){function func(){return 'It works!'};})();\n\t\t`

      const [_, jsTag] = inlineJs(htmlStream, 'main.ts', jsStream)

      expect(jsTag.children).toStrictEqual(newJs)
      expect(jsTag).toStrictEqual({
        tag: 'script',
        children: newJs,
        injectTo: 'body'
      })
    })
  })
})

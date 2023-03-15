import type { Plugin, HtmlTagDescriptor } from 'vite'
import type { OutputAsset, OutputChunk } from 'rollup'
import prettify from 'html-prettify'
// import prettier from 'prettier'
import { inlineCss, inlineJs } from './core/inliners'

function warnNotInlined (fileName: string): void {
  console.warn(`\n[warning] asset not inlined: ${fileName}\n`)
}

export function inlineSource (): Plugin {
  return {
    name: 'vite:inline-source',
    apply: 'build',
    enforce: 'post',
    config: () => ({
      build: {
        modulePreload: false,
        rollupOptions: {
          output: {
            entryFileNames: 'bundle.js',
            assetFileNames: '[name].[ext]'
          }
        }
      }
    }),
    transformIndexHtml: async (html, { bundle }) => {
      if (!bundle) return html

      const chunks = Object.entries(bundle)
      let chunksToDelete = [] as string[]
      let tags = [] as HtmlTagDescriptor[]

      for (const [_, chunk] of chunks) {
        if (/\.css$/.test(chunk.fileName)) {
          const { source: css } = chunk as OutputAsset

          if (css != null) {
            chunksToDelete = [...chunksToDelete, chunk.fileName]
            const [replacedHtml, cssTag] = inlineCss(html, chunk.fileName, css as string)
            html = replacedHtml
            tags = [...tags, cssTag]
          } else {
            warnNotInlined(chunk.fileName)
          }
        }

        if (/\.[mc]?js$/.test(chunk.fileName)) {
          const { code: js } = chunk as OutputChunk

          if (js != null) {
            chunksToDelete = [...chunksToDelete, chunk.fileName]
            const [replacedHtml, jsTag] = inlineJs(html, chunk.fileName, js as string)
            html = replacedHtml
            tags = [...tags, jsTag]
          } else {
            warnNotInlined(chunk.fileName)
          }
        }
      }

      for (const chunkName of chunksToDelete) {
        delete bundle[chunkName]
      }

      // If the asset in not JS or CSS, then it is not inlined
      const otherAssets = chunks.filter(([assetName]) => {
        return !/\.[mc]?js$/.test(assetName)
          && !/\.css$/.test(assetName)
          && !/\.html$/.test(assetName)
          && !/\.map$/.test(assetName)
      })

      for (const [name] of otherAssets) {
        warnNotInlined(name)
      }


      /**
       * Replaced Prettier with html-prettify to drastically reduce the bundle size
       */

      html = prettify(html)

      // html = prettier
      //   .format(html, {
      //     parser: 'html',
      //     htmlWhitespaceSensitivity: 'ignore'
      //   })

      return { html, tags }
    }
  }
}

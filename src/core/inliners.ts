import type { HtmlTagDescriptor } from 'vite'

export function inlineCss (
  html: string,
  fileName: string,
  source: string
): [string, HtmlTagDescriptor] {
  // Delete style tag
  const reCss = new RegExp(`<link[^>]*? href="[./]*${fileName}"[^>]*?>`)
  const cleanHtml = html.replace(reCss, '')

  // Inline style
  const tag = {
    tag: 'style',
    children: `\n\t\t\t${source.trim()}\n\t\t`,
    injectTo: 'head' as const
  }

  return [cleanHtml, tag]
}

export function inlineJs (
  html: string,
  fileName: string,
  chunk: string
): [string, HtmlTagDescriptor] {
  // Delete script tag
  const reJs = new RegExp(`<script([^>]*?) src="[./]*${fileName}"([^>]*)></script>`)
  const cleanHtml = html.replace(reJs, '')

  // Wrap the chunk into a iife
  const prefix = '(function(){'
  const code = chunk.trim()
  const postfix = '})();'

  // Inline style
  const tag = {
    tag: 'script',
    children: `\n\t\t\t${prefix}${code}${postfix}\n\t\t`,
    injectTo: 'body' as const
  }

  return [cleanHtml, tag]
}

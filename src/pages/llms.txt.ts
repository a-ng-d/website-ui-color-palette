import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { footerNav, links, site } from '@/config/site'
import { homeFaq } from '@/data/faq'

/** llms.txt (https://llmstxt.org): Markdown map of the site for LLMs, generated at build time. */
export const GET: APIRoute = async () => {
  const url = (path: string) => new URL(path, site.url).href
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '')

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.defaultDescription}`,
    '',
    'UI Color Palette generates accessible color scales (WCAG 2.1 and APCA), lets you master every shade, and deploys palettes as styles, variables, design tokens, and code. It runs as a plugin in Figma, Penpot, Sketch and Framer, as a Claude plugin, and through an MCP server and open-source skills for any AI assistant.',
    '',
    '## Product',
    '',
    `- [Capabilities](${url('/capabilities')}): everything the tool can do`,
    `- [Pricing](${url('/pricing')}): plans, from the free /basic plan to /pro and /ultimate`,
    `- [Download](${url('/download')}): install on every platform`,
    ...footerNav.products.map((item) => `- [${item.label}](${url(item.href)})`),
    '',
    '## AI tools',
    '',
    `- [MCP server](${links.docsMcp}): endpoint ${links.mcpEndpoint}`,
    `- [LLM Skills](${links.skills}): open-source instructions that teach any AI the method`,
    `- [API Reference](${links.docsApi})`,
    '',
    '## Documentation',
    '',
    `- [Docs](${links.docs})`,
    `- [Source code](${links.repository})`,
    '',
    '## Blog',
    '',
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${url(`/blog/${post.id}`)}): ${post.data.description}`
    ),
    '',
    '## FAQ',
    '',
    ...homeFaq.flatMap((item) => [
      `### ${item.question}`,
      '',
      stripHtml(item.answer),
      '',
    ]),
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

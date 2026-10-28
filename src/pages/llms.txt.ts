import type { APIRoute } from 'astro'

import { links, site } from '@/config/site'
import { getPosts, postPath } from '@/data/blog'
import { homeFaq, pricingFaq } from '@/data/faq'
import { capabilityPages, capabilityPath } from '@/data/capability-pages'
import { glossary, glossaryTerms, termPath } from '@/data/glossary'
import { platformPages } from '@/data/platform-pages'

/** llms.txt (https://llmstxt.org): Markdown map of the site for LLMs, generated at build time. */
export const GET: APIRoute = async () => {
  const url = (path: string) => new URL(path, site.url).href
  const posts = await getPosts()
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '')

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.defaultDescription}`,
    '',
    'UI Color Palette generates accessible color scales (WCAG 2.1 and APCA), lets you master every shade, and deploys palettes as styles, variables, design tokens, and code. It runs as a plugin in Figma, Penpot, Sketch and Framer, as a Claude plugin, and through an MCP server and open-source skills for any AI assistant.',
    '',
    `The full text of the site (capabilities, platform pages, pricing, FAQ and every article) is in [llms-full.txt](${url('/llms-full.txt')}).`,
    '',
    '## Product',
    '',
    `- [Capabilities](${url('/capabilities')}): everything the tool can do`,
    `- [Pricing](${url('/pricing')}): plans, from the free /basic plan to /pro and /ultimate`,
    `- [Download](${url('/download')}): install on every platform`,
    ...platformPages.map(
      (page) =>
        `- [${page.hero.title}](${url(page.path)}): ${page.seo.description}`
    ),
    '',
    '## Capabilities in depth',
    '',
    ...capabilityPages.map(
      (page) =>
        `- [${page.name}](${url(capabilityPath(page))}): ${page.seo.description}`
    ),
    '',
    '## Glossary',
    '',
    `- [${glossary.title}](${url('/glossary')}): ${glossary.seo.description}`,
    ...glossaryTerms.map(
      (term) => `- [${term.term}](${url(termPath(term))}): ${term.definition}`
    ),
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
    `- [Blog](${url('/blog')}): product news and color workflows ([RSS](${url('/rss.xml')}))`,
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${url(postPath(post))}): ${post.data.description}`
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
    '## Pricing FAQ',
    '',
    ...pricingFaq.flatMap((category) =>
      category.items.flatMap((item) => [
        `### ${category.label}: ${item.question}`,
        '',
        stripHtml(item.answer),
        '',
      ])
    ),
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

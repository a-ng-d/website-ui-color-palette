import type { APIRoute } from 'astro'

import { site } from '@/config/site'
import { getPosts, postPath } from '@/data/blog'
import { audiences, capabilityGroups } from '@/data/capabilities'
import { downloadPage, downloads } from '@/data/downloads'
import { homeFaq, pricingFaq, type FaqItem } from '@/data/faq'
import {
  platformPages,
  type PlatformPage,
  type TableValue,
} from '@/data/platform-pages'
import { compareColumns, compareRows, plans } from '@/data/pricing'

/** Full text of the site in one Markdown file, built from the page data. */
export const GET: APIRoute = async () => {
  const url = (path: string) => new URL(path, site.url).href
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '')
  // Article bodies: absolute links, images reduced to their description.
  const plainMarkdown = (body: string) =>
    body
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '[Image: $1]')
      .replace(/\]\(\//g, `](${site.url}/`)
      .trim()

  const faq = (items: FaqItem[]) =>
    items.flatMap((item) => [
      `### ${item.question}`,
      '',
      stripHtml(item.answer),
      '',
    ])

  const platformSection = (page: PlatformPage) => [
    `## ${page.hero.title}`,
    '',
    `URL: ${url(page.path)}`,
    '',
    `${page.hero.tagline} ${page.seo.description}`,
    '',
    `### ${page.surfaces.title}`,
    '',
    page.surfaces.intro,
    '',
    ...page.surfaces.cards.map((card) => `- **${card.title}**: ${card.text}`),
    '',
    `### ${page.why.title}`,
    '',
    ...page.why.cards.map((card) => `- **${card.title}**: ${card.text}`),
    '',
    ...(page.setup
      ? [
          `### ${page.setup.title}`,
          '',
          page.setup.intro,
          '',
          ...page.setup.steps.map(
            (step, index) =>
              `${index + 1}. **${step.title}**: ${step.text}${step.code ? ` \`${step.code}\`` : ''}`
          ),
          '',
          `Full setup guide: ${page.docs}`,
          '',
        ]
      : []),
    ...(page.tables ?? []).flatMap((table) => [
      `### ${table.title}`,
      '',
      table.intro,
      '',
      ...(table.code ? ['```', table.code, '```', ''] : []),
      `| ${[table.rowHeader, ...table.columns].join(' | ')} |`,
      `|${' --- |'.repeat(table.columns.length + 1)}`,
      ...table.rows.map(
        (row) => `| ${[row.label, ...row.values.map(tableCell)].join(' | ')} |`
      ),
      '',
      ...(table.note ? [table.note, ''] : []),
    ]),
    ...(page.faq
      ? [
          `### ${page.hero.title}: FAQ`,
          '',
          ...faq(page.faq.items).map((line) =>
            line.startsWith('### ') ? `#${line}` : line
          ),
        ]
      : []),
    `Install: ${page.hero.cta.href}`,
    '',
  ]

  const tableCell = (value: TableValue) =>
    value === true ? 'yes' : value === false ? 'no' : value

  const cell = (value: string | boolean) =>
    value === true ? 'included' : value === false ? 'not included' : value

  const posts = await getPosts()

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.defaultDescription}`,
    '',
    `Full text of ${site.url}. The summary is at ${url('/llms.txt')}.`,
    '',
    '## Capabilities',
    '',
    `URL: ${url('/capabilities')}`,
    '',
    'Everything UI Color Palette can do, shared across Figma, Penpot, Sketch, and Framer.',
    '',
    ...capabilityGroups.flatMap((group) => [
      `### ${group.title}`,
      '',
      ...(group.intro ? [group.intro, ''] : []),
      ...group.cards.map((card) => `- **${card.title}**: ${card.text}`),
      '',
    ]),
    `### ${audiences.title}`,
    '',
    audiences.intro,
    '',
    ...audiences.items.flatMap((item) => [
      `- **${item.title}**: ${item.text}`,
      ...item.points.map((point) => `  - ${point.lead}: ${point.text}`),
    ]),
    '',
    ...platformPages.flatMap(platformSection),
    '## Download',
    '',
    `URL: ${url(downloadPage.path)}`,
    '',
    ...downloads.map(
      (card) => `- **${card.title}**: ${card.text} (${card.cta.href})`
    ),
    '',
    '## Pricing',
    '',
    `URL: ${url('/pricing')}. Current prices, per billing period, are on that page.`,
    '',
    ...plans.flatMap((plan) => [
      `### ${plan.tag}`,
      '',
      ...plan.features.map((feature) => `- ${feature.label}`),
      '',
    ]),
    '### Plan comparison',
    '',
    ...compareRows.map(
      (row) =>
        `- **${row.feature}**: ${row.values
          .map((value, index) => `${compareColumns[index]} ${cell(value)}`)
          .join(', ')}`
    ),
    '',
    '### Pricing FAQ',
    '',
    ...pricingFaq.flatMap((category) => [
      `#### ${category.label}`,
      '',
      ...faq(category.items).map((line) =>
        line.startsWith('### ') ? `#${line}` : line
      ),
    ]),
    '## FAQ',
    '',
    ...faq(homeFaq),
    '## Blog',
    '',
    `URL: ${url('/blog')}`,
    '',
    ...posts.flatMap((post) => [
      `### ${post.data.title}`,
      '',
      `URL: ${url(postPath(post))}`,
      `Published: ${post.data.pubDate.toISOString().slice(0, 10)}`,
      ...(post.data.updatedDate
        ? [`Updated: ${post.data.updatedDate.toISOString().slice(0, 10)}`]
        : []),
      `Author: ${post.data.author}`,
      '',
      post.data.description,
      '',
      plainMarkdown(post.body ?? '').replace(/^(#{2,4}) /gm, '$1## '),
      '',
      ...(post.data.faq.length
        ? [
            '#### FAQ',
            '',
            ...post.data.faq.flatMap((item) => [
              `- **${item.question}** ${item.answer}`,
            ]),
            '',
          ]
        : []),
    ]),
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

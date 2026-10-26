/**
 * Pricing page content (Figma node 3:3959). Single source of truth for the
 * plan cards, the comparison table and the schema.org offers.
 */
import PaletteIcon from '@lucide/astro/icons/palette'
import PaintbrushIcon from '@lucide/astro/icons/paintbrush-vertical'
import CombineIcon from '@lucide/astro/icons/combine'
import BlendIcon from '@lucide/astro/icons/blend'
import BracesIcon from '@lucide/astro/icons/braces'
import UsersIcon from '@lucide/astro/icons/users'
import PlusIcon from '@lucide/astro/icons/plus'
import LockOpenIcon from '@lucide/astro/icons/lock-open'
import ContrastIcon from '@lucide/astro/icons/contrast'
import LibraryIcon from '@lucide/astro/icons/library'
import FilePlusIcon from '@lucide/astro/icons/file-plus'
import SquareCodeIcon from '@lucide/astro/icons/square-code'
import HeadsetIcon from '@lucide/astro/icons/headset'
import HandHelpingIcon from '@lucide/astro/icons/hand-helping'
import BookUpIcon from '@lucide/astro/icons/book-up'
import IdCardIcon from '@lucide/astro/icons/id-card'
import HeartHandshakeIcon from '@lucide/astro/icons/heart-handshake'
import { links, site } from '@/config/site'

type Icon = typeof PaletteIcon

export type BillingPeriod = 'week' | 'month' | 'year' | 'lifetime'

export const billingPeriods: { id: BillingPeriod; label: string }[] = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year (-20%)' },
  { id: 'lifetime', label: 'Lifetime' },
]

export interface PlanFeature {
  icon: Icon
  label: string
}

/** What a card shows for one billing period. */
export interface PlanVariant {
  /** Big title: the price, or a sentence when there is none. */
  title: string
  subtitle?: string
  /**
   * Subtitle with the localized total (`{total}`), used when prices are read
   * from Polar. `subtitle` stays as the USD fallback written in the HTML.
   */
  subtitleTemplate?: string
  /**
   * Price derived from a Polar product (/ultimate is sold on request, and
   * priced at twice /pro). `{ productId, multiplier }`.
   */
  priceOf?: { productId: string; multiplier: number }
  /** Months the price covers: the title shows the price per month. */
  months?: number
  /** Numeric price (USD), for schema.org. Omitted when there is none. */
  price?: string
  /** Polar product behind the call to action (checkout). */
  productId?: string
  cta?: { label: string; href: string; variant: 'secondary' | 'primary' }
}

export interface Plan {
  id: 'basic' | 'pro' | 'ultimate'
  /** Tag shown on the card and in the table header. */
  tag: string
  /** Same content whatever the billing period (the /basic plan). */
  fixed?: PlanVariant
  /** Content per billing period (the paid plans). */
  variants?: Record<BillingPeriod, PlanVariant>
  features: PlanFeature[]
  badge?: string
}

/** Polar products, production ids of the Polar organization. */
export const polarProducts: Record<BillingPeriod, string> = {
  week: '17eb1281-cf21-4d58-9144-76a1426ec73c',
  month: '1c4ad049-f424-4ec4-ac66-0997050e0060',
  year: '87a83311-cba6-424f-a72f-84a1785a1079',
  lifetime: '9ed0e164-8972-4f60-88cf-91b805991e87',
}

/**
 * Checkout of a /pro period: a real link to the checkout function (302 to the
 * hosted Polar checkout without JS), upgraded to the embedded checkout by the
 * Plans script.
 */
export const checkoutHref = (productId: string) =>
  `/api/checkout?product=${productId}`

const proCta = {
  label: 'Get started today',
  variant: 'primary',
} as const

const requestUltimate = {
  label: 'Request /ultimate',
  href: links.ultimateRequest,
  variant: 'secondary',
} as const

const ultimateOnRequest: PlanVariant = {
  title: 'Only billed monthly and yearly',
}

export const plans: Plan[] = [
  {
    id: 'basic',
    tag: '/basic',
    fixed: {
      title: 'Free',
      subtitle: 'Try the tool with core features',
      price: '0',
      cta: { label: 'Try it out', href: site.appUrl, variant: 'secondary' },
    },
    features: [
      { icon: PaletteIcon, label: '3 palettes per document' },
      { icon: PaintbrushIcon, label: '5 source colors per palette' },
      { icon: CombineIcon, label: '6 custom stops per palette' },
      { icon: BlendIcon, label: '2 color modes' },
      { icon: BracesIcon, label: 'CSS export' },
      { icon: UsersIcon, label: 'Community support' },
    ],
  },
  {
    id: 'pro',
    tag: '/pro',
    variants: {
      week: {
        title: '$2.99',
        subtitle: 'Per user/week',
        price: '2.99',
        productId: polarProducts.week,
        cta: { ...proCta, href: checkoutHref(polarProducts.week) },
      },
      month: {
        title: '$4.99',
        subtitle: 'Per user/month',
        price: '4.99',
        productId: polarProducts.month,
        cta: { ...proCta, href: checkoutHref(polarProducts.month) },
      },
      year: {
        title: '$3.99',
        subtitle: 'Per user/month (billed $47.99 per year)',
        subtitleTemplate: 'Per user/month (billed {total} per year)',
        months: 12,
        price: '47.99',
        productId: polarProducts.year,
        cta: { ...proCta, href: checkoutHref(polarProducts.year) },
      },
      lifetime: {
        title: '$95.99',
        subtitle: 'Per user (one-time)',
        price: '95.99',
        productId: polarProducts.lifetime,
        cta: { ...proCta, href: checkoutHref(polarProducts.lifetime) },
      },
    },
    features: [
      { icon: PlusIcon, label: 'All /basic features, plus:' },
      {
        icon: LockOpenIcon,
        label: 'Unlimited palettes, colors, stops, and modes',
      },
      { icon: ContrastIcon, label: 'Advanced accessibility tools' },
      { icon: LibraryIcon, label: 'Sync with local libraries' },
      { icon: FilePlusIcon, label: 'Generated documentation' },
      {
        icon: SquareCodeIcon,
        label: 'Generated code for Web/Apple/Android/Tailwind',
      },
      { icon: HeadsetIcon, label: 'Standard support' },
    ],
    badge: 'Most popular',
  },
  {
    id: 'ultimate',
    tag: '/ultimate',
    variants: {
      week: ultimateOnRequest,
      month: {
        title: '$9.99',
        subtitle: 'Per user/month',
        price: '9.99',
        priceOf: { productId: polarProducts.month, multiplier: 2 },
        cta: requestUltimate,
      },
      year: {
        title: '$7.99',
        subtitle: 'Per user/month (billed $95.99 per year)',
        subtitleTemplate: 'Per user/month (billed {total} per year)',
        months: 12,
        price: '95.99',
        priceOf: { productId: polarProducts.year, multiplier: 2 },
        cta: requestUltimate,
      },
      lifetime: ultimateOnRequest,
    },
    features: [
      { icon: PlusIcon, label: 'All /pro features, plus:' },
      { icon: HandHelpingIcon, label: 'Dedicated support' },
      { icon: BookUpIcon, label: 'Custom onboarding' },
      { icon: IdCardIcon, label: 'SSO' },
      { icon: HeartHandshakeIcon, label: 'SLA guarantees' },
    ],
  },
]

/** A table cell: a text value, or included / not included. */
export type Cell = string | boolean

export interface CompareRow {
  feature: string
  /** Same order as `compareColumns`: basic, pro, ultimate. */
  values: [Cell, Cell, Cell]
}

export const compareColumns = ['/basic', '/pro', '/ultimate'] as const

export const compareRows: CompareRow[] = [
  {
    feature: 'Palette per document',
    values: ['3 palettes', 'Unlimited', 'Unlimited'],
  },
  {
    feature: 'Source colors per palette',
    values: ['5 source colors', 'Unlimited', 'Unlimited'],
  },
  {
    feature: 'Custom stops per palette',
    values: ['6 custom stops', 'Unlimited', 'Unlimited'],
  },
  {
    feature: 'Color modes',
    values: ['2 color modes', 'Unlimited', 'Unlimited'],
  },
  { feature: 'Lightness presets', values: ['Custom', 'All', 'All'] },
  { feature: 'Color import', values: [true, true, true] },
  { feature: 'Color combinations', values: [true, true, true] },
  { feature: 'Scale adjustments', values: [true, true, true] },
  { feature: 'Color adjustments', values: [true, true, true] },
  { feature: 'Custom foreground colors', values: [true, true, true] },
  { feature: 'Accessibility scores', values: [true, true, true] },
  { feature: 'Accessibility report', values: [false, true, true] },
  { feature: 'Vision simulations', values: [true, true, true] },
  { feature: 'Code generation', values: ['CSS', true, true] },
  { feature: 'Sync with local libraries', values: [false, true, true] },
  { feature: 'Documentation generation', values: [false, true, true] },
  { feature: 'Publication', values: [true, true, true] },
  { feature: 'Support', values: ['Community', 'Chat', 'Dedicated'] },
  { feature: 'Onboarding', values: [false, false, 'Custom'] },
]

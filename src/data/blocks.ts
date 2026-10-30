export type IconId =
  | 'apple'
  | 'badge-dollar-sign'
  | 'book-open'
  | 'code-xml'
  | 'coins'
  | 'download'
  | 'glasses'
  | 'newspaper'
  | 'package-open'
  | 'paintbrush'
  | 'refresh-ccw-dot'
  | 'ruler'
  | 'thumbs-up'
  | 'wrench'

export interface NextStep {
  icon: IconId
  title: string
  label: string
  href: string
}

export interface LinkCard {
  title: string
  text: string
  label: string
  href: string
}

export interface Step {
  title: string
  text: string
  code?: string
}

export interface Steps {
  title: string
  intro: string
  steps: Step[]
  docs?: { label: string; href: string }
}

/** `true` / `false` render as a check / a dash. */
export type TableValue = boolean | string

export interface Table {
  id: string
  title: string
  intro: string
  code?: string
  caption: string
  rowHeader: string
  columns: string[]
  rows: { label: string; href?: string; values: TableValue[] }[]
  note?: string
}

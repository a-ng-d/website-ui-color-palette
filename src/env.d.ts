interface ImportMetaEnv {
  /** Optional override of the embedded reference palette (see .env.example). */
  readonly PUBLIC_DEMO_PALETTE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

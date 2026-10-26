interface ImportMetaEnv {
  /** Optional override of the embedded reference palette (see .env.example). */
  readonly PUBLIC_DEMO_PALETTE_URL?: string
  /** Set to 'true' to load Google Analytics and Tawk.to outside production. */
  readonly PUBLIC_THIRD_PARTY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

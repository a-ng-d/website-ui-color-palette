#!/usr/bin/env node
/**
 * Download the video (and poster) behind a Screen Studio share link, so that the
 * article embeds a file the site hosts itself. The share page cannot be framed
 * (frame-ancestors 'self') and its mp4 link is signed and expires after 2 hours.
 *
 *   node scripts/capture/fetch-share.mjs https://screen.studio/share/XXXX public/videos/<slug>-<what>.mp4 [poster.jpg]
 */
import fs from 'node:fs'
import path from 'node:path'

const [shareUrl, videoPath, posterPath] = process.argv.slice(2)
if (!shareUrl || !videoPath) {
  console.error('usage: fetch-share.mjs <share-url> <video.mp4> [poster.jpg]')
  process.exit(1)
}

const html = await (await fetch(shareUrl, { headers: { 'user-agent': 'Mozilla/5.0' } })).text()
const meta = (property) => {
  const tag = html.match(new RegExp(`<meta[^>]*property="${property}"[^>]*content="([^"]+)"`))
  return tag?.[1].replaceAll('&amp;', '&')
}
const video = meta('og:video')
const poster = meta('og:image')
if (!video) { console.error('No og:video found: is the link public?'); process.exit(1) }

const save = async (url, file) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status} for ${file}`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()))
  console.log(`${file}  ${(fs.statSync(file).size / 1e6).toFixed(1)} MB`)
}
console.log(`${meta('og:title')} — ${meta('og:video:width')}×${meta('og:video:height')}`)
await save(video, videoPath)
if (posterPath && poster) await save(poster, posterPath)

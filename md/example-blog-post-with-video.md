# How to Add Videos to Your Blog Post

This example shows multiple ways to include videos in a blog post using the project's supported markdown patterns. You can copy the markdown below into the Admin editor (or directly into the database) and publish.

For your Synology video, you can use:

```markdown
![video](https://icoderx.synology.me:33333/webapi/entry.cgi/Demo%20bot%20mua%20m%E1%BA%A1ng%20l%C6%B0%E1%BB%9Bi%20Solana%20tr%C3%AAn%20Telegram.mp4?api=SYNO.SynologyDrive.Files&method=download&version=2&files=%5B%22id%3A913880448780776534%22%5D&force_download=false&download_type=%22download%22&SynoToken=kfK7KrUWzJyrE&_dc=1761148909409 "Demo bot mua mạng lưới Solana trên Telegram")
```

---

## 1) YouTube (full URL)

Use the `![video](url "optional title")` pattern.

![video](https://www.youtube.com/watch?v=dQw4w9WgXcQ "Introduction Video")

> Result: an embedded YouTube player will be shown in the published post.

---

## 2) YouTube short URL (youtu.be)

You can also use the shortened YouTube link.

![video](https://youtu.be/dQw4w9WgXcQ "Short YouTube link example")

---

## 3) Vimeo

Vimeo links are supported similarly.

![video](https://vimeo.com/76979871 "Vimeo: The New Vimeo Player")

---

## 4) Direct video file (MP4)

If you have a direct video file URL (hosted on your server, CDN, or storage), include it and the player will render a native HTML5 player.

![video](https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4 "Sample MP4 video")

---

## 5) Your Synology Server Video

For your specific Synology server video about the Solana trading bot:

![video](https://icoderx.synology.me:33333/webapi/entry.cgi/Demo%20bot%20mua%20m%E1%BA%A1ng%20l%C6%B0%E1%BB%9Bi%20Solana%20tr%C3%AAn%20Telegram.mp4?api=SYNO.SynologyDrive.Files&method=download&version=2&files=%5B%22id%3A913880448780776534%22%5D&force_download=false&download_type=%22download%22&SynoToken=kfK7KrUWzJyrE&_dc=1761148909409 "Demo bot mua mạng lưới Solana trên Telegram")

---

## 6) Inline text link to video (optional)

If you'd rather show a clickable link instead of an embedded player, use regular markdown links.

[Watch the video on YouTube](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

---

## Notes for Admins

- Paste any of the example blocks above directly into the Admin editor's content textarea. Using the toolbar `Insert Video` will prompt you for URL and optional title and insert the `![video](...)` syntax automatically.
- The Admin live preview will show an interactive player so you can verify playback before publishing.
- Supported sources: YouTube, youtu.be, Vimeo, Twitch (embed), and direct video files with extensions such as `.mp4`, `.webm`, `.ogg`.
- If you want to host large video files, consider using a CDN or a video hosting provider and paste the public URL into the editor instead of uploading large files directly to your application server.
- **Important**: The blog now uses SEO-friendly URLs like `/blog/demo-bot-mua-mang-luoi-solana` instead of `/blog/7`. This improves search engine optimization and makes links more readable.

---

Happy posting!

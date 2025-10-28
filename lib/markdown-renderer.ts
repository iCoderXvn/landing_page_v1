export function renderContent(content: string) {
  // Mirror the blog post renderer so admin preview matches public posts
  let processedContent = content || '';
  let videoCounter = 0;

  const isVideoUrl = (url: string) => /\.(mp4|webm|ogg)(\?|$)/i.test(url) || /youtube.com|youtu.be|vimeo.com/.test(url);

  // Handle video markdown syntax: ![video](url "title") or ![title](url)
  processedContent = processedContent.replace(
    /!\[video\]\(([^)]+)\s*(?:"([^"]*)")?\)/g,
    (match, url, title) => {
      if (isVideoUrl(url)) {
        const videoId = `video-${videoCounter++}`;
        return `<div id="${videoId}" data-video-url="${url}" data-video-title="${title || ''}" class="video-embed my-6"></div>`;
      }
      return match;
    }
  );

  // Handle regular images that might be videos based on URL
  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\(([^)]+)\s*(?:"([^"]*)")?\)/g,
    (match, altText, url, title) => {
      if (isVideoUrl(url)) {
        const videoId = `video-${videoCounter++}`;
        return `<div id="${videoId}" data-video-url="${url}" data-video-title="${title || altText || ''}" class="video-embed my-6"></div>`;
      }
      // Regular image
      return `<img src="${url}" alt="${altText}" title="${title || ''}" class="max-w-full h-auto rounded-lg border border-gray-700 my-6 mx-auto block" />`;
    }
  );

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const headingCounts: Record<string, number> = {};

  return processedContent
    .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm font-mono text-green-300 whitespace-pre-wrap">$2</code></pre>')
    .replace(/```\n([\s\S]*?)\n```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm font-mono text-green-300 whitespace-pre-wrap">$1</code></pre>')
    .replace(/\[([^\]]+)\]\(([^)]+)\s+"([^"]+)"\)/g, '<a href="$2" title="$3" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline transition-colors">$1</a>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline transition-colors">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-blue-300 italic">$1</em>')
    .replace(/^# (.*$)/gim, (m, p1) => {
      const base = slugify(p1);
      const count = (headingCounts[base] = (headingCounts[base] || 0) + 1);
      const id = `${base}${count > 1 ? `-${count}` : ''}`;
      return `<h1 id="${id}" class="text-3xl font-bold mb-6 text-white">${p1}</h1>`;
    })
    .replace(/^## (.*$)/gim, (m, p1) => {
      const base = slugify(p1);
      const count = (headingCounts[base] = (headingCounts[base] || 0) + 1);
      const id = `${base}${count > 1 ? `-${count}` : ''}`;
      return `<h2 id="${id}" class="text-2xl font-semibold mb-4 text-gray-100">${p1}</h2>`;
    })
    .replace(/^### (.*$)/gim, (m, p1) => {
      const base = slugify(p1);
      const count = (headingCounts[base] = (headingCounts[base] || 0) + 1);
      const id = `${base}${count > 1 ? `-${count}` : ''}`;
      return `<h3 id="${id}" class="text-xl font-medium mb-3 text-gray-200">${p1}</h3>`;
    })
    .replace(/^#### (.*$)/gim, (m, p1) => {
      const base = slugify(p1);
      const count = (headingCounts[base] = (headingCounts[base] || 0) + 1);
      const id = `${base}${count > 1 ? `-${count}` : ''}`;
      return `<h4 id="${id}" class="text-lg font-medium mb-2 text-gray-300">${p1}</h4>`;
    })
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-500/10 italic text-blue-200 rounded-r">$1</blockquote>')
    .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 text-gray-300">$1</li>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-300 border border-gray-700">$1</code>')
    .replace(/\n/g, '<br>');
}

export default renderContent;

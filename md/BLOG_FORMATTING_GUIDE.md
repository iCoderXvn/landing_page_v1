# 📚 iCoderX Blog Formatting Guide

## Overview

This comprehensive guide documents all formatting features available in the iCoderX blog system. Use this as a reference when creating or editing blog posts through the admin interface.

## 🎯 Admin Access

- **URL**: `/admin`
- **Credentials**: `admin` / `password`
- **Features**: Create posts, manage topics, formatting toolbar

---

## 📝 Complete Formatting Reference

### 1. Text Formatting

#### Bold Text
- **Syntax**: `**text**`
- **Button**: Bold icon (B)
- **Example**: `**important text**` → **important text**

#### Italic Text
- **Syntax**: `*text*`
- **Button**: Italic icon (I)
- **Example**: `*emphasized text*` → *emphasized text*

#### Inline Code
- **Syntax**: `` `code` ``
- **Button**: `code` text button
- **Example**: `` `useState` `` → `useState`

### 2. Headings

#### Primary Heading
- **Syntax**: `# Heading`
- **Button**: H1 text button
- **Example**: `# Main Title`

#### Secondary Headings
- **Syntax**: `## Heading`, `### Heading`, `#### Heading`
- **Usage**: Manually type or use H1 button and add more `#`

### 3. Content Structure

#### Quote Blocks
- **Syntax**: `> text`
- **Button**: Quote icon
- **Example**: 
  ```markdown
  > This is a quote block
  > Multiple lines supported
  ```

#### Lists
- **Syntax**: `- item`
- **Button**: List icon
- **Example**:
  ```markdown
  - First item
  - Second item
  - Third item
  ```

### 4. Media & Links

#### Images
- **Syntax**: `![alt text](image_url)`
- **Button**: Image icon
- **Prompts**: 
  1. Image URL
  2. Alt text (optional)
- **Example**: `![Logo](https://example.com/favicon.ico)`

#### Regular Links
- **Syntax**: `[link text](url)`
- **Button**: Link icon
- **Prompts**:
  1. URL
  2. Link text
- **Example**: `[Visit iCoderX](https://icoderx.com)`

#### Embed Links with Icons
- **Syntax**: `[🔗 title](url)`
- **Button**: ExternalLink icon
- **Prompts**:
  1. URL to embed
  2. Display title
- **Example**: `[🔗 Watch Tutorial](https://youtube.com/watch?v=...)`

#### Clickable Text Links
- **Syntax**: `[text](url "tooltip")`
- **Button**: Type icon (T)
- **Prompts**:
  1. URL
  2. Word/phrase to make clickable
- **Example**: `[Facebook](https://facebook.com "Click to open Facebook")`

### 5. Code Examples

#### Code Blocks
- **Syntax**: 
  ```
  ```language
  code here
  ```
  ```
- **Button**: ``` text button
- **Prompts**: Programming language (optional)
- **Example**:
  ````markdown
  ```javascript
  function hello() {
    console.log("Hello World");
  }
  ```
  ````

---

## 🎨 Blog Renderer Support

The blog post viewer (`/blog/[id]`) properly renders all markdown formats with:

- **Images**: Responsive with borders and styling
- **Links**: Blue colored, hover effects, opens in new tab
- **Code**: Syntax highlighting for code blocks, styled inline code
- **Text**: Bold, italic, headings with proper hierarchy
- **Quotes**: Left border with background tint
- **Lists**: Styled bullet points

---

## 📋 Content Creation Workflow

### Step 1: Plan Your Post
1. Choose a compelling title
2. Select or create appropriate topic
3. Outline your content structure
4. Gather images and links

### Step 2: Use the Admin Editor
1. Login to `/admin`
2. Fill in title and select topic
3. Use toolbar buttons for formatting
4. Preview as you write
5. Publish when ready

### Step 3: Test and Verify
1. View published post on `/blog`
2. Check all formatting renders correctly
3. Test all links and images
4. Verify mobile responsiveness

---

## 🛠️ Best Practices

### Content Structure
```markdown
# Main Title with Emoji 🚀

Brief introduction paragraph explaining the post.

## Section 1: Topic Overview
Content with **bold** and *italic* text.

### Subsection
- Bullet points
- With important info
- And `inline code`

## Section 2: Code Examples
```language
// Code block with syntax highlighting
```

## Section 3: Resources
- [Regular Link](https://example.com)
- [🔗 Embed Link](https://youtube.com/...)
- [Clickable Text](https://site.com "Tooltip")

## Conclusion
Summary with call-to-action.
```

### Visual Guidelines
- **Use emojis** in headings for visual appeal
- **Bold important terms** for emphasis
- *Italicize technical terms* or foreign words
- `Use inline code` for commands, variables, filenames
- Include **images** to break up text blocks
- Add **quotes** for important insights or citations

### SEO Optimization
- Start with descriptive H1 title
- Use H2 for main sections
- Include relevant keywords naturally
- Add alt text for all images
- Use descriptive link text

---

## 📖 Example Post Templates

### Technical Tutorial Template
```markdown
# 🚀 Tutorial Title: Technology Name

Brief overview of what readers will learn.

## 📋 Prerequisites
- Requirement 1
- Requirement 2
- **Required Knowledge Level**

## 🛠️ Setup Instructions

Step-by-step setup with code blocks:

```bash
npm install package-name
```

## 💻 Implementation

```javascript
// Main code example
function example() {
  return "Hello World";
}
```

## 🔗 Resources
- [Official Docs](https://docs.example.com)
- [🔗 Video Tutorial](https://youtube.com/...)

## 🎯 Conclusion
Summary and next steps.
```

### Business/Service Template
```markdown
# 🏢 Service/Product Title

Introduction explaining the value proposition.

## ✨ Key Features
- Feature 1 with **benefits**
- Feature 2 with *advantages*
- Feature 3 with `technical specs`

## 🎯 Who This Is For
Target audience description.

## 📞 Contact Information
- **Website**: [Company Name](https://website.com)
- **Email**: contact@company.com
- Social media: [Facebook](https://facebook.com/page "Visit our Facebook")

## 🚀 Get Started
Call to action with [contact link](https://contact.com).
```

---

## 🎛️ Admin Interface Features

### Toolbar Buttons (Left to Right)
1. **Bold** (B icon) - Makes text bold
2. **Italic** (I icon) - Makes text italic  
3. **Heading** (H1 text) - Creates heading
4. **Quote** (Quote icon) - Creates quote block
5. **List** (List icon) - Creates bullet list
6. **Image** (Image icon) - Embeds image by URL
7. **Link** (Link icon) - Creates hyperlink
8. **Embed** (ExternalLink icon) - Creates embed link with icon
9. **Clickable** (T icon) - Makes text clickable with tooltip
10. **Code** (`code` text) - Creates inline code
11. **Code Block** (``` text) - Creates code block

### Interactive Prompts
- Each formatting type provides relevant prompts
- URLs, alt text, link text automatically requested
- Cancel anytime if you change your mind
- Cursor positioned correctly after insertion

---

## 🐛 Troubleshooting

### Common Issues
1. **Images not loading**: Verify URL is public and accessible
2. **Links not working**: Ensure proper URL format (include https://)
3. **Code not highlighting**: Check language name spelling
4. **Formatting not applied**: Ensure proper markdown syntax

### Testing Checklist
- [ ] All images load properly
- [ ] All links open correctly
- [ ] Code blocks have syntax highlighting
- [ ] Text formatting displays correctly
- [ ] Mobile view looks good
- [ ] Post appears in blog listing

---

## 📚 Markdown Quick Reference

| Element | Syntax | Result |
|---------|--------|---------|
| Bold | `**text**` | **text** |
| Italic | `*text*` | *text* |
| Code | `` `code` `` | `code` |
| Link | `[text](url)` | [text](url) |
| Image | `![alt](url)` | ![alt](url) |
| Quote | `> text` | > text |
| List | `- item` | • item |
| Heading | `# text` | # text |

---

## 🤖 Instructions for AI Assistants

When creating posts for the iCoderX blog:

1. **Always include emojis** in headings for visual appeal
2. **Use Vietnamese language** for content (unless specified otherwise)
3. **Include practical code examples** when relevant
4. **Add multiple link types** (regular, embed, clickable)
5. **Use proper heading hierarchy** (H1 → H2 → H3)
6. **Include images** with descriptive alt text
7. **Add quotes** for important insights
8. **End with contact/CTA section**
9. **Use the exact markdown syntax** specified in this guide
10. **Test all formatting** before finalizing

### Content Tone
- **Professional** but approachable
- **Technical accuracy** with clear explanations
- **Action-oriented** with practical examples
- **SEO-friendly** with relevant keywords
- **Mobile-optimized** formatting

---

*Last Updated: July 10, 2025*
*Created by: iCoderX Development Team*

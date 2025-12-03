# Press Release Hub

![App Preview](https://imgix.cosmicjs.com/5f1c3c30-d037-11f0-9f4a-931d397d1861-photo-1509391366360-2e959784a276-1764759667571.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A professional press release distribution platform built with Next.js 16 and powered by Cosmic CMS. This application provides a beautiful, media-friendly interface for publishing and browsing company press releases with rich company profiles and category filtering.

## ✨ Features

- 📰 **Featured Press Releases** - Highlight important announcements
- 🏢 **Company Profiles** - Rich company pages with logos and descriptions
- 📁 **Category Filtering** - Browse releases by Technology, Business, Healthcare, and Sustainability
- 🖼️ **Featured Images** - Optimized press release imagery with imgix
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🚀 **Fast Performance** - Built with Next.js 16 App Router and Server Components
- 🔍 **SEO Optimized** - Proper metadata and semantic HTML structure
- ♿ **Accessible** - WCAG compliant with proper ARIA labels

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=693017f4d5a5a92b05b81e98&clone_repository=69301a1bd5a5a92b05b82702)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "https://www.prweb.in/"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Package Manager**: Bun
- **Image Optimization**: imgix
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account with a bucket containing press releases, companies, and categories
- Basic knowledge of React and Next.js

## 🚀 Getting Started

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Press Releases

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all press releases with related companies and categories
const { objects: releases } = await cosmic.objects
  .find({ type: 'press-releases' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured releases
const { objects: featured } = await cosmic.objects
  .find({ 
    type: 'press-releases',
    'metadata.featured': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching by Category

```typescript
// Get releases by category ID
const { objects: techReleases } = await cosmic.objects
  .find({ 
    type: 'press-releases',
    'metadata.categories': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Company Press Releases

```typescript
// Get all releases for a specific company
const { objects: companyReleases } = await cosmic.objects
  .find({ 
    type: 'press-releases',
    'metadata.company': companyId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application uses three main object types from your Cosmic bucket:

### Press Releases
- **Headline**: Main title of the press release
- **Summary**: Brief description (max 250 characters)
- **Full Content**: Complete HTML content of the release
- **Featured Image**: Hero image for the release
- **Company**: Related company (object relationship)
- **Categories**: Multiple category tags (objects relationship)
- **Contact Information**: Name, email, and phone
- **Release Date**: Publication date
- **Featured**: Boolean flag for highlighting important releases

### Companies
- **Company Name**: Organization name
- **Logo**: Company logo image
- **Website**: Company website URL
- **About**: Company description
- **Industry**: Business sector
- **Location**: Geographic location

### Categories
- **Category Name**: Display name
- **Description**: Category description

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is to use Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Make sure to set these environment variables in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📝 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage with featured releases
│   ├── press-releases/     # Press release pages
│   ├── companies/          # Company profile pages
│   └── categories/         # Category filtering pages
├── components/
│   ├── PressReleaseCard.tsx    # Release card component
│   ├── CompanyCard.tsx         # Company card component
│   ├── CategoryFilter.tsx      # Category navigation
│   ├── Header.tsx              # Site header
│   ├── Footer.tsx              # Site footer
│   └── CosmicBadge.tsx         # Cosmic attribution badge
├── lib/
│   └── cosmic.ts           # Cosmic client configuration
├── types.ts                # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console logging for dashboard
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Cosmic](https://www.cosmicjs.com) - The headless CMS for modern applications
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Powered by [Next.js](https://nextjs.org)

<!-- README_END -->
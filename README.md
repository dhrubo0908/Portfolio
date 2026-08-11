# Tanvin Sadik Dhrubo Portfolio

A premium, responsive Next.js portfolio for recruiters, collaborators, and future project updates. The site uses App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, theme switching, a command palette, project modals, animated sections, SEO metadata, PWA metadata, sitemap, and robots.txt.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Customize

Most content is editable from `/data`:

- `data/personal.ts` - name, headline, resume, location, profile image, hero text
- `data/projects.ts` - project cards, stack badges, GitHub links, live demo links
- `data/skills.ts` - skill categories
- `data/experience.ts` - availability and work status
- `data/education.ts` - degree, CGPA, university, location
- `data/socials.ts` - email and social links
- `data/testimonials.ts` - quotes
- `data/services.ts` - service cards
- `data/stats.ts` - achievement numbers

To add a profile picture, put your image in `public/images`, for example `public/images/profile.jpg`, then edit `portrait` in `data/personal.ts`:

```ts
portrait: "/images/profile.jpg",
```

Add your resume as `public/resume.pdf`.

## Deployment

Deploy on Vercel:

```bash
npm run build
```

Then import this repository into Vercel and deploy the default Next.js project settings.

Before production, update:

- `metadataBase` in `app/layout.tsx`
- URLs in `public/robots.txt`
- URL in `public/sitemap.xml`
- Social links in `data/socials.ts`
- Project links in `data/projects.ts`

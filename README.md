# Full Stack, Literally: Mihir's Portfolio

A portfolio where **the page is an HTTP request**. Scrolling sends `GET /` down through every layer of the stack and back as a response:

| Layer | Section | Idea |
|---|---|---|
| L00 Client | Hero | A request being typed into `request.http` |
| L01 Edge / CDN | About | "Cache MISS: fetching the real person", photo with response headers |
| L02 Frontend | UI skills | Skills as a clickable JSX component tree with a live preview |
| L03 API Gateway | Projects | Each project is an endpoint; expand it for docs + a JSON response |
| L04 Services | Backend skills | Animated microservice graph; hover a node for tools & proficiency |
| L05 Database | Experience | `SELECT * FROM experience` result table, plus education |
| L06 Response | Contact | `POST /api/contact` form that hits a real, zod-validated API route |

Extras: a tracing rail that follows the request (top bar on mobile), **⌘K / Ctrl+K** command palette, **Raw mode** (the whole site as plain text, which recruiters and screen readers like), dark ("prod") / light ("staging") theme, a joke 404, and a generated OG image.

## Make it yours

**Edit one file: [`src/content/content.ts`](src/content/content.ts).** Every section reads from it: profile, bio, links, skills tree, projects, services, experience and education.

Also:
- Resume lives at `public/mihir_sidhdhapura_resume.pdf` (`resumeUrl` in `content.ts`).
- Optional photo: drop `public/me.jpg` and set `photo: "/me.jpg"` in `content.ts`.
- Set your real `domain` (used for metadata and the OG image).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Contact form email (optional)

Without configuration, messages are logged to the server console. To get them by email, create a free [Resend](https://resend.com) key and set the env vars (see `.env.example`):

```
RESEND_API_KEY=re_...
CONTACT_TO=you@yourmail.com
CONTACT_FROM="Portfolio <onboarding@resend.dev>"
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). Add the env vars above in the project settings.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Zod, Lucide.

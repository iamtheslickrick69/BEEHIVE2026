# CLAUDE.md - BeeHive Rental & Sales Web Application

## Project Overview

**Client Website**: https://www.beehiverentalandsales.com/

This is a **world-class professional web application** for BeeHive Rental & Sales, a premier equipment rental and sales company. This is not just a website—it's a fully functional, high-performance web application designed to serve contractors and construction companies.

### Core Principles
- ✅ **Functional**: Every feature must work flawlessly
- 🔒 **Protected**: Security-first approach with proper validation and error handling
- ⚡ **Fast**: Optimized for quick load times and smooth performance
- 🎯 **Professional**: Enterprise-grade code quality and user experience

---

## Tech Stack

### Core Framework
- **Next.js** 16.0.10 (App Router)
- **React** 19.2.0
- **TypeScript** 5 (strict mode enabled)
- **Node.js** (latest LTS)

### Styling & UI
- **Tailwind CSS** 4.1.9
- **Radix UI** (accessible component primitives)
- **Framer Motion** 12.23.26 (animations)
- **Lucide React** (icons)
- **class-variance-authority** (component variants)
- **next-themes** (dark mode support)

### Forms & Validation
- **React Hook Form** 7.60.0
- **Zod** 3.25.76 (schema validation)
- **@hookform/resolvers** 3.10.0

### Additional Libraries
- **date-fns** 4.1.0 (date utilities)
- **react-markdown** + **remark-gfm** (markdown rendering)
- **sonner** (toast notifications)
- **Vercel Analytics** (performance monitoring)
- **Recharts** (data visualization)

### Development
- **ESLint** (code linting)
- **PostCSS** + **Autoprefixer**
- **tw-animate-css** (Tailwind animations)

---

## Code Standards & Conventions

### TypeScript
- **Strict mode** is enabled—embrace type safety
- Use proper type annotations, avoid `any`
- Prefer interfaces for object shapes, types for unions/intersections
- Use Zod for runtime validation

### Component Structure
```tsx
// Preferred pattern: Functional components with TypeScript
import { ComponentProps } from 'react'

interface MyComponentProps {
  title: string
  onAction?: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return <div>{title}</div>
}
```

### File Naming
- **Components**: `kebab-case.tsx` (e.g., `hero-section.tsx`)
- **Pages**: Next.js convention (`page.tsx`, `layout.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Types**: Define in same file or `types.ts` if shared

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Local components (UI components first)
4. Utilities and helpers
5. Types
6. Styles (if any)

### Component Organization
```
components/
├── ui/              # Reusable UI primitives (shadcn/ui pattern)
├── home/            # Homepage-specific components
├── blog/            # Blog-specific components
├── inventory/       # Inventory-specific components
└── [feature]/       # Feature-specific components
```

### Styling
- Use **Tailwind CSS** utility classes
- Follow mobile-first responsive design
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Prefer component variants with CVA (class-variance-authority)

```tsx
// Good
<Button variant="outline" size="lg">Click me</Button>

// Avoid inline conditional complexity
<button className={isActive ? 'bg-blue-500' : 'bg-gray-500'}>
```

---

## Architecture & Patterns

### App Router Structure
- Use **Server Components by default**
- Add `"use client"` only when needed (interactivity, hooks, browser APIs)
- Leverage **React Server Components** for better performance
- Use `loading.tsx` and `error.tsx` for route-level states

### State Management
- **Local state**: `useState` for component-level state
- **Form state**: React Hook Form
- **URL state**: Next.js `searchParams` for filters/pagination
- **Global state**: Context API or state management library (if needed)

### Data Fetching
- Server Components: Direct async/await
- Client Components: React hooks or SWR/React Query (when added)
- Always handle loading and error states

### Component Composition
- Build small, focused components
- Compose larger features from smaller pieces
- Follow the "container/presentational" pattern when beneficial

### Performance Optimization
- Use **Next.js Image component** for all images
- Implement **lazy loading** for below-the-fold content
- Use **dynamic imports** for heavy components
- Minimize client-side JavaScript
- Optimize bundle size (check with `npm run build`)

---

## File Organization Rules

### When to Create New Files
- **New page**: Add to `app/[route]/page.tsx`
- **New reusable component**: Add to `components/ui/`
- **New feature component**: Add to `components/[feature]/`
- **New utility**: Add to `lib/`
- **New type**: Add to component file or `types/` if widely shared

### When to Modify Existing Files
- Extending existing component functionality
- Adding props to existing components
- Fixing bugs in existing code
- Updating styles or content

### Never Create
- Duplicate components (search first!)
- One-off utilities that could be inline
- Overly abstracted helpers for single use

---

## Testing Requirements

### Current State
- No test framework configured yet
- When implementing: Jest + React Testing Library recommended

### Future Testing Strategy
- **Unit tests**: Critical utilities and helpers
- **Integration tests**: Complex component interactions
- **E2E tests**: Critical user flows (checkout, contact forms)
- Target **70%+ coverage** for business logic

---

## Git Workflow & Commit Standards

### Branch Strategy
- **Main branch**: `main` (production-ready code)
- **Feature branches**: `claude/[feature-name]-[session-id]`
- Always develop on designated Claude branches
- Never push directly to `main` without approval

### Commit Messages
Follow conventional commits:
```
feat: add copy-to-clipboard button for Claude prompts
fix: resolve form validation error on contact page
refactor: simplify inventory filter logic
docs: update README with setup instructions
style: improve mobile responsiveness on hero section
perf: optimize image loading on sales page
```

### Commit Frequency
- Commit after completing a logical unit of work
- Commit before switching tasks
- Always commit before running `/clear`

### Push Strategy
- Use `git push -u origin [branch-name]`
- Branch must start with `claude/` and end with session ID
- Retry up to 4 times with exponential backoff on network errors

---

## What Claude Should NEVER Do

### Absolute Don'ts
❌ **Never** modify `package.json` without explicit permission
❌ **Never** remove TypeScript strict mode
❌ **Never** disable ESLint rules globally
❌ **Never** add `any` types as shortcuts
❌ **Never** commit sensitive data (API keys, secrets, `.env` files)
❌ **Never** force push to `main` branch
❌ **Never** create security vulnerabilities (XSS, SQL injection, etc.)
❌ **Never** optimize prematurely—profile first
❌ **Never** add dependencies without justification
❌ **Never** ignore TypeScript errors (fix them!)

### Code Quality
❌ **Never** create duplicate components
❌ **Never** bypass form validation
❌ **Never** skip error handling on user inputs
❌ **Never** use `console.log` in production code
❌ **Never** ignore accessibility best practices

---

## Common Tasks & Workflows

### Adding a New Page
1. Create `app/[route]/page.tsx`
2. Create associated components in `components/[route]/`
3. Update navigation if needed
4. Test mobile responsiveness
5. Commit with `feat: add [page-name] page`

### Creating a New Component
1. Check if similar component exists
2. Create in appropriate directory (`ui/` or `[feature]/`)
3. Use TypeScript interfaces for props
4. Follow shadcn/ui patterns for UI components
5. Test across different viewports

### Adding a Blog Post
1. Create markdown file: `blog-[number]-[slug].md`
2. Follow existing front matter format
3. Optimize images before adding
4. Update blog index if needed

### Updating Inventory
1. Modify data in appropriate source
2. Ensure images are optimized
3. Test filtering and search functionality
4. Verify mobile layout

### Form Implementation
1. Use React Hook Form + Zod schema
2. Implement proper validation messages
3. Add loading states
4. Handle errors gracefully
5. Test all edge cases

---

## External Integrations & APIs

### Current Integrations
- **Vercel Analytics**: Performance and usage tracking
- **Next.js Image Optimization**: Automatic image optimization

### Potential Future Integrations
- Email service (contact forms)
- Payment processor (for sales)
- CRM integration (customer management)
- Inventory management API
- Analytics (Google Analytics, etc.)

**Note**: Before adding any external integration, confirm with the user.

---

## Security Best Practices

### Input Validation
- **Always** validate user input with Zod schemas
- Sanitize markdown/HTML content
- Use parameterized queries (when DB is added)
- Implement rate limiting on forms

### Environment Variables
- Store secrets in `.env.local` (never commit!)
- Use `NEXT_PUBLIC_` prefix only for public variables
- Validate env vars at build time

### XSS Prevention
- Use React's built-in escaping
- Be cautious with `dangerouslySetInnerHTML`
- Sanitize markdown rendered content

### CSRF Protection
- Implement CSRF tokens for mutations
- Use SameSite cookies (when auth is added)

---

## Performance Standards

### Load Time Goals
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Optimization Checklist
- ✅ Use Next.js Image component
- ✅ Minimize JavaScript bundle size
- ✅ Lazy load below-the-fold content
- ✅ Optimize fonts (next/font)
- ✅ Compress images (WebP format)
- ✅ Enable gzip/brotli compression
- ✅ Leverage browser caching
- ✅ Use React Server Components

### Bundle Size
- Monitor with `npm run build`
- Keep page bundles < 200KB (gzipped)
- Code-split large dependencies

---

## Accessibility Standards

- ✅ Semantic HTML elements
- ✅ ARIA labels where needed (Radix UI handles most)
- ✅ Keyboard navigation support
- ✅ Color contrast ratios (WCAG AA minimum)
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ Form labels and error messages

---

# Context Management Rules

## Auto-Compaction
- When context usage reaches 70%, automatically run `/compact` and summarize:
  - Key decisions made
  - Files created/modified
  - Open TODOs
  - Important findings
- Save summaries to `.claude/session-notes/` with timestamp

## Auto-Clear Triggers
- After completing a major feature → `/clear` and commit
- When switching between unrelated tasks → `/clear`
- If you detect degraded performance or confusion → `/clear`
- Before starting a completely new conversation topic → `/clear`

## Memory Priorities
1. Save architectural decisions to `CLAUDE.md`
2. Save reusable code patterns to `.claude/patterns/`
3. Save debugging insights to `.claude/debugging-notes.md`
4. Discard exploratory code attempts
5. Discard old test results after verification

## Session Boundaries
- One feature = one session
- One bug fix = one session
- Clear between unrelated work

---

## Project-Specific Notes

### Current Status
- ✅ Homepage implemented with all sections
- ✅ Blog system with markdown support
- ✅ Inventory/Sales/Repair pages
- ✅ Responsive design
- ✅ Dark mode support
- 🚧 Contact form functionality
- 🚧 Backend integrations
- 📋 Testing suite (pending)

### Known Technical Debt
- `next.config.mjs` has `ignoreBuildErrors: true` (should fix TypeScript errors)
- Images set to `unoptimized: true` (should optimize production images)
- No test coverage yet

---

## Quick Reference

### Common Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Path Aliases
- `@/*` maps to root directory
- Import like: `import { Button } from '@/components/ui/button'`

### Key Directories
- `app/` - Next.js pages and routes
- `components/` - React components
- `lib/` - Utility functions
- `public/` - Static assets
- `styles/` - Global styles

---

## Questions or Clarifications?

If you encounter scenarios not covered in this document:
1. Follow existing patterns in the codebase
2. Prioritize functionality, security, and performance
3. Ask the user for clarification when needed
4. Update this CLAUDE.md with new decisions

---

**Last Updated**: 2025-12-14
**Version**: 1.0

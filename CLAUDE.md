# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language and Communication

- **All communication should be in Japanese (日本語)**
- Code comments should be written in Japanese
- Technical explanations should be provided in Japanese
- This is a learning project for Japanese developers

## Current Development Phase

- **Project is in Phase 1: Foundation Setup (基盤構築段階)**
- Only documentation files exist currently
- Next steps: monorepo setup with pnpm workspaces
- Follow TODO.md for implementation order
- Prioritize learning and understanding over speed

## Project Overview

This is a muscle training tracking app built as a learning project using functional Domain-Driven Design (DDD) and Test-Driven Development (TDD). The project uses a monorepo structure with pnpm workspaces and follows functional programming principles with TypeScript.

**Tech Stack:**
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Backend: Hono (Cloudflare Workers) + TypeScript
- Database: Neon PostgreSQL + Drizzle ORM
- Authentication: Auth.js + Google OAuth
- UI: Storybook + @storybook/addon-a11y
- Testing: Vitest + @testing-library/react
- Charts: Chart.js

## Architecture

**Monorepo Structure:**
```
apps/
├── web/          # Next.js frontend
└── api/          # Hono backend
packages/
├── types/        # Shared TypeScript types
├── db/           # Database schema & queries (Drizzle ORM)
├── ui/           # Shared UI components
└── utils/        # Utility functions
```

**Key Architectural Principles:**
- **Functional DDD**: No classes, pure functions for business logic, immutable data
- **Type Safety**: Strict TypeScript with readonly types and domain modeling
- **Dependency Flow**: apps → packages, avoid circular dependencies
- **TDD Focus**: Heavy TDD for API layer and business logic, lighter for UI

## Development Commands

**Main Commands:**
```bash
# Start all development servers
pnpm dev

# Frontend only
pnpm --filter web dev

# Backend only  
pnpm --filter api dev

# Build all packages
pnpm build

# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter api test
pnpm --filter web test

# TDD watch mode
pnpm --filter api test --watch

# Linting, formatting and type checking
pnpm biome check
pnpm biome format
pnpm type-check

# Database operations
pnpm --filter db generate    # Generate Drizzle migrations
pnpm --filter db migrate     # Run migrations

# UI development
pnpm --filter ui storybook   # Start Storybook
```

## Domain Model

**Core Entities:**
- `User`: Google OAuth authenticated users (max 2)
- `BodyRecord`: Weight and body fat tracking
- `Exercise`: User-created workout exercises (no seed data)
- `WorkoutGroup`: Exercise groupings (e.g., "Push Day", "Pull Day")
- `WorkoutRecord`: Exercise session records with weights/reps

**Functional DDD Pattern:**
```typescript
// Domain types (readonly, immutable)
export type Exercise = {
  readonly id: string
  readonly name: string
  readonly userId: string
  readonly createdAt: Date
}

// Pure business logic functions
export const createExercise = (command: CreateExerciseCommand): Exercise => ({
  // Pure function implementation
})
```

## TDD Strategy

**Heavy TDD (Red-Green-Refactor):**
- All Hono API endpoints
- Business logic functions in domain layer
- Data calculations and aggregations
- Accessibility tests for UI components

**Light Testing:**
- Next.js component basic functionality
- Auth flows (integration testing only)
- Chart.js configurations (visual confirmation)

**Test Structure:**
```
__tests__/
├── unit/           # Pure function tests
├── integration/    # API integration tests  
└── e2e/           # End-to-end tests (web only)
```

## Code Style Guidelines

**Functional Programming:**
- Use `const` and `readonly` extensively
- Avoid mutation, prefer immutable updates
- Pure functions for business logic
- Minimize side effects, isolate when necessary

**TypeScript:**
- Strict mode enabled with `noUncheckedIndexedAccess`
- Domain types in `packages/types`
- Use branded types for IDs when beneficial
- Prefer type unions over enums

**API Design:**
- RESTful endpoints with consistent naming
- Strong request/response typing
- Error handling with proper HTTP codes
- Authentication middleware on protected routes

## Accessibility Requirements

- WCAG AA compliance mandatory
- All UI components must support keyboard navigation
- Screen reader compatibility with semantic HTML and ARIA
- Color contrast testing
- Focus management for modals/forms
- Biome provides built-in accessibility linting rules
- Use @axe-core/react for runtime automated testing

## Database Schema Notes

**Key Tables:**
- `users` - Google OAuth user data
- `body_records` - Weight/body fat entries
- `exercises` - User-created exercise definitions
- `workout_groups` - Exercise groupings (many-to-many with exercises)
- `workout_records` - Individual workout session data

**Migration Management:**
- Use Drizzle schema-first approach
- Generate migrations with `pnpm --filter db generate`
- Manual review required before running migrations

## Learning Project Context

**Primary Goals:**
- **Pair programming learning experience (ペアプログラミング学習)**
- Functional DDD + TDD practical understanding
- Modern TypeScript and JavaScript skill acquisition
- Clean architecture comprehension
- Accessibility awareness development

**Teaching Approach:**
- **Explain all technical decisions and architectural choices in Japanese**
- Code should be educational and well-documented with Japanese comments
- Prefer explicit patterns over clever shortcuts
- Include type annotations even when inferred
- Demonstrate best practices through implementation
- Regular knowledge sharing and understanding verification

**Development Philosophy:**
- **Learning effectiveness over development speed**
- Quality and understanding over quick delivery
- Encourage questions and discussions in Japanese
- Document decision-making processes
- Real-time code review and feedback

## Special Considerations

**PWA Requirements:**
- Basic PWA functionality (manifest, service worker)
- No offline support required
- Mobile-first responsive design

**Performance:**
- Regular data sync (not real-time)
- Chart.js optimization for mobile
- Next.js App Router with proper loading states
- Cloudflare Workers for global edge performance
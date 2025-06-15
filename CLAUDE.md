# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (preferred)
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture Overview

This is a Next.js 15 portfolio application using the App Router architecture with:

- **Framework**: Next.js 15 with App Router (`src/app/` directory structure)
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **UI Components**: shadcn/ui components configured with "new-york" style
- **Fonts**: Geist Sans and Geist Mono fonts via `next/font/google`
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to `src/*`)

## Key Configuration

- **shadcn/ui**: Configured in `components.json` with aliases for `@/components`, `@/lib/utils`, etc.
- **Tailwind**: CSS file located at `src/app/globals.css` with CSS variables enabled
- **Path Aliases**: `@/*` resolves to `src/*` (configured in both `tsconfig.json` and `components.json`)
- **Icon Library**: Uses Lucide icons via `lucide-react`

## Code Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/lib/utils.ts` - Utility functions including `cn()` for class merging
- Components should follow shadcn/ui patterns when added to `@/components/ui`

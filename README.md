# Kal-EL: Interactive Wall Calendar

A production-quality, interactive monthly calendar application built with **Next.js 16**, **React 19**, and **Tailwind CSS**. Transform static calendar designs into a dynamic, responsive UI with seasonal theming, reminders, and persistent note-taking.

## Key Features

### Seasonal Theme System
- **Dynamic color transitions** throughout the year based on month
- **January (Darkest)** → **August (Brightest)** → **December (Dark)**
- Smooth daily transitions with automatic text contrast adjustment
- 11-level color palette for imperceptible seasonal mood shifts

### Interactive Calendar
- **Click any date** to add/edit reminders and notes
- **Today indicator** with blue highlight
- **Weekend styling** with distinct visual treatment
- **Holiday highlighting** with 15+ predefined holidays (Holi, Diwali, Christmas, etc.)
- **Dynamic hero images** that update per month with 3D wave effects

### Note Taking System
- **Monthly Notes** - One set per month with auto-save
- **Date Range Notes** - Multi-day tracking for trips, projects, or events
- **Persistent Storage** - All data saves to localStorage (offline-ready)

### Reminders
- Add custom notes to any date
- Visual badge indicators for dates with reminders
- Quick access via context menu (right-click)

### Animations & Effects
- Smooth month transitions with Framer Motion 3D page-flip effects
- Hover animations on interactive elements
- Tactile visual feedback for all interactions

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.2.2 | React framework with App Router |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type safety (strict mode, zero `any` types) |
| **Tailwind CSS** | 4.x | Responsive styling & utility classes |
| **Framer Motion** | 12.38.0 | 3D animations & smooth transitions |
| **Zustand** | 4.5.7 | Lightweight state management |
| **date-fns** | 4.1.0 | Date calculations & formatting |
| **Lucide React** | 1.7.0 | Icon library |

## Getting Started

### Prerequisites
- **Node.js** 18.0+ (check with `node --version`)
- **npm** 9.0+ or **yarn** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-gh-repo-url>
   cd kal-el
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

```
kal-el/
├── app/
│   ├── layout.tsx              # Root layout & metadata
│   ├── page.tsx                # Main calendar page
│   ├── globals.css             # Global Tailwind styles
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ReminderModal.tsx   # Add/edit reminders modal
│   │   ├── ThemeProvider.tsx   # Theme context provider
│   │   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   │   ├── Tooltip.tsx         # Reusable tooltip component
│   │   └── calendar/
│   │       ├── CalendarContainer.tsx  # Main orchestration
│   │       ├── CalendarHeader.tsx     # Month/year selector
│   │       ├── CalendarGrid.tsx       # Week grid layout
│   │       ├── DayCell.tsx            # Individual day cell
│   │       ├── ImageHero.tsx          # Hero image display
│   │       ├── NotesPanel.tsx         # Note editor
│   │       ├── ReminderBadge.tsx      # Reminder indicator
│   │       └── index.ts               # Barrel exports
│   ├── lib/
│   │   ├── calendarUtils.ts    # Date calculations
│   │   ├── holidayData.ts      # 2026 holiday definitions
│   │   ├── monthImages.ts      # Hero image mappings
│   │   └── themeUtils.ts       # Theme color calculations
│   ├── store/
│   │   ├── useCalendarStore.ts # Zustand store
│   │   └── index.ts
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/
│   ├── images/                 # Monthly hero images
│   └── sounds/
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## Usage Guide

### Adding Reminders
1. **Click a date** to open the reminder modal
2. **Right-click** any date for quick add via context menu
3. Enter your note and click **Add** or **Update**
4. Delete with the trash icon

### Taking Notes
- **Month Notes** (top textarea) - Auto-saves per month
- **Date Range Notes** (bottom textarea) - Appears when dates selected
- Data persists in browser localStorage across sessions

### Navigation
- Click **right arrow** to go to next month
- Click **left arrow** to go to previous month
- Use month/year dropdowns for quick navigation

## Architectural Choices

### State Management
- **Zustand** for lightweight, efficient global state without context provider boilerplate
- Stores: current month/year, reminders, notes, and date selections
- Automatic localStorage persistence via custom middleware

### Theming System
- **Distance-from-August algorithm** calculates seasonal color intensity
- 11-level palette (0=darkest, 10=brightest) ensures smooth transitions
- Real-time color updates via inline styles + Tailwind classes
- Text contrast automatically adjusts for readability

### Performance Optimizations
- Lazy-loaded images (Next.js Image component)
- Code splitting with dynamic imports
- Memoized components prevent unnecessary re-renders
- Only re-render on state changes, not parent updates

### Data Persistence
- localStorage for reminders, notes, and app state
- No backend required - pure client-side application
- Offline-ready with zero external API dependencies
- Data survives browser restart

### Type Safety
- **TypeScript strict mode** enabled
- Zero `any` types in codebase
- Compile-time error detection for better DX

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Vercel auto-deploys on every push to main branch

### Deploy to Other Platforms

**Build for production:**
```bash
npm run build
npm start
```

The `.next/` directory is ready to deploy to any Node.js hosting platform (Heroku, Railway, Render, etc.).

## Constraints & Limitations

- No backend required (pure client-side)
- No external APIs (fully self-contained)
- Data stored in browser localStorage only
- No data sync across browser tabs (intentional)
- Data cleared if browser storage is cleared

## Future Enhancements

- Export calendar to PDF/iCal format
- Custom holiday lists per user
- Calendar sharing functionality
- Mobile app with React Native
- Recurring reminders
- Calendar sync with Google Calendar

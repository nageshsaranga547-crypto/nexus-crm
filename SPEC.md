# SaaS CRM Application Specification

## 1. Project Overview

**Project Name:** Nexus CRM  
**Type:** SaaS Multi-tenant Customer Relationship Management Application  
**Core Functionality:** A comprehensive CRM system for managing contacts, deals, tasks, and activities with real-time dashboard analytics  
**Target Users:** Small to medium businesses looking for an affordable, intuitive CRM solution

## 2. UI/UX Specification

### Layout Structure

**Overall Layout:**
- Sidebar navigation (260px fixed width) on the left
- Top header bar (64px height) with user profile and global actions
- Main content area with dynamic routing
- Responsive: sidebar collapses to hamburger menu on mobile (<768px)

**Page Structure:**
- `/` - Redirect to dashboard
- `/dashboard` - Main dashboard with metrics and charts
- `/contacts` - Contact management list and details
- `/deals` - Deal pipeline management (Kanban-style)
- `/tasks` - Task list with filters
- `/settings` - Account and workspace settings

### Visual Design

**Color Palette:**
- Primary: `#2563EB` (Royal Blue)
- Primary Dark: `#1D4ED8`
- Primary Light: `#3B82F6`
- Secondary: `#0F172A` (Slate 900)
- Accent: `#10B981` (Emerald)
- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Text Primary: `#1E293B`
- Text Secondary: `#64748B`
- Border: `#E2E8F0`

**Typography:**
- Font Family: "Plus Jakarta Sans" (Google Fonts) with system fallbacks
- Headings:
  - H1: 28px/700 weight
  - H2: 22px/600 weight
  - H3: 18px/600 weight
- Body: 14px/400 weight
- Small: 12px/400 weight
- Line height: 1.5

**Spacing System:**
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- Border radius: 6px (small), 8px (medium), 12px (large), 16px (xl)

**Visual Effects:**
- Card shadows: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
- Elevated shadows: `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)`
- Transitions: 150ms ease-out for interactions
- Hover states: slight scale (1.02) on cards, color shifts on buttons

### Components

**Sidebar:**
- Logo at top
- Navigation items with icons
- Active state: primary color background with white text
- Hover: light primary background
- Bottom: workspace selector and user avatar

**Header:**
- Breadcrumb navigation
- Global search input
- Notification bell
- User dropdown menu

**Cards:**
- White background with subtle shadow
- 16px padding
- Hover: elevated shadow

**Buttons:**
- Primary: Blue background, white text, 10px 20px padding
- Secondary: White background, blue border and text
- Ghost: Transparent, text only
- Disabled: 50% opacity, no pointer events

**Forms:**
- Input fields: 40px height, 12px padding, border `#E2E8F0`
- Focus: Blue border `#2563EB`, ring shadow
- Labels: 12px, uppercase, `#64748B`
- Error state: Red border, error message below

**Tables:**
- Striped rows (alternate `#F8FAFC`)
- Sticky header
- Row hover highlight

**Modal/Dialog:**
- Centered overlay with `rgba(0,0,0,0.5)` backdrop
- White card, max-width 500px
- Close button top right

**Kanban Board (Deals):**
- Horizontal scrollable columns
- Draggable cards
- Column headers with deal count
- Deal cards show: title, value, contact, stage indicator

## 3. Functionality Specification

### Core Features

**Dashboard:**
- Key metrics cards: Total Deals, Deal Value, Contacts, Tasks Due
- Deal pipeline chart (bar chart by stage)
- Recent activities feed
- Upcoming tasks widget

**Contact Management:**
- Contact list with search and filters
- Contact details: name, email, phone, company, tags, notes
- Add/Edit/Delete contacts
- Contact activity timeline

**Deal Pipeline:**
- Kanban board with stages: Lead, Qualified, Proposal, Negotiation, Won, Lost
- Deal cards showing: title, value, contact, probability, expected close date
- Drag and drop between stages
- Deal value total per stage

**Task Management:**
- Task list with filters (due date, status, assignee)
- Task properties: title, description, due date, priority, status, assignee
- Quick add task inline
- Mark complete/incomplete

**Multi-tenancy:**
- Workspace concept (tenant isolation)
- User authentication with JWT
- Role-based access (Admin, Member)
- Each workspace has isolated data

### User Interactions and Flows

**Authentication:**
- Login page with email/password
- JWT token stored in localStorage
- Auto-redirect to dashboard on authenticated

**Contact Flow:**
- View list → Click row → View detail modal → Edit or Delete
- Add contact: Click "+" button → Modal form → Save

**Deal Flow:**
- View pipeline → Drag card between stages → Stage updates
- Add deal: Click "+" in column → Form modal → Save

**Task Flow:**
- View list → Checkbox to complete → Status updates
- Add task: Quick add input or full form modal

### Data Handling

**State Management:**
- React Context for global state (auth, workspace)
- Local state for component-specific data
- Custom hooks for data fetching patterns

**Mock Data:**
- Pre-populated sample contacts (15 contacts)
- Sample deals across all stages (20 deals)
- Sample tasks with various statuses (25 tasks)
- Sample activities (recent 10)

### Edge Cases

- Empty states with helpful illustrations and CTAs
- Loading skeletons during data fetch simulation
- Error handling with retry options
- Form validation before submission
- Confirmation dialogs for destructive actions

## 4. Technical Specification

### Tech Stack

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router DOM v6
- **Drag & Drop:** @dnd-kit/core
- **State:** React Context + useReducer
- **Build:** Vite

### Project Structure

```
/src
  /components
    /ui          - Reusable UI components
    /layout      - Layout components (Sidebar, Header)
  /pages         - Page components
  /context       - React Context providers
  /hooks         - Custom hooks
  /data          - Mock data
  /utils         - Helper functions
  /styles        - Global styles
```

### Key Implementation Details

- CSS custom properties for theme colors
- Responsive breakpoints: 768px (tablet), 1024px (desktop)
- Smooth page transitions with React Router
- Optimistic UI updates for drag-drop

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Sidebar displays with correct colors and active states
- [ ] Dashboard shows 4 metric cards in a grid
- [ ] Pipeline chart renders with correct data
- [ ] Contact list displays with alternating row colors
- [ ] Kanban board shows 6 columns with draggable cards
- [ ] Task list shows checkbox interactions
- [ ] Modal overlays with backdrop blur
- [ ] Forms validate input before submission
- [ ] Responsive layout works on mobile viewport

### Functional Checkpoints
- [ ] Navigation between pages works
- [ ] Login/logout flow functions
- [ ] Contacts can be added, viewed, edited, deleted
- [ ] Deals can be dragged between pipeline stages
- [ ] Tasks can be marked complete
- [ ] Dashboard metrics update based on data
- [ ] Search/filter functions work on lists
- [ ] Empty states display appropriately

### Performance Checkpoints
- [ ] Initial page load under 2 seconds
- [ ] Smooth animations (60fps)
- [ ] No console errors

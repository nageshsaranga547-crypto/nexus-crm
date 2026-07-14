# Nexus CRM - HubSpot-Style CRM Application

## 1. Project Overview

**Project Name:** Nexus CRM  
**Type:** SaaS Multi-tenant Customer Relationship Management Application  
**Core Functionality:** A comprehensive CRM system inspired by HubSpot with modern UI, multiple modules, and enterprise-grade features  
**Target Users:** Sales teams, marketing professionals, and service teams looking for an intuitive CRM solution

---

## 2. UI/UX Specification

### Layout Structure

**HubSpot-Style Layout:**
- **Left Sidebar Navigation** (240px width) - Collapsible, HubSpot coral/orange theme
- **Top Header Bar** (56px height) - Global search, notifications, quick create, user profile
- **Main Content Area** - Full-width with consistent padding
- **Right Panel** (optional) - Slide-out for quick views and details

**Navigation Sections:**
1. **Main Menu**
   - Dashboard
   - Contacts
   - Companies
   - Deals (Pipeline)
   - Tasks
   - Calendar
   - Calls
   - Emails
   - Quotes
   - Reports

2. **Marketing** (collapsible)
3. **Sales** (collapsible)
4. **Service** (collapsible)
5. **Automation** (collapsible)

**Page Structure:**
- `/` - Redirect to dashboard
- `/dashboard` - Main dashboard with analytics
- `/contacts` - Contact management with timeline
- `/companies` - Company management
- `/deals` - Deal pipeline (board + list views)
- `/tasks` - Task management with kanban/list views
- `/calendar` - Calendar view
- `/calls` - Call logging
- `/emails` - Email tracking
- `/quotes` - Quote generation
- `/reports` - Analytics and reporting
- `/settings` - Account, workspace, and preferences

### Visual Design

**HubSpot-Inspired Color Palette:**
- **Primary:** `#FF7A59` (HubSpot Coral Orange)
- **Primary Dark:** `#E85A3C`
- **Primary Light:** `#FF9B85`
- **Secondary:** `#335FCT` (Blue)
- **Background:** `#F5F5F5`
- **Surface:** `#FFFFFF`
- **Dark Surface:** `#2D2D2D`
- **Text Primary:** `#1A1A1A`
- **Text Secondary:** `#757575`
- **Text Tertiary:** `#A0A0A0`
- **Border:** `#E5E5E5`
- **Success:** `#00A78E`
- **Warning:** `#F5A623`
- **Error:** `#E52E33`
- **Info:** `#3B86F0`

**Pipeline Stage Colors:**
- Appointment Scheduled: `#8F87F5`
- Qualified to Buy: `#00A78E`
- Presentation Scheduled: `#3B86F0`
- Decision Maker Bought-In: `#F5A623`
- Contract Sent: `#FF7A59`
- Closed Won: `#00C853`
- Closed Lost: `#9E9E9E`

**Typography:**
- Font Family: "Inter" (Google Fonts), fallback to system sans-serif
- Headings:
  - H1: 24px/600 weight
  - H2: 20px/600 weight
  - H3: 16px/600 weight
  - H4: 14px/600 weight
- Body: 14px/400 weight
- Small: 12px/400 weight
- Line height: 1.5

**Spacing System:**
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px
- Border radius: 4px (small), 6px (medium), 8px (large)
- Card padding: 20px

**Visual Effects:**
- Card shadows: `0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.05)`
- Elevated shadows: `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)`
- Transitions: 150ms ease-out
- Hover: subtle background shift

### Components

**Sidebar:**
- Logo with app name
- Collapsible nav sections
- Active item: Coral background, white text
- Hover: Light coral background
- Bottom: User avatar, settings, help

**Header:**
- Global search bar with keyboard shortcut (Cmd/Ctrl + K)
- Notification bell with badge
- Quick create button (dropdown: Contact, Company, Deal, Task, etc.)
- User avatar with dropdown menu

**Cards:**
- White background
- Subtle border and shadow
- Hover: elevated shadow

**Buttons:**
- Primary: Coral background, white text
- Secondary: White background, coral border and text
- Ghost: Transparent, text only
- Sizes: Small (28px), Medium (32px), Large (40px)

**Tables/Lists:**
- Clean rows with hover highlight
- Checkbox selection
- Inline actions on hover
- Bulk action bar when items selected

**Modal/Dialog:**
- Centered overlay with backdrop blur
- White card, max-width 600px
- Header with title and close button
- Footer with action buttons

**Pipeline Board:**
- Horizontal scrollable columns
- Swimlane style with stage colors
- Draggable cards
- Column totals
- Add deal button per column

---

## 3. Functionality Specification

### Core Modules

**1. Dashboard**
- Analytics overview with key metrics
- Deal forecast chart
- Activity feed (recent contacts, deals, tasks)
- Tasks due today
- Recent deals
- Sales pipeline snapshot

**2. Contacts Module**
- List view with search and filters
- Contact properties: name, email, phone, company, lifecycle stage, lead status
- Contact detail view with:
  - Header: Photo, name, title, company
  - Activity timeline (calls, emails, meetings, notes)
  - Associated deals
  - Associated company
- Add/Edit/Delete contacts
- Import contacts (CSV)
- Contact tags

**3. Companies Module**
- Company list with logo, name, domain
- Company properties: name, domain, industry, employees, revenue
- Company detail with:
  - Associated contacts
  - Associated deals
  - Activity timeline
- Add/Edit/Delete companies

**4. Deals Pipeline**
- **Board View:** Kanban-style with stages as columns
  - Stages: Appointment Scheduled, Qualified to Buy, Presentation Scheduled, Decision Maker Bought-In, Contract Sent, Closed Won, Closed Lost
  - Drag and drop between stages
  - Deal cards: title, amount, contact, stage, close date
  - Stage totals
- **List View:** Table with sortable columns
- Deal properties: title, amount, stage, close date, contact, company, probability, owner
- Deal detail slide-out panel

**5. Tasks Module**
- List view with filters (owner, due date, status)
- Kanban view by status (Not Started, In Progress, Completed, Deferred)
- Task properties: title, description, due date, priority, status, owner, associated contacts/deals
- Task detail modal
- Mark complete/incomplete
- Recurring tasks

**6. Calendar Module**
- Monthly/Weekly/Daily views
- Events: meetings, calls, tasks due
- Click to create event
- Integration with deals/contacts

**7. Calls Module**
- Call log list
- Call properties: contact, duration, outcome, notes
- Call recording link
- Call status: scheduled, completed, missed

**8. Emails Module**
- Email tracking
- Email templates
- Compose email modal
- Associated with contacts/deals

**9. Quotes Module**
- Quote list
- Quote properties: contact, deal, line items, total
- Quote status: draft, sent, accepted, declined
- Generate PDF

**10. Reports Module**
- Sales pipeline report
- Revenue forecast
- Activity report
- Contact report
- Deal velocity

**11. Settings**
- Profile settings
- Workspace settings
- Team management
- Integrations
- Notifications preferences
- Security settings

### User Interactions

**Quick Create (Cmd/Ctrl + K):**
- Floating modal with search
- Create: Contact, Company, Deal, Task, Call, Email, Quote

**Global Search:**
- Search across all records
- Recent searches
- Keyboard navigation

**Notifications:**
- Real-time notification bell
- Notification types: new contacts, deal updates, task reminders, mentions

### Data Handling

**State Management:**
- React Context for global state
- Local state for component data
- Custom hooks for business logic

**Mock Data:**
- 50+ sample contacts
- 25+ sample companies
- 40+ sample deals across all stages
- 30+ sample tasks
- 20+ sample activities

---

## 4. Technical Specification

### Tech Stack
- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React + Custom SVGs
- **Charts:** Recharts
- **Routing:** React Router DOM v6
- **Drag & Drop:** @dnd-kit/core
- **Date Picker:** react-datepicker
- **State:** React Context + useReducer
- **Build:** Vite

### Project Structure
```
/src
  /components
    /ui          - Reusable UI components
    /layout      - Layout components
    /common      - Common components (Search, QuickCreate)
  /pages         - Page components
  /context       - React Context providers
  /hooks         - Custom hooks
  /data          - Mock data
  /utils         - Helper functions
```

---

## 5. Acceptance Criteria

### Visual
- [ ] HubSpot-style coral sidebar navigation
- [ ] Modern, clean interface with white space
- [ ] Consistent typography and spacing
- [ ] Pipeline board with colored stages
- [ ] Responsive layout

### Functional
- [ ] All navigation routes working
- [ ] Dashboard with analytics
- [ ] Contacts CRUD operations
- [ ] Companies CRUD operations
- [ ] Deals pipeline with drag-and-drop
- [ ] Tasks with filters and kanban
- [ ] Calendar view
- [ ] Quick create modal
- [ ] Global search
- [ ] Login/logout flow

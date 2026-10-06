# ToonTrack
ToonTrack is a private, password-protected analytics dashboard for tracking [Webtoon](https://www.webtoons.com/) series. It monitors subscriber counts over time, calculates growth metrics, and sends daily push-notification reminders — built for two users to collaboratively manage their reading lists.

## Features

### Dashboard (`/`)
The home page provides a high-level analytics overview:
- **Summary cards** — Median growth %, active series count (ongoing vs. hiatus vs. completed), median subscriber count, and median subscriber change across all tracked series.
- **Series ranking table** — Every tracked Webtoon in a sortable table (by title, subscribers, or growth) showing status, owner, current subs, and month-over-month growth %.
- **Timeline graphs** — Three Recharts area charts plotting historical median growth, median subscribers, and median subscriber change across all series.
- **Notices** — An auto-generated section that flags recent activity from the last 5 days: newly added series (per owner), ownership changes, status changes, newly archived series, and entries with missing metadata.

### Library (`/library`)
A filterable, searchable card gallery of all active (ongoing/hiatus) Webtoons. Each card shows a thumbnail, genre badge, subscriber count, owner, status, and latest growth %. Cards link to individual detail pages.

Filters: sort by title/subscribers/growth, filter by owner, status (ongoing/hiatus), genre, and update day (Sun–Sat). Search works across titles and protagonist names.

### Series Detail (`/library/[slug]`)
A dedicated page per Webtoon displaying:
- Cover art, authors, protagonist(s), genre, status, and update schedule.
- Latest subscriber count and latest growth %.
- Two historical graphs: subscriber timeline and percent growth timeline.
- Quick-action buttons to reassign ownership between users.
- An edit modal to update the thumbnail URL, authors, and protagonists.
- A delete button (requires double-click confirmation) that removes the series from tracking.

### Archive (`/archive`)
A gallery of completed (finished) Webtoons, similar in layout to the Library. Each card shows the cover, genre, authors, protagonists, and owner. Clicking a card opens an edit modal where users can update metadata and set a **reminder day** — a day of the week on which to receive a push notification to re-read or catch up on that series.

Filters: sort by timestamp or title, filter by owner and genre.

### Settings (`/settings`)
Allows each user to register their device for push notifications via Firebase Cloud Messaging. Clicking a button requests notification permissions and stores the FCM token in Supabase.

### Reports (`/reports`)
An archieve of past cumulative subscriber activity. It showcases the top recorded Webtoons as cards and organizes monthly shapshots and data breakdowns in tables. The user can view previous breakdowns by using the dropdown associated with the table. 

### Authentication
The site is password-protected using cookie-based auth. The middleware (`middleware.ts`) redirects all unauthenticated requests to `/login`, where the user enters a shared password. On success, an `auth` cookie is set.

## Architecture

### Frontend
- **Next.js** (App Router) with TypeScript.
- **Tailwind CSS 4** for styling, using the Outfit (headings) and Plus Jakarta Sans (body) fonts.
- **Recharts** for data visualization (area charts).
- **Lucide React** for icons.
- **Supabase JS client** for all database reads/writes from the browser.

### Backend / Database
- **Supabase** stores all data across these tables:
  - `webtoons` — Active series with title, genre, status, owner, update days, subscriber history (`data` as a JSON array of `{month, value}` snapshots), and timestamps.
  - `completed` — Archived series with metadata and an optional reminder day.
  - `subscriptions` — FCM device tokens per user for push notifications.
  - `reports` — Monthly subscriber snapshots across all series.

### Scrapers (Python)
A suite of Python scripts that pull data from Webtoons using BeautifulSoup. Files for initial scraping are in `/scraper` for manual GitHub Actions, while the rest are in `/api` for Vercel cron jobs: 

- **`initial_scraper.py`** — Runs when a new Webtoon is added. Scrapes the title, genre, status, and update days from the Webtoon URL and backfills the database entry. Formerly triggered via webhook.
- **`daily_scraper.py`** — Checks status changes (ongoing, hiatus, completed) for series that update on the current day. Sends push notifications afterward. Runs every morning.
- **`monthly_scraper.py`** — Scrapes current subscriber counts for all tracked series and logs them to the database. Also saves a full snapshot to the `reports` table. Runs on the 1st of every month.
- **`fallback_scraper.py`** — Re-runs initial scraping for any series that failed initial setup (`initial = false`). Manual trigger.
- **`check_status.py`** — Shared helper that determines a series' status by parsing page elements. If a series is completed, it auto-archives it by moving it from `webtoons` to `completed`.
- **`send_push.py`** — Sends Firebase Cloud Messaging push notifications to each user with a count of completed Webtoons they should catch up on that day (based on reminder days). Called by the daily scraper.

### Push Notifications
- **Firebase Cloud Messaging** handles delivery. The frontend registers device tokens, and the backend sends data messages via the Firebase Admin SDK.
- A service worker (`public/firebase-messaging-sw.js`) displays background notifications.

## Data Model

### Toon (active series)
```
id, title, authors, genre, status (Ongoing|Hiatus|Completed),
owner, protagonists, days, toon (URL), thumbnail (URL),
data [{month, value}], timestamp, owner_time, status_time
```

### Comp (completed series)
```
id, title, authors, genre, owner, protagonists,
toon (URL), thumbnail (URL), timestamp,
reminder (day of week or empty)
```

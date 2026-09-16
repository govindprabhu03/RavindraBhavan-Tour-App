# Ravindra Bhavan Tour App

A scroll-scrub virtual tour app for Ravindra Bhavan, a real cultural center in Sankhali, Goa, plus an admin portal to manage its content.

## Structure

- `mobile-app/` — Expo/React Native app: scroll-driven video tour, events, gallery, about, contact
- `admin-portal/` — Next.js admin site for managing events, updates, and council members (backed by Supabase)
- `assets/` — source video and photo assets (the full 4K master video is excluded from this repo — see below)

## Running locally

### Mobile app

```bash
cd mobile-app
npm install
cp .env.example .env.local   # fill in your Supabase URL/key
npx expo start
```

Scan the QR with Expo Go, or press `w` for the web build.

### Admin portal

```bash
cd admin-portal
npm install
cp .env.example .env.local   # fill in your Supabase URL/key
npm run dev
```

Open http://localhost:3000.

## Note on video assets

`assets/tour-video/ravindra-bhavan-tour-4K-master.mp4` (228 MB) is excluded from this repo — it exceeds GitHub's 100 MB file limit. The compressed `ravindra-bhavan-tour.mp4` used by the app is included. If you need the 4K master, it's kept locally outside version control.

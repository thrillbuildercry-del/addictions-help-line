# Sales Operations App (React + Firebase)

Production-ready starter implementing role-based sales operations, location tracking, inventory controls, commissions, and admin reporting.

## Features
- Firebase Auth with Firestore profile role (`admin` / `worker`)
- Role-protected frontend routes and Firestore rules
- Fast mobile-first sale flow with quantity validation (1 decimal)
- Cloud Function transaction for sale + inventory deduction + log + commission
- CUFF support controlled by settings
- Admin settings/product management and dashboard metrics
- Geolocation captured for each sale with location summary page

## Data Model
Collections:
- `users`: `email`, `role`, `createdAt`
- `products`: `name`, `type`, `total_quantity`, `cost_price`, `sell_price`
- `sales`: `user_id`, `product_id`, `type`, `quantity`, `total_expected`, `amount_received`, `cuff`, `latitude`, `longitude`, `commission`, `personal_use`, `timestamp`
- `settings`: `cuff_enabled`, `commission_type`, `commission_value`, `personal_use_discount`
- `inventory_logs`: `product_id`, `change_amount`, `reason`, `timestamp`

## Setup
1. Install dependencies:
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```
2. Copy env:
   ```bash
   cp .env.example .env
   ```
3. Fill Firebase values in `.env`.
4. Set Firebase project in `.firebaserc`.

## Run locally
```bash
npm run dev
```

## Deploy frontend to GitHub Pages
1. Push to `main` and enable **Settings → Pages → Source: GitHub Actions**.
2. Add repository secrets for all `VITE_*` variables used in `.env.example`.
3. The included workflow `.github/workflows/deploy-pages.yml` builds and deploys the app to Pages.
4. `build:pages` creates `dist/404.html` from `index.html` so React Router deep links work on GitHub Pages.

> `vite.config.js` auto-detects the repo name during GitHub Actions and sets the correct base path. You can override with `VITE_BASE_PATH` if needed.

## Deploy backend to Firebase
```bash
firebase deploy --only firestore:rules,firestore:indexes,functions
```

## Notes
- `createSale` Cloud Function enforces:
  - max one decimal quantity
  - no negative inventory
  - cuff toggle compliance
  - commission calculation
  - inventory log writes
- Personal-use sales are supported by payload (`personal_use: true`), with discounted pricing.

## GitHub Pages troubleshooting
- If your site loads as a blank page, verify your repository type:
  - **Project Pages** (`<user>/<repo>`): app should use `/<repo>/` base path (auto-detected in CI).
  - **User/Org Pages** (`<user>/<user>.github.io`): app must use `/` base path (now auto-detected).
- If Firebase login fails with `400` on `signInWithPassword`, check your GitHub secret formatting: values must be raw (no surrounding quotes, no trailing commas).
  - Wrong: `"AIza...",`
  - Correct: `AIza...`
- Confirm all required `VITE_FIREBASE_*` repository secrets are set and match your Firebase Web App config.

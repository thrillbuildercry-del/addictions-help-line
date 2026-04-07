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

## Deploy
```bash
npm run build
firebase deploy --only firestore:rules,firestore:indexes,functions,hosting
```

## Notes
- `createSale` Cloud Function enforces:
  - max one decimal quantity
  - no negative inventory
  - cuff toggle compliance
  - commission calculation
  - inventory log writes
- Personal-use sales are supported by payload (`personal_use: true`), with discounted pricing.

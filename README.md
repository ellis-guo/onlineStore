# Ryan's Decking - Online Store

Full-stack e-commerce platform for interlocking deck tiles. Built with React, Node.js, and PostgreSQL.

## Live Site

- Website: https://online-store-pink-chi.vercel.app
- API: https://onlinestore-kzw0.onrender.com
- Database: Render PostgreSQL

## What is this

This is an online store selling deck tiles. You can browse products, create an account, and add stuff to your cart. The checkout part isn't done yet because a business partner will handle that later.

## What you can do

If you're not logged in:

- Browse all the deck tile products
- See product details with different colors and materials
- Use the currency converter to see prices in different currencies
- Read the About page

If you're logged in:

- Add products to your shopping cart
- Change quantities or remove items
- See your profile
- Everything above

What doesn't work yet:

- The actual checkout and payment (coming later from business partner)
- Fencing and Garden Tools pages (just placeholders in the navbar for now)

## Tech stuff

Frontend: React with Vite
Backend: Node.js and Express
Database: PostgreSQL with Prisma
Auth: JWT tokens stored in httpOnly cookies
External API: ExchangeRate-API for currency conversion

Pretty standard full-stack setup. Backend has a clean 3-layer structure (routes -> services -> Prisma) which makes it easy to maintain and hand off to the business partner later.

## Test accounts

All passwords are: password123

Regular users:

- john_doe / john@example.com (has 3 items in cart)
- jane_smith / jane@example.com (has 2 items in cart)
- alice_chen / alice@example.com (empty cart)

Admin:

- admin / admin@example.com

## Running locally

You'll need Node.js and Docker installed.

Start the database:

```bash
docker-compose up -d
```

Backend setup:

```bash
cd api
npm install
npx prisma db push
npx prisma db seed
npm start
```

Frontend setup (new terminal):

```bash
cd client
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

The backend runs on port 3000, frontend on 5173. Pretty straightforward.

## Testing

Run the unit tests:

```bash
cd client
npm test
```

We have 3 test files testing Footer, ProductCard, and Navbar components. All 13 tests should pass.

## Accessibility

Ran Lighthouse on Home, Products, and Login pages. Scores are 96-98, way above the required 80. Screenshots are in the accessibility_reports folder.

## Database

6 tables total:

- users (authentication and profile)
- products (base product info)
- product_variants (colors, materials, pricing, stock)
- cart_items (user shopping carts)
- orders and order_items (ready for checkout implementation)

We have 6 product lines with 21 total variants. All seeded with test data.

## Project structure

```
onlineStore/
├── api/                        Backend stuff
│   ├── src/
│   │   ├── routes/            API endpoints
│   │   ├── services/          Business logic
│   │   ├── middleware/        Auth middleware
│   │   └── utils/             JWT helpers
│   └── prisma/                Database schema and seed
├── client/                     Frontend stuff
│   ├── src/
│   │   ├── pages/             All the pages
│   │   ├── components/        Reusable components
│   │   ├── api/               API calls (axios + external APIs)
│   │   └── context/           Global state (AuthContext)
│   └── __tests__/             Unit tests
└── accessibility_reports/      Lighthouse screenshots
```

## Notes

The navbar has Fencing and Garden & Tools links but those pages don't exist yet - they're just placeholders for future expansion. Right now only the Decking section is fully functional.

Currency converter uses a free API so it might be slow sometimes, but it works fine for the demo.

---

CS-5610 Final Project - Fall 2025

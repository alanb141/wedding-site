[![CI Pipeline](https://github.com/alanb141/wedding-site/actions/workflows/ci.yml/badge.svg)](https://github.com/alanb141/wedding-site/actions/workflows/ci.yml)

# Wedding Invitation SPA

A high-performance, lightweight single-page application developed to handle wedding details and RSVPs.

**Live Site:** 
**Single guest**
[alanavawedding.ie](https://alanavawedding.ie/?invite=TestGuest)
**Guest with plus one**
[alanavawedding.ie](https://alanavawedding.ie/?invite=TestGuest_TestPlusOne)

## Technical Strategy
This project was deliberately architected **without a frontend framework** (like React or Vue) to prioritize mobile performance and ensure near-instant Load Contentful Paint (LCP) on slower 3G/4G networks.

* **Vanilla TypeScript:** Ensures type safety and strict null checks without the runtime overhead of a Virtual DOM.
* **Vite:** Utilized for an optimized build pipeline and fast Hot Module Replacement (HMR).
* **SCSS:** Modular styling architecture with scoped variables and mixins.
* **Testing:** Unit testing infrastructure configured with **Vitest** and **JSDOM**.

## Tech Stack
* **Core:** TypeScript, HTML5, SCSS
* **Build Tool:** Vite
* **Testing:** Vitest, JSDOM
* **Libraries:** SplideJS (Carousel), Google Maps API

## Key Features
* **Custom Transitions:** Implemented a bespoke transition engine for the photo gallery using SplideJS event hooks (extending the default slide behavior).
* **URL-Based Identity:** Lightweight guest identification system via URL parameters to personalize the UI without requiring a complex authentication flow.
* **Responsive Design:** Mobile-first architecture ensuring full compatibility across all device viewports.

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Run Unit Tests
npm run test
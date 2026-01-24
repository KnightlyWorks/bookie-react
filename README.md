# 🦉 LuminaBookie

> **Light up your next story** — Look through millions of books from public libraries in one location.

The cutting-edge, quick book discovery app **LuminaBookie** aggregates search results from public sources. Manage your reading wishlist with a single interface and stop juggling tabs.

---

## ✨ Features

- **Smart Bookmarking** — Save favorites to your personal collection (persists across sessions)
- **Lightning Fast** — Built on React Router v7 with optimized data loading
- **Modern UI** — Clean, responsive design with Tailwind CSS v4
- **URL-Driven State** — Share searches via links, browser history just works
- **Infinite Scroll** — Load more results seamlessly as you browse
- **Virtual List Integration** — DOM optimization using virtualization for high-performance rendering of book lists.

---

## 🛠 Tech Stack

| Layer             | Technology                                                   |
| ----------------- | ------------------------------------------------------------ |
| **Framework**     | [React Router v7](https://reactrouter.com/) (Framework Mode) |
| **Styling**       | [Tailwind CSS v4](https://tailwindcss.com/)                  |
| **Bundler**       | [Vite](https://vitejs.dev/)                                  |
| **Data Fetching** | RRv7 Loaders + Fetchers                                      |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (LTS version recommended, v18+)
- **npm** or **yarn**

### Installation

```bash
# Clone the repo
git clone https://github.com/KnightlyWorks/bookie-react
cd bookie-react

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if occupied). Link will shown on your terminal.

---

## 📖 Usage

1. **Search** — Type a book title, author, or keyword in the search bar
2. **Filter** — Use advanced filters (language, sort order, publication date)
3. **Bookmark** — Click the bookmark icon to save books to your collection
4. **Load More** — Scroll down or click "Load More" for additional results
5. **Share** — Copy the URL to share your exact search with anyone

### Example URLs

```
/search?q=react                          # Simple search
/search?q=javascript&orderBy=newest      # Sorted by newest
```

All filters and search state live in the URL — refresh-safe and shareable! 🔗

---

## Project Structure

```
   app/
   ├── routes/
   │   ├── home.tsx              # Landing page with search
   │   ├── SearchPage.jsx        # Search results + loader
   │   ├── Favorites.jsx         # Bookmarked books page
   │   └── 404.jsx               # Not found page
   ├── components/
   │   ├── book/                 # Book cards, grid, loading states
   │   ├── layout/               # Header, Footer
   │   ├── ui/                   # Reusable UI (buttons, forms, links)
   │   │   ├── Forms/            # SearchField, Select, Radio, etc.
   │   │   └── Buttons/          # HoldButton, etc.
   │   ├── widgets/              # BookCard component
   │   └── advancedSearchSettings.jsx
   ├── hooks/
   │   ├── useBookGridVirtualizer.js  # Virtual scrolling logic
   │   ...
   ├── context/
   │   └── FavoritesContext.jsx       # Bookmark management
   ├── constants/
   │   ├── searchFilters.js           # Google Books filter configs
   │   ├── constants.js
   │   └── ...
   ├── utils/                         # Support Utils
   ├── assets/
   ├── root.tsx                       # App layout + providers
   └── app.css                        # Global styles
```

## 🏗 Architectural Decisions

### Why Use React Router v7?

- **Routing & Data:** Makes use of native data loading and URL-driven state to do away with complicated "Context hell."
  The application gains consistent browser history, shareable links, and a "refresh-safe" state by default through the use of URL search parameters.
- **Data Fetching:** RRv7 loaders and fetchers offer built-in race condition handling, substituting a reliable, declarative data flow for brittle `useEffect` patterns.

## 🧪 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🐛 Known Limitations

- Currently uses Google Books API (public tier with rate limits)
- Search results limited to publicly available books
- Some advanced filters depend on API availability

## 📄 License

This project is licensed under the [MIT License](./LICENSE). Feel free to use, modify, and distribute.

---

**Made with ☕ and 🎵 by [KnightlyWorks](https://github.com/KnightlyWorks)**

> _"A room without books is like a body without a soul." — Marcus Tullius Cicero_

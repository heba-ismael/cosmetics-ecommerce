# Cosmatics 💄

A modern e-commerce front-end for women's beauty products, bags, and shoes — built with React and Vite.

## ✨ Features

- Browse products by category (Beauty, Women's Bags, Women's Shoes)
- Live search with instant suggestions
- Product details page with image gallery and related products
- Shopping cart with quantity control (persisted in localStorage)
- Favorites / wishlist (persisted in localStorage)
- Demo authentication (Sign In / Sign Up) using the DummyJSON API
- Fully responsive design (mobile, tablet, desktop)
- Toast notifications for cart, favorites, and share actions
- Code-split routes for faster initial load
- Global error boundary

## 🛠️ Built With

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/) — page transitions
- [Swiper](https://swiperjs.com/) — hero and product sliders
- [React Hot Toast](https://react-hot-toast.com/) — notifications
- [React Icons](https://react-icons.github.io/react-icons/)
- [DummyJSON](https://dummyjson.com/) — mock product & auth API

## 📸 Screenshots

> _Add screenshots or a short GIF of the app here._

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/cosmatics.git
cd cosmatics
npm install
```

### Environment Variables

Create a `.env` file in the root (see `.env.example`):

```
VITE_API_BASE_URL=https://dummyjson.com
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## 🔑 Demo Login

This project uses [DummyJSON](https://dummyjson.com/docs/auth) as a mock backend, so sign-up doesn't persist real accounts. To try the Sign In flow, use:

- **Username:** `emilys`
- **Password:** `emilyspass`

## 📁 Project Structure

```
src/
├── api/              # Centralized API calls
├── components/       # Reusable components (header, product card, context, etc.)
├── hooks/            # Custom hooks (useFetch)
├── page/             # Route-level pages
├── constants.js      # Shared app-wide constants
└── App.jsx           # Routes definition
```

## 🧭 Known Limitations

- Checkout is simulated (no real payment/shipping flow)
- Sign Up is simulated (DummyJSON doesn't persist new users)
- No pagination yet — categories load a fixed number of products

## 📄 License

This project is licensed under the MIT License.

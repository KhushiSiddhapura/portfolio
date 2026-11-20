# Khushi Siddhapura - Full Stack Developer Portfolio & Custom CMS

A complete, production-ready personal developer portfolio and content management system (CMS) built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), **Tailwind CSS**, and **Vite**.

Designed specifically for **Khushi Siddhapura** (Full Stack Developer & B.Tech IT Student at Birla Vishvakarma Mahavidyalaya, Gujarat).

---

## 🌟 Highlights & Key Features

### 1. Public Portfolio
- **Modern & Distinctive Design**: Balanced purple-and-white visual identity with Inter typography.
- **Curved SVG Transitions**: Custom SVG wave dividers (`WaveTop`, `WaveBottom`, `CurvedDivider`, `SectionTransition`) providing smooth organic section boundaries.
- **Light & Dark Themes**: System-detected and user-switchable theme modes persisting via `localStorage`.
- **Dynamic Content**: Fetched in real-time from MongoDB.
- **Strict Public Isolation**: **Zero admin links or buttons anywhere** on the public navbar, hero, or footer.
- **Dynamic Project Details (`/projects/:slug`)**: Dynamic multi-block renderer (`ProjectContentRenderer`) that maps structured content blocks (headings, paragraphs, galleries, code blocks, architecture diagrams, callouts, and two-column layouts) directly to React components.
- **Active Contact System**: Visitors can submit inquiries directly saved to MongoDB with rate limiting and input sanitization.
- **Responsive CV & Resume**: Direct PDF download integration.

### 2. Admin Dashboard & CMS (`/admin` and `/admin/login`)
- **Completely Separate Experience**: Access exclusively via `/admin` and `/admin/login`.
- **Security**: JWT-based session verification with `HttpOnly` cookies and Bearer token fallback, Bcrypt password hashing, Helmet headers, and route protection.
- **Real-Time Analytics Dashboard**: Live metrics for total projects, published vs. draft items, skills, experience, achievements, and unread inquiries.
- **Visual Project Content Builder**:
  - **Left Palette**: 12 modular block types (Heading, Paragraph, Image, Gallery, Video, Feature List, Tech Stack, Code Block, Quote, Architecture Diagram, Two-Column, Callout).
  - **Center Editor**: Live reorderable blocks with up/down controls, duplicate, delete, and real-time live preview toggle.
  - **Right Panel**: Project metadata (Title, auto-generated slug, category, technologies, cover image, links, duration, featured flag, draft/published status).
- **Skills Management**: Add, update, set proficiency (0–100%), categorize, and toggle public visibility.
- **Experience Management**: CRUD for internships, positions, organizations, dates, descriptions, and technology stacks.
- **Achievements Management**: CRUD for academic ranks, hackathons, and design contest placements.
- **Resume Management**: Direct PDF upload with Cloudinary / local storage fallback and real-time public download synchronization.
- **Messages Management**: Inbox to view, search, filter unread/read, and delete contact submissions.
- **Website Settings & SEO**: Manage meta titles, descriptions, social links, and toggle homepage section displays.

---

## 🛠️ Technology Stack

### Frontend
- **React.js 18** with **Vite**
- **Tailwind CSS v4**
- **React Router v7**
- **Redux Toolkit** & **React Redux**
- **Axios** (configured with interceptors & credentials)
- **React Toastify** (feedback notifications)
- **Lucide React** (icons)
- **TanStack Query** (server-state caching)

### Backend
- **Node.js** & **Express.js** (ES Modules)
- **MongoDB** & **Mongoose**
- **JWT (JSON Web Tokens)** & **Cookie-Parser**
- **Bcryptjs** (password hashing)
- **Multer** (file upload handling)
- **Cloudinary** (cloud media uploads with local fallback)
- **Helmet** (HTTP security headers)
- **CORS** (cross-origin resource sharing)
- **Express Rate Limit** (brute-force protection on auth & messages)

---

## 📁 Project Structure

```text
Khushi/
│
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection & fallback
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── controllers/           # API request controllers
│   ├── middleware/            # Auth, Error & Upload middlewares
│   ├── models/                # Mongoose models (User, Profile, Project, Skill, Experience, etc.)
│   ├── routes/                # Public, Admin & Auth routes
│   ├── scripts/
│   │   └── seedAdmin.js       # Database initialization & seeding script
│   ├── utils/
│   ├── uploads/               # Local media storage directory
│   ├── app.js                 # Express application configuration
│   ├── server.js              # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/               # Router, Redux Store, App component
│   │   ├── context/           # ThemeContext (light/dark mode)
│   │   ├── features/
│   │   │   ├── home/          # Public Homepage with SVG curves
│   │   │   ├── about/         # Public About Developer page
│   │   │   ├── projects/      # Public Projects Catalog & Dynamic Detail page
│   │   │   ├── experience/    # Public Experience timeline
│   │   │   ├── achievements/  # Public Achievements cards
│   │   │   ├── contact/       # Public Contact form
│   │   │   ├── resume/        # Public Resume view & download
│   │   │   ├── auth/          # Redux auth slice & login
│   │   │   └── admin/         # CMS Dashboard, Profile, Project Builder, Skills, Messages, Settings
│   │   ├── layouts/           # PublicLayout & AdminLayout
│   │   ├── shared/
│   │   │   ├── components/    # Navbar, Footer, ThemeToggle, SVG Dividers
│   │   │   └── ui/            # Reusable UI (Button, Input, Modal, Loader, ImageUpload, etc.)
│   │   └── services/          # Axios instance & API services
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas URI)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and adjust if needed
cp .env.example .env

# Seed initial data (Khushi's profile, confirmed skills, initial projects, experience, achievements)
npm run seed

# Start development server (runs on port 5000)
npm run dev
```

### 2. Frontend Setup

In a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server (runs on http://localhost:5173)
npm run dev
```

Open `http://localhost:5173` in your browser.

---

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

## 🔐 Admin Access Credentials

The initial admin account is created automatically by the seed script:

- **Login URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@khushisiddhapura.dev`
- **Password**: `AdminPassword123!`

*(You can customize these credentials in `backend/.env` before running `npm run seed`).*

---

## ⚙️ Environment Variables

### `backend/.env`
| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/khushi_portfolio` |
| `JWT_SECRET` | Secret key for JWT signing | `(custom secret string)` |
| `JWT_EXPIRES_IN` | Token duration | `7d` |
| `COOKIE_SECRET` | Secret for signed cookies | `(custom secret string)` |
| `FRONTEND_URL` | Client origin for CORS | `http://localhost:5173` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (optional) | *(empty uses local storage)* |
| `CLOUDINARY_API_KEY` | Cloudinary API key (optional) | *(empty uses local storage)* |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (optional) | *(empty uses local storage)* |
| `ADMIN_NAME` | Initial administrator name | `Khushi Siddhapura` |
| `ADMIN_EMAIL` | Initial admin login email | `admin@khushisiddhapura.dev` |
| `ADMIN_PASSWORD` | Initial admin login password | `AdminPassword123!` |

### `frontend/.env` (optional)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Production Backend API Base URL | `/api` |

---

## 🚢 Production Deployment

### 1. Database (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist network access (`0.0.0.0/0`).
3. Copy the connection string and set it as `MONGO_URI` on your backend host.

### 2. Backend (Render)
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables from your `backend/.env` (including `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, and Cloudinary keys).

### 3. Frontend (Vercel)
1. Import your repository into [Vercel](https://vercel.com).
2. Configure settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-service.onrender.com/api`

---

## 📄 License
This project is open-source and available under the MIT License.

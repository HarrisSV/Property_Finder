# 🏠 PropertyFinder

A full-stack real estate search platform inspired by [MagicBricks](https://www.magicbricks.com). Browse, search, and filter properties across **Bangalore** and **Mumbai** — for buying or renting.

> **Live Demo:** [https://property-finder-kappa.vercel.app](https://property-finder-kappa.vercel.app)

### 🔗 Deployment

| Service | Link |
|---------|------|
| 🌐 **Live Website** | [property-finder-kappa.vercel.app](https://property-finder-kappa.vercel.app) |
| ⚡ **Backend API** | [property-finder-ompt.onrender.com](https://property-finder-ompt.onrender.com) |
| 📦 **GitHub Repo** | [github.com/HarrisSV/Property_Finder](https://github.com/HarrisSV/Property_Finder) |

---

## ✨ Features

- 🔍 **Smart Search** — Filter by city, buy/rent, budget range, and keyword
- 🏙️ **Two Cities** — 20 curated property listings across Bangalore & Mumbai
- 🏢 **Multiple Property Types** — Apartments, Villas, and Plots
- 💰 **Budget Filters** — Predefined ranges for both buy and rent categories
- 📱 **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- 🌙 **Premium Dark Theme** — Glassmorphism effects, gradient accents, and smooth animations
- 📬 **Contact Form** — Inquiry form on every property detail page

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, Vite, React Router DOM  |
| Backend   | FastAPI, SQLAlchemy, Pydantic     |
| Database  | SQLite                            |
| Styling   | Vanilla CSS (custom design system)|

---

## 📁 Project Structure

```
propertyfinder/
├── backend/
│   ├── main.py              # FastAPI app & API endpoints
│   ├── models.py            # SQLAlchemy ORM models
│   ├── database.py          # Database engine & session setup
│   ├── seed.py              # 20 mock property listings
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── index.html           # Entry HTML
│   ├── vite.config.js       # Vite configuration
│   ├── package.json         # Node dependencies
│   └── src/
│       ├── main.jsx         # React entry point
│       ├── App.jsx          # Router setup
│       ├── api.js           # API helpers & price formatting
│       ├── index.css        # Complete design system
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── PropertyCard.jsx
│       │   └── SearchBar.jsx
│       └── pages/
│           ├── HomePage.jsx
│           ├── PropertiesPage.jsx
│           └── PropertyDetailPage.jsx
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/HarrisSV/Property_Finder.git
cd Property_Finder
```

### 2. Start the Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be live at `http://localhost:8000`. The database is auto-created and seeded with 20 properties on first run.

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be live at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/api/properties`       | List all properties (with filters) |
| GET    | `/api/properties/{id}`  | Get a single property by ID     |
| GET    | `/api/cities`           | Get available cities            |

### Query Parameters for `/api/properties`

| Parameter       | Type   | Description                          |
|-----------------|--------|--------------------------------------|
| `city`          | string | Filter by city (`Bangalore`/`Mumbai`)|
| `type`          | string | `buy` or `rent`                      |
| `property_type` | string | `Apartment`, `Villa`, or `Plot`      |
| `min_price`     | float  | Minimum price                        |
| `max_price`     | float  | Maximum price                        |
| `bedrooms`      | int    | Number of bedrooms                   |
| `search`        | string | Keyword search (title, description, locality) |
| `sort_by`       | string | `newest`, `price_low`, `price_high`  |

### Example

```bash
# Get all Mumbai rental properties under ₹40,000
curl "http://localhost:8000/api/properties?city=Mumbai&type=rent&max_price=40000"
```

---

## 📊 Sample Data

The app comes pre-loaded with **20 realistic properties**:

- **Bangalore (10):** Whitefield, Koramangala, Sarjapur Road, Electronic City, Indiranagar, Devanahalli, HSR Layout, Hebbal, Marathahalli, JP Nagar
- **Mumbai (10):** Bandra West, Andheri West, Worli, Thane West, Powai, Navi Mumbai, Lower Parel, Goregaon East, Malad West, Panvel

Price range: **₹12,000/mo** (rent) to **₹12 Cr** (buy)

---

## 🖥️ Pages

| Page             | Route              | Description                                      |
|------------------|--------------------|--------------------------------------------------|
| Home             | `/`                | Hero section with search bar, featured properties, city cards |
| Properties       | `/properties`      | Filterable property listing with sort options     |
| Property Detail  | `/properties/:id`  | Full property info, amenities, and contact form   |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/HarrisSV">HarrisSV</a>
</p>

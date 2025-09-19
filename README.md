# Mini Seller Console

Lightweight React + Tailwind console to triage Leads and convert them into Opportunities.  
This project uses local JSON data and simulates API latency with `setTimeout`.


## 🛠️ Tech Stack
- React (Vite)
- Tailwind CSS
- TypeScript
- Local JSON for data
- Custom hooks and components
- Error boundary for robust UI handling


## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Lucasvalves/mini-seller-console
cd mini-seller-console 
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```
### 3. Run the project
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:5173 in your browser.


## ⚡ Project Structure
```bash
src/
├── components/   # Feature and UI components
├── hooks/        # Custom hooks
├── pages/        # Page MiniSellerConsole
├── types/        # Type definitions
├── utils/        # Helper validation
└── data/         # Mock data (leads.json)
```

## ✅ Features Implemented

- Leads list with search, filter, and sort
- Lead detail panel (slide-over) with inline editing
- Convert Lead to Opportunity
- Basic error handling, loading, and empty states
- Persistent filters and responsive layout


# Pension Jesuitská - Full Stack Application

Monorepo projekt pro správu penzionu obsahující backend (Strapi) a frontend (Next.js).

## 🏗️ Struktura projektu

```
jesuitska/
├── backend/                # Strapi backend
├── frontend/               # Next.js frontend
├── admin/                  # Admin dashboard
├── start-all.sh           # Script pro spuštění celé aplikace
└── README.md
```

## 🚀 Rychlý start

### Požadavky
- Node.js 18+ 
- pnpm
- Git

### Instalace

1. Naklonujte repozitář:
```bash
git clone https://github.com/yung988/jesuitska.git
cd jesuitska
```

2. Nainstalujte závislosti pro backend:
```bash
cd backend
pnpm install
```

3. Nainstalujte závislosti pro frontend:
```bash
cd ../frontend
pnpm install
```

4. Nainstalujte závislosti pro admin:
```bash
cd ../admin
pnpm install
```

### Spuštění aplikace

Z root adresáře spusťte:
```bash
./start-all.sh
```

Nebo spusťte jednotlivé části:

**Backend:**
```bash
cd backend
pnpm run develop
```

**Frontend:**
```bash
cd frontend
pnpm run dev
```

**Admin:**
```bash
cd admin
pnpm run dev
```

## 📍 URL adresy

- **Frontend**: http://localhost:3000
- **Backend Admin**: http://localhost:1337/admin
- **Admin Dashboard**: http://localhost:3001
- **API**: http://localhost:1337/api

## 🔧 Konfigurace

### Backend (Strapi)
- Databáze: SQLite (development)
- Port: 1337

### Frontend (Next.js)
- Port: 3000
- API URL je nastavená v `lib/api.ts`

## 📝 API Endpoints

- `/api/rooms` - Správa pokojů
- `/api/bookings` - Rezervace
- `/api/guests` - Hosté
- `/api/employees` - Zaměstnanci
- `/api/tasks` - Úkoly
- `/api/settings` - Nastavení penzionu

## 🛠️ Vývoj

### Přidání nových content types v Strapi
1. Použijte Strapi Content-Type Builder
2. Nastavte permissions pro public role
3. Restartujte Strapi

### Environment variables
Vytvořte `.env` soubory podle `.env.example` v obou projektech.

## 📦 Deployment
TODO: Přidat instrukce pro deployment

## 🤝 Přispívání
1. Fork projekt
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit změny (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

## 📄 Licence
Tento projekt je soukromý.

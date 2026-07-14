# My Ticket — Platformë Biletash për Evente

Një platformë per shitjen e biletave te cilat marrin kod unik + QR, dhe një panel i lehtë organizatori për të krijuar evente dhe
ndjekur shitjet.

# Çfarë bën
- Shfleton eventet e ardhshme (koncerte, festivale, konferenca)
- Shikon detajet e një eventi dhe bli një ose më shumë bileta
- Çdo biletë merr një kod unik dhe një QR code të skanueshëm, të shfaqur si "biletë" e printueshme
- Paneli i organizatorit : krijo evente të reja, shiko bileta të shitura dhe të ardhura për çdo event
- Validimi te dera: skano/fut kodin e biletës për të kontrolluar vlefshmërinë dhe për ta shënuar si të përdorur


## Tech stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | Next.js 14 (App Router), Tailwind CSS |
| Backend    | Node.js, Express.js                  |
| Database   | MongoDB (Mongoose ODM)               |
| API style  | REST (JSON)                          |

## Struktura e projektit

```
ticketing-platform/
├── backend/
│   ├── models/         Event, Ticket
│   ├── routes/          events, tickets
│   ├── utils/            unique ticket code generator
│   ├── data/              seed script with sample events
│   └── server.js
└── frontend/
    ├── app/
    │   ├── page.js                lista e eventeve
    │   ├── events/[id]/page.js    detajet e eventit + blerja
    │   ├── organizer/page.js      krijim eventesh + panel shitjesh
    │   └── validate/page.js       door validation tool
    └── components/
```

## Running locally

### Backend
```bash
cd backend
npm install
cp .env.example .env      # set MONGODB_URI
npm run seed              # adds sample events
npm run dev               # http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev                          # http://localhost:3000
```

## API reference

| Method | Endpoint                         | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| GET    | `/api/events`                    | Liston të gjitha eventet                    |
| GET    | `/api/events/:id`                | Merr një event                              |
| POST   | `/api/events`                    | Krijo një event të ri (organizator)         |
| GET    | `/api/events/:id/sales`          | Përmbledhje shitjesh për një event          |
| POST   | `/api/tickets`                   | Bli bileta për një event                    |
| GET    | `/api/tickets/validate/:code`    | Kontrollo/valido një kod bilete             |
| PATCH  | `/api/tickets/validate/:code`    | Shëno një biletë si të përdorur (check-in)  |

## Deploying

- **Frontend** → [Vercel](https://vercel.com) — set `NEXT_PUBLIC_API_URL` env var
- **Backend** → [Render](https://render.com) — set `MONGODB_URI` and `CLIENT_URL` env vars


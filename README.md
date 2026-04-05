# Repairo – Home Service Booking Platform



## Project Description

Repairo is a full-stack home service booking platform where customers can easily find and book local service providers, including electricians, plumbers, AC mechanics, cleaners, and WiFi technicians.  

- Customers can browse services, book providers, pay online, and track their bookings.  
- Providers can manage their services and bookings through a dedicated dashboard.  
- Admins can oversee the platform, manage users, services, categories, and bookings.  

---

## Live URLs

- **Frontend (User Interface):** [https://repairo-client.vercel.app/](https://repairo-client.vercel.app/)  
- **Backend (API):** [https://repairo-server.vercel.app/](https://repairo-server.vercel.app/)  


---

## Features

### Public
- Browse all available services
- Search and filter by category, price, or location
- View detailed service information

### Customer
- Register/Login
- Book services
- Online payment via  Stripe
- Track booking status
- View booking history
- Manage profile

### Provider
- Register/Login
- Add/Edit/Remove services
- Manage availability
- View incoming bookings
- Update booking status

### Admin
- Manage all users
- Ban/unban providers
- Manage service categories
- View and manage all bookings

---

## Technologies Used

- **Frontend:** Next.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL, Prisma ORM  
- **Authentication:** JWT / BetterAuth  
- **Payment Gateways:**  Stripe  
- **Deployment:** Vercel (frontend) / Vercel (backend)

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/TarekNexus/Repairo-client
cd repairo
create .env and follor example.env
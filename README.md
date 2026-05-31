# Sports Club Management System

A full-stack web application for managing sports clubs, fields, bookings, and users — built with **ASP.NET Core** and **Angular**.

---

## Overview

The Sports Club Management System is a platform that enables sports clubs to manage their operations digitally. Club administrators can manage fields, handle bookings, control user roles, and upload media — all through a clean, responsive interface with secure role-based access control.

---

## Features

- **Club & Field Management** — Create, view, edit, and delete clubs and fields with full CRUD support
- **Interactive Field Layout** — Visually select individual field sections through a dynamic graphical interface
- **Booking System** — End-to-end booking flow with real-time conflict detection and time slot validation
- **Multi-Role JWT Authentication** — Dynamic role switching with context-aware data filtering per active role
- **Role-Based Authorization** — API endpoints secured by role, ensuring strict data access control
- **Media Upload** — Upload and display images for clubs and fields via static file serving

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core (REST API) |
| Frontend | Angular |
| Database | SQL Server (MSSQL) |
| ORM | Entity Framework Core |
| Authentication | JWT (JSON Web Tokens) |
| Styling | CSS / Angular Material |

---

## Project Structure

```
SportClubManagementSystem/
├── Backend/
│   ├── Controllers/        # API endpoints — Clubs, Fields, Bookings, Auth
│   ├── Models/             # Entity models — Club, Field, User, Role, Booking
│   ├── Data/               # EF Core DbContext and migrations
│   ├── Services/           # Business logic and JWT token handling
│   └── wwwroot/            # Static file storage for uploaded media
│
└── Frontend/
    ├── src/app/
    │   ├── components/     # MyClubComponent, MyFieldComponent, BookingComponent
    │   ├── services/       # Angular services for API communication
    │   └── guards/         # Route guards for role-based navigation
    └── assets/
```

---

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18+)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- SQL Server (local or remote instance)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/6614Kavya/sports-club-management-system.git
cd sports-club-management-system/Backend

# Update the connection string in appsettings.json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=SportClubDB;Trusted_Connection=True;"
}

# Apply database migrations
dotnet ef database update

# Run the API
dotnet run
```

The API will be running at `https://localhost:7001`

### Frontend Setup

```bash
cd ../Frontend

# Install dependencies
npm install

# Start the Angular dev server
ng serve
```

The app will be running at `http://localhost:4200`

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Login and receive JWT | Public |
| POST | `/api/auth/role` | Switch active role | Required |
| GET | `/api/clubs` | Get all clubs | Required |
| POST | `/api/clubs` | Create a club | ClubAdmin |
| GET | `/api/fields` | Get all fields | Required |
| POST | `/api/bookings` | Create a booking | Required |
| GET | `/api/bookings` | Get bookings by context | Required |

---

## Screenshots

> Screenshots coming soon. Run the project locally to explore the full interface.

---

## Key Implementation Highlights

**Conflict Detection** — The booking API validates time ranges against existing records before persisting, returning structured error responses that the Angular frontend surfaces inline.

**JWT Role Switching** — When a user switches roles, a new JWT is issued with updated claims. The Angular app decodes the token and re-renders all data views filtered to the new role context, ensuring complete data isolation.

**Dynamic Field Rendering** — Field sections are rendered as positioned `div` elements using metadata (position, size, bitmask values) stored in the database, making the layout fully data-driven.

---

## Author

**Kavya Jayakody**
- GitHub: [@6614Kavya](https://github.com/6614Kavya)
- LinkedIn: [linkedin.com/in/kavya_jayakody](https://linkedin.com/in/kavya_jayakody)
- Email: jskavya8@gmail.com

---

## License

This project is for educational and portfolio purposes.

# CPByte Student Portal

Welcome to the internal management system of **CPByte**, the Technical Club of **KIET Group of Institutions**.

This portal is made exclusively for **CPByte Club members**, providing tools to manage and monitor club activities. It helps streamline participation, progress tracking, and administrative tasks — all in one place.

---

## 🌟 Features

- 🏆 **Leaderboard**: Track members’ coding progress and performance across platforms.
- 📊 **Tracker**: Monitor problem-solving activity over time with visual analytics.
- 🎯 **Attendance System**: Manage and view attendance for regular club meetings or contests.
- 📅 **Event Management**: Create, schedule, and manage internal and public CPByte events, like mock contests, discussions, and workshops.

---

## Getting Started

### Backend
The backend is written in NodeJS, Express, PrismaORM and PostgreSQL.

#### Prerequisites

1. [NodeJS](https://nodejs.org/en/download)
2. [PostgreSQL](https://www.postgresql.org/download/)

#### Steps

1. Clone this repo
```sh
git clone https://github.com/CPBYTE/cpbyte-student-portal.git
```

2. Navigate to the `backend` directory
```sh
cd backend
```

3. Create a file called `.env` and populate the values as shown in `.env.sample` file
```ini
DATABASE_URL="YOUR_DATABASE_URL"
JWT_SECRET="jwt_secret"
```

4. Install dependencies 
```sh
npm install
```

5. Apply Prisma migrations
```sh
npx prisma migrate dev
```
6. Seed the database
```sh
npx prisma db seed
```

7. Start the server
```sh
npm run dev
```

The server should start at [https://localhost:8080](https://localhost:8080)

### Frontend
The frontend is written in ReactJS and Tailwind CSS for styling.

#### Steps

1. Navigate to the `frontend` directory
```sh
cd frontend
```

2. Install dependencies 
```sh
npm install
```

3. Go Live
```sh
npm run dev
```

### Documentation

#### Importing and using the Insomnia Request Collection

The backend directory contains a folder called `insomnia/`. This directory contains an Insomnia request collection which can be imported directly into Insomnia for testing.

[Download Insomnia Client](https://insomnia.rest/) \
[Importing Collections](https://docs.insomnia.rest/insomnia/import-export-data)

**Note:** The collection may be used with other HTTP REST clients as well, such as Postman, Hoppscotch or Thunder Client. But it is untested on those clients.



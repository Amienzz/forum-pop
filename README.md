### 1. Pre-requisites
- **Bun** (v1.0+) - [Install here](https://bun.sh/)

### 2. Database Setup

1. Start your MySQL server, then Copy, Paste, then Run the provided schema.sql file into your database

### 3. Backend Setup

```bash
cd backend
```

**Install dependencies:**
```bash
bun install
```

**Create `.env` file:**

Create a file named `.env` in the `backend` folder:

```env
# Database Configuration
DB_NAME=""
DB_HOST=""
DB_USER=""
DB_PASS=""
DB_PORT=

# Server Configuration
PORT=
NODE_ENV=development
FRONTEND_URL="http://localhost:8080"(or any url you prefer)

```


**Start the backend:**
```bash
bun run dev
```

### 4. Frontend Setup

Open a **new terminal** window:

```bash
cd frontend
```

**Install dependencies:**
```bash
bun install
```

**Start the frontend:**
```bash
bun run dev
```

### 5. Access the Application

Open your browser and visit: **http://localhost:8080** or the URL you set.
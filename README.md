Sure! Here's a concise and clear `README.md` for your **Cuisine Manager** project:

---

# 🍽️ Cuisine Manager

**Cuisine Manager** is a simple full-stack CRUD app built with **Next.js**, **tRPC**, **Drizzle ORM**, and **Tailwind CSS**. It allows users to manage a list of world cuisines, including creating, reading, updating, and deleting cuisine entries.

---

## 🚀 Features

- View all cuisines with images and details  
- View a single cuisine by ID  
- Add a new cuisine using a form  
- Update existing cuisine entries  
- Delete cuisines from the list  
- Fully responsive, clean Tailwind-based UI  
- Type-safe APIs via `tRPC`  
- PostgreSQL backend powered by `Drizzle ORM`  
- Supabase support for database hosting  

---

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📦 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/cuisine-manager.git
   cd cuisine-manager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file and add your database credentials:
   ```env
   DATABASE_URL=your_postgres_connection_url
   ```

4. **Run Migrations (if using Drizzle)**
   ```bash
   npx drizzle-kit push
   ```

5. **Start the Dev Server**
   ```bash
   npm run dev
   ```

---

## 📄 Database Schema

Cuisines are stored with the following fields:

- `id` (auto-increment)
- `name`
- `description`
- `originCountry`
- `image` (URL)
- `isVegetarianFriendly` (boolean)

---

## 🖼️ Image Configuration

To allow loading external cuisine images, make sure to configure allowed domains in `next.config.js`:

```js
images: {
  domains: ['your-image-host.com', 'another-image-source.com'],
},
```

---

## 🛠️ Future Improvements

- Form validation and toast notifications  
- Filter by country or vegetarian-friendly options  
- Pagination and search  
- File/image upload for custom cuisines  

---

## 📬 License

MIT — free to use, modify, and contribute.

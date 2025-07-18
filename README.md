# Portfolio Builder Frontend

This is the frontend of a simple portfolio builder application built with **Next.js**, using IndexedDB for storage data.

> 💡 Live Demo: [https://ms-fe-two.vercel.app/](https://ms-fe-two.vercel.app/)

---

## ✨ Tech Stack

- [Next.js](https://nextjs.org/)

- [TypeScript](https://www.typescriptlang.org/)

- [Tailwind CSS](https://tailwindcss.com/)

- [React Hook Form](https://react-hook-form.com/get-started)

---

## 📦 Setup & Development

### 1. Clone the repository

```bash

git  clone  https://github.com/kevinromario/ms-fe

cd  ms-fe

```

### 2. Install dependencies

```bash

npm  install

```

### 3. Start development server

```bash

npm  run  dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build

```bash

npm run build

```

Output will be in the `dist/` folder.

---

## 🚀 Deployment

This project is deployed on **Vercel**. On push to the main branch, Vercel automatically builds and deploys the project.

Live URL: [https://ms-fe-two.vercel.app/](https://ms-fe-two.vercel.app/)

---

## 📦 Data Schema: Portfolio Page

The portfolio page data is stored using the following structure:

### ✅ TypeScript Type

```ts
export type PortfolioType = {
  backgroundImage?: FileList | File | Blob | null;
  profileImage?: FileList | File | Blob | null;
  profile: {
    name: string;
    title: string;
    description: string;
  };
  portfolios: {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
};
```

### 📘 Validation Schema (Yup)

```ts
export const portfolioSchema = yup.object({
  backgroundImage: yup
    .mixed<FileList | File>()
    .nullable()
    .test("fileSize", FILE_SIZE_MESSAGE, (value) => {
      const file = (value as FileList)?.[0];
      return !file || file.size <= MAX_FILE_SIZE_MB;
    }),
  profileImage: yup
    .mixed<FileList | File>()
    .nullable()
    .test("fileSize", FILE_SIZE_MESSAGE, (value) => {
      const file = (value as FileList)?.[0];
      return !file || file.size <= MAX_FILE_SIZE_MB;
    }),
  profile: yup.object({
    name: yup.string().max(50, "Max 50 karakter").required("Nama wajib diisi"),
    title: yup
      .string()
      .max(30, "Max 30 karakter")
      .required("Title wajib diisi"),
    description: yup
      .string()
      .max(200, "Max 200 karakter")
      .required("Deskripsi wajib diisi"),
  }),
  portfolios: yup
    .array()
    .of(
      yup.object({
        position: yup
          .string()
          .max(30, "Max 30 karakter")
          .required("Posisi wajib diisi"),
        company: yup
          .string()
          .max(50, "Max 50 karakter")
          .required("Perusahaan wajib diisi"),
        startDate: yup.string().required("Tanggal Mulai wajib diisi"),
        endDate: yup
          .string()
          .required("Tanggal Selesai wajib diisi")
          .test(
            "isAfterStartDate",
            "Tanggal Selesai harus lebih besar dari Tanggal Mulai",
            function (endDate) {
              const { startDate } = this.parent;
              if (!startDate || !endDate) return true;
              return new Date(endDate) > new Date(startDate);
            }
          ),
        description: yup
          .string()
          .max(500, "Max 500 karakter")
          .required("Deskripsi wajib diisi"),
      })
    )
    .min(1, "Minimal 1 portofolio")
    .required("Portofolio wajib diisi"),
});
```

### 📝 Schema Overview

- **`backgroundImage`**: Background image file for the portfolio (optional)
- **`profileImage`**: Profile image file (optional)
- **`profile`**:

  - `name`: string, max 50 characters
  - `title`: string, max 30 characters
  - `description`: string, max 200 characters

- **`portfolios[]`**:

  - `position`: string, max 30 characters
  - `company`: string, max 50 characters
  - `startDate` and `endDate`: string in `YYYY-MM-DD` format. `endDate` must be after `startDate`
  - `description`: string, max 500 characters

## 🧪 Testing

### ✅ Run Tests

```
npm run test
```

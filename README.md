# Task Manager Frontend

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
    startDate: string; // Format: YYYY-MM-DD
    endDate: string; // Format: YYYY-MM-DD
    description: string;
  }[];
};
```

### 📘 Validation Schema (Yup)

```ts
import * as yup from "yup";

export const portfolioSchema = yup.object({
  backgroundImage: yup
    .mixed<FileList | File>()
    .nullable()
    .test("fileSize", "File size too large", (value) => {
      const file = (value as FileList)?.[0];
      return !file || file.size <= MAX_FILE_SIZE_MB;
    }),

  profileImage: yup
    .mixed<FileList | File>()
    .nullable()
    .test("fileSize", "File size too large", (value) => {
      const file = (value as FileList)?.[0];
      return !file || file.size <= MAX_FILE_SIZE_MB;
    }),

  profile: yup.object({
    name: yup.string().max(50).required("Name is required"),
    title: yup.string().max(30).required("Title is required"),
    description: yup.string().max(200).required("Description is required"),
  }),

  portfolios: yup
    .array()
    .of(
      yup.object({
        position: yup.string().max(30).required("Position is required"),
        company: yup.string().max(50).required("Company is required"),
        startDate: yup.string().required("Start Date is required"),
        endDate: yup
          .string()
          .required("End Date is required")
          .test(
            "isAfterStartDate",
            "End Date must be after Start Date",
            function (endDate) {
              const { startDate } = this.parent;
              if (!startDate || !endDate) return true;
              return new Date(endDate) > new Date(startDate);
            }
          ),
        description: yup.string().max(500).required("Description is required"),
      })
    )
    .min(1, "At least one portfolio item is required")
    .required("Portfolio section is required"),
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

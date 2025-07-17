import { FILE_SIZE_MESSAGE, MAX_FILE_SIZE_MB } from "src/constants";
import * as yup from "yup";

export const portfolioSchema = yup.object({
  backgroundImage: yup.mixed().test("fileSize", FILE_SIZE_MESSAGE, (value) => {
    const file = (value as FileList)?.[0];
    return !file || file.size <= MAX_FILE_SIZE_MB;
  }),
  profileImage: yup.mixed().test("fileSize", FILE_SIZE_MESSAGE, (value) => {
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
        endDate: yup.string().required("Tanggal Selesai wajib diisi"),
        description: yup
          .string()
          .max(500, "Max 500 karakter")
          .required("Deskripsi wajib diisi"),
      })
    )
    .min(1, "Minimal 1 portofolio")
    .required("Portofolio wajib diisi"),
});

import { portfolioSchema } from "src/schemas/portfolioSchema";
import { InferType } from "yup";

export type PortfolioType = InferType<typeof portfolioSchema> & {
  backgroundImage?: FileList | File;
  profileImage?: FileList | File;
};

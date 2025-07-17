import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Resolver, useFieldArray, useForm } from "react-hook-form";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Section from "src/components/Section";
import Toast from "src/components/Toast";
import UploadBox from "src/components/UploadBox";
import VStack from "src/components/VStack";
import { usePortfolioContext } from "src/contexts/PortfolioContext";
import { portfolioSchema } from "src/schemas/portfolioSchema";
import { inputBase, textareaBase } from "src/styles/inputStyles";
import { subTextError, textBase } from "src/styles/typography";
import { PortfolioType } from "src/types/portfolioType";
import { getDbData, saveFormData } from "src/utils/dbUtils";
import { compressImage } from "src/utils/imageUtils";

const defaultEmpty: PortfolioType = {
  backgroundImage: undefined,
  profileImage: undefined,
  profile: {
    name: "",
    title: "",
    description: "",
  },
  portfolios: [
    {
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
};

export default function Editor() {
  const { setData, triggerUpdate } = usePortfolioContext();
  const [dataDefault, setDataDefault] = useState<PortfolioType | null>(null);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<PortfolioType>({
    resolver: yupResolver(portfolioSchema) as Resolver<PortfolioType>,
    defaultValues: dataDefault || defaultEmpty,
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "portfolios",
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await getDbData();
      setDataDefault(data || defaultEmpty);
      if (data) {
        reset(data);
      }
    };
    loadData();
  }, [reset]);

  const handlePrePayload = useCallback(
    async (data: PortfolioType) => {
      let isBgBlob = false;
      let isProfileBlob = false;

      if (data.backgroundImage instanceof Blob) isBgBlob = true;
      if (data.profileImage instanceof Blob) isProfileBlob = true;

      const backgroundFileList = data.backgroundImage;
      const backgroundFile =
        backgroundFileList instanceof FileList
          ? backgroundFileList[0] ?? null
          : null;

      const profileFileList = data.profileImage;
      const profileFile =
        profileFileList instanceof FileList ? profileFileList[0] ?? null : null;

      const compressedBgFile = backgroundFile
        ? await compressImage(backgroundFile)
        : undefined;

      const compressedProfileFile = profileFile
        ? await compressImage(profileFile)
        : undefined;

      const payload = {
        ...data,
        backgroundImage: isBgBlob
          ? data.backgroundImage
          : backgroundFile
          ? compressedBgFile
          : dataDefault?.backgroundImage,
        profileImage: isProfileBlob
          ? data.profileImage
          : profileFile
          ? compressedProfileFile
          : dataDefault?.profileImage,
      };
      return payload;
    },
    [dataDefault]
  );

  useEffect(() => {
    const subscription = watch(async (value) => {
      const payload = await handlePrePayload(value as PortfolioType);
      setData(payload);
    });
    return () => subscription.unsubscribe();
  }, [watch, setData, handlePrePayload]);

  const renderEditorAction = () => {
    return (
      <div className="flex justify-between gap-2">
        <Button
          disabled={!isValid}
          text="Simpan Perubahan"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    );
  };

  const handleAddPortfolio = () => {
    append({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    setTimeout(() => {
      const target = document.getElementById(`add-portfolio`);
      target?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleDeletePortfolio = (index: number) => {
    if (fields.length < 2) return;
    remove(index);
  };

  const onSubmit = async (data: PortfolioType) => {
    try {
      const payload = await handlePrePayload(data);

      await saveFormData(payload);

      triggerUpdate();

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan.";
      alert(message);
    }
  };

  return (
    <Section title="Editor" action={renderEditorAction()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <Card title="Background Image">
            <div className="flex flex-col gap-4">
              <UploadBox
                name="backgroundImage"
                register={register("backgroundImage")}
                setValue={setValue}
                watch={watch}
              />
              {errors.backgroundImage && (
                <p className={subTextError}>{errors.backgroundImage.message}</p>
              )}
            </div>
          </Card>
          <Card title="Profile Image">
            <div className="flex flex-col gap-4">
              <UploadBox
                name="profileImage"
                register={register("profileImage")}
                setValue={setValue}
                watch={watch}
              />
              {errors.profileImage && (
                <p className={subTextError}>{errors.profileImage.message}</p>
              )}
            </div>
          </Card>
          <Card title="Profile">
            <div className="flex flex-col gap-4">
              <VStack>
                <span className={textBase}>Nama:</span>
                <input
                  placeholder="Name"
                  {...register("profile.name")}
                  className={inputBase}
                />
                {errors.profile?.name && (
                  <p className={subTextError}>{errors.profile.name.message}</p>
                )}
              </VStack>
              <VStack>
                <span className={textBase}>Title / Posisi:</span>
                <input
                  placeholder="Title / Posisi"
                  {...register("profile.title")}
                  className={inputBase}
                />
                {errors.profile?.title && (
                  <p className={subTextError}>{errors.profile.title.message}</p>
                )}
              </VStack>
              <VStack>
                <span className={textBase}>Deskripsi:</span>
                <textarea
                  rows={4}
                  className={textareaBase}
                  placeholder="Description"
                  {...register("profile.description")}
                />
                {errors.profile?.description && (
                  <p className={subTextError}>
                    {errors.profile.description.message}
                  </p>
                )}
              </VStack>
            </div>
          </Card>
          {/* Portfolio List */}
          {fields.map((field, index) => (
            <Card
              key={field.id}
              id={`portofolio-${index}`}
              title={`Portofolio ${index + 1}`}
              deletable={fields.length > 1}
              handleDelete={() => handleDeletePortfolio(index)}
            >
              <div className="flex flex-col gap-4">
                <VStack>
                  <span className={textBase}>Posisi:</span>
                  <input
                    className={inputBase}
                    placeholder="Position"
                    {...register(`portfolios.${index}.position`)}
                  />
                  {errors.portfolios?.[index]?.position && (
                    <p className={subTextError}>
                      {errors.portfolios?.[index]?.position.message}
                    </p>
                  )}
                </VStack>
                <VStack>
                  <span className={textBase}>Perusahaan:</span>
                  <input
                    className={inputBase}
                    placeholder="Company"
                    {...register(`portfolios.${index}.company`)}
                  />
                  {errors.portfolios?.[index]?.company && (
                    <p className={subTextError}>
                      {errors.portfolios?.[index]?.company.message}
                    </p>
                  )}
                </VStack>
                <VStack>
                  <span className={textBase}>Tanggal Mulai:</span>
                  <input
                    className={inputBase}
                    placeholder="Tanggal Mulai"
                    type="date"
                    {...register(`portfolios.${index}.startDate`)}
                  />
                  {errors.portfolios?.[index]?.startDate && (
                    <p className={subTextError}>
                      {errors.portfolios?.[index]?.startDate.message}
                    </p>
                  )}
                </VStack>
                <VStack>
                  <span className={textBase}>Tanggal Selesai:</span>
                  <input
                    className={inputBase}
                    placeholder="Tanggal Selesai"
                    type="date"
                    {...register(`portfolios.${index}.endDate`)}
                  />
                  {errors.portfolios?.[index]?.endDate && (
                    <p className={subTextError}>
                      {errors.portfolios?.[index]?.endDate.message}
                    </p>
                  )}
                  <span className={textBase}>Deskripsi:</span>
                  <textarea
                    rows={4}
                    className={textareaBase}
                    placeholder="Description"
                    {...register(`portfolios.${index}.description`)}
                  />
                  {errors.portfolios?.[index]?.description && (
                    <p className={subTextError}>
                      {errors.portfolios?.[index]?.description.message}
                    </p>
                  )}
                </VStack>
              </div>
            </Card>
          ))}
          {/* Button Add Portfolio */}
        </div>
      </form>
      <div className="flex flex-col items-center mt-5">
        <Button
          id="add-portfolio"
          text="Tambah Portofolio"
          onClick={handleAddPortfolio}
        />
      </div>
      <Toast message="Perubahan berhasil disimpan!" show={showToast} />
    </Section>
  );
}

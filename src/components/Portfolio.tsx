import { useMemo, useState } from "react";
import Image from "next/image";
import PortfolioCard from "../components/PortfolioCard";

type PortfolioProps = {
  backgroundImage?: FileList | File | Blob | null;
  profileImage?: FileList | File | Blob | null;
  profile?: {
    name?: string;
    title?: string;
    description?: string;
  };
  portfolios?: {
    position?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
    description: string;
  }[];
};

export default function Portfolio(props: PortfolioProps) {
  const [bgImageError, setBgImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const imageSrc = useMemo(() => {
    const bgImage =
      props.backgroundImage instanceof Blob
        ? URL.createObjectURL(props.backgroundImage)
        : null;
    const profileImage =
      props.profileImage instanceof Blob
        ? URL.createObjectURL(props.profileImage)
        : null;
    return { bgImage, profileImage };
  }, [props.backgroundImage, props.profileImage]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Avatar dan Background */}
      <div className="relative">
        {bgImageError || !imageSrc.bgImage ? (
          <div className="w-full h-40 lg:h-60 bg-black" />
        ) : (
          <div className="relative h-40 lg:h-60">
            <Image
              src={imageSrc.bgImage}
              alt={"Background"}
              fill
              className="object-cover rounded-t-xl"
              onError={() => setBgImageError(true)}
            />
          </div>
        )}
        <div className="absolute top-20 lg:top-30 left-1/2 transform -translate-x-1/2">
          {profileImageError || !imageSrc.profileImage ? (
            <div className="relative w-30 lg:w-40 h-30 lg:h-40 ">
              <Image
                src="/profil-empty.jpg"
                alt="Avatar"
                fill
                priority
                sizes="100%"
                className="rounded-full"
                onError={() => setProfileImageError(true)}
              />
            </div>
          ) : (
            <div className="relative w-30 lg:w-40 h-30 lg:h-40 ">
              <Image
                src={imageSrc.profileImage}
                alt="Avatar"
                fill
                className="rounded-full"
                onError={() => setProfileImageError(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Info Profil */}
      <div className="pt-15 pb-5 text-center px-4 md:px-6 xl:px-12">
        <h1 className="text-2xl 3xl:text-5xl font-bold">
          {props.profile?.name || "Nama"}
        </h1>
        <p className="text-base 3xl:text-2xl text-gray-500 font-bold">
          {props.profile?.title || "Title / Posisi"}
        </p>
        <p className="text-xs 3xl:text-lg mt-2 text-gray-600">
          {props.profile?.description || "Deskripsi"}
        </p>
      </div>

      <div className="w-full px-6 md:px-6 lg:px-10 xl:px-16 pb-10">
        <h2 className="text-base 3xl:text-2xl font-bold mb-2">Portofolio</h2>
        {props.portfolios?.length ? (
          props.portfolios?.map((item, index) => {
            return (
              <PortfolioCard
                key={index}
                title={item.position}
                company={item.company}
                startDate={item.startDate}
                endDate={item.endDate}
                description={item.description}
              />
            );
          })
        ) : (
          <PortfolioCard />
        )}
      </div>
    </div>
  );
}

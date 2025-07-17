import { useState } from "react";
import Image from "next/image";
import PortfolioCard from "../components/PortfolioCard";

export default function Portfolio() {
  const [bgImageError, setBgImageError] = useState(false);
  const [profilImageError, setProfilImageError] = useState(false);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Avatar dan Background */}
      <div className="relative">
        {bgImageError ? (
          <div className="w-full h-60 bg-black" />
        ) : (
          <div className="h-60">
            <Image
              src={"/bg-pict.jpg"}
              alt={"Background"}
              fill
              className="object-cover rounded-t-xl"
              onError={() => setBgImageError(true)}
            />
          </div>
        )}
        <div className="absolute top-30 left-1/2 transform -translate-x-1/2">
          {profilImageError ? (
            <div className="w-40 h-40 ">
              <Image
                src="/profil-empty.jpg"
                alt="Avatar"
                fill
                className="rounded-full"
                onError={() => setProfilImageError(true)}
              />
            </div>
          ) : (
            <div className="w-40 h-40 ">
              <Image
                src="/profil-pict.jpeg"
                alt="Avatar"
                fill
                className="rounded-full"
                onError={() => setProfilImageError(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Info Profil */}
      <div className="pt-15 pb-5 text-center px-4">
        <h1 className="text-2xl 3xl:text-5xl font-bold">Nama</h1>
        <p className="text-base 3xl:text-2xl text-gray-500 font-bold">Title</p>
        <p className="text-xs 3xl:text-lg mt-2 text-gray-600">
          Deskripsi, lorem ipsum dolor sit amet lorem ipsum <br />
          dolor sit amet lorem ipsum dolor sit amet
        </p>
      </div>

      <div className="px-6 md:px-6 lg:px-10 xl:px-16 pb-10">
        <h2 className="text-base 3xl:text-2xl font-bold mb-2">Portofolio</h2>
        <PortfolioCard
          title="Front End Developer"
          company="MySkill"
          startDate="Januari 2023"
          endDate="Desember 2023"
          description="Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
        />
        <PortfolioCard
          title="Front End Developer"
          company="MySkill"
          startDate="Januari 2023"
          endDate="Desember 2023"
          description="Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
        />
      </div>
    </div>
  );
}

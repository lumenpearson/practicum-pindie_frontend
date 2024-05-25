"use client";

import Preloader from "@/app/components/Preloader/Preloader";
import Banner from "@/app/components/Banner/Banner";
import Promo from "@/app/components/Promo/Promo";
import CardsListSection from "@/app/components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "@/app/api/api-hooks";
import { endpoints } from "@/app/api/config";

export default function Home() {
  const popularGames = useGetDataByCategory(endpoints.games, "popular");
  const newGames = useGetDataByCategory(endpoints.games, "new");

  return (
    <main className="main">
      <Banner />
      {popularGames ? (
        <CardsListSection data={popularGames} id="popular" title="Популярные" />
      ) : (
        <Preloader />
      )}
      {newGames ? (
        <CardsListSection data={newGames} id="new" title="Новинки" />
      ) : (
        <Preloader />
      )}
      <Promo />
    </main>
  );
}

"use client"

import Preloader from "@/app/components/Preloader/Preloader"
import CardsListSection from "@/app/components/CardsListSection/CardsListSection"

import { useGetDataByCategory } from "@/app/api/api-hooks"
import endpoints from "@/app/api/config"

export default function Popular() {
	const popularGames = useGetDataByCategory(endpoints.games, "popular")

	return (
		<main>
			{popularGames ? (
				<CardsListSection
					data={popularGames}
					id="popular"
					title="Популярные"
				/>
			) : (
				<Preloader />
			)}
		</main>
	)
}

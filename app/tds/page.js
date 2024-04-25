"use client"

import Preloader from "@/app/components/Preloader/Preloader"
import CardsListSection from "@/app/components/CardsListSection/CardsListSection"

import { useGetDataByCategory } from "@/app/api/api-hooks"
import endpoints from "@/app/api/config"

export default function TDS() {
	const tdsGames = useGetDataByCategory(endpoints.games, "TDS")

	return (
		<main>
			{tdsGames ? (
				<CardsListSection data={tdsGames} id="TDS" title="TDS" />
			) : (
				<Preloader />
			)}
		</main>
	)
}

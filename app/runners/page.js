"use client"

import Preloader from "@/app/components/Preloader/Preloader"
import CardsListSection from "@/app/components/CardsListSection/CardsListSection"

import { useGetDataByCategory } from "@/app/api/api-hooks"
import endpoints from "@/app/api/config"

export default function Runners() {
	const runnerGames = useGetDataByCategory(endpoints.games, "runner")

	return (
		<main>
			{runnerGames ? (
				<CardsListSection
					data={runnerGames}
					id="runners"
					title="Ранеры"
				/>
			) : (
				<Preloader />
			)}
		</main>
	)
}

"use client"

import Preloader from "@/app/components/Preloader/Preloader"
import CardsListSection from "@/app/components/CardsListSection/CardsListSection"

import { useGetDataByCategory } from "@/app/api/api-hooks"
import endpoints from "@/app/api/config"

export default function Shooters() {
	const shooterGames = useGetDataByCategory(endpoints.games, "shooter")

	return (
		<main>
			{shooterGames ? (
				<CardsListSection
					data={shooterGames}
					id="shooters"
					title="Шутеры"
				/>
			) : (
				<Preloader />
			)}
		</main>
	)
}

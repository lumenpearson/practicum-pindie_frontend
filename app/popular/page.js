'use client'
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import CardsListSection from "../components/CardsListSection/CardsListSection";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
    
    const popularGames = useGetDataByCategory(endpoints.games, "popular");
    
    return (
        <main className="main-inner">
        { popularGames ?
        (<CardsListSection id="popular" title="Популярное" data={popularGames}/>
        ) : (
            <Preloader/>
        )}
        </main>
    )
}
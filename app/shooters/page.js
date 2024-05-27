'use client'
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import CardsListSection from "../components/CardsListSection/CardsListSection";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
    
    const shooterGames = useGetDataByCategory(endpoints.games, "shooter");

    return (
        
        <main className="main-inner">
        { shooterGames ?
        ( <CardsListSection id="shooter" title="Шутеры" data={shooterGames}/>
        ) : (
            <Preloader/>
        )}
        </main>
    )
}
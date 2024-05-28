import {useState, useEffect} from "react";
import {getNormalizedGamesDataByCategory, isResponseOk} from "@/app/api/api-utils";

export const useGetDataByCategory = (endpoint, category) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const result = await getNormalizedGamesDataByCategory(endpoint, category)
            if (isResponseOk(result)) {
                setData(result)
            }
        }
        fetchData()
    }, [])
    return data
}
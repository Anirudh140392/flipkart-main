import React, { useState } from "react";
import KeywordAnalyticsContext from "./keywordAnalyticsContext";
import { useSearchParams } from "react-router-dom";

const KeywordAnalyticsState = (props) => {
    const host = "https://react-api-script.onrender.com";
    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");
    const [keywordAnalyticsData, setKeywordAnalyticsData] = useState(null)

    const getKeywordAnalyticsData = async () => {
        const response = await fetch(`${host}/app/keywordAnalytics?platform=${operator}&start_date=2025-01-26&end_date=2025-01-26`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        });
        const json = await response.json()
        console.log(json)
        setKeywordAnalyticsData(json)
    }

    return (
        <KeywordAnalyticsContext.Provider value={{ keywordAnalyticsData, getKeywordAnalyticsData }}>
            {props.children}
        </KeywordAnalyticsContext.Provider>
    )
}

export default KeywordAnalyticsState
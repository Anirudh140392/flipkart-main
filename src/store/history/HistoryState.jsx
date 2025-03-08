import React, { useState, useCallback } from "react";
import HistoryContext from "./historyContext";
import { useSearchParams } from "react-router-dom";

const HistoryState = (props) => {
    const host = "https://react-api-script.onrender.com";
    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");
    const [historyData, setHistoryData] = useState(null)
    const [historyLoading, setHistoryLoading] = useState(false)

    const getHistoryData = useCallback(async () => {
        if (!operator) return;

        setHistoryLoading(true);

        try {
            const response = await fetch(`${host}/app/history?platform=${operator}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
            });

            if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`);

            const json = await response.json();
            console.log(json);

            setHistoryData(prevData => JSON.stringify(prevData) === JSON.stringify(json) ? prevData : json);
        } catch (error) {
            console.error("Failed to fetch history data:", error);
        } finally {
            setHistoryLoading(false);
        }
    }, [operator]);

    return (
        <HistoryContext.Provider value={{ historyData, getHistoryData, historyLoading }}>
            {props.children}
        </HistoryContext.Provider>
    )
}

export default HistoryState
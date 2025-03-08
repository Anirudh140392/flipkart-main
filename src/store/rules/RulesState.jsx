import { useState, useMemo, useCallback } from "react";
import RulesContext from "./rulesContext";
import { useSearchParams } from "react-router-dom";

const RulesState = (props) => {

    const host = "https://react-api-script.onrender.com"

    const [rulesData, setRulesData] = useState(null)
    const [rulesLoading, setRulesLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const getRulesData = useCallback(async () => {
        if (!operator) {
            console.warn("Operator is missing, skipping API call.");
            return;
        }
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token found");
            return;
        }
        setRulesLoading(true);
        try {
            const response = await fetch(`${host}/app/rule?platform=${operator}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const json = await response.json();
            setRulesData(json);
        } catch (error) {
            console.error("Failed to fetch rules data:", error.message);
        } finally {
            setRulesLoading(false);
        }
    }, [operator]);

    const contextValue = useMemo(
        () => ({
            rulesData,
            getRulesData,
            rulesLoading,
        }),
        [rulesData, getRulesData, rulesLoading]
    );

    return (
        <RulesContext.Provider value={contextValue}>
            {props.children}
        </RulesContext.Provider>
    )
}

export default RulesState
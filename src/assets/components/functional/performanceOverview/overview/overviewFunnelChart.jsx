import React from "react";
import { FunnelChart, Funnel, Tooltip, LabelList, ResponsiveContainer } from "recharts";

const OverviewFunnelChart = () => {
    const data = [
        { value: 100, name: "Impressions", fill: "#4A90E2" },
        { value: 80, name: "Ad Sales", fill: "#5EAEFF" },
        { value: 50, name: "Ad Spends", fill: "#4ACFAC" },
        { value: 40, name: "Clicks", fill: "#8BC34A" },
        { value: 26, name: "Orders", fill: "#C0E57B" },
    ];

    return (
        <div style={{ width: 300, height: 400, margin: "auto" }}>
            <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                    <Tooltip />
                    <Funnel dataKey="value" data={data} isAnimationActive>
                        <LabelList position="center" fontSize='12px' fill="#000" stroke="none" dataKey="name" />
                    </Funnel>
                </FunnelChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OverviewFunnelChart;

import React from "react";
import { FunnelChart, Funnel, Tooltip, LabelList, ResponsiveContainer } from "recharts";
import { CircularProgress } from "@mui/material";

const OverviewFunnelChart = ({ data }) => {

    if (!data || !Array.isArray(data) || data.length === 0) {
        return <CircularProgress sx={{ margin: "auto" }} />;
    }
    const proportions = [100, 80, 50, 40, 26];
    const processedData = data.map((item, index) => ({
        ...item,
        scaledValue: proportions[index] || 26
    }));

    return (
        <div style={{ width: 300, height: 400, margin: "auto" }}>
            <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                    <Tooltip
                        formatter={(value, name, props) => {
                            return [`${props.payload.value}`, name];
                        }}
                    />
                    <Funnel dataKey="scaledValue" data={processedData} isAnimationActive>
                        <LabelList position="center" fontSize='12px' fill="#000" stroke="none" dataKey="name" />
                    </Funnel>
                </FunnelChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OverviewFunnelChart;

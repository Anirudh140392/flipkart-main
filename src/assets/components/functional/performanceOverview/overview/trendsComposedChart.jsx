import React, { useEffect } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList
} from "recharts";

const TrendsComposedChart = ({ data, dates, bids, metric1, metric2 }) => {
    // Prepare data for chart
    const chartData = dates.map((date, index) => ({
        date,
        bid: bids[index],
        metric1: data[metric1]?.[index] ?? null,
        metric2: data[metric2]?.[index] ?? null
    }));

    useEffect(() => {
        console.log("Metric 1 Data:", data[metric1]);
        console.log("Metric 2 Data:", data[metric2]);

    })

    return (
        <ResponsiveContainer width="100%" height={590}>
            <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis yAxisId="left" orientation="left" stroke="#007bff" />
                <YAxis yAxisId="right" orientation="right" stroke="#ffa500" />

                <Tooltip />
                <Legend />

                {/* Bar for Metric 1 */}
                <Bar yAxisId="left" dataKey="metric1" fill="#007bff">
                    <LabelList dataKey="bid" position="top" formatter={(value) => `Bid: ${value}`} />
                </Bar>

                {/* Line for Metric 2 */}
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="metric2"
                    stroke="#ffa500"
                    dot={{ r: 5 }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default TrendsComposedChart;


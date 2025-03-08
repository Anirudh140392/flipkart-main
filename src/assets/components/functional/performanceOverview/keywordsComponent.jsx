import React, { useMemo, useEffect, useContext, useState } from "react";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import '../../../styles/keywordsComponent/keywordsComponent.less';
import { Switch, Typography, Box, TextField, IconButton } from "@mui/material";
import overviewContext from "../../../../store/overview/overviewContext";
import { useSearchParams, useNavigate } from "react-router";
import ColumnPercentageDataComponent from "../../common/columnPercentageDataComponent";
import { Check, Delete } from '@mui/icons-material';
import TrendsModal from "./modal/trendsModal";

const KeywordsComponent = () => {

    const { getKeywordsData, keywordsData, dateRange, getBrandsData, brands } = useContext(overviewContext)

    const [showTrendsModal, setShowTrendsModal] = useState({ name: '', show: false, date: [] })

    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");
    const navigate = useNavigate()

    const STATUS_OPTIONS = [
        { value: 1, label: 'Active' },
        { value: 0, label: 'Paused' }
    ]

    useEffect(() => {
        const timeout = setTimeout(() => {
            getKeywordsData();
        }, 100);

        return () => clearTimeout(timeout);
    }, [getKeywordsData, operator, dateRange]);

    useEffect(() => {
        getBrandsData()
    }, [operator])

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
            window.location.reload();
        }
    }, []);

    const KeywordsColumnSwiggy = [
        {
            field: "keyword_y",
            headerName: "TARGET",
            minWidth: 150,
            renderCell: (params) => (
                <div className="text-icon-div cursor-pointer" onClick={() => handleCampaignClick(params.row.keyword_y)}>
                    <Typography variant="body2">{params.row.keyword_y}</Typography>
                </div>
            ),
        },
        {
            field: "bid",
            headerName: "BID",
            minWidth: 150,
            editable: true,
            type: "number",
            renderCell: (params) => `₹${params.row.bid}`,
            align: "left",
            headerAlign: "left",
        },
        {
            field: "status",
            headerName: "BID STATUS",
            minWidth: 150,
            renderCell: (params) => <Switch checked={params.row.status === 1 ? 1 : 0} />,
            type: "singleSelect",
            valueOptions: STATUS_OPTIONS
        },
        { field: "targeting_type", headerName: "KEYWORD TYPE", minWidth: 150, renderCell: () => "Keyword", },
        {
            field: "brand_name_y", headerName: "BRAND", minWidth: 150, type: "singleSelect", valueOptions: brands?.brands || []
        },
        {
            field: "sum_total_budget_burnt_y",
            headerName: "SPENDS",
            minWidth: 170,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.sum_total_budget_burnt_y} percentValue={params.row.perc_change_sum_total_budget_burnt} />
            ),
        },
        {
            field: "perc_change_sum_total_budget_burnt",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "sum_total_gmv_y",
            headerName: "DIRECT SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.sum_total_gmv_y} percentValue={params.row.perc_change_sum_total_gmv} />
            ),
        },
        {
            field: "perc_change_sum_total_gmv",
            headerName: "DIRECT SALES % CHANGE",
        },
        {
            field: "calculated_avg_ecpm_y",
            headerName: "CPM",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.calculated_avg_ecpm_y} percentValue={params.row.perc_change_calculated_avg_ecpm} />
            ),
        },
        {
            field: "perc_change_calculated_avg_ecpm",
            headerName: "CPM % CHANGE",
        },
        {
            field: "calculated_avg_total_roi_y",
            headerName: "DIRECT ROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.calculated_avg_total_roi_y} percentValue={params.row.perc_change_calculated_avg_total_roi} />
            ),
        },
        {
            field: "perc_change_calculated_avg_total_roi",
            headerName: "DIRECT ROAS % CHANGE",
        },
        {
            field: "calculated_a2c_rate_y",
            headerName: "CONVERSION",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.calculated_a2c_rate_y} percentValue={params.row.perc_change_calculated_a2c_rate} />
            ),
        },
        {
            field: "perc_change_calculated_a2c_rate",
            headerName: "CONVERSION % CHANGE",
        },
        { field: "match_type", headerName: "MATCH TYPE", minWidth: 200 },
        {
            field: "ad_property_y",
            headerName: "AD TYPE",
            minWidth: 200,
        },
        {
            field: "campaign_name",
            headerName: "CAMPAIGN",
            minWidth: 300,
        },
    ];

    const KeywordsColumnBlinkit = [
        {
            field: "targeting_value",
            headerName: "TARGET",
            minWidth: 150,
            renderCell: (params) => (
                <div className="text-icon-div cursor-pointer" onClick={() => handleCampaignClick(params.row.targeting_value)}>
                    <Typography variant="body2">{params.row.targeting_value}</Typography>
                </div>
            ),
        },
        {
            field: "cpm_exact",
            headerName: "BID",
            minWidth: 150,
            editable: true,
            type: "number",
            renderCell: (params) => `₹${params.row.cpm_exact}`,
            align: "left",
            headerAlign: "left",
        },
        {
            field: "status",
            headerName: "BID STATUS",
            type: "singleSelect",
            valueOptions: STATUS_OPTIONS,
            minWidth: 150,
            renderCell: (params) => <Switch checked={params.row.status === 1 ? 1 : 0} />,
        },
        { field: "targeting_type", headerName: "KEYWORD TYPE", minWidth: 150, },
        { field: "campaign_brand_name", headerName: "BRAND", minWidth: 150, type: "singleSelect", valueOptions: brands?.brands },
        {
            field: "estimated_budget_consumed_x",
            headerName: "SPENDS",
            minWidth: 170,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.estimated_budget_consumed_x} percentValue={params.row.estimated_budget_consumed_diff} />
            ),
        },
        {
            field: "estimated_budget_consumed_diff",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "direct_sales_x",
            headerName: "DIRECT SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.direct_sales_x} percentValue={params.row.direct_sales_diff} />
            ),
        },
        {
            field: "direct_sales_diff",
            headerName: "DIRECT SALES % CHANGE",
        },
        {
            field: "cpm_x",
            headerName: "CPM",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cpm_x} percentValue={params.row.cpm_diff} />
            ),
        },
        {
            field: "cpm_diff",
            headerName: "CPM % CHANGE",
        },
        {
            field: "total_sales_x",
            headerName: "TOTAL AD SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_sales_x} percentValue={params.row.total_sales_diff} />
            ),
        },
        {
            field: "total_sales_diff",
            headerName: "TOTAL AD SALES % CHANGE",
        },
        {
            field: "roas_x",
            headerName: "DIRECT ROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roas_x} percentValue={params.row.roas_diff} />
            ),
        },
        {
            field: "roas_diff",
            headerName: "DIRECT ROAS % CHANGE",
        },
        {
            field: "cvr_x",
            headerName: "CVR",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cvr_x} percentValue={params.row.cvr_diff} />
            ),
        },
        {
            field: "cvr_diff",
            headerName: "CVR % CHANGE",
        },
        {
            field: "direct_atc_x",
            headerName: "DIRECT ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.direct_atc_x} percentValue={params.row.direct_atc_diff} />
            ),
        },
        {
            field: "direct_atc_diff",
            headerName: "DIRECT ATC % CHANGE",
        },
        {
            field: "indirect_atc_x",
            headerName: "INDIRECT ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.indirect_atc_x} percentValue={params.row.indirect_atc_diff} />
            ),
        },
        {
            field: "indirect_atc_diff",
            headerName: "INDIRECT ATC % CHANGE",
        },
        {
            field: "total_atc_x",
            headerName: "TOTAL ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_atc_x} percentValue={params.row.total_atc_diff} />
            ),
        },
        { field: "keyword_class", headerName: "KEYWORD CLASS", minWidth: 150, },
        { field: "campaign_objective_type", headerName: "AD TYPE", minWidth: 150, },
        {
            field: "campaign_name",
            headerName: "CAMPAIGN",
            minWidth: 300,
        },
    ];

    const KeywordsColumnZepto = [
        {
            field: "keyword_name",
            headerName: "TARGET",
            minWidth: 150,
            renderCell: (params) => (
                <div className="text-icon-div cursor-pointer" onClick={() => handleCampaignClick(params.row.keyword_name)}>
                    <Typography variant="body2">{params.row.keyword_name}</Typography>
                </div>
            ),
        },
        {
            field: "cpc",
            headerName: "BID",
            minWidth: 200,
            editable: true,
            type: "number",
            renderCell: (params) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                    <TextField
                        variant="outlined"
                        disabled={true}
                        size="small"
                        value={params.row.cpc}
                        sx={{
                            width: "80px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                borderColor: "#d1d1d1",
                            },
                        }}
                    />
                    <IconButton disabled={true} color="primary">
                        <Check />
                    </IconButton>
                    <IconButton disabled={true} color="default">
                        <Delete />
                    </IconButton>
                </Box>
            ),
            align: "left",
            headerAlign: "left",
        },
        {
            field: "status",
            headerName: "BID STATUS",
            minWidth: 150,
            renderCell: () => <Switch checked={1} />,
        },
        { field: "keyword_type", headerName: "KEYWORD TYPE", minWidth: 150, },
        { field: "brand_name", headerName: "BRAND", minWidth: 150, type: "singleSelect", valueOptions: brands?.brands },
        {
            field: "spend",
            headerName: "SPENDS",
            minWidth: 170,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.spend} percentValue={params.row.spend_change} />
            ),
        },
        {
            field: "spend_change",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "revenue",
            headerName: "SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.revenue} percentValue={params.row.revenue_change} />
            ),
        },
        {
            field: "revenue_change",
            headerName: "SALES % CHANGE",
        },
        {
            field: "aov",
            headerName: "AOV",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.aov} percentValue={params.row.aov_diff} />
            ),
        },
        {
            field: "cpm",
            headerName: "CPM",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cpm} percentValue={params.row.cpm_change} />
            ),
        },
        {
            field: "cpm_change",
            headerName: "CPM % CHANGE",
        },
        {
            field: "roas",
            headerName: "DIRECT ROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roas} percentValue={params.row.roas_change} />
            ),
        },
        {
            field: "roas_change",
            headerName: "DIRECT ROAS % CHANGE",
        },
        {
            field: "atc",
            headerName: "ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roas} percentValue={params.row.roas_change} />
            ),
        },
        {
            field: "atc_change",
            headerName: "ATC % CHANGE",
        },
        {
            field: "cvr",
            headerName: "CVR",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cvr} percentValue={params.row.cvr_change} />
            ),
        },
        {
            field: "cvr_change",
            headerName: "CVR % CHANGE",
        },
        { field: "match_type", headerName: "MATCH TYPE", minWidth: 150, },
        {
            field: "ad_type", headerName: "AD TYPE", minWidth: 150,
        },
        {
            field: "campaign_name",
            headerName: "CAMPAIGN",
            minWidth: 300,
        },
    ];

    const columns = useMemo(() => {
        if (operator === "Swiggy") return KeywordsColumnSwiggy;
        if (operator === "Blinkit") return KeywordsColumnBlinkit;
        if (operator === "Zepto") return KeywordsColumnZepto;
        return [];
    }, [operator, brands]);

    const handleCampaignClick = async (keywordName) => {
        try {
            const { startDate, endDate } = dateRange[0];
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = {
                campaignName: "Campaign XYZ",
                dates: ["25 Feb", "26 Feb", "27 Feb", "28 Feb", "1 Mar", "2 Mar", "3 Mar"],
                metrics: {
                    sales: [100, 120, 150, 130, 160, 170, 180],
                    spends: [50, 60, 55, 65, 70, 80, 75],
                    clicks: [500, 600, 700, 800, 750, 900, 850],
                    impressions: [5000, 6000, 6500, 7000, 7500, 8000, 8500],
                    orders: [10, 12, 15, 13, 16, 17, 18],
                    ctr: [0.1, 0.12, 0.11, 0.13, 0.1, 0.11, 0.12],
                    cr: [0.02, 0.025, 0.03, 0.027, 0.028, 0.03, 0.031],
                    cpc: [30, 28, 32, 31, 29, 27, 33],
                    cpa: [33.09, 27.9, 41.4, 36.89, 37.05, 31.5, 40.53],
                    acos: [0.5, 0.55, 0.52, 0.57, 0.54, 0.53, 0.51],
                    roas: [2, 2.2, 2.1, 2.3, 2.4, 2.5, 2.6],
                    aov: [1000, 1100, 1050, 1200, 1250, 1300, 1350]
                },
                bids: [33.09, 27.9, 41.4, 36.89, 37.05, 31.5, 40.53]
            }
            if (response.ok) {
                setShowTrendsModal({ name: keywordName, show: true, data: data });
            } else {
                console.error("Failed to fetch campaign data");
            }
        } catch (error) {
            console.error("Error fetching campaign data", error);
        }
    };

    return (
        <React.Fragment>
            <TrendsModal
                showTrendsModal={showTrendsModal}
                setShowTrendsModal={setShowTrendsModal} />
            <div className="shadow-box-con-keywords aggregated-view-con">
                <div className="datatable-con-keywords">
                    <MuiDataTableComponent
                        isExport={true}
                        columns={columns}
                        data={keywordsData.data || []} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default KeywordsComponent;
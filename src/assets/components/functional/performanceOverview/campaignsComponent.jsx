import React, { useContext, useState, useEffect } from "react";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import '../../../styles/campaignsComponent/campaignsComponent.less';
import overviewContext from "../../../../store/overview/overviewContext";
import { Switch, TextField, Box } from "@mui/material";
import { useSearchParams } from "react-router";
import ColumnPercentageDataComponent from "../../common/columnPercentageDataComponent";
import TrendsModal from "./modal/trendsModal";

const CampaignsComponent = () => {

    const dataContext = useContext(overviewContext)
    const { campaignsData, getCampaignsData, dateRange, getBrandsData } = dataContext

    const [showTrendsModal, setShowTrendsModal] = useState({ name: '', show: false, date: [] })

    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const STATUS_OPTIONS = [
        { value: 1, label: 'Active' },
        { value: 0, label: 'Paused' }
    ]

    const BudgetCell = ({ value }) => {
        const [budget, setBudget] = useState(value);

        return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                <TextField
                    variant="outlined"
                    disabled={true}
                    size="small"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            borderColor: "#d1d1d1",
                        },
                    }}
                />
            </Box>
        );
    };

    const extractAdType = (str) => {
        const match = str.match(/_(PLA|PCA)_/);
        return match ? match[1] : null;
    };

    const CampaignsColumnFlipkart = [
        {
            field: "campaign_name_y",
            headerName: "CAMPAIGN",
            minWidth: 200,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        cursor: "pointer"
                    }}
                    onClick={() => handleCampaignClick(params.row.campaign_name)}
                >
                    {params.row.campaign_name_y}
                </Box>
            ),
        },
        {
            field: "campaign_budget_y",
            headerName: "BUDGET",
            minWidth: 150,
            renderCell: (params) => <BudgetCell value={params.row.campaign_budget_y} />,
        },
        {
            field: "status",
            headerName: "STATUS",
            minWidth: 100,
            renderCell: (params) => <Switch checked={params.row.status} />,
            align: "center",
            type: "singleSelect",
            valueOptions: STATUS_OPTIONS,
            headerAlign: "center",
        },
        {
            field: "ad_type",
            headerName: "AD TYPE",
            minWidth: 100,
            renderCell: (params) => (
                <Box>
                    {extractAdType(params.row.campaign_name_y)}
                </Box>
            )
        },
        {
            field: "cost_y",
            headerName: "SPENDS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cost_y} percentValue={params.row.cost_diff} />
            ),
        },
        {
            field: "cost_diff",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "total_converted_revenue_y",
            headerName: "SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_converted_revenue_y} percentValue={params.row.total_converted_revenue_diff} />
            ),
        },
        {
            field: "total_converted_revenue_diff",
            headerName: "SALES % CHANGE",
        },
        /*{
            field: "total_sales_x",
            headerName: "TOTAL AD SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_sales_x} percentValue={params.row.troas_diff} />
            ),
        },
        {
            field: "total_sales_diff",
            headerName: "TOTAL AD SALES % CHANGE",
        },*/
        {
            field: "troas_y",
            headerName: "TROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.troas_y} percentValue={params.row.troas_diff} />
            ),
        },
        {
            field: "troas_diff",
            headerName: "TROAS % CHANGE",
        },
        {
            field: "ctr_y",
            headerName: "CTR",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.ctr_y} percentValue={params.row.ctr_diff} />
            ),
        },
        {
            field: "ctr_diff",
            headerName: "CTR % CHANGE",
        },
        {
            field: "views_x",
            headerName: "IMPRESSIONS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.views_y} percentValue={params.row.views_diff} />
            ),
        },
        {
            field: "views_diff",
            headerName: "IMPRESSIONS % CHANGE",
        },
        {
            field: "clicks_y",
            headerName: "CLICKS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.clicks_y} percentValue={params.row.clicks_diff} />
            ),
        },
        {
            field: "clicks_diff",
            headerName: "CLICKS % CHANGE",
        },

        {
            field: "total_converted_units_y",
            headerName: "ORDERS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_converted_units_y} percentValue={params.row.total_converted_units_diff} />
            ),
        },
        {
            field: "total_converted_units_diff",
            headerName: "ORDERS % CHANGE",
        },
        {
            field: "roi_y",
            headerName: "ROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roi_y} percentValue={params.row.roi_diff} />
            ),
        },
        {
            field: "roi_diff",
            headerName: "ROAS % CHANGE",
        },
        /*{
            field: "cpm_diff",
            headerName: "PERCENT UTILISATION",
        },*/
    ];

    useEffect(() => {
        (async () => {
            await getCampaignsData();
        })();
    }, [getCampaignsData, operator, dateRange]);

    const handleCampaignClick = async (campaignName) => {
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
                setShowTrendsModal({ name: campaignName, show: true, data: data });
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
            <div className="shadow-box-con-campaigns aggregated-view-con">
                <div className="datatable-con-campaigns">
                    <MuiDataTableComponent
                        isExport={true}
                        columns={CampaignsColumnFlipkart}
                        data={campaignsData?.data} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default CampaignsComponent;
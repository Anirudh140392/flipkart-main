import React, { useEffect } from "react";
import { useContext } from "react";
import OverviewFunnelChart from "./overview/overviewFunnelChart";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import overviewContext from "../../../../store/overview/overviewContext";
import { useSearchParams } from "react-router";
import ColumnPercentageDataComponent from "../../common/columnPercentageDataComponent";

const OverviewComponent = () => {
    const dataContext = useContext(overviewContext)
    const { overviewData, getOverviewData, dateRange, formatDate } = dataContext
    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const selectOptions = [
        { label: 'All', value: 'ALL' },
        { label: 'SP', value: 'SP' },
        { label: 'SB', value: 'SB' },
        { label: 'SD', value: 'SD' },
    ]

    const CategoryColumns = [
        { field: "category", headerName: "CATEGORY", minWidth: 200 },
        {
            field: "cost",
            headerName: "SPENDS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cost} percentValue={params.row.cost_pct_change} />
            ),
        },
        {
            field: "cost_pct_change",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "total_converted_revenue",
            headerName: "SALES",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_converted_revenue} percentValue={params.row.total_converted_revenue_pct_change} />
            ),
        },
        {
            field: "total_converted_revenue_pct_change",
            headerName: "SALES % CHANGE",
        },
        {
            field: "clicks",
            headerName: "CLICKS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.clicks} percentValue={params.row.clicks_pct_change} />
            ),
        },
        {
            field: "clicks_pct_change",
            headerName: "CLICKS % CHANGE",
        },
        {
            field: "roi",
            headerName: "ROAS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roi} percentValue={params.row.roi_pct_change} />
            ),
        },
        {
            field: "roi_pct_change",
            headerName: "ROAS % CHANGE",
        },
        {
            field: "views",
            headerName: "IMPRESSIONS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.views} percentValue={params.row.views_pct_change} />
            ),
        },
        {
            field: "views_pct_change",
            headerName: "IMPRESSIONS % CHANGE",
        },
        {
            field: "aov",
            headerName: "AOV",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.aov} percentValue={params.row.aov_pct_change} />
            ),
        },
        {
            field: "aov_pct_change",
            headerName: "AOV % CHANGE",
        },
        {
            field: "cpc",
            headerName: "CPC",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cpc} percentValue={params.row.cpc_pct_change} />
            ),
        },
        {
            field: "cpc_pct_change",
            headerName: "CPC % CHANGE",
        },
        {
            field: "acos",
            headerName: "ACOS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.acos} percentValue={params.row.acos_pct_change} />
            ),
        },
        {
            field: "acos_pct_change",
            headerName: "ACOS % CHANGE",
        },
    ]

    const SubCategoryColumns = [
        { field: "category", headerName: "CATEGORY", minWidth: 200 },
        { field: "sub_category", headerName: "SUBCATEGORY", minWidth: 200 },
        {
            field: "cost",
            headerName: "SPENDS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cost} percentValue={params.row.cost_pct_change} />
            ),
        },
        {
            field: "cost_pct_change",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "total_converted_revenue",
            headerName: "SALES",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_converted_revenue} percentValue={params.row.total_converted_revenue_pct_change} />
            ),
        },
        {
            field: "total_converted_revenue_pct_change",
            headerName: "SALES % CHANGE",
        },
        {
            field: "clicks",
            headerName: "CLICKS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.clicks} percentValue={params.row.clicks_pct_change} />
            ),
        },
        {
            field: "clicks_pct_change",
            headerName: "CLICKS % CHANGE",
        },
        {
            field: "roi",
            headerName: "ROAS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roi} percentValue={params.row.roi_pct_change} />
            ),
        },
        {
            field: "roi_pct_change",
            headerName: "ROAS % CHANGE",
        },
        {
            field: "views",
            headerName: "IMPRESSIONS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.views} percentValue={params.row.views_pct_change} />
            ),
        },
        {
            field: "views_pct_change",
            headerName: "IMPRESSIONS % CHANGE",
        },
        {
            field: "aov",
            headerName: "AOV",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.aov} percentValue={params.row.aov_pct_change} />
            ),
        },
        {
            field: "aov_pct_change",
            headerName: "AOV % CHANGE",
        },
        {
            field: "cpc",
            headerName: "CPC",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cpc} percentValue={params.row.cpc_pct_change} />
            ),
        },
        {
            field: "cpc_pct_change",
            headerName: "CPC % CHANGE",
        },
        {
            field: "acos",
            headerName: "ACOS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.acos} percentValue={params.row.acos_pct_change} />
            ),
        },
        {
            field: "acos_pct_change",
            headerName: "ACOS % CHANGE",
        },
    ]

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            getOverviewData();
        }
    }, [operator, dateRange, getOverviewData]);

    const CTRWidget = ({ firstHeadingText, firstHeadingData, secondHeadingText, secondHeadingData, isSecondHeadingRequired = true }) => {
        return (
            <div className="ctr-card-main-con">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5 className="card-title text-aqua">{firstHeadingText}</h5>
                            <h3 className="mb-0">{firstHeadingData}</h3>
                        </div>
                        {isSecondHeadingRequired &&
                            <div>
                                <h5 className="card-title text-peach">{secondHeadingText}</h5>
                                <h3 className="mb-0">{secondHeadingData}</h3>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    function toMillions(num) {
        return (num / 1_000_000).toFixed(2) + "M";
    }

    function toThousands(num) {
        return (num / 1_000).toFixed(2) + "K";
    }

    const daysDifference = () => {
        if (!dateRange?.length) return 0;
        const startDate = new Date(dateRange[0].startDate);
        const endDate = new Date(dateRange[0].endDate);
        const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
        return diff === 6 ? diff + 1 : diff;
    }

    return (
        <React.Fragment>
            <div className="shadow-box-con top-overview-con">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 d-md-flex flex-md-column">
                        <div className="svg-data-filter-con">
                            <p>
                                Compared to {daysDifference} days ago.{" "}
                                {`${formatDate(dateRange[0].startDate)}-`}
                                <br />
                                {`${formatDate(dateRange[0].endDate)}`}
                            </p>

                        </div>
                        <OverviewFunnelChart data={overviewData?.funnel} />
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="Impressions"
                                    firstHeadingData={`${overviewData?.metrics_data?.Impressions ? toMillions(overviewData?.metrics_data?.Impressions) : "-"}`}
                                    secondHeadingText="Clicks"
                                    secondHeadingData={`${overviewData?.metrics_data?.Clicks ? toThousands(overviewData?.metrics_data?.Clicks) : "-"}`} />
                            </div>
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="Orders"
                                    firstHeadingData={`${overviewData?.metrics_data?.Orders ? toThousands(overviewData?.metrics_data?.Orders) : "-"}`}
                                    secondHeadingText="Sales"
                                    secondHeadingData={`${overviewData?.metrics_data?.Sales ? toMillions(overviewData?.metrics_data?.Sales) : "-"}`} />
                            </div>
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="ROAS"
                                    firstHeadingData={`${overviewData?.metrics_data?.ROI ? overviewData?.metrics_data?.ROI : "-"}`} />
                            </div>
                        </div>
                        <div className="agrregated-shadow-box-con aggregated-view-con mt-4">
                            <div className="px-3 py-2 border-bottom">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h5 className="mb-0">Category View</h5>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                            <div className="datatable-con">
                                <MuiDataTableComponent
                                    isExport={true}
                                    columns={CategoryColumns}
                                    data={overviewData?.cat_table} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="agrregated-shadow-box-con aggregated-view-con">
                <div className="px-3 py-2 border-bottom">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5 className="mb-0">Subcategory View</h5>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="datatable-con">
                    <MuiDataTableComponent
                        isExport={true}
                        columns={SubCategoryColumns}
                        data={overviewData?.sub_cat_table} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default OverviewComponent;
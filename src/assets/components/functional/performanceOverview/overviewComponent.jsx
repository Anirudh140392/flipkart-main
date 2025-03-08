import React, { useEffect } from "react";
import { useContext } from "react";
import OverviewFunnelChart from "./overview/overviewFunnelChart";
import ChartComponent from "../../common/chartComponent";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import ErrorBoundary from "../../common/erroBoundryComponent";
import ExcelDownloadButton from "../../molecules/excelDownloadButton";
import SelectFieldComponent from "../../molecules/selectFieldComponent";
import ActiveRulesComponent from "./overview/activeRulesComponent";
import AlertsComponent from "./overview/alertsComponent";
import GoalComponent from "./overview/goalComponent";
import overviewContext from "../../../../store/overview/overviewContext";
import { useSearchParams } from "react-router";

const OverviewComponent = () => {
    const dataContext = useContext(overviewContext)
    const { overviewData, getOverviewData, dateRange, formatDate } = dataContext
    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");
    const sourceSystemData = [
        ['Days', 'SMS', 'Email'],
        ['Day 1', 10, 8],
        ['Day 2', 15, 12],
        ['Day 3', 12, 23],
        ['Day 4', 18, 14],
        ['Day 5', 25, 20],
        ['Day 6', 16, 30],
        ['Day 7', 22, 28],
    ];

    const chartOptions = {
        curveType: "function",
        legend: { position: "bottom" },
        'chartArea': { 'width': '85%' },
        pointSize: 5,
    }

    const selectOptions = [
        { label: 'All', value: 'ALL' },
        { label: 'SP', value: 'SP' },
        { label: 'SB', value: 'SB' },
        { label: 'SD', value: 'SD' },
    ]

    const OverviewColumnsBlinkit = [
        { field: "campaign_tags", headerName: "Campaign Tags", minWidth: 200 },
        { field: "estimated_budget_consumed_x", headerName: "Budget Consumed", minWidth: 200 },
        { field: "total_sales_x", headerName: "Total Sales", minWidth: 200 },
        { field: "impressions_x", headerName: "Impressions", minWidth: 200 },
        { field: "cpm_x", headerName: "CPM", type: "number", minWidth: 200, align: "left", headerAlign: "left" },
        { field: "roas_x", headerName: "ROAS", type: "number", minWidth: 200, align: "left", headerAlign: "left" }
    ]

    const Callback = (val) => {
        setImageData(val)
    }

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
                            <p>Compared to {daysDifference} days ago. {`${formatDate(dateRange[0].startDate)}-${formatDate(dateRange[0].endDate)}`}</p>
                            <SelectFieldComponent
                                isFieldLabelRequired={false}
                                areaLabel="user-detail"
                                fieldClass={'filter-select ms-3'}
                                isDisabled={false}
                                options={selectOptions}
                                onChange={(e) => setAdImpressionData(e.target.value)} />
                        </div>
                        <OverviewFunnelChart />
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="Impressions"
                                    firstHeadingData={`${overviewData?.funnel?.total_impressions ? toMillions(overviewData?.funnel?.total_impressions) : "-"}`}
                                    isSecondHeadingRequired={false} />
                            </div>
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="CPM"
                                    firstHeadingData={`${overviewData?.funnel?.avg_cpm ? overviewData?.funnel?.avg_cpm : "-"}`}
                                    secondHeadingText="Orders"
                                    secondHeadingData={`${overviewData?.funnel?.total_orders ? toThousands(overviewData?.funnel?.total_orders) : "-"}`} />
                            </div>
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="Total Spends"
                                    firstHeadingData={`${overviewData?.funnel?.total_spends ? toMillions(overviewData?.funnel?.total_spends) : "-"}`}
                                    secondHeadingText="ROAS"
                                    secondHeadingData={`${overviewData?.funnel?.avg_roas ? overviewData?.funnel?.avg_roas : "-"}`} />
                            </div>
                        </div>
                        <div className="datatable-con mt-4">
                            <MuiDataTableComponent
                                columns={OverviewColumnsBlinkit}
                                data={overviewData?.cat_table} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow-box-con top-overview-con">
                <ChartComponent
                    chartType={'AreaChart'}
                    chartData={sourceSystemData}
                    chartWidth={"100%"}
                    chartHeight="350px"
                    options={chartOptions} />
            </div>
            <div className="agrregated-shadow-box-con aggregated-view-con">
                <div className="px-3 py-2 border-bottom">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5 className="mb-0">Agrregated View</h5>
                        </div>
                        <div className="col-lg-6 text-end">
                            <SelectFieldComponent
                                isFieldLabelRequired={false}
                                areaLabel="user-detail"
                                fieldClass={'filter-select me-3'}
                                isDisabled={false}
                                options={selectOptions}
                                onChange={(e) => setAdImpressionData(e.target.value)} />
                            <ExcelDownloadButton
                                buttonClass="excel-button bg-dark text-white border-dark"
                                buttonLabel="Export" />
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="datatable-con">
                    <MuiDataTableComponent
                        columns={OverviewColumnsBlinkit}
                        data={overviewData?.cat_table} />
                </div>
            </div>
            <ErrorBoundary>
                <GoalComponent />
            </ErrorBoundary>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <ErrorBoundary>
                        <AlertsComponent />
                    </ErrorBoundary>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <ActiveRulesComponent />
                </div>
            </div>
        </React.Fragment>
    )
}

export default OverviewComponent;
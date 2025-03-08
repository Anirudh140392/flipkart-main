import React, { useContext, useEffect, useMemo } from "react";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import { useSearchParams } from "react-router-dom";
import historyContext from "../../../../store/history/historyContext";
import { Typography } from "@mui/material";

const HistoryDatatable = () => {

    const dataContext = useContext(historyContext)
    const { historyData, getHistoryData } = dataContext
    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const getColorCode = (value1, value2) => {
        if (value1 === value2) {
            return "#ffc107"
        }
        else if (value1 < value2) {
            return "#dc3545"
        }
        else {
            return "#198754"
        }
    }

    const HistoryColumnsZepto = [
        { field: "id", headerName: "ID", minWidth: 150 },
        { field: "date", headerName: "Date", minWidth: 150 },
        { field: "time", headerName: "Time", minWidth: 150 },
        { field: "module", headerName: "Module", minWidth: 150 },
        { field: "type", headerName: "Type", minWidth: 150 },
        { field: "property", headerName: "Property", minWidth: 150 },
        { field: "nature", headerName: "Nature", minWidth: 150 },
        { field: "source_name", headerName: "Source Name", minWidth: 150 },
        { field: "keyword_cvr_value", headerName: "Conversion", minWidth: 150 },
        { field: "guardrail", headerName: "Guardrail", minWidth: 150 },
        { field: "campaign_id", headerName: "Campaign ID", minWidth: 150 },
        { field: "campaign_name", headerName: "Campaign Name", minWidth: 250 },
        { field: "keyword", headerName: "Keyword", minWidth: 150 },
        { field: "total_keywords", headerName: "Total Keywords", minWidth: 150, type: "number", align: "left", headerAlign: "left" },
        { field: "updated_keywords", headerName: "Updated Keywords", minWidth: 150, type: "number", align: "left", headerAlign: "left" },
        { field: "platform", headerName: "Platform", minWidth: 150 },
        { field: "user_name", headerName: "User Name", minWidth: 150 }

    ];

    const HistoryColumnsBlinkit = [
        { field: "id", headerName: "ID", minWidth: 150, type: "number", align: "left", headerAlign: "left" },
        { field: "date", headerName: "Date", minWidth: 150 },
        { field: "time", headerName: "Time", minWidth: 150 },
        { field: "module", headerName: "Module", minWidth: 150 },
        { field: "type", headerName: "Type", minWidth: 150 },
        { field: "property", headerName: "Property", minWidth: 150 },
        { field: "nature", headerName: "Nature", minWidth: 150 },
        { field: "source_name", headerName: "Source Name", minWidth: 150 },
        { field: "keyword_cvr_value", headerName: "Conversion", minWidth: 150 },
        { field: "guardrail", headerName: "Guardrail", minWidth: 150 },
        {
            field: "keyword_roas_value", headerName: "KEYWORDS ROAS", minWidth: 150, renderCell: (params) => (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%"
                }}>
                    <Typography sx={{ fontSize: "14px", flex: 1, textAlign: "left", color: `${getColorCode(params.row.keyword_roas_value, params.row.guardrail_roas)}` }}>
                        {params.row.keyword_roas_value}
                    </Typography>
                </div>
            ),
        },
        { field: "guardrail_roas", headerName: "GUARDRAIL ROAS", minWidth: 150 },
        { field: "campaign_name", headerName: "Campaign Name", minWidth: 200 },
        { field: "keyword", headerName: "Keyword", minWidth: 150 },
        { field: "platform", headerName: "Platform", minWidth: 150 },
        { field: "user_name", headerName: "User Name", minWidth: 150 },
    ];

    const HistoryColumnsSwiggy = [
        { field: "id", headerName: "ID", minWidth: 150 },
        { field: "date", headerName: "Date", minWidth: 150 },
        { field: "time", headerName: "Time", minWidth: 150 },
        { field: "module", headerName: "Module", minWidth: 150 },
        { field: "type", headerName: "Type", minWidth: 150 },
        { field: "property", headerName: "Property", minWidth: 150 },
        { field: "nature", headerName: "Nature", minWidth: 150 },
        { field: "source_name", headerName: "Source Name", minWidth: 150 },
        { field: "keyword_cvr_value", headerName: "Conversion", minWidth: 150 },
        { field: "guardrail", headerName: "Guardrail", minWidth: 150 },
        {
            field: "keyword_roi_value", headerName: "KEYWORDS ROAS", minWidth: 150, renderCell: (params) => (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%"
                }}>
                    <Typography sx={{ fontSize: "14px", flex: 1, textAlign: "left", color: `${getColorCode(params.row.keyword_roi_value, params.row.roi_guardrail)}` }}>
                        {params.row.keyword_roi_value}
                    </Typography>
                </div>
            ),
        },
        { field: "roi_guardrail", headerName: "GUARDRAIL ROAS", minWidth: 150 },
        { field: "campaign_name", headerName: "Campaign Name", width: 250 },
        { field: "keyword", headerName: "Keyword", minWidth: 150 },
        { field: "platform", headerName: "Platform", minWidth: 150 },
        { field: "user_name", headerName: "User Name", minWidth: 150 },
        { field: "suggestion", headerName: "Suggestion", minWidth: 300 },
    ];

    useEffect(() => {
        getHistoryData()
    }, [getHistoryData])

    const selectedColumns = useMemo(() => {
        switch (operator) {
            case "Zepto": return HistoryColumnsZepto;
            case "Blinkit": return HistoryColumnsBlinkit;
            default: return HistoryColumnsSwiggy;
        }
    }, [operator]);

    return (
        <React.Fragment>
            <div className="datatable-con">
                <MuiDataTableComponent
                    columns={selectedColumns}
                    data={historyData?.data || []} />
            </div>
        </React.Fragment>
    )
}

export default HistoryDatatable;
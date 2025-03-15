import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridFilterPanel, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';
import overviewContext from "../../../store/overview/overviewContext";
import rulesContext from "../../../store/rules/rulesContext";
import historyContext from "../../../store/history/historyContext";
import ExcelDownloadButton from "../molecules/excelDownloadButton";

const CustomFilterPanel = (props) => {

    const handleSearchClick = () => {
        console.log('Search button clicked');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
                <GridFilterPanel {...props} />
            </Box>
            <Button
                onClick={handleSearchClick}
                variant="contained"
                color="primary"
                size="small"
                sx={{ margin: "10px" }}
            >
                Search
            </Button>
        </Box>
    );
};

const MuiDataTableComponent = (props) => {
    const { overviewLoading, campaignLoading } = useContext(overviewContext)
    const { rulesLoading } = useContext(rulesContext)
    const { historyLoading } = useContext(historyContext)
    const { columns, data, isExport } = props;
    const customLocaleText = {
        filterPanelOperator: 'Condition',
    }

    const handleExport = (columns, rows) => {
        const csvContent = [
            columns.map(col => col.headerName).join(','),
            ...rows.map(row =>
                columns.map(col => {
                    let value = row[col.field];
                    if (col.valueGetter) {
                        value = col.valueGetter({ row });
                    }
                    if (typeof value === 'number') {
                        return value;
                    }
                    return value;
                }).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'export.csv';
        link.click();
    };

    const CustomToolbar = () => (
        <GridToolbarContainer className="w-100 d-flex justify-content-between align-items-center" sx={{ padding: "8px" }}>
            <div>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </div>
            {isExport && <ExcelDownloadButton
                handleExport={handleExport}
                columns={columns}
                rows={data}
                buttonClass="excel-button bg-dark text-white border-dark"
                buttonLabel="Export" />}
        </GridToolbarContainer>
    );
    return (
        <Box sx={{ height: "100%", overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {(rulesLoading || overviewLoading || historyLoading || campaignLoading) ? (<CircularProgress />) : (
                <DataGrid
                    rows={data}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 100,
                            },
                        },
                    }}
                    pageSizeOptions={[100]}
                    slots={{
                        toolbar: CustomToolbar,
                        filterPanel: CustomFilterPanel,
                    }}
                    slotProps={{
                        filterPanel: {
                        },
                        toolbar: { csvOptions: { allColumns: true } }
                    }}
                    localeText={customLocaleText}
                    columnVisibilityModel={{
                        cost_diff: false,
                        total_converted_revenue_diff: false,
                        troas_diff: false,
                        CTR_diff: false,
                        clicks_diff: false,
                        total_converted_units_diff: false,
                        roas_diff: false,
                        roi_diff: false,
                        ctr_diff: false,
                        views_diff: false,
                        cost_pct_change: false,
                        total_converted_revenue_pct_change: false,
                        clicks_pct_change: false,
                        roi_pct_change: false,
                        views_pct_change: false,
                        aov_pct_change:false,
                        cpc_pct_change:false,
                        acos_pct_change:false
                    }}
                />
            )}
        </Box>
    );
};

export default MuiDataTableComponent;

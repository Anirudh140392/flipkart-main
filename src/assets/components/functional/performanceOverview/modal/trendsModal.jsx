import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SelectFieldComponent from "../../../molecules/selectFieldComponent";
import TrendsComposedChart from "../overview/trendsComposedChart";

const TrendsModal = ({ showTrendsModal, setShowTrendsModal }) => {

    const [selectedMetric1, setSelectedMetric1] = useState("impressions");
    const [selectedMetric2, setSelectedMetric2] = useState("acos");

    const trendsOptions = [
        { label: "Choose Trends", value: "" },
        { label: "Sales", value: "sales" },
        { label: "Spends", value: "spends" },
        { label: "Clicks", value: "clicks" },
        { label: "Impressions", value: "impressions" },
        { label: "Orders", value: "orders" },
        { label: "CTR", value: "ctr" },
        { label: "CR", value: "cr" },
        { label: "CPC", value: "cpc" },
        { label: "CPA", value: "cpa" },
        { label: "ACoS", value: "acos" },
        { label: "RoAS", value: "roas" },
        { label: "AOV", value: "aov" },
    ];

    return (
        <React.Fragment>
            <Modal show={showTrendsModal.show} onHide={() => setShowTrendsModal({ name: '', show: false })} size="xl">
                <Modal.Header className="border-bottom" closeButton>
                    <Modal.Title className="text-dark h5">
                        Trends - {showTrendsModal.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="form-group mb-3">
                                <SelectFieldComponent
                                    isFieldLabelRequired={false}
                                    fieldClass="form-select"
                                    areaLabel="Select First Metric"
                                    value={selectedMetric1}
                                    options={trendsOptions}
                                    onChange={(e) => setSelectedMetric1(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="form-group mb-3">
                                <SelectFieldComponent
                                    isFieldLabelRequired={false}
                                    fieldClass="form-select"
                                    areaLabel="Select Second Metric"
                                    value={selectedMetric2}
                                    options={trendsOptions}
                                    onChange={(e) => setSelectedMetric2(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <TrendsComposedChart
                                data={showTrendsModal.data?.metrics || {}}
                                dates={showTrendsModal.data?.dates || []}
                                bids={showTrendsModal.data?.bids || []}
                                metric1={selectedMetric1}
                                metric2={selectedMetric2}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default TrendsModal;

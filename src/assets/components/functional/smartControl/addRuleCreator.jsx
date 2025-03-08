import React, { useEffect, useState } from "react";
import FilterIcon from "../../../icons/common/filterIcon";
import SelectFieldComponent from "../../molecules/selectFieldComponent";
import TextFieldComponent from "../../molecules/textFieldCompnent";
import { Tooltip } from 'react-tooltip';
import RadioCheckboxComponent from "../../molecules/radioCheckboxComponent";
import ButtonComponent from "../../molecules/buttonComponent";
import TextAreaComponent from "../../molecules/textareaComponent";



const defaultValue = {
    platform_name: "",
    pf_id: "",
    user_id: "",
    user_name: "",
    rule_name: "",
    rule_id: "",
    created_on: "",
    operation_name: "",
    operation_type: "",
    report_type: "",
    campaign_type: "",
    frequency_number: 0,
    limit_type: "",
    frequency: 0,
    frequency_type: "",
    description: "",
    limit_value: 0,
    status: "",
    placements: "",
    id: "",
    filters: [
        { spends: 0, spends_op: "" },
        { sales: 0, sales_op: "" },
        { roas: 0, roas_op: "" },
        { troas: 0, troas_op: "" },
        { impression: 0, impression_op: "" },
        { clicks: 0, clicks_op: "" },
        { ctr: 0, ctr_op: "" }
    ]
}

const AddRuleCreator = (props) => {

    const { showRuleModal, showEditRuleModal,
        setShowRuleModal, setShowEditRuleModal, editRuleData } = props;

    const [ruleData, setRuleData] = useState(defaultValue);
    const [showFilterOptions, setShowFilterOptions] = useState(false)
    const [newRuleRadio, setNewRuleRadio] = useState("New Rule")
    const placeTypeOptions = [
        { label: 'All', value: 'All' },
        { label: 'Rest of Search listing page', value: 'Rest of Search listing page' },
        { label: 'Top of Search Listing page', value: 'Top of Search Listing page' },
        { label: 'Top of Browse Listing page', value: 'Top of Browse Listing page' },
        { label: 'Product Page', value: 'Product Page' },
    ]

    const reportsOptions = [
        { label: 'Last 7 days', value: 'Last 7 days' },
        { label: 'Last 14 days', value: 'Last 14 days' },
        { label: 'Last Month', value: 'Last Month' },
        { label: 'This Month', value: 'This Month' },
    ]

    const campaignTypeOptions = [
        { label: 'National', value: 'National' },
    ]

    const actionTypeOptions = [
        { label: 'Increased Bid %', value: 'In' },
        { label: 'Decreased Bid %', value: 'De' },
    ]

    const querySelectorOptions = [
        { label: 'Spends', value: 'Spends' },
        { label: 'Sales', value: 'Sales' },
        { label: 'Clicks', value: 'Clicks' },
        { label: 'Views', value: 'Views' },
        { label: 'CVR', value: 'CVR' },
        { label: 'ROAS', value: 'ROAS' },
        { label: 'CTR', value: 'CTR' },
        { label: 'TOS IS%', value: 'TOS IS%' },
    ]

    const queryConditionOptions = [
        { label: '>', value: 'gt' },
        { label: '<', value: 'lt' },
        { label: '=', value: 'eq' },
        { label: '>=', value: 'gre_equal' },
        { label: '<=', value: 'less_eqaul' },
    ]

    const frequencyTypeOptions = [
        { label: 'Once in', value: 1 },
        { label: 'Twice in', value: 2 },
        { label: 'Thrice in', value: 3 },
    ]

    const frequencyOptions = [
        { label: 'day', value: 'day' },
        { label: 'week', value: 'week' },
        { label: 'month', value: 'month' },
        { label: 'year', value: 'year' },
    ]

    const excludeOptions = [
        { label: 'Yesterday', value: 'Yesterday' },
        { label: 'Last 2 Days', value: 'Last 2 Days' },
        { label: 'Last 5 Days', value: 'Last 5 Days' },
    ]

    const SaveRules = (e) => {
        e.preventDefault();
        console.log('ruleData', ruleData);
        setShowRuleModal(false);
    }

    useEffect(() => {
        if (editRuleData) {
            setRuleData(editRuleData);
        }
    }, [editRuleData]);

    return (
        <React.Fragment>
            <form>
                <div className="row">
                    {/* Filter Icon */}
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-right">
                        <div className="d-flex justify-content-end align-items-end pb-4 h-100">
                            <span data-tooltip-id="my-tooltip" data-tooltip-content="Filter"
                                onClick={() => setShowFilterOptions(!showFilterOptions)}>
                                <FilterIcon
                                    iconClass="cursor-pointer"
                                    iconWidth="20"
                                    iconHeight="20"
                                    iconColor="#000" />
                            </span>
                            <Tooltip id="my-tooltip" />
                        </div>
                    </div>
                </div>
                {/* Filter Options */}
                {showFilterOptions &&
                    <div className="row">
                        <div className="col-12">
                            <div className="border position-relative rounded px-2 py-3 mb-3 filter-option">
                                <span className="overlapping--heading">Filters</span>
                                {ruleData.filters
                                    .filter(filter => {
                                        const firstKey = Object.keys(filter)[0]; // Get first key (e.g., "roas", "spends")
                                        const operationKey = `${firstKey}_op`; // Get corresponding _op key
                                        return filter[operationKey] !== "" && filter[operationKey] !== "0"; // Ensure _op is not empty and not "0"
                                    })
                                    .map((filter, index) => {
                                        const [filterName, filterValue] = Object.entries(filter)[0]; // Extract first key-value pair
                                        const operationKey = `${filterName}_op`; // Get corresponding _op key

                                        return (<div key={index} className="form-group mb-3">
                                            <div className="d-flex">
                                                {/* First Select: Filter Name (Disabled) */}
                                                <SelectFieldComponent
                                                    fieldClass="form-select rounded-end-0"
                                                    areaLabel="querySelectorOne"
                                                    options={[{ label: filterName, value: filterName }]} // Single option
                                                    value={filterName}
                                                    disabled
                                                />

                                                {/* Second Select: Operation (Disabled) */}
                                                <SelectFieldComponent
                                                    fieldClass="form-select rounded-0 condition-form-select"
                                                    areaLabel="queryConditionOne"
                                                    options={queryConditionOptions} // Assuming valid operations exist
                                                    value={filter[operationKey]}
                                                    disabled
                                                />

                                                {/* Third Input: Numeric Field (Editable) */}
                                                <TextFieldComponent
                                                    fieldClass="form-control rounded-start-0"
                                                    fieldType="number"
                                                    areaLabel="queryValueOne"
                                                    fieldPlaceholder="Enter value"
                                                    fieldValue={filterValue || 0}
                                                    min="0" // Prevents negative values
                                                    onChange={e => {
                                                        const newValue = e.target.value === "" ? "" : Math.max(0, parseFloat(e.target.value) || 0); // Ensure valid numeric input ≥ 0

                                                        setRuleData(prevState => ({
                                                            ...prevState,
                                                            filters: prevState.filters.map(f =>
                                                                Object.keys(f)[0] === filterName ? { ...f, [filterName]: newValue } : f
                                                            )

                                                        }));
                                                        console.log(ruleData)
                                                    }}
                                                />
                                            </div>
                                        </div>);
                                    })}
                            </div>


                        </div>
                    </div>
                }
                {/* New Rule/Query Radio */}
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-2 mb-3">
                        <div className="form-group">
                            <RadioCheckboxComponent
                                labelClass="me-3"
                                fieldType="radio"
                                fieldLabel="New Rule"
                                ariaLabel="New Rule"
                                fieldName="rule"
                                fieldValue={'New Rule'}
                                fieldChecked={newRuleRadio === 'New Rule' ? true : false}
                                onChange={(e) => setNewRuleRadio(e.target.value)} />
                            <RadioCheckboxComponent
                                labelClass=""
                                fieldType="radio"
                                fieldLabel="New Query"
                                ariaLabel="New Query"
                                fieldName="rule"
                                fieldValue={"New Query"}
                                fieldChecked={newRuleRadio === 'New Query' ? true : false}
                                onChange={(e) => setNewRuleRadio(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-1 mb-2 text-end">
                        <small className="d-inline-block py-1 px-2 bg-light rounded-pill">
                            module = keywords
                        </small>
                    </div>
                </div>
                <div className="row">
                    {/* Placement Type */}
                    {/*<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <SelectFieldComponent
                                isFieldLabelRequired={true}
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Placement Type"
                                fieldClass="form-select"
                                areaLabel="placement-type"
                                options={placeTypeOptions}
                                onChange={(e) => setRuleData({ ...ruleData, placementType: e.target.value })} />
                        </div>
            </div>*/}
                    {/* Reports */}
                    {/*<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <SelectFieldComponent
                                isFieldLabelRequired={true}
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Reports"
                                fieldClass="form-select"
                                areaLabel="reports"
                                options={reportsOptions}
                                onChange={(e) => setRuleData({ ...ruleData, reports: e.target.value })} />
                        </div>
        </div>*/}
                    {/* Campaign Name */}
                    {/*<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <TextFieldComponent
                                isFieldLabelRequired={true}
                                fieldType="text"
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Campaign Name"
                                fieldClass="form-control"
                                areaLabel="campaign-name"
                                fieldPlaceholder="Enter campaign name"
                                fieldValue={ruleData.campaignName}
                                onChange={(e) => setRuleData({ ...ruleData, campaignName: e.target.value })} />
                        </div>
                    </div>*/}
                    {/* Campaign Type */}
                    {/*<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <SelectFieldComponent
                                isFieldLabelRequired={true}
                                fieldType="text"
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Campaign Type"
                                fieldClass="form-select"
                                areaLabel="reports"
                                options={campaignTypeOptions}
                                onChange={(e) => setRuleData({ ...ruleData, reports: e.target.value })} />
                        </div>
                </div>*/}
                    {/* Rule Name */}
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <TextFieldComponent
                                isFieldLabelRequired={true}
                                fieldType="text"
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Name"
                                fieldClass="form-control"
                                areaLabel="name"
                                fieldPlaceholder="Enter rule name"
                                fieldValue={ruleData.rule_name}
                                onChange={(e) => setRuleData({ ...ruleData, rule_name: e.target.value })} />
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="col-12">
                        <div className="form-group mb-3">
                            <label className="label text-dark">Actions</label>
                            <div className="d-flex">
                                <SelectFieldComponent
                                    fieldClass="form-select rounded-end-0"
                                    areaLabel="actions-select"
                                    options={actionTypeOptions}
                                    value={ruleData.operation_name}
                                    onChange={(e) => { setRuleData({ ...ruleData, operation_name: e.target.value }); }}
                                />
                                <span className="bg-light px-3 border-top border-bottom small d-flex align-items-center">By</span>
                                <TextFieldComponent
                                    fieldClass="form-control rounded-start-0"
                                    fieldType="text"
                                    areaLabel="action-value"
                                    fieldPlaceholder="Enter value"
                                    fieldValue={ruleData.operation_type}
                                    onChange={(e) => setRuleData({ ...ruleData, operation_type: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    {/* Minimum (INR) */}
                    {ruleData.operation_name === "De" ? (
                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="form-group mb-3">
                                <TextFieldComponent
                                    isFieldLabelRequired={true}
                                    fieldLabelClass="label text-dark"
                                    fieldLabelText="Minimum (INR)"
                                    fieldType="number"
                                    fieldClass="form-control"
                                    areaLabel="minimum_inr"
                                    fieldPlaceholder="Enter amount"
                                    fieldValue={ruleData.minimum_inr}
                                    onChange={(e) => setRuleData({ ...ruleData, minimum_inr: e.target.value })} />
                            </div>
                        </div>
                    ) : (

                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="form-group mb-3">
                                <TextFieldComponent
                                    isFieldLabelRequired={true}
                                    fieldLabelClass="label text-dark"
                                    fieldLabelText="Maximum (INR)"
                                    fieldType="number"
                                    fieldClass="form-control"
                                    areaLabel="maximum_inr"
                                    fieldPlaceholder="Enter amount"
                                    fieldValue={ruleData.maximum_inr}
                                    onChange={(e) => setRuleData({ ...ruleData, maximum_inr: e.target.value })} />
                            </div>
                        </div>
                    )}
                    {/* Frequency */}
                    <div className="col-12">
                        <div className="form-group mb-3">
                            <label className="label">Frequency</label>
                            <div className="d-flex frequency-option">
                                <SelectFieldComponent
                                    fieldClass="form-select rounded-end-0 frequency-type"
                                    areaLabel="frequency-type"
                                    selectLabel="Select Type"
                                    value={ruleData.frequency_number}
                                    options={frequencyTypeOptions}
                                    onChange={(e) => setRuleData({ ...ruleData, frequency_number: e.target.value })} />
                                <TextFieldComponent
                                    fieldClass="form-control rounded-0"
                                    fieldType="text"
                                    areaLabel="frequency-value"
                                    fieldPlaceholder="Enter value"
                                    fieldValue={ruleData.frequency}
                                    onChange={(e) => setRuleData({ ...ruleData, frequency: e.target.value })} />
                                <SelectFieldComponent
                                    fieldClass="form-select rounded-start-0"
                                    areaLabel="frequency"
                                    selectLabel="Select Frequency"
                                    value={ruleData.frequency_type}
                                    options={frequencyOptions}
                                    onChange={(e) => setRuleData({ ...ruleData, frequency_type: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    {/* Exclude */}
                    {/*<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <SelectFieldComponent
                                isFieldLabelRequired={true}
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Exclude"
                                fieldClass="form-select"
                                areaLabel="Exclude"
                                options={excludeOptions}
                                onChange={(e) => setRuleData({ ...ruleData, exclude: e.target.value })} />
                        </div>
                </div>*/}
                    {/* Description */}
                    <div className="col-12">
                        <div className="form-group mb-3">
                            <TextAreaComponent
                                isFieldLabelRequired={true}
                                fieldType="text"
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Description"
                                fieldClass="form-control"
                                areaLabel="Description"
                                fieldPlaceholder=""
                                fieldRows="3"
                                fieldValue={ruleData.description}
                                onChange={(e) => setRuleData({ ...ruleData, description: e.target.value })} />
                        </div>
                    </div>
                    {/* Save */}
                    <div className="col-12 text-end">
                        <ButtonComponent
                            buttonClass="btn btn-primary"
                            buttonLabel="Save Changes"
                            onClick={SaveRules} />
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default AddRuleCreator;
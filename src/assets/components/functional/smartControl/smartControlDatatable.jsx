import React, { useEffect, useState, useContext, useMemo } from "react";
import PauseIcon from "../../../icons/common/pauseIcon";
import PencilEditIcon from "../../../icons/common/pencilEditIcon";
import PlayIcon from "../../../icons/common/playIcon";
import TrashIcon from "../../../icons/common/trashIcon";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import rulesContext from "../../../../store/rules/rulesContext";
import overviewContext from "../../../../store/overview/overviewContext";
import { useSearchParams, useNavigate } from "react-router";
import EditRuleModal from "./modal/editRuleModal";

const SmartControlDatatable = () => {

  const [showEditRuleModal, setShowEditRuleModal] = useState(false)
  const [selectedRule, setSelectedRule] = useState(null);

  const dataContext = useContext(rulesContext)
  const { rulesData, getRulesData } = dataContext

  const { campaignSetter } = useContext(overviewContext)

  const [searchParams] = useSearchParams();
  const operator = searchParams.get("operator");
  const navigate = useNavigate()

  useEffect(() => {
    getRulesData()
  }, [getRulesData]);

  const STATUS_OPTIONS = [
    { value: 'Active', label: 'Active' },
    { value: 'In-Active', label: 'In-Active' }
  ]

  const onCampaignClick = (value) => {
    campaignSetter(value)
    navigate(`/?operator=${operator}`)
  }

  const SmartControlColumn = useMemo(() => [
    { field: 'id', headerName: '#ID', minWidth: 100 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 300,
      renderCell: (params) => (
        <span
          className="text-icon-div cursor-pointer redirect"
          onClick={() => onCampaignClick(params.row.name)}
        >
          {params.row.name}
        </span>
      )
    },
    { field: 'module', headerName: 'Module', minWidth: 150 },
    { field: 'type', headerName: 'Type', minWidth: 150 },
    { field: 'schedule', headerName: 'Schedule', minWidth: 150 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      type: 'singleSelect',
      valueOptions: STATUS_OPTIONS,
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 250,
      renderCell: (params) => (
        <span >
          {params.row.isPlay ? (
            <PlayIcon
              iconClass="me-4 cursor-pointer"
              iconWidth="13"
              iconHeight="13"
              iconColor="#000"
            />
          ) : (
            <PauseIcon
              iconClass="me-4 cursor-pointer"
              iconWidth="13"
              iconHeight="13"
              iconColor="#000"
            />
          )}
          <span onClick={() => {
            setSelectedRule(params.row);
            setShowEditRuleModal(true)
          }}>
            <PencilEditIcon
              iconClass="me-4 cursor-pointer"
              iconWidth="13"
              iconHeight="13"
              iconColor="#000"

            />
          </span>
          <TrashIcon
            iconClass="me-4 cursor-pointer"
            iconWidth="13"
            iconHeight="13"
            iconColor="#000"
          />
        </span>
      ),
      sortable: false,
    },
  ], [])

  const SmartControlData = rulesData?.data.map((item) => ({
    ...item,
    id: item.id,
    name: item.rule_name,
    module: "Campaigns",
    type: "Rule",
    schedule: item.frequency,
    status: item.status === 1 ? "Active" : "In-Active"
  }))

  return (
    <React.Fragment>
      <EditRuleModal showEditRuleModal={showEditRuleModal}
        setShowEditRuleModal={setShowEditRuleModal} editRuleData={selectedRule} />
      <div className="datatable-con">
        <MuiDataTableComponent
          columns={SmartControlColumn}
          data={SmartControlData} />
      </div>
    </React.Fragment>
  )
}

export default SmartControlDatatable;
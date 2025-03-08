import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import AvatarIcon from "./assets/icons/navbar/avatarIcon";
import BlockersIcon from "./assets/icons/navbar/blockersIcon";
import GoToInsightIcon from "./assets/icons/navbar/goToInsightIcon";
import HistoryIcon from "./assets/icons/navbar/historyIcon";
import LogoutIcon from "./assets/icons/navbar/logoutIcon";
import PerformanceOverviewIcon from "./assets/icons/navbar/performanceOverviewIcon";
import ProductIntelligentCenterIcon from "./assets/icons/navbar/productIntelligenceCenterIcon";
import RecommendationsIcon from "./assets/icons/navbar/recommendationsIcon";
import SearchTermInsightIcon from "./assets/icons/navbar/searchTermInsightIcon";
import SmartControlIcon from "./assets/icons/navbar/smartControlIcon";
import WalletIcon from "./assets/icons/navbar/walletIcon";
import { OPERATOR } from "./assets/lib/constant";
import { useNavigate } from "react-router";

const RedirectLink = ({ url, label, pathName, onClick }) => {

    return (
        <Link className={pathName === url ? 'active' : ''} to={url}
            aria-label={pathName}
            onClick={onClick}>
            {label === 'Campaign Compass' ?
                <PerformanceOverviewIcon
                    iconClass="me-2"
                    iconWidth="15"
                    iconHeight="15"
                    iconColor={pathName === url ? "#fff" : "#78a8df"} /> :
                label === 'Smart Control' ?
                    <SmartControlIcon
                        iconClass="me-2"
                        iconWidth="15"
                        iconHeight="15"
                        iconColor={pathName === url ? "#fff" : "#78a8df"} /> :
                    label === 'Search Term Insights' ?
                        <SearchTermInsightIcon
                            iconClass="me-2"
                            iconWidth="15"
                            iconHeight="15"
                            iconColor={pathName === url ? "#fff" : "#78a8df"} /> :
                        label === 'Product Intelligence Center' ?
                            <ProductIntelligentCenterIcon
                                iconClass="me-2"
                                iconWidth="15"
                                iconHeight="15"
                                iconColor={pathName === url ? "#fff" : "#78a8df"} /> :
                            label === 'Blockers' ?
                                <BlockersIcon
                                    iconClass="me-2"
                                    iconWidth="15"
                                    iconHeight="15"
                                    iconColor={pathName === url ? "#fff" : "#78a8df"} /> :
                                label === 'Recommendations' ?
                                    <RecommendationsIcon
                                        iconClass="me-2"
                                        iconWidth="15"
                                        iconHeight="15"
                                        iconColor={pathName === url ? "#fff" : "#78a8df"} /> :
                                    label === 'Go-to Insights' ?
                                        <GoToInsightIcon
                                            iconClass="me-2"
                                            iconWidth="15"
                                            iconHeight="15"
                                            iconColor={pathName === url ? "#fff" : "#78a8df"} /> :
                                        label === 'History' ?
                                            <HistoryIcon
                                                iconClass="me-2"
                                                iconWidth="15"
                                                iconHeight="15"
                                                iconColor={pathName === url ? "#fff" : "#78a8df"} />
                                            : ''}
            {label}
        </Link>
    )
}

const Navbar = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const operatorType = queryParams.get('operator') || '';
    const location = useLocation();
    const [operatorTypeParams, setOperatorTypeParams] = useState(location.search)
    const [operatorName, setoperatorName] = useState('')
    const [pathName, setPathName] = useState(`/`);
    const navigate = useNavigate()

    useEffect(() => {
        setOperatorTypeParams(location.search);
        setPathName(`${location.pathname}${operatorTypeParams}`);
        setoperatorName(location.search.split("=")[1]);
    }, [location])
    const onLogoutClick = () => {
        localStorage.removeItem("accessToken")
        navigate("/login")
        window.location.reload()
    }
    return (
        <React.Fragment>
            <div className="left-navbar-main-con">
                <div className="nav-logo-header text-center">
                    <img src="../images/logo-white.png" width="150" className="img-fluid" />
                </div>
                <div className="nav-profile-con d-flex">
                    <AvatarIcon
                        iconClass="me-2"
                        iconWidth="30"
                        iconHeight="30"
                        iconColor="#fff" />
                    <div className="profile-user-data">
                        <h3>{localStorage.getItem("username")}</h3>
                        <h5 className="cursor-pointer" onClick={onLogoutClick}>
                            <LogoutIcon
                                iconClass="me-1"
                                iconWidth="15"
                                iconHeight="15"
                                iconColor="#5cb850" /> Logout
                        </h5>
                    </div>
                </div>
                <div className="nav-profile-con d-flex">
                    <WalletIcon
                        iconClass="me-2"
                        iconWidth="23"
                        iconHeight="23"
                        iconColor="#fff" />
                    <div className="profile-user-data">
                        <h3>Wallet Balance</h3>
                        <h2 className="mt-2 mb-0">₹ 0</h2>
                    </div>
                </div>
                <div className="redirection-navbar-con">
                    <Accordion className="navbar-accordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Activation</Accordion.Header>
                            <Accordion.Body>
                                {['Flipkart'].includes(operatorName) &&
                                    <RedirectLink
                                        url={`/${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`}
                                        label="Campaign Compass"
                                        pathName={pathName}
                                        onClick={() => setPathName(`/${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`)} />
                                }
                                {!['Flipkart'].includes(operatorName) &&
                                    <RedirectLink
                                        url={`/smart-control${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`}
                                        label="Smart Control"
                                        pathName={pathName}
                                        onClick={() => setPathName(`/smart-control${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`)} />
                                }
                                {!['Flipkart'].includes(operatorName) &&
                                    <RedirectLink
                                        url={`/keyword-analysis${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`}
                                        label="Search Term Insights"
                                        pathName={pathName}
                                        onClick={() => setPathName(`/keyword-analysis${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`)} />
                                }
                                {!['Flipkart'].includes(operatorName) &&
                                    <RedirectLink
                                        url={`/product-intelligence-center${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`}
                                        label="Product Intelligence Center"
                                        pathName={pathName}
                                        onClick={() => setPathName(`/product-intelligence-center${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`)} />
                                }
                                {!['Flipkart'].includes(operatorName) &&
                                    <RedirectLink
                                        url={`/blockers${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`}
                                        label="Blockers"
                                        pathName={pathName}
                                        onClick={() => setPathName(`/blockers${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`)} />
                                }
                                {!['Flipkart'].includes(operatorName) &&
                                    <RedirectLink
                                        url={`/recommendations${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`}
                                        label="Recommendations"
                                        pathName={pathName}
                                        onClick={() => setPathName(`/recommendations${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`)} />
                                }
                                {!['Flipkart'].includes(operatorName) &&
                                    <RedirectLink
                                        url={`/goto-insights${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`}
                                        label="Go-to Insights"
                                        pathName={pathName}
                                        onClick={() => setPathName(`/goto-insights${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`)} />
                                }
                                {!['Flipkart'].includes(operatorName) &&
                                    <RedirectLink
                                        url={`/history${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`}
                                        label="History"
                                        pathName={pathName}
                                        onClick={() => setPathName(`/history${operatorTypeParams === '' ? `?operator=${OPERATOR.AMAZON}` : operatorTypeParams}`)} />
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navbar;
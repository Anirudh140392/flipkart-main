import React, { useState, useContext, useEffect } from "react";
import Notification from "../../components/common/notificationComponent";
import AuthFieldComponent from "../../components/functional/auth/authFieldComponent";
import '../../styles/auth/auth.less';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authContext from "../../../store/auth/authContext";

const defaultValue = {
    userName: '',
    password: ''
}

const Login = () => {

    const authCtx = useContext(authContext)
    const { setUser } = authCtx

    const [authDetail, setAuthDetail] = useState(defaultValue);

    const url = "https://react-api-script.onrender.com"

    const [notificationMessageType, setNotificationMessageType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const setNotification = (message = '', type = 'success') => {
        setNotificationMessage(message);
        setNotificationMessageType(type);
    }

    const navigate = useNavigate()

    const [showError, setShowError] = useState({
        userNameError: false,
        userNameErrorMessage: '',
        passwordError: false,
        passwordErrorMessage: ''
    });

    const userLogin = async (userName, password, setNotification) => {
        try {
            const res = await axios.post(`${url}/app/login`, {
                username: userName,
                password: password,
            });

            const { access } = res.data.token;
            setUser(res.data.username);
            localStorage.setItem("accessToken", access);
            try {
                const walletRes = await axios.get(
                    `${url}/app/wallet-balance?platform=Flipkart`,
                    {
                        headers: {
                            Authorization: `Bearer ${access}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (walletRes.data) {
                    localStorage.setItem("walletBalance", walletRes.data.wallet_balance);
                }
            } catch (walletError) {
                console.error("Failed to fetch wallet balance:", walletError.message);
                setNotification("Failed to fetch wallet balance", "error");
            }

            setNotification("You are successfully logged in", "success");
            navigate("/");
            window.location.reload();
        } catch (error) {
            setNotification(error.message, "error");
        }
    };

    const signIn = async (e) => {
        e.preventDefault();
        if (authDetail.userName === '' || authDetail.userName === undefined) {
            setShowError({
                userNameError: true,
                userNameErrorMessage: 'Username should not be blank'
            })
        } else if (authDetail.password === '' || authDetail.password === undefined) {
            setShowError({
                passwordError: true,
                passwordErrorMessage: 'Password should not be blank'
            })
        } else {
            setShowError({
                userNameError: false,
                userNameErrorMessage: '',
                passwordError: false,
                passwordErrorMessage: ''
            })
            userLogin(authDetail.userName, authDetail.password, setNotification)
        }
    }

    return (
        <React.Fragment>
            <Notification
                message={notificationMessage}
                messageType={notificationMessageType}
                clearMessage={setNotification} />
            <div className="login-main-container">
                <div className="text-center mb-3">
                    <img src="../images/logo.png" width="200" className="img-fluid" />
                </div>
                <div className="login-container">
                    <h2 className="text-center">Login</h2>
                    <form>
                        {/* User Name */}
                        <div className="form-group">
                            <AuthFieldComponent
                                formGroupClass={''}
                                isFieldLabelRequired={true}
                                fieldLabelClass={"h4"}
                                showError={showError}
                                fieldLabelText="User Name"
                                fieldPlaceholder="Type your username"
                                fieldType="text"
                                fieldClass={`auth-input ${showError.userNameError ? 'error' : ''}`}
                                areaLabel="user-name"
                                fieldValue={authDetail.userName}
                                onChange={(e) => setAuthDetail({ ...authDetail, userName: e.target.value })} />
                            {showError.userNameError &&
                                <span className="field-error-message">{showError.userNameErrorMessage}</span>
                            }
                        </div>

                        {/* Password */}
                        <div className="form-group mb-0">
                            <AuthFieldComponent
                                formGroupClass={'mb-0'}
                                isFieldLabelRequired={true}
                                fieldLabelClass={"h4"}
                                fieldLabelText="Password"
                                fieldType="password"
                                fieldPlaceholder="Type your password"
                                fieldClass={`auth-input mb-0 ${showError.passwordError ? 'error' : ''}`}
                                areaLabel="user-name"
                                fieldValue={authDetail.password}
                                onChange={(e) => setAuthDetail({ ...authDetail, password: e.target.value })} />
                            {showError.passwordError &&
                                <span className="field-error-message">{showError.passwordErrorMessage}</span>
                            }
                        </div>
                        {/*<div className="text-end">
                            <Link to="/forgot-password" className="redirect-text">
                                Forgot Password
                            </Link>
                        </div>*/}
                        <button className="auth-button mb-3"
                            onClick={signIn}>LOGIN</button>
                        {/*<p className="small">
                            Not a registered user? <Link to="/signup">Sign Up</Link>.
                        </p>*/}
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;
import Navigation from "../components/Navigation/Navigation";
import { useState, useEffect, useContext } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { StateContext } from '../utils/StateContext';
import { Link } from "react-router-dom";
import EmailForm from "../components/EmailForm";
import placeholder from "../assets/profilePlaceholder.svg";
import { checkIfUser } from "../utils/UserData";

const Login = ({ date }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [displayUserName, setDisplayUserName] = useState("Guest");
    const googleProvider = new GoogleAuthProvider();

    const { user, loading } = useContext(StateContext);

    const emailAuth = getAuth();
    const emailUser = emailAuth.currentUser;

    const [userData, setUserData] = useState({
        UserId: '',
        TotalGames: '',
        TotalWins: '',
        TotalLost: '',
        LongestWinStreak: ''
    });
    const [showStats, setShowStats] = useState(false);

    const GoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("GoogleLogin Result Received");
        } catch (error) {
            console.log("GoogleLogin Error:", error);
        }
    };

    const Logout = () => {
        auth.signOut();
    };

    const enableLogin = () => {
        setIsChecked(!isChecked);
    }

    const getUserID = async () => {
        try {
            const data = await checkIfUser(emailUser.email);
            setUserData(data[0]);
            setShowStats(true);
        } catch (error) {
            console.log("getUserData Error:", error);
        }
    }

    // Get Display Name
    useEffect(() => {
        try {
            const userDisplayName = () => {
                if (user.displayName !== null) {
                    return user.displayName
                }
                if (emailUser.email !== null) {
                    return emailUser.email
                }
                else {
                    return "Guest"
                }
            }
            // Set Result
            setDisplayUserName(userDisplayName());

        } catch (error) {
            console.log("DisplayName Error:", error);
        }

    }, [emailUser, user]);


    if (loading)
        return (
            <>
                <Navigation />
                <h2>loading...</h2>
            </>
        );
    else
        return (
            <>
                <Navigation />
                <div className="login-container">
                    {!user && (
                        <>
                            <h2>Login</h2>
                            <div className="login-card">
                                <div className="login-box">
                                    <br />
                                    <label className="labelContainer">
                                        <div>
                                            <input
                                                checked={isChecked}
                                                onChange={enableLogin}
                                                type="checkbox"
                                                id="myCheckbox"
                                            />
                                            <i>*by checking this box you agree to the{" "}
                                                <Link to="/Terms">
                                                    <i><b>Terms & Conditions</b></i>
                                                </Link>{" "}
                                                and{" "}
                                                <Link to="/Privacy">
                                                    <i><b>Privacy Policy</b></i>
                                                </Link>
                                            </i>
                                        </div>
                                    </label>
                                    <br />
                                    <h3>Login/Sign in with Google</h3>
                                    <button
                                        disabled={!isChecked}
                                        id="loginBtn"
                                        onClick={GoogleLogin}
                                    >
                                        Google
                                    </button>
                                    <br />
                                    <br />
                                    <br />
                                    <EmailForm isChecked={isChecked} />
                                </div>
                            </div>
                        </>
                    )}
                    {user && (
                        <>
                            <div className="user-logged-container">
                                <h2 className="settingsH2">Sign Out</h2>
                                {user.photoURL &&
                                    <img
                                        className="user-photo"
                                        src={user.photoURL}
                                        alt="userPhoto"
                                    />
                                }
                                {!user.photoURL &&
                                    <img
                                        className="user-photo"
                                        src={placeholder}
                                        alt="userPhoto"
                                    />
                                }
                                <h3>Welcome, {displayUserName}</h3>
                                <div className="user-logged-buttons">
                                    <Link to="/">
                                        <button>Home</button>
                                    </Link>
                                    <button onClick={Logout}>Logout</button>
                                    <button onClick={getUserID}>Stats</button>
                                </div>
                            </div>
                            {showStats &&
                                <div className="user-stats">
                                    <center>
                                        <h3>User Stats</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Total Games</th>
                                                    <th>Total Wins</th>
                                                    <th>Total Losses</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{userData.TotalGames}</td>
                                                    <td>{userData.TotalWins}</td>
                                                    <td>{userData.TotalLost}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </center>
                                </div>
                            }
                        </>
                    )}
                </div>
            </>
        );
};
export default Login;

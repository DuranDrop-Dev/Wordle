import { auth } from "../../utils/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import profile from "../../assets/profilePlaceholder.svg"

const NavProfilePic = () => {
    const [user, loading] = useAuthState(auth);

    if (loading) return (
        <img
            className="navProfile"
            src={profile}
            alt=""
        />)

    if (user) return (
        <>
            {!user.photoURL &&
                <Link to="/Login">
                    <img
                        className="navProfile"
                        src={profile}
                        alt="profile"
                    />
                </Link>
            }
            {user.photoURL &&
                <Link to="/Login">
                    <img
                        className="navProfile"
                        src={user.photoURL}
                        alt=""
                    />
                </Link>
            }
        </>
    );

    if (!user) return (
        <>
            <Link to="/Login">
                <img
                    className="navProfile"
                    src={profile}
                    alt="profile"
                />
            </Link>
        </>
    );
}
export default NavProfilePic;
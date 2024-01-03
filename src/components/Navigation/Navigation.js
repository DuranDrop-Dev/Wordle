import NavProfilePic from "./NavProfilePic";
import Menu from "../../components/Menu/Menu";
import "./Navigation.css";

const Navigation = ({ title }) => {
    return (
        <>
            <h3 className="navTitle">
                {title}
            </h3>
            <div className="nav-container">
                <Menu />
                <ul>
                    <NavProfilePic />
                </ul>
            </div>
        </>
    );
}
export default Navigation;
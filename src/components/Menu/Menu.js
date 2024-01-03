import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className="menuBtn" onClick={handleClick}>
                <div className={isOpen ? 'menuBar1Opened' : 'menuBar1'} />
                <div className={isOpen ? 'menuBar2Opened' : 'menuBar2'} />
                <div className={isOpen ? 'menuBar3Opened' : 'menuBar3'} />
            </div>
            <div className={isOpen ? 'menuBoard' : 'close'}>
                <ul>
                    <Link to="/">
                        <li className={isOpen ? 'liItem' : 'closeItem'}>Home</li>
                    </Link>
                </ul>
                <ul>
                    <Link to="/Login">
                        <li className={isOpen ? 'liItem' : 'closeItem'}>Login</li>
                    </Link>
                </ul>
                {/* <ul>
                    <Link to="/Test">
                        <li className={isOpen ? 'liItem' : 'closeItem'}>Test</li>
                    </Link>
                </ul> */}
                <ul>
                    <div
                        className={isOpen ? 'emptySpace' : 'close'}
                        onClick={handleClick}
                    />
                </ul>
            </div>
        </>
    )
}
export default Menu;
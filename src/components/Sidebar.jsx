import { useState } from 'react';
import './Sidebar.css'
import HamburgerIconWhite from '/HamburgerWhite.svg'
import { useDispatch } from 'react-redux';
import { windowManagerActions } from '../store/store';

const Sidebar = () => {
    const [dataVisible, setDataVisible] = useState('false');
    const dispatch = useDispatch();

    function handleClick() {
        if(dataVisible === 'false')
            setDataVisible('true');
        else
            setDataVisible('false')
    }

    function handleCreateNewProjectClick() {
        dispatch(windowManagerActions.createNewProject());
        handleClick();
    }

    return (
        <nav>
            <button
            onClick={handleClick}
            className='mobile-nav-toggle'
            aria-controls='primary-navigation'
            aria-expanded='false'
            >
                <span className='sr-only'>
                    <img src={HamburgerIconWhite}/>
                </span>
            </button>
            
            <ul
            data-visible={dataVisible}
            className="primary-navigation"
            >
                <h2>Projects</h2>
                
                <li>
                    <button>Project 1</button>
                </li>
                <li>
                    <button>Project 2</button>
                </li>
                <li>
                    <button>Project 3</button>
                </li>
                <li>
                    <button>Project 4</button>
                </li>
                <button onClick={handleCreateNewProjectClick}>Add new Project</button>
            </ul>
            
        </nav>
    );
}
 
export default Sidebar;
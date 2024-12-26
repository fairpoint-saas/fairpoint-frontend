import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MainFooter from './MainFooter';

const AppContainer = ({ isDrawerOpen, children }) => { 
    const drawerWidthVW = 56;
    const drawerWidthPX = 224;
    const [containerStyle, setContainerStyle] = useState()
   

    useEffect(() => {

        setContainerStyle({
            marginTop: '56px',
            marginLeft: isDrawerOpen ? `calc(${drawerWidthPX}px)` : '0px', 
            width: isDrawerOpen ? `${window.innerWidth - drawerWidthPX}px` : '100vw',
            paddingLeft: "10px",
            transition: 'width 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            justifyContent: 'space-between',
        })
    }, [isDrawerOpen])

    return (
        <div style={containerStyle}>
            <div style={{ flex: '1' }}>
                {children}
            </div>
            <MainFooter style={{ width: isDrawerOpen ? 'calc(100vw - 224px)' : '100vw' }}/>
        </div>
    );
};

AppContainer.propTypes = {
    isDrawerOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default AppContainer;
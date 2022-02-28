import React from 'react';
import './Layout.css';

const Layout = ({children}) => (
    <div className='wrapper'>
        {children}
    </div>
);

export default Layout;


import React from 'react';
import './header.css'
import HorizontalDivider from '../HorizontalDivider';

function Header({title, button}) {
    return (
        <div className='panelHeader'>
            <div className='panelTitle'>
                <h1>{title}</h1>    
                <div className='panelButtons'>
                    {button}    
                </div>
            </div>
            <HorizontalDivider/>
        </div>
    )
}

export default Header
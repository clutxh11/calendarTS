import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'

import './Labels.css'

export default function Labels() {
    const { labels, updateLabel } = useContext(GlobalContext)

    return (
        <React.Fragment>
            <p className="labels-text">Label</p>
            {labels.map(({label: lbl, checked}, idx) => (
                <label key={idx} className='labels-label'>
                    <input type='checkbox' checked={checked} onChange={() => updateLabel({label: lbl, checked: !checked})} className='labels-input' style={{backgroundColor: `${lbl}`, opacity: 0.4}}/>
                    <span className="labels-label-text">{lbl}</span>
                </label>
            ))}
        </React.Fragment>
    )
}

import React, { useContext } from 'react'

import plusImg from '../../assets/plus.svg';
import GlobalContext from '../../context/GlobalContext';

import './CreateEventButton.css'

export default function CreateEventButton() {
    const { setShowEventModal } = useContext(GlobalContext)

    return (
        <button onClick={() => setShowEventModal(true)} className='create-event-button'>
            <img src={plusImg} alt="create_event" className='create-event-button-image'/>
            <span className='create-event-button-text'> Create</span>
        </button>
    )
}

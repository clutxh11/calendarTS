import dayjs from 'dayjs'
import React, { useContext, useState } from 'react'
import GlobalContext from '../../context/GlobalContext'

import './EventModal.css'

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"]

export default function EventModal() {
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } = useContext(GlobalContext)

    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '')
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '')
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0])

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected?.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        };
        if(selectedEvent) {
            dispatchCalEvent({type: 'update', payload: calendarEvent })
        } else {
            dispatchCalEvent({type: 'push', payload: calendarEvent })
        }
        setShowEventModal(false)
    }

    return (
        <div className='event-modal-container'>
            <form className='event-modal-form'>
                <header className="event-modal-header">
                    <span className="event-modal-icons">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span onClick={() => {dispatchCalEvent({type: 'delete', payload: selectedEvent}); setShowEventModal(false)}} className="event-modal-icons">
                                delete
                            </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span className="event-modal-icons">
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className="event-modal-body-container-container">
                    <div className="event-modal-body-container">
                        <div></div>
                        <input type='text' name='title' placeholder='Add title' value={title} required onChange={(e) => setTitle(e.target.value)} className='event-modal-body-input'/>
                        <span className="event-modal-icons">
                            schedule
                        </span>
                        <p>{daySelected?.format('dddd, MMMM DD')}</p>
                        <span className="event-modal-icons">
                            segment
                        </span>
                        <input type='text' name='description' placeholder='Add description' value={description} required onChange={(e) => setDescription(e.target.value)} className='event-modal-body-input'/>
                        <span className="event-modal-icons">
                            bookmark_border
                        </span>
                        <div className="event-modal-body-colors-container">
                            {labelsClasses.map((lblClass, i) => (
                                <span key={i} onClick={() => setSelectedLabel(lblClass)} className='event-modal-body-color-span' style={{ backgroundColor: lblClass, opacity: 0.6}}>
                                    {selectedLabel === lblClass && (<span className="event-modal-body-color-icon">
                                        check
                                    </span>)}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="event-modal-footer-container">
                    <button type='submit' onClick={handleSubmit} className='event-modal-footer-button'>
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )
}
import React, { useContext, useEffect, useState } from 'react'
import { eventType } from '../../type';

import dayjs from 'dayjs'
import GlobalContext from '../../context/GlobalContext';

import './Day.css'

export default function Day({day, rowIdx} : {day: dayjs.Dayjs, rowIdx: number}) {
    const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalContext)
    const [dayEvents, setDayEvents] = useState<eventType[]>([])

    useEffect(() => {
        const events = filteredEvents.filter(evt => dayjs(evt.day).format('DD--MM-YY') === day.format('DD--MM-YY'))
        setDayEvents(events)
    }, [filteredEvents, day])

    function getCurrentDayClass() {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'day-current-day-number' : '';
    }

    return (
        <div className='day-day-container'>
            <header className='day-day-header'>
                {rowIdx === 0 && (
                    <p className='day-day-header-first-row-text'>{day.format('ddd').toUpperCase()}</p>
                    )}
                <p className={`day-day-number ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div className="day-event-container" onClick={() => {
                setDaySelected(day)
                setShowEventModal(true)
            }}>
                {dayEvents.map((evt, idx) => (
                    <div key={idx} onClick={() => setSelectedEvent(evt)} className='day-event' style={{backgroundColor: `${evt?.label}`, opacity: 0.4, color: 'rgba(234, 240, 246, 0.8)'}}> 
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

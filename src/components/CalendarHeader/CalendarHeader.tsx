import React, { useContext } from 'react'

import dayjs from 'dayjs'

import logo from '../../assets/logo.png'
import GlobalContext from '../../context/GlobalContext'

import './CalendarHeader.css'

export default function CalendarHeader() {
    const {monthIndex, setMonthIndex} = useContext(GlobalContext)

    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1)
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1)
    }
    function handleReset() {
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month())
    }

    return (
        <header className='calendar-header-container'>
            <img src={logo} alt='calendar' className='calendar-header-image' />
            <h1 className='calendar-header-title'> Calendar </h1>
            <button onClick={handleReset} className="calendar-header-today-button">
                Today
            </button>
            <button onClick={handlePrevMonth}>
                <span className='calendar-header-nav-icons'>
                    chevron_left
                </span>
            </button>
            <button onClick={handleNextMonth}>
                <span className='calendar-header-nav-icons'>
                    chevron_right
                </span>
            </button>
            <h2 className='calendar-header-date'>
                {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
            </h2>
        </header>
    )
}
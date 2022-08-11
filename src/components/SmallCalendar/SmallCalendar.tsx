import React, { useContext, useEffect, useState } from 'react'

import dayjs from 'dayjs'

import { getMonth } from '../../util'
import GlobalContext from '../../context/GlobalContext'

import './SmallCalendar.css'

export default function SmallCalendar() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx))
    }, [currentMonthIdx])

    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useContext(GlobalContext)

    useEffect(() => {
        setCurrentMonthIdx(monthIndex)
    }, [monthIndex])

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1)
    }
    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1)
    }

    function getDayClass(day: dayjs.Dayjs) {
        const format = 'DD-MM-YY'
        const nowDay = dayjs().format(format)
        const currDay = day.format(format)
        const slcDay = daySelected && daySelected.format(format)
        if(nowDay === currDay) {
            return 'small-calendar-body-current-day'
        }else if (currDay === slcDay) {
            return 'small-calendar-body-selected-day'
        }else {
            return ''
        }
    }

    return (
        <div className='small-calendar-container'>
            <header className="small-calendar-header">
                <p className="small-calendar-header-date">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
                </p>
                <div>
                    <button onClick={handlePrevMonth}>
                        <span className="small-calendar-header-icons">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextMonth}>
                        <span className="small-calendar-header-icons">
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className="small-calendar-body-container">
                {currentMonth[0].map((day, i) => (
                    <span key={i} className='small-calendar-body-first-row-span'>
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button 
                            onClick={() => {
                                setSmallCalendarMonth(currentMonthIdx)
                                setDaySelected(day)
                            }} 
                            key={idx} className={`small-calendar-body-button ${getDayClass(day)}`}>
                                <span className='small-calendar-body-button-span'>
                                    {day.format('D')}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

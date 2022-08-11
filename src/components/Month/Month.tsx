import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import Day from '../Day/Day'

import './Month.css'

export default function Month({month}:{month: dayjs.Dayjs[][]}) {
  return (
    <div className='month-container'>
        {month.map((row, i) => (
            <React.Fragment key={i}>
                {row.map((day, idx) => (
                    <Day day={day} key={idx} rowIdx={i} />
                ))}
            </React.Fragment>
        ))}
    </div>
  )
}

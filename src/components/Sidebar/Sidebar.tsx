import React from 'react'

import CreateEventButton from '../CreateEventButton/CreateEventButton'
import SmallCalendar from '../SmallCalendar/SmallCalendar'
import Labels from '../Labels/Labels'

import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className='side-bar-container'>
        <CreateEventButton />
        <SmallCalendar />
        <Labels />
    </aside>
  )
}

import React, { useState, useContext, useEffect } from 'react';

import { getMonth } from './util'
import CalendarHeader from './components/CalendarHeader/CalendarHeader';
import Sidebar from './components/Sidebar/Sidebar';
import Month from './components/Month/Month';
import GlobalContext from './context/GlobalContext';
import EventModal from './components/EventModal/EventModal';

import './App.css';

function App() {
  const [currentMonthCount, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalContext)

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  } , [monthIndex])
  
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className='app-container'>
        <CalendarHeader />
          <div className='app-contents-container'>
            <Sidebar />
            <Month month={currentMonthCount} />
          </div>
      </div>
    </React.Fragment>
  );
}

export default App;

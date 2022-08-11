import React from "react";
import { GlobalContextType, eventType, labelType } from "../type";

const GlobalContext = React.createContext<GlobalContextType>({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({type, payload}) => [],
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: (event: eventType | null) => {},
    setLabels: () => {},
    labels: [],
    updateLabel: (label: labelType) => {},
    filteredEvents: [],
})

export default GlobalContext
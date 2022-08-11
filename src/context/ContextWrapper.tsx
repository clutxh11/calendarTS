import React, { useEffect, useMemo, useReducer, useState } from 'react'

import { eventType, labelType } from "../type";

import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

type ContextWrapperProps = {
    children: React.ReactNode
}

function savedEventsReducer(state: eventType[], {type, payload}: {type: string, payload: eventType}) {
    switch (type) {
        case 'push':
            return [...state, payload];
        case 'update':
            return state.map(evt => evt.id === payload.id ? payload : evt )
        case 'delete':
            return state.filter(evt => evt.id !== payload.id )
        default:
            throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents')
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
    return parsedEvents
}

export default function ContextWrapper({children}: ContextWrapperProps) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState<number | null>(null)
    const [daySelected, setDaySelected] = useState<dayjs.Dayjs | null>(dayjs())
    const [selectedEvent, setSelectedEvent] = useState<eventType | null>(null);
    const [showEventModal, setShowEventModal] = useState(false)
    const [labels, setLabels] = useState<labelType[]>([])
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents)

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) =>
            labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label)
            );
    }, [savedEvents, labels]);

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect (() => {
        let tempLabel: labelType[] = []
        const tempLabelFn = () => {
            const tempSet = new Set( savedEvents.map(evt => evt.label))
            return tempLabel = Array.from(tempSet).map(label => {
                const currentLabel = labels.find(lbl => lbl.label === label)
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true
                } as labelType
            })
        }
        console.log(tempLabel)
        setLabels(tempLabel)
    }, [savedEvents])

    useEffect(() => {
        if(smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth])

    useEffect(() => {
        if(!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal])

    function updateLabel(label: labelType) {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }

    return (
        <GlobalContext.Provider value={{ monthIndex, setMonthIndex, smallCalendarMonth, setSmallCalendarMonth, daySelected, setDaySelected, showEventModal, setShowEventModal, dispatchCalEvent, selectedEvent, setSelectedEvent, savedEvents, setLabels, labels, updateLabel, filteredEvents }}>
            {children}
        </GlobalContext.Provider>
    )
}

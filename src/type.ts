import dayjs from "dayjs";

export type eventType = {
    title: string;
    description: string;
    label: string;
    day: string;
    id: string
}

export type labelType = {
    label: string;
    checked: boolean;
}

export type GlobalContextType = {
    monthIndex: number;
    setMonthIndex: React.Dispatch<React.SetStateAction<number>>;
    smallCalendarMonth: number | null;
    setSmallCalendarMonth: React.Dispatch<React.SetStateAction<number | null>>;
    daySelected: dayjs.Dayjs | null;
    setDaySelected: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
    showEventModal: boolean;
    setShowEventModal: React.Dispatch<React.SetStateAction<boolean>>;
    dispatchCalEvent: React.Dispatch<{
        type: any;
        payload: any;
    }>;
    savedEvents: any;
    selectedEvent: eventType | null;
    setSelectedEvent: (newSelectedEvent: eventType | null) => void;
    setLabels: React.Dispatch<React.SetStateAction<labelType[]>>;
    labels: labelType[];
    updateLabel: (label: labelType) => void;
    filteredEvents: eventType[];
}
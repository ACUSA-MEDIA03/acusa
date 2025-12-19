export interface EventsItem{
    date: number;
    suffix: string;
    month: string;
    year: number;
    time: string;
    location: string;
    eventTitle: string;
}
 const Events: EventsItem[] =  [
    {
        date: 9,
        suffix: 'th',
        month: 'May',
        year: 2025,
        time: "1:00pm",
        location: 'Crowther Hall',
        eventTitle: "R.A.W Praise"
    },
    {
        date: 23,
        suffix: 'rd',
        month: 'Feb',
        year: 2025,
        time: "10:00pm",
        location: 'St. Andrew',
        eventTitle: "Hutz Price Awards"
    },
    {
        date: 21,
        suffix: 'st',
        month: 'Jan',
        year: 2025,
        time: "10:00am",
        location: 'Welcome Center',
        eventTitle: "Academic Seminar 2025"
    },
];

export { Events };



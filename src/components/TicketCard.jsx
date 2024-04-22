import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketCard = ({ segment, page, searchTerm }) => {
    const [events, setEvents] = useState([]);
    const currentDate = new Date().toISOString(); // Gets today's date in ISO format

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(
                    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=BNm90F6Xf6JRXhQOGxbZpg0ArnDTp5BP&segmentName=${encodeURIComponent(segment)}&keyword=${encodeURIComponent(searchTerm)}&page=${page}`
                );
                setEvents(result.data._embedded?.events || []);
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents([]);
            }
        };

        fetchData();
    }, [segment, page, searchTerm]);


    const formatDate = (dateStr) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    // Event handler for setting a reminder
    const handleSetReminder = (eventUrl) => {
        const email = prompt("Enter your email to set a reminder:");
        if (email) {
            localStorage.setItem(`reminder_${eventUrl}`, email);
            alert('Reminder set successfully!');
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {events.length > 0 ? events.map((event) => (
                    <div key={event.id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={event.images[0].url} alt={event.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{event.name}</h5>
                                <p className="card-text">
                                    {event.dates && event.dates.start && event.dates.start.dateTime ? formatDate(event.dates.start.dateTime) : 'No time available'}
                                </p>
                                {event._embedded && event._embedded.venues && (
                                    <>
                                        <p className="card-text">{event._embedded.venues[0].name}</p>
                                        <p className="card-text">{event._embedded?.venues[0]?.city?.name || 'Unknown City'}, {event._embedded?.venues[0]?.state?.stateCode || 'Unknown State'}</p>
                                    </>
                                )}
                                {event.sales && (
                                    <>
                                        <p className="card-text">Presale: {event.sales.presales ? event.sales.presales[0].startDateTime : 'N/A'}</p>
                                        <p className="card-text">On Sale: {event.sales.public.startDateTime}</p>
                                    </>
                                )}
                                {new Date(event.sales.public.startDateTime) > new Date(currentDate) ? (
                                    <button onClick={() => handleSetReminder(event.url)} className="btn btn-primary">
                                        Set a Reminder
                                    </button>
                                ) : (
                                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        Buy Tickets
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="empty-state">No matching events found.</div>
                )}
            </div>
        </div>
    );
};

export default TicketCard;
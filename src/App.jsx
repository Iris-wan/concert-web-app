import React, { useState } from 'react';
import TicketCard from './components/TicketCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

const App = () => {
    const [segment, setSegment] = useState('Music');  // Default segment is 'Music'\
    const [page, setPage] = useState(0);  // Pagination page state
    const [searchTerm, setSearchTerm] = useState('');

    // Handler for changing the event segment
    const handleChangeSegment = (e) => {
        setSegment(e.target.value);
        setPage(0); // Reset to the first page when the segment changes
    };

    // Update the search term as user types in the search bar
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Ticket Information</h1>
                <br/>
                <div className="d-flex justify-content-start">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="form-control"
                    />
                    <select onChange={handleChangeSegment} className="custom-select">
                        <option value="Music">Concerts</option>
                        <option value="Sports">Sports</option>
                        <option value="Arts & Theatre">Arts & Theatre</option>
                    </select>
                </div>
            </header>
            <br/>
            <div className="d-flex justify-content-end mb-3">
                {/* Navigation buttons for pagination */}
                <button 
                    onClick={() => setPage(prev => Math.max(0, prev - 1))} 
                    disabled={page === 0} 
                    className="btn rounded-circle"
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>
                <button 
                    onClick={() => setPage(prev => prev + 1)}
                    className="btn rounded-circle"
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
            {/* TicketCard component renders the events */}
            <TicketCard segment={segment} page={page} searchTerm={searchTerm} />
            <div className="d-flex justify-content-end mb-3">
                <button 
                    onClick={() => setPage(prev => Math.max(0, prev - 1))} 
                    disabled={page === 0} 
                    className="btn rounded-circle"
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <i className="bi bi-chevron-left"></i>
                {/* Add another set of navigation buttons for pagination at the bottom of the page */}
                </button>
                <button 
                    onClick={() => setPage(prev => prev + 1)}
                    className="btn rounded-circle"
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}

export default App;
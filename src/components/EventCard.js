import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './EventCard.css';

const EventCard = ({ title, date, location, description, image, onClick }) => {
    return (
        <div className="event-card" onClick={onClick}>
            <div className="event-image" style={{ backgroundImage: `url(${image})` }}>
                <div className="event-overlay"></div>
            </div>
            <div className="event-content">
                <div className="event-date">
                    <FaCalendarAlt /> {date}
                </div>
                <h3 className="event-title">{title}</h3>
                <div className="event-location">
                    <FaMapMarkerAlt /> {location}
                </div>
                <p className="event-description">{description}</p>
                <button className="btn btn-outline btn-sm">View Details</button>
            </div>
        </div>
    );
};

export default EventCard;

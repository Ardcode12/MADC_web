import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './TeamCard.css';

const TeamCard = ({ name, role, image, linkedin, github, email, delay }) => {
    return (
        <div className="team-card" data-aos="zoom-in" data-aos-delay={delay}>
            <div className="team-img-wrapper">
                <img src={image} alt={name} className="team-img" />
                <div className="team-socials">
                    <a href={linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    <a href={github} target="_blank" rel="noreferrer"><FaGithub /></a>
                    <a href={`mailto:${email}`}><FaEnvelope /></a>
                </div>
            </div>
            <div className="team-info">
                <h3>{name}</h3>
                <p>{role}</p>
            </div>
        </div>
    );
};

export default TeamCard;

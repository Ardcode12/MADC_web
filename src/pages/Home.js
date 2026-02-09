import React, { useEffect, useState, useRef } from 'react';
import Hero from '../components/Hero';
import ScrollFrames from '../components/ScrollFrames';
import EventCard from '../components/EventCard';
// TeamCard imported but used differently in this design
import ContactForm from '../components/ContactForm';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaRocket, FaLightbulb, FaUsers, FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaGraduationCap, FaCode, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    // eslint-disable-next-line no-unused-vars
    const [countersVisible, setCountersVisible] = useState(false);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
    const statsRef = useRef(null);
    const memberCarouselRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
            easing: 'ease-out',
            offset: 50,
            disable: 'mobile', // Disable on mobile for better performance
            throttleDelay: 99, // Reduce CPU usage
            debounceDelay: 50
        });

        // Intersection Observer for stats counter
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setCountersVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Conducted events data
    const conductedEvents = [
        {
            id: 1,
            title: "GEN-AI WORKSHOP",
            date: "Dec 26, 2025",
            location: "Kongu Engineering College",
            description: "An Intra College Workshop fostering innovation, learning, and collaboration in Generative AI.",
            fullDescription: "We are pleased to invite you to GenAI Workshop that fosters innovation, learning, and collaboration. Join us as we create a platform for students to showcase their skills and creativity. This workshop is part of MADATHON 2K25, organized by the Mobile Application Development Club.",
            attendees: 0,
            highlights: ["Generative AI Fundamentals", "Hands-on AI Projects", "Innovation & Collaboration"],
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
            isUpcoming: true
        },
        {
            id: 2,
            title: "MADATHON 2K25",
            date: "Dec 26, 2025",
            location: "Kongu Engineering College",
            description: "Annual flagship event by Mobile Application Development Club featuring workshops and competitions.",
            fullDescription: "MADATHON 2K25 is the flagship annual event of the Mobile Application Development Club at Kongu Engineering College. Join us for an exciting day of workshops, competitions, and networking with fellow developers and industry experts.",
            attendees: 0,
            highlights: ["App Development Contest", "Tech Workshops", "Industry Networking"],
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
            isUpcoming: true
        },
        {
            id: 3,
            title: "App Dev Workshop 101",
            date: "Oct 15, 2024",
            location: "Lab 305, Tech Block",
            description: "Learn the basics of mobile app development with React Native. Perfect for beginners!",
            fullDescription: "This introductory workshop covered the fundamentals of React Native development. Over 50 students participated and built their first mobile app. Topics included component architecture, state management, and navigation basics.",
            attendees: 52,
            highlights: ["Built first mobile app", "Learned React Native basics", "Hands-on coding session"],
            image: "https://images.unsplash.com/photo-1549692520-4f5144b6b158?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 4,
            title: "Hackathon 2024",
            date: "Nov 20-22, 2024",
            location: "Main Auditorium",
            description: "48-hour coding marathon. Build amazing apps, win prizes, and network with industry experts.",
            fullDescription: "Our flagship hackathon brought together 200+ developers for an intense 48-hour coding marathon. Teams built innovative solutions for real-world problems, with top prizes sponsored by leading tech companies.",
            attendees: 215,
            highlights: ["48-hour non-stop coding", "₹50,000 prize pool", "10 industry mentors"],
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 5,
            title: "Guest Lecture: UI/UX",
            date: "Dec 05, 2024",
            location: "Seminar Hall A",
            description: "Expert session on modern UI/UX trends by Senior Designer from Google.",
            fullDescription: "A captivating session by a Senior UX Designer from Google, covering the latest trends in mobile UI/UX design. Students learned about design thinking, user research, and creating intuitive interfaces.",
            attendees: 120,
            highlights: ["Google designer session", "Design thinking workshop", "Portfolio review"],
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 6,
            title: "Flutter Bootcamp",
            date: "Jan 10-12, 2025",
            location: "Computer Lab 2",
            description: "Intensive 3-day Flutter bootcamp for cross-platform app development.",
            fullDescription: "An immersive 3-day bootcamp where participants mastered Flutter from scratch. By the end, each participant had built a fully functional cross-platform app with Firebase integration.",
            attendees: 45,
            highlights: ["3-day intensive training", "Firebase integration", "Built complete app"],
            image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 7,
            title: "Industry Connect",
            date: "Jan 25, 2025",
            location: "Conference Hall",
            description: "Networking event with tech industry professionals and placement opportunities.",
            fullDescription: "An exclusive networking event connecting students with HR managers and tech leads from top companies. Many students received pre-placement offers and internship opportunities.",
            attendees: 180,
            highlights: ["5 companies participated", "15 PPOs offered", "Resume building workshop"],
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000"
        }
    ];

    // Auto-slide carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentEventIndex((prev) => (prev + 1) % conductedEvents.length);
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval);
    }, [conductedEvents.length]);

    // eslint-disable-next-line no-unused-vars
    const stats = [
        { value: 500, suffix: '+', label: 'Active Members', icon: <FaUsers /> },
        { value: 50, suffix: '+', label: 'Workshops', icon: <FaCode /> },
        { value: 20, suffix: '+', label: 'Apps Launched', icon: <FaRocket /> },
        { value: 15, suffix: '+', label: 'Industry Partners', icon: <FaTrophy /> }
    ];

    // Patrons
    const patrons = [
        {
            name: "Thiru.E.R.K.Krishnan",
            role: "Chief Patron",
            designation: "Correspondent",
            qualification: "M.Com",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "Dr.R.Parameshwaran",
            role: "Patron",
            designation: "Principal",
            qualification: "M.E., Ph.D.",
            image: "/images/imgi_4_Parameshwaran.jpg"
        },
        {
            name: "Dr.S.Anandamurugan",
            role: "President",
            designation: "HOD / IT",
            qualification: "M.E., Ph.D.",
            image: "/images/imgi_5_anandamurugan.jpg"
        }
    ];

    // Staff Coordinators
    const staffCoordinators = [
        {
            name: "Mr.A.P.Ponselvakumar",
            role: "Staff Coordinator",
            department: "Assistant Professor (SLG)",
            image: "/images/imgi_6_ponselvakumar.jpg",
            linkedin: "#", email: "ponselvakumar@kec.edu"
        },
        {
            name: "Mrs.P.Vanitha",
            role: "Staff Coordinator",
            department: "Assistant Professor, IT",
            image: "/images/imgi_25_Ms.P.Vanitha.62230c2f9a73dd7eb411.jpg",
            linkedin: "#", email: "vanitha@kec.edu"
        }
    ];

    // Office Bearers
    const officeBearers = [
        {
            name: "Ms.M.Madhuvarshini",
            role: "Secretary",
            department: "IV - CSE",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
            linkedin: "#", github: "#", email: "madhuvarshini@madc.club"
        },
        {
            name: "Mr.S.Mukil",
            role: "Joint Secretary",
            department: "IV – IT",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
            linkedin: "#", github: "#", email: "mukil@madc.club"
        },
        {
            name: "Mr.N.Harish Kannan",
            role: "Joint Secretary",
            department: "III - CSE",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
            linkedin: "#", github: "#", email: "harishkannan@madc.club"
        },
        {
            name: "Mr.R.Naveenkumar",
            role: "Treasurer",
            department: "IV – IT",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
            linkedin: "#", github: "#", email: "naveenkumar@madc.club"
        }
    ];

    // Team Members

    // Executive Members
    const teamMembers = [
        // Additional Secretaries
        { name: "Ms.Harshitha Kannan", role: "Additional Secretary", department: "IV - CSE", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.P.Yaswanth", role: "Additional Secretary", department: "IV - IT", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.C.Subaharini", role: "Additional Secretary", department: "III - CSE", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        // Joint Treasurers
        { name: "Ms.E.Swathi", role: "Joint Treasurer", department: "IV - CSE", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.G.Soorya", role: "Joint Treasurer", department: "III - AIDS", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        // Additional Treasurers
        { name: "Mr.S.Mohaideen Abdul Kathar", role: "Additional Treasurer", department: "III - CSD", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.K.Eniya", role: "Additional Treasurer", department: "III - EIE", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.B.Tawfeek", role: "Additional Treasurer", department: "III - AIDS", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        // Executive Members
        { name: "Mr.V.Janarthikan", role: "Executive Member", department: "IV - CSE", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.B.Aruna devi", role: "Executive Member", department: "IV - CSE", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.V.Kishore", role: "Executive Member", department: "IV - CSE", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.V.Naveenkumar", role: "Executive Member", department: "III - IT", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.J.Boobalan", role: "Executive Member", department: "III - AIML", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.V.Mahashwin", role: "Executive Member", department: "IV - CSE", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.M.Jayaraj", role: "Executive Member", department: "III - CSE", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.R.Sahana", role: "Executive Member", department: "III - CSD", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.M.Aniruddha Pranav", role: "Executive Member", department: "III - EIE", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.R.Malini", role: "Executive Member", department: "III - IT", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.P.Saravana", role: "Executive Member", department: "III - AIML", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.R.Rithish", role: "Executive Member", department: "III - CSE", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.S.Charuleela", role: "Executive Member", department: "III - IT", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.M.Kavin", role: "Executive Member", department: "III - EIE", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.K.Rathidevi", role: "Executive Member", department: "III - CSE", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.R.S.Navaneethan", role: "Executive Member", department: "II - IT", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.P.TharaniPrakash", role: "Executive Member", department: "III - IT", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.S.Dharshini", role: "Executive Member", department: "III - CSE", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.Lakshitha", role: "Executive Member", department: "II - IT", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.P.Oviya", role: "Executive Member", department: "III - CSE", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.M.Avantika", role: "Executive Member", department: "III - AI", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.S.Bhavatharun", role: "Executive Member", department: "III - CSD", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.V.Harish sri Ragunath", role: "Executive Member", department: "III - CSE", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.A.V.Deepthi", role: "Executive Member", department: "III - EIE", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.G.M.Arulventhan", role: "Executive Member", department: "III - EIE", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.M.Kaarunya", role: "Executive Member", department: "CT/PG", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.V.Kiruthiga", role: "Executive Member", department: "II - IT", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.D.Vaishnavi", role: "Executive Member", department: "II - CSE", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.S.Mukesh Sai", role: "Executive Member", department: "II - IT", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.S.V.Iniyasri", role: "Executive Member", department: "II - AI", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.P.T.Kiruthik", role: "Executive Member", department: "III - AI", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.N.S.Kuzhali", role: "Executive Member", department: "II – IT", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.G.Niranjan", role: "Executive Member", department: "II – IT", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Ms.V.Nakshathra", role: "Executive Member", department: "II – IT", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.K.Navin", role: "Executive Member", department: "II – IT", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" },
        { name: "Mr.M.Navin", role: "Executive Member", department: "II – IT", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", linkedin: "#", github: "#" }
    ];

    // Auto-scroll member carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMemberIndex(prev => (prev + 1) % Math.max(1, teamMembers.length - 3));
        }, 4000);
        return () => clearInterval(interval);
    }, [teamMembers.length]);

    const galleryImages = [
        { id: 1, src: "/images/galary/WhatsApp Image 2026-02-07 at 8.17.25 PM.jpeg", title: "MADC Event" },
        { id: 2, src: "/images/galary/WhatsApp Image 2026-02-07 at 8.17.26 PM.jpeg", title: "Workshop Session" },
        { id: 3, src: "/images/galary/WhatsApp Image 2026-02-07 at 8.17.27 PM.jpeg", title: "Team Activity" },
        { id: 4, src: "/images/galary/WhatsApp Image 2026-02-07 at 8.18.07 PM.jpeg", title: "Club Gathering" },
        { id: 5, src: "/images/galary/WhatsApp Image 2026-02-07 at 8.18.34 PM.jpeg", title: "Tech Event" },
        { id: 6, src: "/images/galary/WhatsApp Image 2026-02-09 at 8.45.59 AM.jpeg", title: "Latest Moment" }
    ];

    const contactInfo = [
        { icon: <FaMapMarkerAlt />, title: 'Address', content: ['Computer Science Block,', 'University College of Engineering'] },
        { icon: <FaEnvelope />, title: 'Email', content: ['madc.club@university.edu'] },
        { icon: <FaPhone />, title: 'Phone', content: ['+1 (555) 123-4567'] }
    ];

    return (
        <>
            <Hero />
            <ScrollFrames />

            {/* ============ ABOUT SECTION - BENTO GRID ============ */}
            <section id="about" className="about-bento-section">
                {/* Animated Background */}
                <div className="about-animated-bg">
                    <div className="glow-orb orb-1"></div>
                    <div className="glow-orb orb-2"></div>
                    <div className="glow-orb orb-3"></div>
                    <div className="grid-lines"></div>
                </div>

                <div className="container">
                    {/* Animated Header */}
                    <div className="about-bento-header" data-aos="fade-up">
                        <div className="header-line-left"></div>
                        <div className="header-content">
                            <span className="header-tag">DISCOVER</span>
                            <h2>About <span className="text-gold">MADC</span></h2>
                        </div>
                        <div className="header-line-right"></div>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="bento-grid">
                        {/* Large Welcome Card */}
                        <div className="bento-card bento-large welcome-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="card-glow-effect"></div>
                            <div className="welcome-content">
                                <div className="welcome-icon-container">
                                    <div className="icon-ring ring-1"></div>
                                    <div className="icon-ring ring-2"></div>
                                    <div className="icon-ring ring-3"></div>
                                    <div className="welcome-icon">
                                        <FaRocket />
                                    </div>
                                </div>
                                <div className="welcome-text">
                                    <h3>Welcome to the Future</h3>
                                    <p>
                                        The Mobile App Development Club is a community of passionate developers,
                                        designers, and innovators. We bridge the gap between academic learning
                                        and industry standards.
                                    </p>
                                </div>
                            </div>
                            <div className="tech-badges">
                                <span className="tech-badge animate-pulse-badge" style={{ '--delay': '0s' }}>
                                    <span className="badge-dot"></span>React Native
                                </span>
                                <span className="tech-badge animate-pulse-badge" style={{ '--delay': '0.2s' }}>
                                    <span className="badge-dot"></span>Flutter
                                </span>
                                <span className="tech-badge animate-pulse-badge" style={{ '--delay': '0.4s' }}>
                                    <span className="badge-dot"></span>Swift
                                </span>
                                <span className="tech-badge animate-pulse-badge" style={{ '--delay': '0.6s' }}>
                                    <span className="badge-dot"></span>Kotlin
                                </span>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="bento-card bento-medium mission-bento" data-aos="fade-right" data-aos-delay="200">
                            <div className="card-corner-accent"></div>
                            <div className="bento-icon mission-icon-bento">
                                <FaRocket />
                                <div className="icon-particles">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <h4>Our Mission</h4>
                            <p>Empowering students with cutting-edge mobile development skills through innovation and collaboration.</p>
                            <div className="card-number">01</div>
                        </div>

                        {/* Vision Card */}
                        <div className="bento-card bento-medium vision-bento" data-aos="fade-left" data-aos-delay="300">
                            <div className="card-corner-accent vision-accent"></div>
                            <div className="bento-icon vision-icon-bento">
                                <FaLightbulb />
                                <div className="icon-particles">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <h4>Our Vision</h4>
                            <p>Leading the student tech community, producing industry-ready developers shaping mobile technology's future.</p>
                            <div className="card-number">02</div>
                        </div>



                        {/* Value Cards Row */}
                        <div className="bento-card bento-small value-card-bento" data-aos="zoom-in" data-aos-delay="100">
                            <div className="value-icon-wrap">
                                <FaCode />
                            </div>
                            <h5>Innovation</h5>
                            <span className="value-tag">Core Value</span>
                        </div>
                        <div className="bento-card bento-small value-card-bento" data-aos="zoom-in" data-aos-delay="200">
                            <div className="value-icon-wrap">
                                <FaUsers />
                            </div>
                            <h5>Community</h5>
                            <span className="value-tag">Core Value</span>
                        </div>
                        <div className="bento-card bento-small value-card-bento" data-aos="zoom-in" data-aos-delay="300">
                            <div className="value-icon-wrap">
                                <FaGraduationCap />
                            </div>
                            <h5>Excellence</h5>
                            <span className="value-tag">Core Value</span>
                        </div>
                        <div className="bento-card bento-small value-card-bento" data-aos="zoom-in" data-aos-delay="400">
                            <div className="value-icon-wrap">
                                <FaTrophy />
                            </div>
                            <h5>Impact</h5>
                            <span className="value-tag">Core Value</span>
                        </div>
                    </div>

                    {/* Marquee Tech Strip */}
                    <div className="tech-marquee" data-aos="fade-up" data-aos-delay="500">
                        <div className="marquee-track">
                            <span>📱 Mobile Development</span>
                            <span>⚡ Fast Prototyping</span>
                            <span>🎨 UI/UX Design</span>
                            <span>🔥 Cross Platform</span>
                            <span>💡 Innovation Hub</span>
                            <span>🚀 App Launches</span>
                            <span>📱 Mobile Development</span>
                            <span>⚡ Fast Prototyping</span>
                            <span>🎨 UI/UX Design</span>
                            <span>🔥 Cross Platform</span>
                        </div>
                    </div>
                </div>
            </section>



            {/* ============ EVENTS SECTION ============ */}
            <section id="events" className="section events-section">
                <div className="container">
                    <h2 className="section-title" data-aos="fade-up">Conducted Events</h2>
                    <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                        Highlights from our past events and workshops
                    </p>

                    {/* 3D Carousel Container */}
                    <div className="events-carousel-3d" data-aos="fade-up" data-aos-delay="200">
                        <div className="carousel-wrapper">
                            {conductedEvents.map((event, index) => {
                                // Calculate position relative to current index
                                const totalEvents = conductedEvents.length;
                                let position = index - currentEventIndex;

                                // Handle wrap-around for infinite effect
                                if (position < -Math.floor(totalEvents / 2)) {
                                    position += totalEvents;
                                } else if (position > Math.floor(totalEvents / 2)) {
                                    position -= totalEvents;
                                }

                                // Only show cards in visible range (-1, 0, 1)
                                const isVisible = Math.abs(position) <= 1;

                                return (
                                    <div
                                        key={event.id}
                                        className={`carousel-card-3d ${position === 0 ? 'center' : ''} ${position === -1 ? 'left' : ''} ${position === 1 ? 'right' : ''}`}
                                        style={{
                                            opacity: isVisible ? 1 : 0,
                                            pointerEvents: isVisible ? 'auto' : 'none',
                                            transform: position === 0
                                                ? 'translateX(0) scale(1) rotateY(0deg)'
                                                : position === -1
                                                    ? 'translateX(-115%) scale(0.75) rotateY(12deg)'
                                                    : position === 1
                                                        ? 'translateX(115%) scale(0.75) rotateY(-12deg)'
                                                        : 'translateX(0) scale(0.5)',
                                            zIndex: position === 0 ? 10 : 5
                                        }}
                                        onClick={() => position === 0 && setSelectedEvent(event)}
                                    >
                                        <EventCard {...event} onClick={() => position === 0 && setSelectedEvent(event)} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            className="carousel-btn-3d carousel-prev-3d"
                            onClick={() => setCurrentEventIndex(prev =>
                                prev === 0 ? conductedEvents.length - 1 : prev - 1
                            )}
                        >
                            <span>‹</span>
                        </button>
                        <button
                            className="carousel-btn-3d carousel-next-3d"
                            onClick={() => setCurrentEventIndex(prev =>
                                prev === conductedEvents.length - 1 ? 0 : prev + 1
                            )}
                        >
                            <span>›</span>
                        </button>

                        {/* Carousel Indicators */}
                        <div className="carousel-indicators-3d">
                            {conductedEvents.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator-3d ${index === currentEventIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentEventIndex(index)}
                                >
                                    <span className="indicator-progress"></span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
                    <div className="event-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedEvent(null)}>×</button>
                        <div className="modal-image" style={{ backgroundImage: `url(${selectedEvent.image})` }}>
                            <div className="modal-image-overlay"></div>
                        </div>
                        <div className="modal-content">
                            <span className="modal-badge">Completed Event</span>
                            <h2>{selectedEvent.title}</h2>
                            <div className="modal-meta">
                                <span><FaCalendarAlt /> {selectedEvent.date}</span>
                                <span><FaMapMarkerAlt /> {selectedEvent.location}</span>
                                <span><FaUsers /> {selectedEvent.attendees} Attendees</span>
                            </div>
                            <p className="modal-description">{selectedEvent.fullDescription}</p>
                            <div className="modal-highlights">
                                <h4>Event Highlights</h4>
                                <ul>
                                    {selectedEvent.highlights.map((highlight, index) => (
                                        <li key={index}><FaTrophy /> {highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ============ TEAM SECTION ============ */}
            <section id="team" className="section team-section-new">
                <div className="team-bg-decoration">
                    <div className="team-glow team-glow-1"></div>
                    <div className="team-glow team-glow-2"></div>
                </div>
                <div className="container">
                    <div className="team-header" data-aos="fade-up">
                        <span className="team-badge">Meet The Team</span>
                        <h2 className="section-title">Our <span className="text-gold">Team</span></h2>
                        <p className="team-subtitle">The passionate individuals behind MADC's success</p>
                    </div>
                    {/* Patrons Row */}
                    <div className="team-category" data-aos="fade-up" data-aos-delay="50">
                        <h3 className="category-title"><span>Patrons</span></h3>
                        <div className="faculty-grid">
                            {patrons.map((patron, index) => (
                                <div key={index} className="faculty-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                                    <div className="faculty-image-wrapper">
                                        <img src={patron.image} alt={patron.name} />
                                    </div>
                                    <div className="faculty-info">
                                        <h4>{patron.name}</h4>
                                        <p className="faculty-role">{patron.role}</p>
                                        <span className="faculty-dept">{patron.designation}</span>
                                        <span className="faculty-dept" style={{ fontSize: '0.75rem', opacity: 0.8 }}>{patron.qualification}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Staff Coordinators Row */}
                    <div className="team-category" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="category-title"><span>Staff Coordinators</span></h3>
                        <div className="faculty-grid">
                            {staffCoordinators.map((coordinator, index) => (
                                <div key={index} className="faculty-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                                    <div className="faculty-image-wrapper">
                                        <img src={coordinator.image} alt={coordinator.name} />
                                        <div className="faculty-overlay">
                                            <a href={coordinator.linkedin} className="faculty-social"><FaLinkedin /></a>
                                            <a href={`mailto:${coordinator.email}`} className="faculty-social"><FaEnvelope /></a>
                                        </div>
                                    </div>
                                    <div className="faculty-info">
                                        <h4>{coordinator.name}</h4>
                                        <p className="faculty-role">{coordinator.role}</p>
                                        <span className="faculty-dept">{coordinator.department}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Office Bearers Row */}
                    <div className="team-category" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="category-title"><span>Office Bearers</span></h3>
                        <div className="bearers-grid">
                            {officeBearers.map((bearer, index) => (
                                <div key={index} className="bearer-card" data-aos="zoom-in" data-aos-delay={index * 50}>
                                    <div className="bearer-image-wrapper">
                                        <img src={bearer.image} alt={bearer.name} />
                                        <div className="bearer-overlay">
                                            <a href={bearer.linkedin} className="bearer-social"><FaLinkedin /></a>
                                            <a href={bearer.github} className="bearer-social"><FaGithub /></a>
                                            <a href={`mailto:${bearer.email}`} className="bearer-social"><FaEnvelope /></a>
                                        </div>
                                    </div>
                                    <div className="bearer-info">
                                        <h4>{bearer.name}</h4>
                                        <p className="bearer-role">{bearer.role}</p>
                                        <span className="bearer-dept">{bearer.department}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Executive Members Carousel */}
                    <div className="team-category" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="category-title"><span>Executive Members</span></h3>
                        <div className="members-carousel-advanced" ref={memberCarouselRef}>
                            <div className="members-track-advanced">
                                {teamMembers.map((member, index) => {
                                    const offset = index - currentMemberIndex;
                                    const isVisible = offset >= 0 && offset < 4;
                                    const isCenter = offset === 1 || offset === 2;

                                    return (
                                        <div
                                            key={index}
                                            className={`member-card-advanced ${isCenter ? 'center' : ''} ${isVisible ? 'visible' : ''}`}
                                            style={{
                                                transform: `translateX(${offset * 270}px) scale(${isCenter ? 1 : 0.9})`,
                                                opacity: isVisible ? (isCenter ? 1 : 0.6) : 0,
                                                zIndex: isCenter ? 10 : 5,
                                                filter: isCenter ? 'none' : 'brightness(0.7)'
                                            }}
                                        >
                                            <div className="member-image-advanced">
                                                <img src={member.image} alt={member.name} />
                                                <div className="member-glow"></div>
                                                <div className="member-overlay-advanced">
                                                    <div className="member-socials-advanced">
                                                        <a href={member.linkedin}><FaLinkedin /></a>
                                                        <a href={member.github}><FaGithub /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="member-info-advanced">
                                                <h4>{member.name}</h4>
                                                <p>{member.role}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Advanced Navigation */}
                            <button
                                className="member-nav-advanced member-prev-advanced"
                                onClick={() => setCurrentMemberIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentMemberIndex === 0}
                            >
                                <span>‹</span>
                            </button>
                            <button
                                className="member-nav-advanced member-next-advanced"
                                onClick={() => setCurrentMemberIndex(prev => Math.min(teamMembers.length - 4, prev + 1))}
                                disabled={currentMemberIndex >= teamMembers.length - 4}
                            >
                                <span>›</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ GALLERY SECTION - SHOWCASE ============ */}
            <section id="gallery" className="gallery-showcase">
                <div className="gallery-bg-pattern"></div>

                <div className="container">
                    <div className="gallery-header-showcase" data-aos="fade-up">
                        <span className="gallery-badge">Our Moments</span>
                        <h2 className="section-title">Photo <span className="text-gold">Gallery</span></h2>
                        <p className="gallery-subtitle">Capturing memories from our events and activities</p>
                    </div>
                </div>

                {/* Auto-scrolling Image Strip */}
                <div className="gallery-scroll-container">
                    <div className="gallery-scroll-track">
                        {[...galleryImages, ...galleryImages].map((image, index) => (
                            <div key={index} className="gallery-scroll-item">
                                <img src={image.src} alt={image.title} />
                                <div className="scroll-item-overlay">
                                    <span>{image.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Grid */}
                <div className="container">
                    <div className="gallery-featured-grid">
                        <div className="featured-main" data-aos="fade-right">
                            <img src={galleryImages[0]?.src} alt="Featured" />
                            <div className="featured-content">
                                <span className="featured-tag">Featured</span>
                                <h3>{galleryImages[0]?.title}</h3>
                            </div>
                        </div>
                        <div className="featured-side">
                            {galleryImages.slice(1, 5).map((image, index) => (
                                <div
                                    key={image.id}
                                    className="featured-item"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <img src={image.src} alt={image.title} />
                                    <div className="featured-item-overlay">
                                        <span>{image.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CONTACT SECTION - ENHANCED ============ */}
            <section id="contact" className="contact-section-new">
                <div className="contact-bg-decor">
                    <div className="contact-glow contact-glow-1"></div>
                    <div className="contact-glow contact-glow-2"></div>
                </div>

                <div className="container">
                    <div className="contact-header" data-aos="fade-up">
                        <span className="contact-badge">Reach Out</span>
                        <h2 className="section-title">Get In <span className="text-gold">Touch</span></h2>
                        <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>
                    </div>

                    <div className="contact-grid-new">
                        {/* Contact Info Cards */}
                        <div className="contact-info-side" data-aos="fade-right">
                            <div className="contact-cards">
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="contact-card"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        <div className="contact-card-icon">
                                            {info.icon}
                                        </div>
                                        <div className="contact-card-content">
                                            <h4>{info.title}</h4>
                                            {info.content.map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="contact-socials" data-aos="fade-up" data-aos-delay="300">
                                <h4>Follow Us</h4>
                                <div className="social-icons-row">
                                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-new"><FaInstagram /></a>
                                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-new"><FaTwitter /></a>
                                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-new"><FaLinkedin /></a>
                                    <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-new"><FaGithub /></a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-side" data-aos="fade-left">
                            <div className="contact-form-card">
                                <h3>Send a Message</h3>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

// CountUp component
// eslint-disable-next-line no-unused-vars
const CountUp = ({ end, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <>{count}</>;
};

export default Home;

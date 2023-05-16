import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import checkAuthentication from "../authentication/check-authentication";

const PageNotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const events = ['resize', 'load'];
        const visual = document.getElementById('visual');

        events.forEach((e) => {
            window.addEventListener(e, () => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                const ratio = 45 / (width / height);
                visual.style.transform = `translate(-50%, -50%) rotate(-${ratio}deg)`;
            });
        });
    }, []);

    return (
        <div className="page-not-found-body">
            <button onClick={() => { navigate("/") }} className="page-not-found-link">
                <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
                    <polyline fill="none" stroke="#555" strokeWidth="0.1" points="0.9,0.1 0.1,0.5 0.9,0.9" />
                </svg>
                Back Home
            </button>
            <div className="page-not-found-background-wrapper">
                <h1 id="visual" className="page-not-found-h1">404</h1>
            </div>
            <p className="page-not-found-text">You seems lost! <br /> Page not found.</p>
        </div>
    );
};

export default checkAuthentication(PageNotFound);


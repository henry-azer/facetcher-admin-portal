import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaCaretRight } from "react-icons/fa";

import Typography from "@mui/material/Typography";

const PageNotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Page Not Found | Henry Golden Cinema";
    });

    return (
        <section className="not-found-route">
            <div className="not-found-wrapper content-fit">
                <div className="heading-wrapper display-flex flex-row">
                    <FaCaretRight className="heading-icon" />
                    <Typography
                        className="heading-title"
                        variant="h4"
                        component="div"
                    >
                        Page Not Found
                    </Typography>
                </div>

                <div className="not-found-container display-flex">
                    <img
                        src="https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png.webp"
                        className="not-found-img"
                        alt="page-not-found"
                    />

                    <div className="not-found-text display-flex">
                        <Typography
                            className="heading-title"
                            variant="h4"
                            component="div"
                        >
                            Look like you're lost!
                        </Typography>

                        <Typography
                            className="heading-title"
                            variant="h7"
                            component="div"
                            gutterBottom
                        >
                            The page you are looking for is not available.
                        </Typography>
                    </div>

                    <button className="btn-1" onClick={() => navigate("/")}>
                        Back
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PageNotFound;
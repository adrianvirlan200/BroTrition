'use client'

import { useEffect } from "react";

const error = () => {
    useEffect(() => {
        window.location.href = "/posts/new";
    }, []);
    return <div>Redirecting...</div>;
}

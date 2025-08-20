import { useState, useEffect } from "react";

const useLogout = (timeout: any, warningTime: any, isLoginPage: any) => {
    const [showWarning, setShowWarning] = useState(false);
    const [countdown, setCountdown] = useState(warningTime / 1000);

    console.log({ timeout, warningTime, isLoginPage })
    useEffect(() => {
        if (isLoginPage) return; // Prevent timer from starting at all
        let timer: NodeJS.Timeout;
        let warningTimer: NodeJS.Timeout;
        let countdownTimer: NodeJS.Timeout;

        const resetTimer = () => {
            clearTimeout(timer);
            clearTimeout(warningTimer);
            clearInterval(countdownTimer);
            setShowWarning(false);
            setCountdown(warningTime / 1000);

            // Show warning 30 seconds before logout
            warningTimer = setTimeout(() => {
                setShowWarning(true);
                startCountdown();
            }, timeout - warningTime);

            // Logout when the countdown finishes
            timer = setTimeout(() => {
                localStorage.clear();
                window.location.reload();
            }, timeout);
        };

        const startCountdown = () => {
            countdownTimer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownTimer);
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        const events = ["mousemove", "keydown", "click", "scroll"];

        events.forEach((event) => window.addEventListener(event, resetTimer));

        resetTimer(); // Start timer on mount 

        return () => {
            clearTimeout(timer);
            clearTimeout(warningTimer);
            clearInterval(countdownTimer);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, [timeout, warningTime]);

    return { showWarning, countdown, setShowWarning };
};

export default useLogout;

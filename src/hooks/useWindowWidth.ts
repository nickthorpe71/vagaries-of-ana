import { useEffect, useState } from "react";

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState<number | undefined>(
        undefined
    );

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // Call the function initially to set the width

        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array means this useEffect runs once when component mounts

    return windowWidth;
}

export default useWindowWidth;

import useWindowWidth from "./useWindowWidth";

function useScreenSize(): ScreenSize {
    const windowWidth = useWindowWidth();

    if (windowWidth === undefined) {
        return "md"; // Default screen size (you can customize this)
    }

    if (windowWidth < 640) {
        return "xs";
    } else if (windowWidth < 768) {
        return "sm";
    } else if (windowWidth < 1024) {
        return "md";
    } else if (windowWidth < 1280) {
        return "lg";
    } else {
        return "xl";
    }
}

export default useScreenSize;

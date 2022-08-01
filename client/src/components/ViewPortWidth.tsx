import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDimension } from "../app/reducer/viewPort";

interface Dimension {
    width: {
        dimension: number
    }
}

const ViewPortWidth = () => {
    const viewPort = useSelector((state: Dimension) => state.width.dimension);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getWidthOfViewPort = () => {
                dispatch(setDimension(window.innerWidth));
        }
            window.addEventListener('resize', getWidthOfViewPort);
        return(() => {
            window.removeEventListener('resize', getWidthOfViewPort);
        })
    }, [viewPort]);
    return null
}

export default ViewPortWidth;
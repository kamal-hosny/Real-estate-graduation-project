import { ImgHTMLAttributes, forwardRef } from "react";

const Img = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(({ ...rest }, ref) => {
    return <img ref={ref} loading="lazy" {...rest} />
});

export default Img;
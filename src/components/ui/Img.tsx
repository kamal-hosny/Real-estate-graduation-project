import { ImgHTMLAttributes, forwardRef } from "react"

interface IProps extends ImgHTMLAttributes<HTMLImageElement> { }

const Img = forwardRef<HTMLImageElement, IProps>(({ ...rest }, ref) => {
    return <img ref={ref} loading="lazy" {...rest} />
});

export default Img;
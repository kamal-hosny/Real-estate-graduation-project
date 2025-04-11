import { RiImageCircleLine } from "react-icons/ri";
import Img from "./Img";

const Images = ({ images }: { images: string[] }) => {
  let fiveImage = images?.slice(0, 4) || [];

  return (
    <div className="flex items-center justify-center">
      {images ? (
        <>
          {fiveImage?.map((fiveImage, index) => (
            <div
              key={index}
              className={`h-10 w-10 flex rounded-full overflow-hidden border-2 border-border ${
                index !== 0 ? "-ms-3" : ""
              }`}
            >
              <Img
                className="h-10 w-10 object-cover rounded-full"
                src={fiveImage}
                alt={`image-${index}`}
              />
            </div>
          ))}
        </>
      ) : (
        <span className="text-xs text-blue-600">
          <RiImageCircleLine
            size={40}
            className="border-2 border-border rounded-full"
          />
        </span>
      )}
    </div>
  );
};

export default Images;

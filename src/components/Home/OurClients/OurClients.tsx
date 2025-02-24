
import Marquee from 'react-fast-marquee';
import Img from '../../ui/Img';
const OurClients = () => {

  const numbers: number[] = Array.from({ length: 9 }, (_, index) => index + 1);

    
      return (
        <div className="w-full py-4 bg-main-color-background">
                  <div className="container mx-auto px-4">
          <Marquee
            speed={60}
            pauseOnHover={true}
          >
            <div className="flex space-x-8 text-lg font-semibold">
              {
                numbers.map((x) => (
                  <div key={x} className="image h-[54px] w-40 rounded-sm p-2 flex justify-center items-center">
                    <Img className='h-full w-full object-contain grayscale hover:grayscale-0' src={`/clients/client${x}.png`} alt="" />
                  </div>
                ))
              }
            </div>
          </Marquee>
          </div>
        </div>
      );
}

export default OurClients
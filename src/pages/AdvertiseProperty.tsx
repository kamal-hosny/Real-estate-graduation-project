import mainImage from '../assets/advertiseProperty/advertiseProperty.avif';
import AdvertiseForm from '../components/AdvertiseProperty/AdvertiseForm';
import Breadcrumb from '../components/Products/Breadcrumb';
import MainTitle from '../components/common/main/MainTitle';

const breadcrumbItems = [
  { label: "Home", link: "/" },
];

const AdvertiseProperty = () => {
  return (
    <div className="advertise-property bg-section-color">
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mainImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="container mx-auto relative z-10 h-full flex flex-col">
          {/* Breadcrumb */}
          <div className="pt-8 px-4">
            <Breadcrumb items={breadcrumbItems} itemNow={"Advertise Property"} />
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-white font-bold text-4xl md:text-6xl mb-4 leading-tight">
              Sell or Rent Your Property with Confidence
            </h1>
            <p className="text-white text-xl md:text-3xl font-light max-w-3xl">
              Connect with thousands of qualified buyers through our premium network
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-16 px-4">
        <MainTitle title="Advertise Your Property">
          <div className="max-w-2xl  space-y-4">
            <p className="text-lg text-gray-600">
              Leverage our extensive market reach and expert team to maximize your 
              property's potential. We provide comprehensive support at every stage:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Professional photography & virtual tours</li>
              <li>Strategic pricing analysis</li>
              <li>Multi-platform marketing campaign</li>
              <li>24/7 client support</li>
              <li>Secure transaction management</li>
            </ul>
          </div>
        </MainTitle>

      {/* Form */}
      <AdvertiseForm />

      </div>


    </div>
  )
}

export default AdvertiseProperty;
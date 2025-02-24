import MainTitle from '../../common/main/MainTitle';
import { Search, Video, Calculator, Headphones, FileText, Home } from 'lucide-react';

const services = [
    {
        id: 1,
        icon: <Search size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
        title: "Property Search",
        paragraph: "Access our extensive database of apartments with advanced filters to find your perfect match",
    },
    {
        id: 2,
        icon: <Video size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
        title: "Virtual Tours",
        paragraph: "Take virtual tours of apartments from the comfort of your home before scheduling in-person visits",
    },
    {
        id: 3,
        icon: <Calculator size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
        title: "Mortgage Calculator",
        paragraph: "Calculate your monthly payments and explore financing options with our easy-to-use tools",
    },
    {
        id: 4,
        icon: <Headphones size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
        title: "24/7 Support",
        paragraph: "Our dedicated team is always available to answer your questions and provide guidance",
    },
    {
        id: 5,
        icon: <FileText size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
        title: "Document Assistance",
        paragraph: "Get expert help with all paperwork and legal documents required for your purchase",
    },
    {
        id: 6,
        icon: <Home size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
        title: "Move-in Support",
        paragraph: "Seamless support from purchase completion to getting the keys to your new home",
    },
];

const OurServices = () => {
    return (
        <div className="OurServices py-8 bg-main-color-background">
            <div className="container mx-auto px-4 space-y-6">
                <MainTitle title="Our Services">
                    Comprehensive support throughout your apartment buying journey
                </MainTitle>
                <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((x) => (
                        <div key={x.id} className="card bg-section-color flex justify-center flex-col items-center rounded border-color-border border p-6 space-y-2">
                            <div className="icon-container">
                                {x.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-color-text-1">{x.title}</h3>
                            <p className="text-sm text-color-text-2 text-center">{x.paragraph}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurServices;
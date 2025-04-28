// External imports
import { Calculator, FileText, Headphones, Home, Search, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Internal imports
import MainTitle from '../../common/main/MainTitle';

// Constants
const services = [
  {
    id: 1,
    icon: <Search size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
    key: 'propertySearch'
  },
  {
    id: 2,
    icon: <Video size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
    key: 'virtualTours'
  },
  {
    id: 3,
    icon: <Calculator size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
    key: 'mortgageCalculator'
  },
  {
    id: 4,
    icon: <Headphones size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
    key: 'support'
  },
  {
    id: 5,
    icon: <FileText size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
    key: 'documentAssistance'
  },
  {
    id: 6,
    icon: <Home size={40} className='text-color-text-1 bg-blue-400 p-2 rounded-lg' />,
    key: 'moveInSupport'
  },
];

const OurServices = () => {
  const { t } = useTranslation();

  return (
    <div className="OurServices py-8 bg-main-color-background">
      <div className="container mx-auto px-4 space-y-6">
        <MainTitle title={t('ourServices.title')}>
          {t('ourServices.subtitle')}
        </MainTitle>

        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="card bg-section-color flex justify-center flex-col items-center rounded border-color-border border p-6 space-y-2"
            >
              <div className="icon-container">
                {service.icon}
              </div>

              <h3 className="text-lg font-semibold text-color-text-1">
                {t(`ourServices.services.${service.key}.title`)}
              </h3>

              <p className="text-sm text-color-text-2 text-center">
                {t(`ourServices.services.${service.key}.paragraph`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
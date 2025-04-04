import { useTranslation } from 'react-i18next';
import mainImage from '../assets/advertiseProperty/advertiseProperty.avif';
import AdvertiseForm from '../components/AdvertiseProperty/AdvertiseForm';
import Breadcrumb from '../components/Products/Breadcrumb';
import MainTitle from '../components/common/main/MainTitle';

const AdvertiseProperty = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), link: "/" },
  ];

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
            <Breadcrumb 
              items={breadcrumbItems} 
              itemNow={t('breadcrumb.advertise')} 
            />
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-white font-bold text-4xl md:text-6xl mb-4 leading-tight">
              {t('advertiseProperty.hero.title')}
            </h1>
            <p className="text-white text-xl md:text-3xl font-light max-w-3xl">
              {t('advertiseProperty.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-16 px-4">
        <MainTitle title={t('advertiseProperty.content.title')}>
          <div className="max-w-2xl space-y-4">
            <p className="text-lg text-gray-600">
              {t('advertiseProperty.content.description')}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
            {(t('advertiseProperty.content.listItems', { returnObjects: true }) as string[])?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>
        </MainTitle>

        <AdvertiseForm />
      </div>
    </div>
  )
}

export default AdvertiseProperty;
// External libraries
import { useTranslation } from 'react-i18next';

type TranslationKeys = {
  terms: {
    title: string;
    introduction: {
      heading: string;
      text: string;
    };
    acceptance: {
      heading: string;
      list: string[];
    };
    services: {
      heading: string;
      description: string;
      list: string[];
    };
    responsibilities: {
      heading: string;
      list: string[];
    };
    financial: {
      heading: string;
      items: string[];
    };
    privacy: {
      heading: string;
      text: string;
    };
    modifications: {
      heading: string;
      text: string;
    };
  };
};

const TermsOfService = () => {
  const { t, i18n } = useTranslation<keyof TranslationKeys>();

  return (
    <div className="p-8 max-w-7xl mx-auto" dir={i18n.dir()}>
      <h1 className="text-3xl font-bold text-color-text-1 text-center mb-12">
        {t('terms.title')}
      </h1>

      {/* Introduction Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-color-text-1 mb-4">
          {t('terms.introduction.heading')}
        </h2>
        <p className="text-color-text-2 leading-relaxed">
          {t('terms.introduction.text')}
        </p>
      </div>

      {/* Acceptance Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-color-text-1 mb-4 border-b-2 border-blue-600 pb-2">
          {t('terms.acceptance.heading')}
        </h2>
        <ul className="list-disc pr-6 space-y-3 text-color-text-2">
          {(t('terms.acceptance.list', { returnObjects: true }) as string[]).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Services Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-color-text-1 mb-4 border-b-2 border-blue-600 pb-2">
          {t('terms.services.heading')}
        </h2>
        <div className="text-color-text-2">
          <p className="mb-3">{t('terms.services.description')}</p>
          <ol className="list-decimal pr-6 space-y-3">
            {(t('terms.services.list', { returnObjects: true }) as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Responsibilities Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-color-text-1 mb-4 border-b-2 border-blue-600 pb-2">
          {t('terms.responsibilities.heading')}
        </h2>
        <ul className="list-disc pr-6 space-y-3 text-color-text-2">
          {(t('terms.responsibilities.list', { returnObjects: true }) as string[]).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Financial Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-color-text-1 mb-4 border-b-2 border-blue-600 pb-2">
          {t('terms.financial.heading')}
        </h2>
        <div className="text-color-text-2 space-y-2">
          {(t('terms.financial.items', { returnObjects: true }) as string[]).map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>

      {/* Privacy Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-color-text-1 mb-4 border-b-2 border-blue-600 pb-2">
          {t('terms.privacy.heading')}
        </h2>
        <p className="text-color-text-2 leading-relaxed">
          {t('terms.privacy.text')}
        </p>
      </div>

      {/* Modifications Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-color-text-1 mb-4 border-b-2 border-blue-600 pb-2">
          {t('terms.modifications.heading')}
        </h2>
        <p className="text-color-text-2 leading-relaxed">
          {t('terms.modifications.text')}
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
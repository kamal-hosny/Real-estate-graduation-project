import { useTranslation } from 'react-i18next';

type PrivacyPolicyTranslations = {
  title: string;
  section1: {
    heading: string;
    content: string;
  };
  section2: {
    heading: string;
    items: string[];
  };
  section3: {
    heading: string;
    items: string[];
  };
  section4: {
    heading: string;
    description: string;
    items: string[];
  };
  section5: {
    heading: string;
    items: string[];
  };
  section6: {
    heading: string;
    content: string;
  };
  section7: {
    heading: string;
    content: string;
  };
  section8: {
    heading: string;
    content: string;
  };
};

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation<keyof PrivacyPolicyTranslations>();

  return (
    <div className="p-8 max-w-7xl mx-auto" dir={i18n.dir()}>
      <h1 className="text-3xl font-bold text-color-text-1 text-center mb-12">
        {t('privacy.title')}
      </h1>

      {[1, 2, 3, 4, 5, 6, 7, 8].map((section) => (
        <div key={section} className="mb-8">
          <h2 className="text-xl font-semibold text-color-text-1 mb-4 border-b-2 border-blue-600 pb-2">
            {t(`privacy.section${section}.heading`)}
          </h2>
          
          {section === 2 && (
            <ul className="list-disc pr-6 space-y-3 text-color-text-2">
              {(t(`privacy.section${section}.items`, { returnObjects: true }) as any).map((item : any, index: any) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {section === 3 && (
            <ol className="list-decimal pr-6 space-y-3 text-color-text-2">
              {(t(`privacy.section${section}.items`, { returnObjects: true }) as any).map((item: any, index: any) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          )}

          {section === 4 && (
            <>
              {/* Fixed translation key for description */}
              <p className="text-color-text-2 mb-3">{t(`privacy.section${section}.description`)}</p>
              <ul className="list-disc pr-6 space-y-3 text-color-text-2">
                {(t(`privacy.section${section}.items`, { returnObjects: true }) as any).map((item: any, index: any) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {/* Fixed: Only apply to section 5 */}
          {section === 5 && (
            <div className="text-color-text-2 space-y-3">
              {(t(`privacy.section${section}.items`, { returnObjects: true }) as any).map((item: any, index: any) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}

          {/* Fixed: Include section 7 in content sections */}
          {[1, 6, 7, 8].includes(section) && (
            <p className="text-color-text-2 leading-relaxed">
              {t(`privacy.section${section}.content`)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
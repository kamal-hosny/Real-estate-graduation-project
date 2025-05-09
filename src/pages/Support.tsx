import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FaqItem {
  question: string;
  answer: string;
}

interface FormDataState {
  name: string;
  email: string;
  orderNumber: string;
  message: string;
  attachment: File | null;
}

const Support = () => {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    orderNumber: '',
    message: '',
    attachment: null
  });

  const faqItems: FaqItem[] = [
    {
      question: t('support.faq.questions.order_confirmation.question'),
      answer: t('support.faq.questions.order_confirmation.answer')
    },
    {
      question: t('support.faq.questions.support_response.question'),
      answer: t('support.faq.questions.support_response.answer')
    },
    {
      question: t('support.faq.questions.order_duration.question'),
      answer: t('support.faq.questions.order_duration.answer')
    }
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);
    alert(t('support.help_request.form.success_message'));
    setFormData({
      name: '',
      email: '',
      orderNumber: '',
      message: '',
      attachment: null
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, files } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <div className="min-h-screen bg-section-color py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-color-text-1 text-center mb-12">
          {t('support.title')}
        </h1>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-color-text-1 mb-8 border-r-4 border-main-color pr-4">
            {t('support.faq.title')}
          </h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-main-color-background rounded-lg shadow-sm overflow-hidden border border-color-border"
              >
                <button
                  className="w-full px-6 py-4 text-right flex justify-between items-center hover:bg-section-color transition-colors"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="text-lg font-medium text-color-text-1">{item.question}</span>
                  <span className={`transform transition-transform text-color-text-2 ${activeFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {activeFaq === index && (
                  <div className="px-6 py-4 bg-section-color border-t border-color-border">
                    <p className="text-color-text-2 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-main-color-background rounded-lg shadow-xl p-8 border border-color-border">
          <h2 className="text-2xl font-semibold text-color-text-1 mb-8 border-r-4 border-main-color pr-4">
            {t('support.help_request.title')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-color-text-1 mb-2">
                  {t('support.help_request.form.full_name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-color-border rounded-lg focus:ring-2 focus:ring-main-color focus:border-transparent bg-main-color-background text-color-text-1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-color-text-1 mb-2">
                  {t('support.help_request.form.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-color-border rounded-lg focus:ring-2 focus:ring-main-color focus:border-transparent bg-main-color-background text-color-text-1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-color-text-1 mb-2">
                {t('support.help_request.form.order_number')}
              </label>
              <input
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-color-border rounded-lg focus:ring-2 focus:ring-main-color focus:border-transparent bg-main-color-background text-color-text-1"
                placeholder={t('support.help_request.form.order_number_placeholder')}
              />
            </div>

            <div>
              <label className="block text-color-text-1 mb-2">
                {t('support.help_request.form.request_details')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-color-border rounded-lg focus:ring-2 focus:ring-main-color focus:border-transparent bg-main-color-background text-color-text-1"
                placeholder={t('support.help_request.form.request_details_placeholder')}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-color-text-1 mb-2">
                {t('support.help_request.form.attachments')}
              </label>
              <input
                type="file"
                name="attachment"
                onChange={handleChange}
                className="w-full text-color-text-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-section-color file:text-color-text-1 hover:file:bg-main-color-hover"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-button-color hover:bg-button-hover-color text-main-color-background py-3 px-6 rounded-lg transition-colors font-bold"
            >
              {t('support.help_request.form.submit_button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
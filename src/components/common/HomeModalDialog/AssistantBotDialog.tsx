// External imports
import { Bot, Loader2, RefreshCw, Send, Undo2, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Internal imports
import { sendMessageToDeepSeek } from '../../../store/AIModleDeepSeek/act/actSendMassageToDeepSeek';
import { reset } from '../../../store/AIModleDeepSeek/deepSeekSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { closeModal } from '../../../store/modal/modalSlice';
import { TLoading } from '../../../types';

// Types
interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

interface Answers {
  budget?: string;
  area?: string;
  rooms?: string;
  location?: string;
  finishing?: string;
  delivery?: string;
  amenities?: string;
  [key: string]: string | undefined;
}

interface DeepSeekState {
  record: string | null;
  loading: TLoading;
  error: string | null;
}

interface Property {
  propertyId?: string;
  propertyType?: string;
  price?: number;
  status?: string;
  city?: string;
  address?: string;
  googleMapsLink?: string;
  area?: number;
  totalRooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floorNumber?: number;
  furnished?: boolean;
  description?: string;
  createdAt?: string;
  propertyImages?: { $values: string[] };
  finishing?: string;
  delivery?: string;
  amenities?: string;
}

// Constants
const questions = [
  {
    id: 1,
    text: 'ما رأيك في سعر العقار؟ هل يتناسب مع ميزانيتك أو توقعاتك؟',
    key: 'budget',
  },
  {
    id: 2,
    text: 'كيف ترى مساحة العقار؟ هل هي كافية لاحتياجاتك اليومية؟',
    key: 'area',
  },
  {
    id: 3,
    text: 'ما رأيك بعدد الغرف؟ هل يناسب احتياجات عائلتك أو نمط حياتك؟',
    key: 'rooms',
  },
  {
    id: 4,
    text: 'ما شعورك تجاه موقع العقار؟ هل هو قريب من الأماكن المهمة بالنسبة لك مثل العمل أو المدارس؟',
    key: 'location',
  },
  {
    id: 5,
    text: 'كيف ترى مستوى التشطيب؟ هل يعكس ذوقك أو توقعاتك؟',
    key: 'finishing',
  },
  {
    id: 6,
    text: 'ما رأيك في توقيت استلام العقار؟ هل يتماشى مع خططك؟',
    key: 'delivery',
  },
  {
    id: 7,
    text: 'هل الخدمات المتوفرة في العقار (مثل الأمن، الجراج، أو النادي) تلبي احتياجاتك؟',
    key: 'amenities',
  },
];

// Component
const AssistantBotDialog = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: 'مرحبًا! كيف يمكنني مساعدتك اليوم؟', isBot: true },
    {
      id: 2,
      content: 'من فضلك، شاركنا رأيك في الأسئلة التالية لنساعدك في تقييم إذا كان العقار مناسبًا لك.',
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [isChatCompleted, setIsChatCompleted] = useState(false);

  // Selectors
  const { record, loading, error: deepSeekError } = useAppSelector(
    (state: { deepSeek?: DeepSeekState }) => 
      state.deepSeek || { record: null, loading: 'idle' as TLoading, error: null }
  );
  const data = useAppSelector(
    (state: { modal?: { product?: Property } }) => state.modal?.product
  );

  // Handlers
  const processUserInput = async (message: string) => {
    if (!message.trim() || message.length < 3) {
      setError('يرجى إدخال إجابة صالحة (أكثر من 3 أحرف).');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (currentQuestionIndex === -1) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), content: message, isBot: false },
          { id: Date.now() + 1, content: questions[0].text, isBot: true },
        ]);
        setCurrentQuestionIndex(0);
      } else {
        const currentQuestion = questions[currentQuestionIndex];
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.key]: message,
        }));

        if (currentQuestionIndex < questions.length - 1) {
          const nextQuestion = questions[currentQuestionIndex + 1];
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), content: message, isBot: false },
            { id: Date.now() + 1, content: nextQuestion.text, isBot: true },
          ]);
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), content: message, isBot: false },
            {
              id: Date.now() + 1,
              content: `إجاباتك:\n${Object.entries({
                ...answers,
                [currentQuestion.key]: message,
              })
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')}\nجاري تقييم العقار...`,
              isBot: true,
            },
          ]);
          setIsChatCompleted(true);

          const property = data || {};
          dispatch(
            sendMessageToDeepSeek(
              `
              You are an expert real estate assistant tasked with evaluating whether a property is suitable for a user based on their responses to questions and the property's details. You have the following information:

              **Property Details**:
              - Property ID: ${property.propertyId || 'N/A'}
              - Property Type: ${property.propertyType || 'N/A'}
              - Price: ${property.price ? property.price + ' EGP' : 'N/A'}
              - Status: ${property.status || 'N/A'}
              - City: ${property.city || 'N/A'}
              - Address: ${property.address || 'N/A'}
              - Google Maps Link: ${property.googleMapsLink || 'N/A'}
              - Area: ${property.area ? property.area + ' square meters' : 'N/A'}
              - Total Rooms: ${property.totalRooms || 'N/A'}
              - Bedrooms: ${property.bedrooms || 'N/A'}
              - Bathrooms: ${property.bathrooms || 'N/A'}
              - Floor Number: ${property.floorNumber || 'N/A'}
              - Furnished: ${property.furnished ? 'Yes' : 'No'}
              - Description: ${property.description || 'N/A'}
              - Created At: ${property.createdAt || 'N/A'}
              - Property Images: ${
                property.propertyImages?.$values
                  ? JSON.stringify(property.propertyImages.$values)
                  : '[]'
              } (Assume images reflect the property's condition, layout, and finishing as described)
              - Finishing: ${property.finishing || 'N/A'}
              - Delivery: ${property.delivery || 'N/A'}
              - Amenities: ${property.amenities || 'N/A'}

              **User Questions and Responses**:
              ${questions
                .map(
                  (q, i) =>
                    `${i + 1}. ${q.key}:\nQuestion: "${q.text}"\nResponse: "${
                      answers[q.key] || message
                    }"`
                )
                .join('\n')}

              **Your Task**:
              1. Analyze each user response in the context of the corresponding question and the property details.
              2. For each response:
                 - Evaluate the sentiment (positive, negative, or neutral) and relevance to the question.
                 - Compare the response to the relevant property attribute (e.g., price for budget, area for space needs).
                 - If the response indicates satisfaction or alignment with the property's attributes (e.g., positive sentiment, phrases like "suitable," "good," or "ناسب"), assign a score of +1.
                 - If the response indicates dissatisfaction or mismatch (e.g., negative sentiment, phrases like "too expensive," "غير مناسب"), assign a score of -1.
                 - If the response is vague, unrelated, or neutral, assign a score of 0.
              3. Consider the property's images as a reflection of its condition and finishing. Assume the images align with the text descriptions (e.g., finishing, layout) unless contradicted by user responses.
              4. Sum the scores across all responses to determine overall suitability.
              5. Return: 
                 - "true" if the total score is positive (indicating the property is likely suitable).
                 - "false" if the total score is zero or negative (indicating the property is not suitable).
              6. Output ONLY the string "true" or "false" with no additional text, explanations, JSON, or formatting.
              `
            )
          );
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء معالجة ردك. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || loading === 'pending' || isChatCompleted || !inputMessage.trim()) return;

    processUserInput(inputMessage);
    setInputMessage('');
  };

  const restartChat = () => {
    dispatch(reset());
    setMessages([
      { id: 1, content: 'مرحبًا! كيف يمكنني مساعدتك اليوم؟', isBot: true },
      {
        id: 2,
        content: 'من فضلك، شاركنا رأيك في الأسئلة التالية لنساعدك في تقييم إذا كان العقار مناسبًا لك.',
        isBot: true,
      },
    ]);
    setInputMessage('');
    setIsLoading(false);
    setError('');
    setCurrentQuestionIndex(-1);
    setAnswers({});
    setIsChatCompleted(false);
  };

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  // Effects
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (deepSeekError) {
      setError(deepSeekError);
    }
  }, [deepSeekError]);

  useEffect(() => {
    if (record) {
      const isSuitable = record === 'true';
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: `نتيجة التقييم: ${isSuitable ? 'العقار مناسب لك' : 'العقار غير مناسب لك'}`,
          isBot: true,
        },
      ]);
    }
  }, [record]);

  // Render
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && cancel()}
    >
      <div className="relative w-full max-w-2xl mx-4 bg-[rgb(var(--main-color-background))] rounded-xl shadow-2xl border border-[rgb(var(--color-border))] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border))]">
          <div className="flex items-center gap-3">
            <Bot className="w-7 h-7 text-[rgb(var(--button-color))]" />
            <h2 className="text-xl font-bold text-[rgb(var(--color-text-1))]">
              مساعد الذكاء الاصطناعي
            </h2>
          </div>
          <button
            onClick={cancel}
            aria-label="إغلاق النافذة"
            className="p-1 hover:bg-[rgba(var(--color-border),0.3)] rounded-full"
          >
            <X className="w-6 h-6 text-[rgb(var(--color-text-2))]" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-[rgba(var(--section-color),0.9)] text-[rgb(var(--color-text-1))]'
                    : 'bg-[rgb(var(--button-color))] text-white'
                }`}
              >
                {message.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          ))}

          {(isLoading || loading === 'pending') && (
            <div className="flex justify-start">
              <div className="max-w-[85%] p-3 rounded-2xl bg-[rgba(var(--section-color),0.9)]">
                <Loader2 className="animate-spin w-6 h-6 text-[rgb(var(--button-color))]" />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-100/80 text-red-600 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Field or Restart Button */}
        <div className="sticky bottom-0 bg-[rgb(var(--main-color-background))] border-t border-[rgb(var(--color-border))] p-4">
          {isChatCompleted ? (
            <button
              onClick={restartChat}
              className="w-full py-3 bg-[rgb(var(--button-color))] text-white rounded-xl hover:bg-[rgb(var(--button-color),0.8)] transition-all flex items-center justify-center gap-2"
              aria-label="إعادة الدردشة"
            >
              <RefreshCw className="w-5 h-5" />
              إعادة الدردشة
            </button>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="relative flex gap-3">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="شاركنا رأيك هنا..."
                  className="w-full px-4 py-3 bg-[rgba(var(--section-color),0.5)] rounded-xl text-[rgb(var(--color-text-1))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--button-color))] resize-none"
                  disabled={isLoading || loading === 'pending' || isChatCompleted}
                  aria-label="إدخال رسالة"
                  rows={3}
                />
                <div className="flex flex-col justify-between">
                  <button
                    type="submit"
                    disabled={isLoading || loading === 'pending' || isChatCompleted || !inputMessage.trim()}
                    className="flex justify-center items-center w-14 h-12 bg-[#828282] text-white rounded-xl hover:bg-[#767676] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                    aria-label="إرسال الرسالة"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                  <button
                    className="flex justify-center items-center w-14 h-10 bg-gray-700 text-white rounded-xl hover:bg-gray-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={cancel}
                  >
                    <Undo2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantBotDialog;
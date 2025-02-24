import { CircleCheck, X, AlertTriangle, Info, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { removeToast, stopDelayAppearance } from "../../../../store/toasts/toastsSlice";
import { TToast } from "../../../../types";

const iconTypes = {
  success: {
    icon: CircleCheck,
    color: "text-green-600 dark:text-green-400",
    borderColor: "border-green-600 dark:border-green-400",
    bgColor: "bg-green-100 dark:bg-green-900",
    progressColor: "bg-green-600 dark:bg-green-400",
  },
  error: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    borderColor: "border-red-600 dark:border-red-400",
    bgColor: "bg-red-100 dark:bg-red-900",
    progressColor: "bg-red-600 dark:bg-red-400",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600 dark:text-yellow-400",
    borderColor: "border-yellow-600 dark:border-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
    progressColor: "bg-yellow-600 dark:bg-yellow-400",
  },
  info: {
    icon: Info,
    color: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-600 dark:border-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900",
    progressColor: "bg-blue-600 dark:bg-blue-400",
  },
};

const ToastItem = ({ id, message, type, delayAppearance }: TToast) => {
  const dispatch = useAppDispatch();
  const {
    icon: Icon,
    color,
    borderColor,
    bgColor,
    progressColor,
  } = iconTypes[type];

  const [progress, setProgress] = useState(0);
  const [pauseProgressBarIndicator, setpauseProgressBarIndicator] = useState(false)

  const duration = 4000;
  const intervalTime = duration / 100;

  const closeToastHandler = useCallback(() => {
    dispatch(removeToast(id));
  }, [dispatch]);

  const pauseProgressBarIndicatorHandler = () => {
    setpauseProgressBarIndicator((prev) => !prev)
  }

  useEffect(() => {
    if(delayAppearance) return;
    const timerId = setInterval(() => {
      if(!pauseProgressBarIndicator){
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timerId);
            return 100;
          }
          return prev + 1;
        });
      }

    }, intervalTime);

    return () => clearInterval(timerId);
  }, [intervalTime]);

  useEffect(() => {
    if (progress == 100) {
      closeToastHandler();
    }
  }, [progress]);

  useEffect(() => {
    if (delayAppearance) {
      const timerId = setTimeout(() => {
        dispatch(stopDelayAppearance(id))
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [delayAppearance, dispatch]);


  if(delayAppearance) return "";

  return (
    <div
    onMouseEnter={pauseProgressBarIndicatorHandler}
    onMouseLeave={pauseProgressBarIndicatorHandler}
      className={`relative flex p-3 items-center w-fit justify-between border rounded-lg gap-3 shadow-lg ${borderColor} ${bgColor} animate-fade-in`}
    >
      <Icon className={`${color} flex-shrink-0`} size={20} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {message}
        </p>
      </div>
      <button
        onClick={closeToastHandler}
        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full transition-colors duration-200"
      >
        <X size={15} />
      </button>
      <span
        className={`absolute h-1 bottom-0 left-0 ${progressColor}`}
        style={{
          width: `${progress}%`,
          transition: `width ${intervalTime}ms linear`,
        }}
      />
    </div>
  );
};

export default ToastItem;

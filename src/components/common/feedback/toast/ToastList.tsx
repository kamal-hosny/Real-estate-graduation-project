import { AnimatePresence, motion } from "motion/react";
import { useAppSelector } from "../../../../store/hooks";
import ToastItem from "./ToastItem";

const ToastList = () => {
  const { records } = useAppSelector((state) => state.toasts);

  return (
    <div className="toastList fixed top-5 items-end w-fit right-5 z-50 flex flex-col gap-3">
      <AnimatePresence>
      {records.map(({ id, message, type, delayAppearance }) => (
       <motion.div key={id} initial={{opacity:0}} animate={{opacity: 1}} exit={{opacity:0}} layout transition={{ease:"easeInOut"}}>
         <ToastItem id={id} message={message} type={type} delayAppearance={delayAppearance} />
       </motion.div>
      ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastList;

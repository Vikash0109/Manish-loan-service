import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 480);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          initial={{ opacity: 0, y: 22, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 22, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--border-color) bg-(--surface-elevated) text-(--heading-color) shadow-[0_10px_28px_-10px_rgba(0,0,0,0.45)] backdrop-blur"
        >
          <FaArrowUp />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export default BackToTopButton;

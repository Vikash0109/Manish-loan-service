import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { faqs } from '../utils/content';
import SectionTitle from './SectionTitle';

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="FAQ" title="Loan Questions, Answered" description="Quick answers to common borrower queries." />

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <motion.div layout key={item.question} className="rounded-2xl border border-(--border-color) bg-(--surface-elevated)">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-(--heading-color) md:text-base">{item.question}</span>
                  <FaChevronDown className={`transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="faq-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-(--text-muted)">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;


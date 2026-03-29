import { motion } from 'framer-motion';
import { howItWorksSteps } from '../utils/content';
import SectionTitle from './SectionTitle';

function HowItWorksSection() {
  return (
    <section id="process" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="How It Works"
          title="A Clear 3-Step Loan Journey"
          description="Simple, transparent process from your first consultation to final disbursal support."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-6"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-(--brand)">STEP {step.step}</p>
              <h3 className="mt-3 text-xl font-semibold text-(--heading-color)">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-(--text-muted)">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;

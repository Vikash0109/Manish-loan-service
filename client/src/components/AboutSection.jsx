import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

function AboutSection() {
  return (
    <section id="about" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-8 md:p-12">
        <SectionTitle
          eyebrow="About"
          title="Manish Dutt"
          description="Self Employed | 11+ years in banking and 7+ years in investment guidance."
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center text-sm leading-7 text-(--text-muted) md:text-base"
        >
          Manish Dutt helps individuals and families make confident financial decisions across home loans,
          property-backed funding, and strategic real estate investments. With deep market understanding and
          a practical approach to risk, every recommendation is focused on long-term value, compliant
          documentation, and smooth loan execution.
        </motion.p>
      </div>
    </section>
  );
}

export default AboutSection;


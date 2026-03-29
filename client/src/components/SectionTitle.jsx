import { motion } from 'framer-motion';

function SectionTitle({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-(--border-color) px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--brand)">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-(--heading-color) md:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-sm text-(--text-muted) md:text-base">{description}</p> : null}
    </motion.div>
  );
}

export default SectionTitle;


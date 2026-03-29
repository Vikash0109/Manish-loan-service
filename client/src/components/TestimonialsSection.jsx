import { motion } from 'framer-motion';
import { testimonials } from '../utils/content';
import SectionTitle from './SectionTitle';

function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Testimonials"
          title="What Clients Say"
          description="Client trust is built through transparent communication and smooth processing."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-6"
            >
              <p className="text-sm leading-7 text-(--text-muted)">"{item.quote}"</p>
              <footer className="mt-4 text-sm font-semibold text-(--heading-color)">- {item.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;


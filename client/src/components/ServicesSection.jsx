import { motion } from 'framer-motion';
import { services } from '../utils/content';
import SectionTitle from './SectionTitle';

function ServicesSection() {
  return (
    <section id="services" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Services"
          title="Loan Services Built for Real Outcomes"
          description="Specialized consultation for salaried and self-employed profiles with sharp ROI-focused solutions."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-6 transition hover:border-(--brand)"
              >
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 14 }}
                  className="inline-flex rounded-2xl bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] p-3 text-xl text-(--brand)"
                >
                  <Icon />
                </motion.div>
                <h3 className="mt-4 text-xl font-semibold text-(--heading-color)">{service.title}</h3>
                <p className="mt-3 text-sm text-(--text-muted)">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;


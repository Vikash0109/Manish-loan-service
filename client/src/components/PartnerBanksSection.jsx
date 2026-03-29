import { motion } from 'framer-motion';
import { partnerBanks } from '../utils/content';

function PartnerBanksSection() {
  return (
    <section className="px-4 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-(--text-muted)">Partner Banks</h3>
          <p className="text-xs text-(--text-muted)">Trusted lender network for better offers</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {partnerBanks.map((bank, index) => (
            <motion.div
              key={bank}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="rounded-2xl border border-(--border-color) bg-(--surface) px-4 py-3 text-center text-sm font-medium text-(--heading-color)"
            >
              {bank}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerBanksSection;

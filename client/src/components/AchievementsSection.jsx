import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { achievements } from '../utils/content';
import SectionTitle from './SectionTitle';

function CounterCard({ label, value, suffix }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-6 text-center"
    >
      <p className="text-4xl font-semibold text-(--heading-color)">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-(--text-muted)">{label}</p>
    </motion.div>
  );
}

function AchievementsSection() {
  return (
    <section id="achievements" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Achievements"
          title="Performance Backed by Results"
          description="Home loan and insurance milestones built through trust, compliance, and consistent service."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-(--border-color) px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-(--text-muted)">
            Home Loan Achievements
          </span>
          <span className="rounded-full border border-(--border-color) px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-(--text-muted)">
            Insurance Achievements
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item) => (
            <CounterCard key={item.label} label={item.label} value={item.value} suffix={item.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AchievementsSection;


import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '../utils/api';
import { contactDetails } from '../utils/content';
import SectionTitle from './SectionTitle';

const defaultFormState = {
  name: '',
  phone: '',
  message: '',
};

function ContactSection() {
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const validationErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      validationErrors.name = 'Please enter a valid name.';
    }

    if (!/^[0-9+\-\s()]{8,20}$/.test(formData.phone.trim())) {
      validationErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      validationErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error('Please fix the highlighted fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await api.post('/api/contact', {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      toast.success('Your message has been submitted successfully.');
      setFormData(defaultFormState);
      setErrors({});
    } catch (error) {
      const apiMessage = error.response?.data?.message;
      toast.error(apiMessage || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-4 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24">
      <div className="mx-auto max-w-7xl rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-8 md:p-12">
        <SectionTitle
          eyebrow="Contact"
          title="Talk to Manish Dutt"
          description="Share your requirement and get personalized guidance for loans and investment planning."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="space-y-4 rounded-2xl border border-(--border-color) bg-(--surface) p-6"
          >
            <p className="text-sm text-(--text-muted)">Name</p>
            <p className="text-lg font-semibold text-(--heading-color)">{contactDetails.name}</p>
            <p className="text-sm text-(--text-muted)">Phone</p>
            <a href={`tel:${contactDetails.phone}`} className="text-lg font-semibold text-(--heading-color)">
              {contactDetails.phone}
            </a>
            <p className="text-sm text-(--text-muted)">Email</p>
            <a href={`mailto:${contactDetails.email}`} className="text-lg font-semibold text-(--heading-color)">
              {contactDetails.email}
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-(--border-color) bg-(--surface) p-6"
          >
            <div>
              <label className="text-sm font-medium text-(--heading-color)" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-(--border-color) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--brand)]"
                placeholder="Enter your name"
              />
              {errors.name ? <p className="mt-1 text-xs text-red-400">{errors.name}</p> : null}
            </div>

            <div>
              <label className="text-sm font-medium text-(--heading-color)" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-(--border-color) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--brand)]"
                placeholder="Enter your phone"
              />
              {errors.phone ? <p className="mt-1 text-xs text-red-400">{errors.phone}</p> : null}
            </div>

            <div>
              <label className="text-sm font-medium text-(--heading-color)" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-(--border-color) bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--brand)]"
                placeholder="Tell us about your loan requirement"
              />
              {errors.message ? <p className="mt-1 text-xs text-red-400">{errors.message}</p> : null}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-w-40 items-center justify-center rounded-full bg-(--brand) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--brand-strong) disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;


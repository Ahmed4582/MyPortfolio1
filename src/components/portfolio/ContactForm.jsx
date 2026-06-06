import { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { Skeleton } from "../ui/Skeleton";

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

const validateForm = (formData) => {
  const errors = {};

  if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });
      setFormData(initialFormData);
    } catch {
      Swal.fire({
        title: "Failed!",
        text: "Message sending is not configured yet. Add EmailJS keys in .env.local.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="relative group">
        <User className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1]" />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(formErrors.name)}
          aria-describedby={formErrors.name ? "name-error" : undefined}
          className="w-full rounded-xl border border-white/20 bg-white/10 p-4 pl-12 text-white placeholder-gray-500 transition hover:border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50"
          required
        />
        {formErrors.name && <p id="name-error" className="mt-1 text-xs text-red-400">{formErrors.name}</p>}
      </div>

      <div className="relative group">
        <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1]" />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(formErrors.email)}
          aria-describedby={formErrors.email ? "email-error" : undefined}
          className="w-full rounded-xl border border-white/20 bg-white/10 p-4 pl-12 text-white placeholder-gray-500 transition hover:border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50"
          required
        />
        {formErrors.email && <p id="email-error" className="mt-1 text-xs text-red-400">{formErrors.email}</p>}
      </div>

      <div className="relative group">
        <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-[#6366f1]" />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(formErrors.message)}
          aria-describedby={formErrors.message ? "message-error" : undefined}
          className="h-40 w-full resize-none rounded-xl border border-white/20 bg-white/10 p-4 pl-12 text-white placeholder-gray-500 transition hover:border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50"
          required
        />
        {formErrors.message && <p id="message-error" className="mt-1 text-xs text-red-400">{formErrors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] py-4 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <Skeleton className="h-5 w-5 rounded-full bg-white/30" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;

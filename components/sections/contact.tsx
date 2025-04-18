"use client";

import { useState, useRef } from "react";
import { Phone, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const phoneNumber = "201142399186";
      const message = encodeURIComponent(
        `Hi, I'm ${formData.name}.\n\nMessage:\n${formData.message}\n\nContact Email: ${formData.email}`
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

      toast.success("Opening WhatsApp with your message");

      // Reset form
      form.current?.reset();
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      toast.error("Failed to open WhatsApp");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">WhatsApp</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  +20 114 239 9186
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  +20 114 239 9186
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  al-Sharqia, Egypt
                </p>
              </div>
            </div>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields remain the same */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send WhatsApp Message"
            >
              <span>
                {isSubmitting
                  ? "Opening WhatsApp..."
                  : "Send Message via WhatsApp"}
              </span>
              <MessageSquare className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

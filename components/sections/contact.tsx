"use client";

import { useState, useRef } from "react";
import { Phone, MapPin, MessageSquare, Send, Mail, Globe } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { t, language, dir } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useRef<HTMLFormElement | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const phoneNumber = "201142399186";
      const message = encodeURIComponent(
        `Hi, I'm ${formData.name}.\n\nMessage:\n${formData.message}\n\nContact Email: ${formData.email}`
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

      toast.success(language === 'ar' ? "جاري فتح واتساب مع رسالتك" : "Opening WhatsApp with your message");

      // Reset form
      form.current?.reset();
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      toast.error(language === 'ar' ? "فشل في فتح واتساب" : "Failed to open WhatsApp");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const contactInfo = [
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "+20 114 239 9186",
      color: "green",
      href: "https://wa.me/201142399186"
    },
    {
      icon: Mail,
      title: "Email",
      value: "ahmed269117@gmail.com",
      color: "purple",
      href: "mailto:ahmed269117@gmail.com"
    },
    {
      icon: MapPin,
      title: language === 'ar' ? "الموقع" : "Location",
      value: language === 'ar' ? "الشرقية، مصر" : "al-Sharqia, Egypt",
      color: "blue",
      href: "#"
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className={`py-20 relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.08),transparent_50%)] dark:bg-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.08),transparent_50%)] dark:bg-transparent" />

      <motion.div
        className="max-w-6xl mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          variants={itemVariants}
        >
          {t("contact.title")}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
            </h3>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-500/70 dark:hover:border-blue-500/70 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center space-x-4 group"
                      >
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-md`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <info.icon className="h-6 w-6" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {info.value}
                          </p>
                        </div>
                        <motion.div
                          className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.div>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Card className="p-8 border border-blue-200/50 dark:border-blue-800/50 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <MessageSquare className="h-8 w-8 text-white" />
                </motion.div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {language === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {language === 'ar' ? 'سأقوم بالرد عليك في أقرب وقت ممكن' : 'I\'ll get back to you as soon as possible'}
                </p>
              </CardHeader>

              <CardContent>
                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.name")}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 shadow-sm"
                      placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 shadow-sm"
                      placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.message")}
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className="w-full border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 resize-none shadow-sm"
                      placeholder={language === 'ar' ? 'أدخل رسالتك' : 'Enter your message'}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>{t("contact.sendMessage")}</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

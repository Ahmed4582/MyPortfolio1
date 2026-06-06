import { useEffect } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "../components/portfolio/ContactForm";

const infoItems = [
  {
    icon: Mail,
    label: "Email",
    value: "an2900234@gmail.com",
    href: "mailto:an2900234@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Egypt",
    href: null,
  },
];

const ContactPage = () => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <section id="Contact" className="bg-[#060913] px-[5%] py-20 lg:px-[10%]">
      {/* Header */}
      <div className="mb-14 text-center" data-aos="fade-down" data-aos-duration="800">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Get In Touch
        </p>
        <h2 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Contact Me
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-400 text-sm md:text-base">
          Have a project in mind or just want to say hi? Drop me a message and I&apos;ll get back to you.
        </p>
      </div>

      <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-[1fr_420px]" data-aos="fade-up" data-aos-duration="800">

        {/* ── Left — Info panel ── */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Let&apos;s work together</h3>
                <p className="text-sm text-slate-400">I&apos;m open to new opportunities</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Whether you have a project idea, a collaboration proposal, or just
              want to connect — I&apos;m always happy to chat. I typically respond
              within 24 hours.
            </p>
          </div>

          {/* Contact info items */}
          <div className="space-y-3">
            {infoItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-200 hover:border-cyan-500/20 hover:bg-cyan-500/[0.04]">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className="text-sm font-medium text-slate-200">{item.value}</p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href}>{content}</a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          {/* Social links */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Follow Me
            </p>
            <div className="flex gap-3">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* ── Right — Form ── */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 sm:p-8">
          <h3 className="mb-1 text-xl font-bold text-white">Send a message</h3>
          <p className="mb-6 text-sm text-slate-400">I&apos;ll reply as soon as possible.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

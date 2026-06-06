import { useState } from "react";
import PropTypes from "prop-types";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import { SkeletonCard } from "../ui/Skeleton";

const threshold = 80;

const CertificatesCarousel = ({ certificates, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeCertificate = certificates[activeIndex];

  const goPrev = () => {
    if (certificates.length === 0) return;
    setActiveIndex((index) => (index - 1 + certificates.length) % certificates.length);
  };

  const goNext = () => {
    if (certificates.length === 0) return;
    setActiveIndex((index) => (index + 1) % certificates.length);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <SkeletonCard key={item} />
        ))}
      </div>
    );
  }

  if (!activeCertificate) {
    return <p className="py-12 text-center text-sm text-slate-500">No certificates available.</p>;
  }

  return (
    <section
      role="region"
      aria-label="Certificates carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goPrev();
        if (event.key === "ArrowRight") goNext();
      }}
      className="outline-none focus:ring-2 focus:ring-purple-400"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <button
            type="button"
            aria-label="Previous certificate"
            onClick={goPrev}
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.div
            key={activeCertificate.id}
            drag={shouldReduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x > threshold) goPrev();
              if (info.offset.x < -threshold) goNext();
            }}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
            aria-live="polite"
            aria-atomic="true"
            className="min-w-0 flex-1"
          >
            <article className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-slate-950/40">
                <div className="flex aspect-video items-center justify-center bg-white p-4">
                  <img
                    src={activeCertificate.image || "/images/placeholder-cert.jpg"}
                    alt={activeCertificate.title || "Certificate"}
                    className="max-h-full max-w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.src = "/images/placeholder-cert.jpg";
                    }}
                  />
                </div>
                {(activeCertificate.title || activeCertificate.issuer) && (
                  <div className="p-4">
                    {activeCertificate.title && (
                      <h3 className="font-semibold text-white">{activeCertificate.title}</h3>
                    )}
                    {activeCertificate.issuer && (
                      <p className="mt-1 text-sm text-slate-400">
                        {activeCertificate.issuer}{activeCertificate.year ? ` · ${activeCertificate.year}` : ""}
                      </p>
                    )}
                  </div>
                )}
              </article>
          </motion.div>

          <button
            type="button"
            aria-label="Next certificate"
            onClick={goNext}
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {certificates.map((certificate, index) => (
            <button
              key={certificate.id}
              type="button"
              aria-label={`Show certificate ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-purple-400" : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

CertificatesCarousel.propTypes = {
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      issuer: PropTypes.string,
      year: PropTypes.number,
      image: PropTypes.string,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CertificatesCarousel;

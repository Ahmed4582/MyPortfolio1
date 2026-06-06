import { motion } from "framer-motion";
import useJsonData from "../../hooks/useJsonData";
import { Skeleton } from "../ui/Skeleton";
import Tooltip from "../ui/Tooltip";

const tiers = ["Expert", "Proficient", "Familiar"];

const tierAccent = {
  Expert:     "border-cyan-500/25 bg-cyan-500/10 text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/20 focus:ring-cyan-400",
  Proficient: "border-blue-500/25 bg-blue-500/10 text-blue-300 hover:border-blue-400/40 hover:bg-blue-500/20 focus:ring-blue-400",
  Familiar:   "border-slate-500/25 bg-slate-500/10 text-slate-300 hover:border-slate-400/40 hover:bg-slate-500/20 focus:ring-slate-400",
};

const SkillsChart = () => {
  const { data: skills, loading } = useJsonData("/data/skills.json");

  const grouped = tiers.map((tier) => ({
    tier,
    skills: skills.filter((s) => s.tier === tier),
  }));

  return (
    <section id="Skills" className="bg-[#060913] px-[5%] py-16 text-white lg:px-[10%]">
      <div>
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            What I Use
          </p>
          <h2 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            Skills
          </h2>
          <p className="mt-2 text-sm text-slate-400 md:text-base">
            Technologies I work with, grouped by proficiency.
          </p>
        </div>

        <div className="space-y-4">
          {loading
            ? tiers.map((tier) => (
                <div key={tier} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <Skeleton className="h-6 w-28" />
                  <div className="mt-4 flex flex-wrap gap-3">
                    {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-8 w-24 rounded-full" />)}
                  </div>
                </div>
              ))
            : grouped.map(({ tier, skills: tierSkills }) => (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-300 hover:border-cyan-500/10"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                    {tier}
                  </h3>
                  <div role="list" className="mt-4 flex flex-wrap gap-2.5">
                    {tierSkills.map((skill) => (
                      <Tooltip key={skill.name} content={skill.tooltip}>
                        <span
                          role="listitem"
                          tabIndex={0}
                          className={`inline-flex rounded-full border px-4 py-1.5 text-sm font-medium outline-none transition focus:ring-2 ${tierAccent[tier]}`}
                        >
                          {skill.name}
                          <span className="sr-only">, {tier} skill</span>
                        </span>
                      </Tooltip>
                    ))}
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsChart;

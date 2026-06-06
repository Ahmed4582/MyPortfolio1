import PropTypes from "prop-types";

const Tooltip = ({ content, children }) => (
  <span className="relative inline-flex group">
    {children}
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-100 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      {content}
    </span>
  </span>
);

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;

import PropTypes from "prop-types";

const SectionWrapper = ({ id, className = "", children }) => (
  <section
    id={id}
    className={`px-[5%] sm:px-[5%] lg:px-[10%] ${className}`}
  >
    {children}
  </section>
);

SectionWrapper.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SectionWrapper;

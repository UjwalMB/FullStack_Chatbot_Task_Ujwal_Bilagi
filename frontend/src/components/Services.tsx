const services = [
  {
    icon: "🚁",
    title: "Drone Services",
    description:
      "Professional drone solutions for aerial photography, inspection, mapping and other applications.",
  },
  {
    icon: "🗺️",
    title: "Aerial Mapping",
    description:
      "Capture aerial data and create useful maps and visual information using modern drone technology.",
  },
  {
    icon: "📸",
    title: "Aerial Photography",
    description:
      "High-quality aerial imagery for projects, events, property and promotional requirements.",
  },
];

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="section-heading">
        <span>WHAT WE OFFER</span>
        <h2>Professional Drone Services</h2>
        <p>
          Explore our range of drone-based solutions designed for different
          business and project requirements.
        </p>
      </div>

      <div className="cards-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-icon">{service.icon}</div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <a href="#contact">Learn more →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
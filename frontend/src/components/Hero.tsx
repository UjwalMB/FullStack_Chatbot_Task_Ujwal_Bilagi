function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-badge">
          🚁 Drone Technology & Training
        </div>

        <h1>
          Explore the Future
          <span> From the Sky</span>
        </h1>

        <p>
          Discover professional drone services and training programs.
          Get answers to your questions and connect with our team.
        </p>

        <div className="hero-buttons">
          <a href="#services" className="primary-button">
            Explore Services
          </a>

          <a href="#chatbot" className="secondary-button">
            💬 Ask Our Assistant
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>01</strong>
            <span>Drone Services</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Professional Training</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Expert Support</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="drone-card">
          <div className="drone-icon">🚁</div>

          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="floating-card card-one">
            <span>✦</span>
            <div>
              <strong>Smart</strong>
              <small>Technology</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <span>🎓</span>
            <div>
              <strong>Learn</strong>
              <small>Drone Skills</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
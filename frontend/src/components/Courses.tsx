const courses = [
  {
    level: "BEGINNER",
    title: "Drone Pilot Training",
    description:
      "Learn the fundamentals of drones, flight operations, safety and basic practical skills.",
  },
  {
    level: "INTERMEDIATE",
    title: "Advanced Drone Operations",
    description:
      "Develop practical knowledge of advanced drone operations and professional workflows.",
  },
  {
    level: "PROFESSIONAL",
    title: "Professional Drone Skills",
    description:
      "Build industry-focused skills for working with drones in professional environments.",
  },
];

function Courses() {
  return (
    <section className="section courses-section" id="courses">
      <div className="section-heading">
        <span>LEARN & GROW</span>
        <h2>Drone Training Programs</h2>
        <p>
          Build your knowledge and practical skills with structured drone
          training programs.
        </p>
      </div>

      <div className="cards-grid">
        {courses.map((course) => (
          <article className="course-card" key={course.title}>
            <div className="course-level">{course.level}</div>

            <h3>{course.title}</h3>

            <p>{course.description}</p>

            <a href="#contact">Enquire now →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Courses;
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  userType: string;
  interest: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  userType: "",
  interest: "",
  message: "",
};

function EnquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSuccess("");
  };

  // Validate form
  const validate = () => {
    const newErrors: Partial<FormData> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    // User type validation
    if (!formData.userType) {
      newErrors.userType = "Please select a user type";
    }

    // Interest validation
    if (!formData.interest) {
      newErrors.interest = "Please select your interest";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form to backend
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) {
      setSuccess("");
      return;
    }

    setIsSubmitting(true);
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit enquiry"
        );
      }

      setSuccess(
        "Your enquiry has been submitted successfully! Our team will contact you soon."
      );

      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Enquiry submission error:", error);

      setSuccess(
        "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="enquiry-section" id="contact">
      <div className="enquiry-container">

        {/* Left Side */}
        <div className="enquiry-info">
          <span>GET IN TOUCH</span>

          <h2>Have a question?</h2>

          <p>
            Tell us what you're looking for and our team will
            get back to you with the right information.
          </p>

          <div className="contact-points">

            <div>
              <div className="contact-icon">💬</div>

              <div>
                <strong>Quick Support</strong>

                <p>
                  Get answers to your questions.
                </p>
              </div>
            </div>

            <div>
              <div className="contact-icon">🎓</div>

              <div>
                <strong>Training Enquiries</strong>

                <p>
                  Ask about our drone courses.
                </p>
              </div>
            </div>

            <div>
              <div className="contact-icon">🚁</div>

              <div>
                <strong>Drone Services</strong>

                <p>
                  Tell us about your project.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Form */}
        <form
          className="enquiry-form"
          onSubmit={handleSubmit}
        >

          {/* Name + Email */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="name">
                Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <small className="error">
                  {errors.name}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <small className="error">
                  {errors.email}
                </small>
              )}
            </div>

          </div>

          {/* Phone + User Type */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="phone">
                Phone *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
              />

              {errors.phone && (
                <small className="error">
                  {errors.phone}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="userType">
                User Type *
              </label>

              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="">
                  Select type
                </option>

                <option value="Student">
                  Student
                </option>

                <option value="Customer">
                  Customer
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              {errors.userType && (
                <small className="error">
                  {errors.userType}
                </small>
              )}
            </div>

          </div>

          {/* Interest */}
          <div className="form-group">
            <label htmlFor="interest">
              Service / Course of Interest *
            </label>

            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
            >
              <option value="">
                Select an option
              </option>

              <option value="Drone Services">
                Drone Services
              </option>

              <option value="Aerial Mapping">
                Aerial Mapping
              </option>

              <option value="Aerial Photography">
                Aerial Photography
              </option>

              <option value="Drone Pilot Training">
                Drone Pilot Training
              </option>

              <option value="Advanced Drone Operations">
                Advanced Drone Operations
              </option>

              <option value="Professional Drone Skills">
                Professional Drone Skills
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            {errors.interest && (
              <small className="error">
                {errors.interest}
              </small>
            )}
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message">
              Message *
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChange={handleChange}
            />

            {errors.message && (
              <small className="error">
                {errors.message}
              </small>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <div className="success-message">
              ✓ {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Enquiry →"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default EnquiryForm;
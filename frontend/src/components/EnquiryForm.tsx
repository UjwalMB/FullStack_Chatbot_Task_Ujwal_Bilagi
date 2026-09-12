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

const API_URL = `${import.meta.env.VITE_API_URL}/api/enquiries`;

function EnquiryForm() {
  const [formData, setFormData] =
    useState<FormData>(initialForm);

  const [errors, setErrors] =
    useState<Partial<FormData>>({});

  const [success, setSuccess] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
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

  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[0-9]{10}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    // User type
    if (!formData.userType) {
      newErrors.userType =
        "Please select a user type";
    }

    // Interest
    if (!formData.interest) {
      newErrors.interest =
        "Please select your interest";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message =
        "Message is required";
    } else if (
      formData.message.trim().length < 10
    ) {
      newErrors.message =
        "Message must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) {
      setSuccess("");
      return;
    }

    setIsSubmitting(true);
    setSuccess("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          userType: formData.userType,
          interest: formData.interest,
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to submit enquiry"
        );
      }

      setSuccess(
        "Your enquiry has been submitted successfully! Our team will contact you soon."
      );

      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      console.error(
        "Enquiry submission error:",
        error
      );

      setSuccess(
        "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <section
      className="enquiry-section"
      id="contact"
    >
      <div className="enquiry-container">

        {/* LEFT SIDE */}

        <div className="enquiry-info">

          <span>GET IN TOUCH</span>

          <h2>Have a question?</h2>

          <p>
            Tell us what you're looking for and
            our team will get back to you with
            the right information.
          </p>

          <div className="contact-points">

            <div>
              <div className="contact-icon">
                💬
              </div>

              <div>
                <strong>
                  Quick Support
                </strong>

                <p>
                  Get answers to your questions.
                </p>
              </div>
            </div>

            <div>
              <div className="contact-icon">
                🎓
              </div>

              <div>
                <strong>
                  Training Enquiries
                </strong>

                <p>
                  Ask about our drone courses.
                </p>
              </div>
            </div>

            <div>
              <div className="contact-icon">
                🚁
              </div>

              <div>
                <strong>
                  Drone Services
                </strong>

                <p>
                  Tell us about your project.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* FORM */}

        <form
          className="enquiry-form"
          onSubmit={handleSubmit}
        >

          {/* NAME + EMAIL */}

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

          {/* PHONE + USER TYPE */}

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="phone">
                Phone *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
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

          {/* INTEREST */}

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

          {/* MESSAGE */}

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

          {/* SUCCESS */}

          {success && (
            <div className="success-message">
              ✓ {success}
            </div>
          )}

          {/* SUBMIT */}

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
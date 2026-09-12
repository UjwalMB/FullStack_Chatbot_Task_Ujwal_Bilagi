import { useEffect, useState } from "react";

type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: "Student" | "Customer" | "Other";
  interest: string;
  message: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  created_at: string;
  updated_at?: string;
};

type AdminDashboardProps = {
  onLogout: () => void;
};

const API_URL = "http://localhost:5001/api/enquiries";

const ADMIN_API_KEY =
  import.meta.env.VITE_ADMIN_API_KEY || "my-super-secret-admin-key";

const adminHeaders = {
  "x-admin-key": ADMIN_API_KEY,
};

function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("All");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState<Enquiry | null>(null);

  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ==========================================
  // FETCH ENQUIRIES
  // ==========================================

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        headers: adminHeaders,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch enquiries."
        );
      }

      setEnquiries(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load enquiries. Please check the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const updateStatus = async (
    id: number,
    status: Enquiry["status"]
  ) => {
    try {
      setUpdatingId(id);
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
          ...adminHeaders,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status."
        );
      }

      setEnquiries((currentEnquiries) =>
        currentEnquiries.map((enquiry) =>
          enquiry.id === id
            ? {
                ...enquiry,
                status,
              }
            : enquiry
        )
      );

      // Also update the selected enquiry if it is open
      setSelectedEnquiry((current) =>
        current && current.id === id
          ? {
              ...current,
              status,
            }
          : current
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to update enquiry status. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // DELETE ENQUIRY
  // ==========================================

  const deleteEnquiry = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",

        headers: adminHeaders,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete enquiry."
        );
      }

      setEnquiries((currentEnquiries) =>
        currentEnquiries.filter(
          (enquiry) => enquiry.id !== id
        )
      );

      // Close details modal if deleted enquiry was open
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to delete enquiry. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      enquiry.name.toLowerCase().includes(search) ||
      enquiry.email.toLowerCase().includes(search) ||
      enquiry.phone.toLowerCase().includes(search) ||
      enquiry.interest.toLowerCase().includes(search);

    const matchesUserType =
      userTypeFilter === "All" ||
      enquiry.user_type === userTypeFilter;

    return matchesSearch && matchesUserType;
  });

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalEnquiries = enquiries.length;

  const newEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "New"
  ).length;

  const contactedEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "Contacted"
  ).length;

  const inProgressEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "In Progress"
  ).length;

  const closedEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "Closed"
  ).length;

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    sessionStorage.removeItem("adminLoggedIn");

    onLogout();
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-loading">
          <div className="admin-loading-icon">🚁</div>

          <h2>Loading Dashboard...</h2>

          <p>Please wait while we load the enquiries.</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="admin-dashboard-page">
      {/* ======================================
          HEADER
      ====================================== */}

      <header className="admin-dashboard-header">
        <div className="admin-dashboard-brand">
          <div className="admin-dashboard-logo">
            🚁
          </div>

          <div>
            <h1>DroneTV Admin</h1>

            <p>Enquiry Management Dashboard</p>
          </div>
        </div>

        <button
          className="admin-logout-button"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>
      </header>

      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (
        <div className="admin-error">
          ⚠️ {error}
        </div>
      )}

      {/* ======================================
          STATISTICS
      ====================================== */}

      <section className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📋</div>

          <div>
            <span>Total Enquiries</span>
            <strong>{totalEnquiries}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">🆕</div>

          <div>
            <span>New</span>
            <strong>{newEnquiries}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">📞</div>

          <div>
            <span>Contacted</span>
            <strong>{contactedEnquiries}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">⏳</div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressEnquiries}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">✅</div>

          <div>
            <span>Closed</span>
            <strong>{closedEnquiries}</strong>
          </div>
        </div>
      </section>

      {/* ======================================
          CONTROLS
      ====================================== */}

      <section className="admin-controls">
        <div className="admin-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by name, email, phone or interest..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <select
          value={userTypeFilter}
          onChange={(event) =>
            setUserTypeFilter(event.target.value)
          }
          className="admin-filter"
        >
          <option value="All">All Users</option>
          <option value="Student">Students</option>
          <option value="Customer">Customers</option>
          <option value="Other">Other</option>
        </select>

        <button
          className="admin-refresh-button"
          onClick={fetchEnquiries}
        >
          ↻ Refresh
        </button>
      </section>

      {/* ======================================
          ENQUIRIES TABLE
      ====================================== */}

      <section className="admin-table-section">
        <div className="admin-section-header">
          <div>
            <h2>Enquiries</h2>

            <p>
              Showing {filteredEnquiries.length} of{" "}
              {totalEnquiries} enquiries
            </p>
          </div>
        </div>

        {filteredEnquiries.length === 0 ? (
          <div className="admin-empty">
            <div>📭</div>

            <h3>No enquiries found</h3>

            <p>
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>User Type</th>
                  <th>Interest</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>#{enquiry.id}</td>

                    <td>
                      <strong>{enquiry.name}</strong>
                    </td>

                    <td>
                      <div className="admin-contact">
                        <span>{enquiry.email}</span>
                        <span>{enquiry.phone}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`user-type-badge ${enquiry.user_type.toLowerCase()}`}
                      >
                        {enquiry.user_type}
                      </span>
                    </td>

                    <td>{enquiry.interest}</td>

                    <td>
                      <select
                        value={enquiry.status}
                        disabled={
                          updatingId === enquiry.id
                        }
                        onChange={(event) =>
                          updateStatus(
                            enquiry.id,
                            event.target
                              .value as Enquiry["status"]
                          )
                        }
                        className={`status-select status-${enquiry.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <option value="New">New</option>

                        <option value="Contacted">
                          Contacted
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Closed">
                          Closed
                        </option>
                      </select>
                    </td>

                    <td>
                      {new Date(
                        enquiry.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <div className="admin-actions">
                        <button
                          className="view-button"
                          onClick={() =>
                            setSelectedEnquiry(enquiry)
                          }
                        >
                          View
                        </button>

                        <button
                          className="delete-button"
                          disabled={
                            deletingId === enquiry.id
                          }
                          onClick={() =>
                            deleteEnquiry(enquiry.id)
                          }
                        >
                          {deletingId === enquiry.id
                            ? "..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ======================================
          DETAILS MODAL
      ====================================== */}

      {selectedEnquiry && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="admin-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-modal-header">
              <div>
                <span>ENQUIRY #{selectedEnquiry.id}</span>

                <h2>Enquiry Details</h2>
              </div>

              <button
                className="modal-close-button"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
              >
                ×
              </button>
            </div>

            <div className="admin-details">
              <div className="detail-item">
                <span>Name</span>
                <strong>
                  {selectedEnquiry.name}
                </strong>
              </div>

              <div className="detail-item">
                <span>Email</span>
                <strong>
                  {selectedEnquiry.email}
                </strong>
              </div>

              <div className="detail-item">
                <span>Phone</span>
                <strong>
                  {selectedEnquiry.phone}
                </strong>
              </div>

              <div className="detail-item">
                <span>User Type</span>
                <strong>
                  {selectedEnquiry.user_type}
                </strong>
              </div>

              <div className="detail-item">
                <span>Interest</span>
                <strong>
                  {selectedEnquiry.interest}
                </strong>
              </div>

              <div className="detail-item">
                <span>Status</span>

                <strong>
                  {selectedEnquiry.status}
                </strong>
              </div>

              <div className="detail-item detail-message">
                <span>Message</span>

                <p>
                  {selectedEnquiry.message}
                </p>
              </div>

              <div className="detail-item">
                <span>Submitted</span>

                <strong>
                  {new Date(
                    selectedEnquiry.created_at
                  ).toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                className="modal-close-action"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
              >
                Close
              </button>

              <button
                className="modal-delete-action"
                onClick={() => {
                  deleteEnquiry(selectedEnquiry.id);
                }}
              >
                Delete Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
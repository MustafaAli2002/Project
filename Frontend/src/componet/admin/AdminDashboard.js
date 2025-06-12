import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faUsers,
  faNewspaper,
  faSignOutAlt,
  faFilePdf,
  faCheck,
  faTimes,
  faUser,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from './Admin.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState({
    applications: false,
    approved: false,
    news: false
  });

  // Fetch pending applications
  const fetchApplications = async () => {
    setLoading((prev) => ({ ...prev, applications: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/admin/applications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setApplications(Array.isArray(data) ? data : data.applications ?? []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setLoading((prev) => ({ ...prev, applications: false }));
    }
  };

  // Fetch approved applications
  const fetchApprovedApplications = async () => {
    setLoading((prev) => ({ ...prev, approved: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/admin/approved-applications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setApprovedApplications(Array.isArray(data) ? data : data.applications ?? []);
    } catch (error) {
      console.error('Error fetching approved applications:', error);
      setApprovedApplications([]);
    } finally {
      setLoading((prev) => ({ ...prev, approved: false }));
    }
  };

  // Fetch news items
  const fetchNewsItems = async () => {
    setLoading((prev) => ({ ...prev, news: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/admin/news', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNewsItems(Array.isArray(data) ? data : data.news ?? []);
      // كونسول للتأكد من شكل البيانات القادمة
      console.log('News Items:', data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsItems([]);
    } finally {
      setLoading((prev) => ({ ...prev, news: false }));
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (activeTab === 'news') {
      fetchNewsItems();
    } else if (activeTab === 'approved') {
      fetchApprovedApplications();
    }
  }, [activeTab]);

  const handleApplicationAction = async (id, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this application?`)) return;

    const token = localStorage.getItem('token');
    const url = `http://127.0.0.1:8000/api/admin/applications/${id}/${action}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: action === 'approve' ? 'approved' : 'rejected' } : app
          )
        );
        if (action === 'approve') {
          fetchApprovedApplications();
        }
      } else {
        console.error('Failed to update status');
        alert('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application:', error);
      alert('An error occurred while updating application');
    }
  };

  const handleNewsAction = async (id, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this news item?`)) return;

    const token = localStorage.getItem('token');
    const url = `http://127.0.0.1:8000/api/admin/news/${id}/${action}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNewsItems((prev) => prev.filter((news) => news.id !== id));
        alert(`News item ${action === 'publish' ? 'published' : 'deleted'} successfully`);
      } else {
        console.error('Failed to update news status');
        alert('Failed to update news status');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      alert('An error occurred while updating news');
    }
  };

  // Navigate to profile page
  const handleProfile = () => {
    navigate('/profile');
  };

  // Handle logout - Clears token and navigates to login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2>Admin Dashboard</h2>
        </div>
        <nav>
          <button
            className={`${styles['nav-item']} ${activeTab === 'applications' ? styles.active : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Pending Applications</span>
          </button>
          <button
            className={`${styles['nav-item']} ${activeTab === 'news' ? styles.active : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <FontAwesomeIcon icon={faNewspaper} />
            <span>Pending News</span>
          </button>
          <button
            className={`${styles['nav-item']} ${styles.profile}`}
            onClick={handleProfile}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </button>
        </nav>
        <button className={`${styles['nav-item']} ${styles.logout}`} onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </div>

      <div className={styles['main-content']}>
        {activeTab === 'applications' && (
          <div className={styles.card}>
            <h1 className={styles.h1}>Pending Applications</h1>
            {loading.applications ? (
              <p>Loading applications...</p>
            ) : applications.length === 0 ? (
              <p>No pending applications found.</p>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>CV</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td>{application.full_name}</td>
                        <td>{application.email}</td>
                        <td>
                          <a
                            href={application.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.downloadLink}
                          >
                            <FontAwesomeIcon icon={faFilePdf} /> View CV
                          </a>
                        </td>
                        <td>
                          <span className={styles[`status-${application.status}`]}>
                            {application.status}
                          </span>
                        </td>
                        <td className={styles.actionsCell}>
                          <button
                            className={`${styles.btn} ${styles['btn-approve']}`}
                            onClick={() => handleApplicationAction(application.id, 'approve')}
                            disabled={application.status !== 'pending'}
                          >
                            <FontAwesomeIcon icon={faCheck} /> Approve
                          </button>
                          <button
                            className={`${styles.btn} ${styles['btn-reject']}`}
                            onClick={() => handleApplicationAction(application.id, 'reject')}
                            disabled={application.status !== 'pending'}
                          >
                            <FontAwesomeIcon icon={faTimes} /> Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'approved' && (
          <div className={styles.card}>
            <h1 className={styles.h1}>Approved Applications</h1>
            {loading.approved ? (
              <p>Loading approved applications...</p>
            ) : approvedApplications.length === 0 ? (
              <p>No approved applications found.</p>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>CV</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedApplications.map((application) => (
                      <tr key={application.id}>
                        <td>{application.full_name}</td>
                        <td>{application.email}</td>
                        <td>
                          <a
                            href={application.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.downloadLink}
                          >
                            <FontAwesomeIcon icon={faFilePdf} /> View CV
                          </a>
                        </td>
                        <td>
                          <span className={styles[`status-${application.status}`]}>
                            {application.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'news' && (
          <div className={styles.card}>
            <h1 className={styles.h1}>Pending News Items</h1>
            {loading.news ? (
              <p>Loading news items...</p>
            ) : newsItems.length === 0 ? (
              <p>No pending news items found.</p>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsItems.map((news) => (
                      <tr key={news.id}>
                        <td>{news.title}</td>
                        {/* هنا يتم فحص وجود news.content قبل استخدام substring */}
                        <td>{news.content ? `${news.content.substring(0, 100)}...` : 'No content'}</td>
                        <td className={styles.actionsCell}>
                          <button
                            className={`${styles.btn} ${styles['btn-approve']}`}
                            onClick={() => handleNewsAction(news.id, 'publish')}
                          >
                            <FontAwesomeIcon icon={faCheck} /> Publish
                          </button>
                          <button
                            className={`${styles.btn} ${styles['btn-reject']}`}
                            onClick={() => handleNewsAction(news.id, 'delete')}
                          >
                            <FontAwesomeIcon icon={faTimes} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
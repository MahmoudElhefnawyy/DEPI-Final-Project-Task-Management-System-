import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavBar from './navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { FaUserCircle } from 'react-icons/fa';
import { useProfile } from '../context/profileContext';

const Settings = () => {
  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const { profile, updateProfile, updateProfileImage } = useProfile();
  const [previewImage, setPreviewImage] = useState(profile.image);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      notifications: profile.preferences.notifications,
      theme: profile.preferences.theme,
      defaultView: profile.preferences.defaultView,
      emailFrequency: profile.preferences.emailFrequency,
      twoFactor: false,
      sessionTimeout: '60',
      showCompleted: false
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        Swal.fire({
          title: 'Invalid File',
          text: 'Please upload an image file (JPEG, PNG, etc.)',
          icon: 'error',
          confirmButtonColor: '#4caf50'
        });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large',
          text: 'Please upload an image smaller than 2MB',
          icon: 'error',
          confirmButtonColor: '#4caf50'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setPreviewImage(imageUrl);
        updateProfileImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    updateProfile({
      name: data.name,
      email: data.email,
      preferences: {
        theme: data.theme,
        defaultView: data.defaultView,
        notifications: data.notifications,
        emailFrequency: data.emailFrequency
      }
    });

    Swal.fire({
      title: 'Success!',
      text: 'Your settings have been saved.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#4caf50',
      timer: 3000,
      timerProgressBar: true,
      position: 'center'
    });
  };

  return (
    <div className="settings-container" style={{backgroundColor:'#f8f9fa',minHeight:'100vh'}}>
      <style>{`
        .list-group-item:hover {
          background-color: #e8f5e9 !important;
          color: #2e7d32 !important;
        }
        .list-group-item.active {
          background-color: #4caf50 !important;
          border-color: #4caf50 !important;
          color: white !important;
        }
        .btn-success {
          background-color: #4caf50;
          border-color: #4caf50;
        }
        .btn-success:hover {
          background-color: #3d8b40;
          border-color: #3d8b40;
        }
        .is-invalid {
          border-color: #dc3545 !important;
        }
        .invalid-feedback {
          color: #dc3545;
          font-size: 0.875em;
        }
        .profile-preview {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e0f7e0;
          margin-bottom: 15px;
        }
        .image-upload-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        .image-upload-btn {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }
        .image-upload-btn input[type="file"] {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      `}</style>
      
      <NavBar/>
      <div className="container-fluid mt-5">
        <div className="row px-5">
          <div className="col-md-3 mb-5">
            <div className="list-group">
              <button 
                className={`list-group-item list-group-item-action py-3 ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
                style={{ transition: 'all 0.3s ease' }}
              >
                <i className="bi bi-person me-2"></i> Profile
              </button>
              <button 
                className={`list-group-item list-group-item-action py-3 ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
                style={{ transition: 'all 0.3s ease' }}
              >
                <i className="bi bi-gear me-2"></i> Preferences
              </button>
              <button 
                className={`list-group-item list-group-item-action py-3 ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
                style={{ transition: 'all 0.3s ease' }}
              >
                <i className="bi bi-bell me-2"></i> Notifications
              </button>
              <button 
                className={`list-group-item list-group-item-action py-3 ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
                style={{ transition: 'all 0.3s ease' }}
              >
                <i className="bi bi-shield-lock me-2"></i> Security
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(onSubmit)}>
              {activeTab === 'profile' && (
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success mb-4">
                      <i className="bi bi-person me-2"></i> Profile Settings
                    </h5>
                    <div className="image-upload-container">
                      {previewImage ? (
                        <img src={previewImage} alt="Profile Preview" className="profile-preview" />
                      ) : (
                        <FaUserCircle size={120} className="text-muted" />
                      )}
                      <div className="image-upload-btn btn btn-success mt-2">
                        <span>Change Profile Picture</span>
                        <input
                          type="file"
                          id="avatar"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        {...register('name', { 
                          required: 'Name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          },
                          maxLength: {
                            value: 50,
                            message: 'Name must be less than 50 characters'
                          }
                        })}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name.message}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'preferences' && (
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success mb-4">
                      <i className="bi bi-gear me-2"></i> Preferences
                    </h5>
                    <div className="mb-3">
                      <label className="form-label">Default View</label>
                      <select 
                        className="form-select" 
                        {...register('defaultView')}
                      >
                        <option value="list">List View</option>
                        <option value="board">Board View</option>
                        <option value="calendar">Calendar View</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Theme</label>
                      <select 
                        className="form-select" 
                        {...register('theme')}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System Default</option>
                      </select>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="showCompleted"
                        {...register('showCompleted')}
                      />
                      <label className="form-check-label" htmlFor="showCompleted">
                        Show completed tasks
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success mb-4">
                      <i className="bi bi-bell me-2"></i> Notification Settings
                    </h5>
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="notifications"
                        {...register('notifications')}
                      />
                      <label className="form-check-label" htmlFor="notifications">
                        Enable notifications
                      </label>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email Notification Frequency</label>
                      <select 
                        className="form-select" 
                        {...register('emailFrequency')}
                      >
                        <option value="instant">Instant</option>
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Summary</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'security' && (
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success mb-4">
                      <i className="bi bi-shield-lock me-2"></i> Security Settings
                    </h5>
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="twoFactor"
                        {...register('twoFactor')}
                      />
                      <label className="form-check-label" htmlFor="twoFactor">
                        Enable Two-Factor Authentication
                      </label>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Session Timeout</label>
                      <select 
                        className="form-select" 
                        {...register('sessionTimeout')}
                      >
                        <option value="15">15 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="1440">24 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-end mt-3">
                <button type="button" className="btn btn-secondary px-4 py-2 me-2" onClick={() => Navigate('/workSpace')}>
                  <i className="bi bi-back-circle me-2"></i> Back Home
                </button>
                <button type="submit" className="btn btn-success px-4 py-2">
                  <i className="bi bi-check-circle me-2"></i> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
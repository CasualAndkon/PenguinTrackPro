// PenguinTrackPro - Customer Portal Management

// ============================================
// LOCAL STORAGE MANAGEMENT
// ============================================

const STORAGE_KEY = 'penguintrack_appointments';
const SETTINGS_KEY = 'penguintrack_settings';

// Load appointments from local storage
function loadAppointments() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Save appointments to local storage
function saveAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

// Load settings from local storage
function loadSettings() {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : {
    notifications: true,
    emailUpdates: true
  };
}

// Save settings to local storage
function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ============================================
// APPOINTMENT FORM HANDLING
// ============================================

function initializeAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const vehicle = form.querySelector('input[placeholder="Vehicle"]').value;
    const serviceType = form.querySelector('input[placeholder="Service Type"]').value;
    const date = form.querySelector('input[type="date"]').value;
    const time = form.querySelector('input[type="time"]').value;
    const notes = form.querySelector('textarea').value;
    
    // Validate
    if (!vehicle || !serviceType || !date || !time) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create appointment object
    const appointment = {
      id: Date.now(),
      vehicle: vehicle,
      service: serviceType,
      date: date,
      time: time,
      notes: notes,
      status: 'Scheduled',
      cost: '$0'
    };
    
    // Load existing appointments
    let appointments = loadAppointments();
    appointments.push(appointment);
    saveAppointments(appointments);
    
    // Clear form
    form.reset();
    
    // Show success message
    alert('Appointment booked successfully!');
    
    // Update history display
    displayServiceHistory();
  });
}

// ============================================
// SERVICE HISTORY DISPLAY
// ============================================

function displayServiceHistory() {
  const table = document.querySelector('#history table');
  const appointments = loadAppointments();
  
  // Keep the header row
  const headerRow = table.querySelector('tr:first-child');
  
  // Remove all data rows
  const dataRows = table.querySelectorAll('tr:not(:first-child)');
  dataRows.forEach(row => row.remove());
  
  // Add appointments to table
  if (appointments.length === 0) {
    const row = table.insertRow();
    row.innerHTML = '<td colspan="3" style="text-align: center; color: #999;">No appointments yet</td>';
  } else {
    appointments.forEach(apt => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${formatDate(apt.date)} ${apt.time}</td>
        <td>${apt.service} - ${apt.vehicle}</td>
        <td>${apt.cost}</td>
      `;
    });
  }
}

// Helper function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// ============================================
// SETTINGS MANAGEMENT
// ============================================

function initializeSettings() {
  const changePasswordBtn = document.querySelectorAll('#settings button')[0];
  const notificationBtn = document.querySelectorAll('#settings button')[1];
  
  changePasswordBtn.addEventListener('click', function() {
    const newPassword = prompt('Enter new password:');
    if (newPassword && newPassword.length >= 6) {
      alert('Password changed successfully!');
    } else if (newPassword) {
      alert('Password must be at least 6 characters');
    }
  });
  
  notificationBtn.addEventListener('click', function() {
    const settings = loadSettings();
    settings.notifications = !settings.notifications;
    saveSettings(settings);
    alert(`Notifications ${settings.notifications ? 'enabled' : 'disabled'}`);
  });
}

// ============================================
// SMOOTH NAVIGATION
// ============================================

function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('PenguinTrack Pro - Loading...');
  
  // Initialize all features
  initializeAppointmentForm();
  initializeSettings();
  initializeSmoothScroll();
  displayServiceHistory();
  
  console.log('PenguinTrack Pro - Ready!');
});

 let jobApplications = [];
let currentEditIndex = -1;

// DOM elements
const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('jobModal');
const closeModal = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel');
const saveBtn = document.getElementById('save');
const form = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const statusFilter = document.getElementById('status');
const jobTable = document.querySelector('.job-applications table');
const noJobDiv = document.querySelector('.no-job');
const toastContainer = document.getElementById('toastContainer');

// Counter elements
const totalCounter = document.getElementById('total');
const pendingCounter = document.getElementById('pending');
const interviewCounter = document.getElementById('interview');
const acceptedCounter = document.getElementById('accepted');
const rejectedCounter = document.getElementById('rejected');

// Form elements
const jobTitleInput = document.getElementById('jobTitle');
const companyInput = document.getElementById('company');
const dateInput = document.getElementById('date');
const statusSelect = document.getElementById('statusSelect');

// Toast Notification System
function showToast(message, type = 'info', duration = 2000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle',
  };

  toast.innerHTML = `
    <i class="toast-icon ${icons[type]}"></i>
    <span class="toast-message">${message}</span>
    <button class="toast-close">&times;</button>
    <div class="toast-progress"></div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  const progressBar = toast.querySelector('.toast-progress');
  progressBar.style.width = '100%';
  progressBar.style.transitionDuration = `${duration}ms`;
  setTimeout(() => {
    progressBar.style.width = '0%';
  }, 10);

  const removeToast = () => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  };

  const timeoutId = setTimeout(removeToast, duration);

  toast.querySelector('.toast-close').addEventListener('click', () => {
    clearTimeout(timeoutId);
    removeToast();
  });

  toast.addEventListener('click', (e) => {
    if (!e.target.classList.contains('toast-close')) {
      clearTimeout(timeoutId);
      removeToast();
    }
  });
}

// Load from localStorage on startup
window.addEventListener('DOMContentLoaded', () => {
  const storedJobs = localStorage.getItem('jobApplications');
  if (storedJobs) {
    jobApplications = JSON.parse(storedJobs);
    renderJobs();
    updateCounters();
  }
});

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
}

// Event listeners
addBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalHandler);
cancelBtn.addEventListener('click', closeModalHandler);
saveBtn.addEventListener('click', saveJob);
searchInput.addEventListener('input', filterJobs);
statusFilter.addEventListener('change', filterJobs);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModalHandler();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault(); 
});

// Functions
function openModal() {
  modal.classList.add('show');
  currentEditIndex = -1;
  clearForm();
  document.querySelector('.modal-content h2').textContent = 'Add Job Application';
  showToast('Ready to add a new job application', 'info', 2000);
}

function closeModalHandler() {
  modal.classList.remove('show');
  clearForm();
  currentEditIndex = -1;
}

function clearForm() {
  jobTitleInput.value = '';
  companyInput.value = '';
  dateInput.value = '';
  statusSelect.value = 'Pending';
}

function saveJob() {
  const jobTitle = jobTitleInput.value.trim();
  const company = companyInput.value.trim();
  const date = dateInput.value;
  const status = statusSelect.value;

  if (!jobTitle || !company || !date) {
    showToast('Please complete all fields', 'error');
    return;
  }

  const jobData = {
    id: currentEditIndex >= 0 ? jobApplications[currentEditIndex].id : Date.now(),
    jobTitle,
    company,
    date,
    status,
  };

  const originalText = saveBtn.textContent;
  saveBtn.innerHTML = `<span class="loading"></span> Saving...`;
  saveBtn.disabled = true;

  setTimeout(() => {
    if (currentEditIndex >= 0) {
      jobApplications[currentEditIndex] = jobData;
      showToast(`Job application updated successfully`, 'success');
    } else {
      jobApplications.push(jobData);
      showToast(`Job application added successfully`, 'success');
    }

    saveToLocalStorage();

    saveBtn.textContent = originalText;
    saveBtn.disabled = false;

    closeModalHandler();
    renderJobs();
    updateCounters();
  }, 800);
}

function deleteJob(index) {
  jobApplications.splice(index, 1);
  saveToLocalStorage();
  showToast(`Job application deleted`, 'warning');
  renderJobs();
  updateCounters();
}

function editJob(index) {
  const job = jobApplications[index];
  currentEditIndex = index;

  jobTitleInput.value = job.jobTitle;
  companyInput.value = job.company;
  dateInput.value = job.date;
  statusSelect.value = job.status;

  document.querySelector('.modal-content h2').textContent = 'Edit Job Application';
  modal.classList.add('show');
  showToast('Editing job application', 'info', 2000);
}

function renderJobs(jobsToRender = jobApplications) {
  const rows = jobTable.querySelectorAll('tr:not(:first-child)');
  rows.forEach((row) => row.remove());

  if (jobsToRender.length === 0) {
    noJobDiv.style.display = 'block';
    return;
  }

  noJobDiv.style.display = 'none';

  jobsToRender.forEach((job, index) => {
    const row = document.createElement('tr');
    row.className = 'new-row';
    row.innerHTML = `
      <td>${job.jobTitle}</td>
      <td>${job.company}</td>
      <td>${formatDate(job.date)}</td>
      <td><span class="status-badge status-${job.status.toLowerCase()}">${job.status}</span></td>
      <td class="actions">
        <button class="edit-btn" onclick="editJob(${getOriginalIndex(job.id)})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn" onclick="deleteJob(${getOriginalIndex(job.id)})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    jobTable.appendChild(row);
  });
}

function getOriginalIndex(jobId) {
  return jobApplications.findIndex((job) => job.id === jobId);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function updateCounters() {
  const total = jobApplications.length;
  const pending = jobApplications.filter((job) => job.status === 'Pending').length;
  const interview = jobApplications.filter((job) => job.status === 'Interview').length;
  const accepted = jobApplications.filter((job) => job.status === 'Accepted').length;
  const rejected = jobApplications.filter((job) => job.status === 'Rejected').length;

  if (total !== parseInt(totalCounter.textContent)) totalCounter.classList.add('pulse');
  if (pending !== parseInt(pendingCounter.textContent)) pendingCounter.classList.add('pulse');
  if (interview !== parseInt(interviewCounter.textContent)) interviewCounter.classList.add('pulse');
  if (accepted !== parseInt(acceptedCounter.textContent)) acceptedCounter.classList.add('pulse');
  if (rejected !== parseInt(rejectedCounter.textContent)) rejectedCounter.classList.add('pulse');

  setTimeout(() => {
    totalCounter.classList.remove('pulse');
    pendingCounter.classList.remove('pulse');
    interviewCounter.classList.remove('pulse');
    acceptedCounter.classList.remove('pulse');
    rejectedCounter.classList.remove('pulse');
  }, 500);

  totalCounter.textContent = total;
  pendingCounter.textContent = pending;
  interviewCounter.textContent = interview;
  acceptedCounter.textContent = accepted;
  rejectedCounter.textContent = rejected;
}

function filterJobs() {
  const searchTerm = searchInput.value.toLowerCase();
  const statusValue = statusFilter.value;

  let filteredJobs = jobApplications.filter((job) => {
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm);
    const matchesStatus = statusValue === 'all' || job.status === statusValue;

    return matchesSearch && matchesStatus;
  });

  renderJobs(filteredJobs);

  if (searchTerm || statusValue !== 'all') {
    showToast(
      `Showing ${filteredJobs.length} matching application${filteredJobs.length !== 1 ? 's' : ''}`,
      'info',
      2000
    );
  }
}
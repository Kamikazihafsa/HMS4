// Doctors page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load properly with a slightly longer timeout
    setTimeout(initializeDoctorsPage, 500); // Increased to 500ms for reliability
});

function initializeDoctorsPage() {
    console.log('Initializing Doctors Page'); // Debug log for initialization

    // Set the active page in the sidebar
    highlightSidebarLink('doctors.html');
    
    // Setup view toggle functionality
    setupViewToggle();
    
    // Setup filter functionality
    setupFilters();
    
    // Setup modal functionality for doctor details
    setupDoctorModals();
    
    // Setup form actions
    setupFormActions();
}

// Highlight the current sidebar link
function highlightSidebarLink(page) {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });
}

// Setup toggle between grid and list views
function setupViewToggle() {
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    
    // Check if all required elements exist
    if (!gridViewBtn || !listViewBtn || !gridView || !listView) {
        console.error('One or more view toggle elements not found:', {
            gridViewBtn,
            listViewBtn,
            gridView,
            listView
        });
        return; // Exit if elements are not found
    }

    console.log('Setting up view toggle'); // Debug log

    // Load user's preference if stored
    const viewPreference = localStorage.getItem('doctorViewPreference') || 'grid';
    if (viewPreference === 'list') {
        showListView();
    } else {
        showGridView();
    }
    
    // Add event listeners for view toggle
    gridViewBtn.addEventListener('click', showGridView);
    listViewBtn.addEventListener('click', showListView);
    
    function showGridView() {
        gridView.style.display = 'block';
        listView.style.display = 'none';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        localStorage.setItem('doctorViewPreference', 'grid');
        console.log('Switched to Grid view');
    }
    
    function showListView() {
        gridView.style.display = 'none';
        listView.style.display = 'block';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        localStorage.setItem('doctorViewPreference', 'list');
        console.log('Switched to List view');
    }
}

// Setup filter functionality
function setupFilters() {
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const specialty = document.getElementById('specialtyFilter').value;
            const status = document.getElementById('statusFilter').value;
            
            // In a real app, this would filter the doctor list
            // For now, we'll show a toast notification
            showToast(`Filtering doctors by Specialty: ${specialty || 'All'} and Status: ${status || 'All'}`);
            
            // Simulate loading
            filterBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Filtering...';
            filterBtn.disabled = true;
            
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter me-1"></i> Filter';
                filterBtn.disabled = false;
            }, 1000);
        });
    }
}

// Setup doctor detail modals
function setupDoctorModals() {
    // View Doctor modal functionality
    const viewButtons = document.querySelectorAll('[data-bs-target="#viewDoctorModal"]');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, we would fetch the doctor details by ID
            // For now, we're just showing the modal with dummy data
            console.log('View Doctor modal triggered');
        });
    });
    
    // Edit Doctor modal functionality
    const editButtons = document.querySelectorAll('[data-bs-target="#editDoctorModal"]');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, we would fetch the doctor details by ID
            // and populate the edit form
            console.log('Edit Doctor modal triggered');
        });
    });
}

// Setup form actions
function setupFormActions() {
    // Add doctor form submission
    const saveButton = document.getElementById('saveDoctor');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Validate the form
            const form = document.getElementById('addDoctorForm');
            if (form.checkValidity()) {
                // In a real app, we would submit the form data to the server
                // For now, we'll just show a toast notification
                showToast('Doctor added successfully!');
                
                // Close the modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('addDoctorModal'));
                modal.hide();
                
                // Reset the form
                form.reset();
            } else {
                // Trigger form validation
                form.reportValidity();
            }
        });
    }
    
    // Edit doctor form submission
    const updateButton = document.getElementById('updateDoctor');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            // Validate the form
            const form = document.getElementById('editDoctorForm');
            if (form.checkValidity()) {
                // In a real app, we would submit the form data to the server
                // For now, we'll just show a toast notification
                showToast('Doctor updated successfully!');
                
                // Close the modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('editDoctorModal'));
                modal.hide();
            } else {
                // Trigger form validation
                form.reportValidity();
            }
        });
    }
}

// Toast notification function (copied from dashboard.js)
function showToast(message) {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white bg-primary border-0';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    document.querySelector('.toast-container').appendChild(toastEl);
    
    // Initialize and show the toast
    const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000
    });
    toast.show();
    
    // Remove toast after it's hidden
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

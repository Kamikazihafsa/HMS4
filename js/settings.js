// Settings page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load properly with a slightly longer timeout
    setTimeout(initializeSettingsPage, 500); // Increased to 500ms for reliability
});

function initializeSettingsPage() {
    console.log('Initializing Settings Page'); // Debug log for initialization

    // Set the active page in the sidebar
    highlightSidebarLink('settings.html');
    
    // Setup form submissions
    setupForms();
    
    // Setup user management
    setupUserManagement();
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

// Setup form submissions
function setupForms() {
    // General Settings Form
    const generalForm = document.getElementById('generalSettingsForm');
    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (generalForm.checkValidity()) {
                showToast('General settings updated successfully!');
            } else {
                generalForm.reportValidity();
            }
        });
    }

    // System Preferences Form
    const systemPreferencesForm = document.getElementById('systemPreferencesForm');
    if (systemPreferencesForm) {
        systemPreferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (systemPreferencesForm.checkValidity()) {
                showToast('System preferences updated successfully!');
            } else {
                systemPreferencesForm.reportValidity();
            }
        });
    }

    // Notifications Form
    const notificationsForm = document.getElementById('notificationsForm');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (notificationsForm.checkValidity()) {
                showToast('Notification settings updated successfully!');
            } else {
                notificationsForm.reportValidity();
            }
        });
    }
}

// Setup user management (add/edit user)
function setupUserManagement() {
    const addUserBtn = document.getElementById('addUserBtn');
    const saveUserBtn = document.getElementById('saveUserBtn');
    const userForm = document.getElementById('userForm');
    const userModalLabel = document.getElementById('userModalLabel');

    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            userModalLabel.textContent = 'Add New User';
            userForm.reset();
            const modal = new bootstrap.Modal(document.getElementById('userModal'));
            modal.show();
        });
    }

    const editUserButtons = document.querySelectorAll('.edit-user-btn');
    editUserButtons.forEach(button => {
        button.addEventListener('click', function() {
            userModalLabel.textContent = 'Edit User';
            // Populate form with sample data (in a real app, fetch from API or table)
            document.getElementById('userName').value = 'Dr. John Doe';
            document.getElementById('userEmail').value = 'john.doe@cityhospital.com';
            document.getElementById('userRole').value = 'admin';
            document.getElementById('userPassword').value = '';
            const modal = new bootstrap.Modal(document.getElementById('userModal'));
            modal.show();
        });
    });

    if (saveUserBtn) {
        saveUserBtn.addEventListener('click', function() {
            if (userForm.checkValidity()) {
                showToast(userModalLabel.textContent === 'Add New User' ? 'User added successfully!' : 'User updated successfully!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
                modal.hide();
                userForm.reset();
            } else {
                userForm.reportValidity();
            }
        });
    }
}

// Toast notification function (copied from previous pages)
function showToast(message) {
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
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
    
    const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000
    });
    toast.show();
    
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

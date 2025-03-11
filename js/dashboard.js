// Dashboard specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set the active page in the sidebar
    setTimeout(function() {
        const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === 'dashboard.html') {
                link.classList.add('active');
            }
        });
    }, 100);
    
    // Refresh button functionality
    const refreshBtn = document.querySelector('.btn-primary');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // Show a loading spinner
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Refreshing...';
            this.disabled = true;
            
            // Simulate refresh delay
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt me-1"></i> Refresh';
                this.disabled = false;
                
                // Show toast notification
                showToast('Dashboard data refreshed successfully!');
            }, 1500);
        });
    }
    
    // Export button functionality
    const exportBtn = document.querySelector('.btn-outline-secondary');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showToast('Dashboard data export started. The file will be downloaded shortly.');
        });
    }
});

// Toast notification function
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

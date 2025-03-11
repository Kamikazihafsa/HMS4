// Billings page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load properly with a slightly longer timeout
    setTimeout(initializeBillingsPage, 500); // Increased to 500ms for reliability
});

function initializeBillingsPage() {
    console.log('Initializing Billings Page'); // Debug log for initialization

    // Set the active page in the sidebar
    highlightSidebarLink('billings.html');
    
    // Setup view toggle functionality
    setupViewToggle();
    
    // Setup filter functionality
    setupFilters();
    
    // Setup modal functionality for bill details
    setupBillModals();
    
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
    
    if (!gridViewBtn || !listViewBtn || !gridView || !listView) {
        console.error('One or more view toggle elements not found:', {
            gridViewBtn,
            listViewBtn,
            gridView,
            listView
        });
        return;
    }

    console.log('Setting up view toggle');

    const viewPreference = localStorage.getItem('billingViewPreference') || 'grid';
    if (viewPreference === 'list') {
        showListView();
    } else {
        showGridView();
    }
    
    gridViewBtn.addEventListener('click', showGridView);
    listViewBtn.addEventListener('click', showListView);
    
    function showGridView() {
        gridView.style.display = 'block';
        listView.style.display = 'none';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        localStorage.setItem('billingViewPreference', 'grid');
        console.log('Switched to Grid view');
    }
    
    function showListView() {
        gridView.style.display = 'none';
        listView.style.display = 'block';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        localStorage.setItem('billingViewPreference', 'list');
        console.log('Switched to List view');
    }
}

// Setup filter functionality
function setupFilters() {
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const patient = document.getElementById('patientSearch').value;
            const startDate = document.getElementById('startDateFilter').value;
            const endDate = document.getElementById('endDateFilter').value;
            const status = document.getElementById('statusFilter').value;
            
            showToast(`Filtering bills by Patient: ${patient || 'All'}, Date Range: ${startDate || 'All'} to ${endDate || 'All'}, Status: ${status || 'All'}`);
            
            filterBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Filtering...';
            filterBtn.disabled = true;
            
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter me-1"></i> Filter';
                filterBtn.disabled = false;
            }, 1000);
        });
    }
}

// Setup bill detail modals
function setupBillModals() {
    const viewButtons = document.querySelectorAll('[data-bs-target="#viewBillModal"]');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('View Bill modal triggered');
        });
    });

    const editButtons = document.querySelectorAll('[data-bs-target="#editBillModal"]');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Edit Bill modal triggered');
        });
    });
}

// Setup form actions
function setupFormActions() {
    // Add bill form submission
    const saveButton = document.getElementById('saveBill');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const form = document.getElementById('addBillForm');
            if (form.checkValidity()) {
                showToast('Bill added successfully!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('addBillModal'));
                modal.hide();
                form.reset();
            } else {
                form.reportValidity();
            }
        });
    }

    // Edit bill form submission
    const updateButton = document.getElementById('updateBill');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            const form = document.getElementById('editBillForm');
            if (form.checkValidity()) {
                showToast('Bill updated successfully!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('editBillModal'));
                modal.hide();
            } else {
                form.reportValidity();
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

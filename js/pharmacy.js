// Pharmacy page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load properly with a slightly longer timeout
    setTimeout(initializePharmacyPage, 500); // Increased to 500ms for reliability
});

function initializePharmacyPage() {
    console.log('Initializing Pharmacy Page'); // Debug log for initialization

    // Set the active page in the sidebar
    highlightSidebarLink('pharmacy.html');
    
    // Setup view toggle functionality
    setupViewToggle();
    
    // Setup filter functionality
    setupFilters();
    
    // Setup modal functionality for medicine details
    setupMedicineModals();
    
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

    const viewPreference = localStorage.getItem('pharmacyViewPreference') || 'grid';
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
        localStorage.setItem('pharmacyViewPreference', 'grid');
        console.log('Switched to Grid view');
    }
    
    function showListView() {
        gridView.style.display = 'none';
        listView.style.display = 'block';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        localStorage.setItem('pharmacyViewPreference', 'list');
        console.log('Switched to List view');
    }
}

// Setup filter functionality
function setupFilters() {
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const medicine = document.getElementById('medicineSearch').value;
            const category = document.getElementById('categoryFilter').value;
            const stock = document.getElementById('stockFilter').value;
            
            showToast(`Filtering medicines by Name: ${medicine || 'All'}, Category: ${category || 'All'}, Stock: ${stock || 'All'}`);
            
            filterBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Filtering...';
            filterBtn.disabled = true;
            
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter me-1"></i> Filter';
                filterBtn.disabled = false;
            }, 1000);
        });
    }
}

// Setup medicine detail modals
function setupMedicineModals() {
    const viewButtons = document.querySelectorAll('[data-bs-target="#viewMedicineModal"]');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('View Medicine modal triggered');
        });
    });

    const editButtons = document.querySelectorAll('[data-bs-target="#editMedicineModal"]');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Edit Medicine modal triggered');
        });
    });
}

// Setup form actions
function setupFormActions() {
    // Add medicine form submission
    const saveButton = document.getElementById('saveMedicine');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const form = document.getElementById('addMedicineForm');
            if (form.checkValidity()) {
                showToast('Medicine added successfully!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('addMedicineModal'));
                modal.hide();
                form.reset();
            } else {
                form.reportValidity();
            }
        });
    }

    // Edit medicine form submission
    const updateButton = document.getElementById('updateMedicine');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            const form = document.getElementById('editMedicineForm');
            if (form.checkValidity()) {
                showToast('Medicine updated successfully!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('editMedicineModal'));
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

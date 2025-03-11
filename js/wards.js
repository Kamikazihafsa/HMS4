// Wards & Beds page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load properly with a slightly longer timeout
    setTimeout(initializeWardsBedsPage, 500); // Increased to 500ms for reliability
});

function initializeWardsBedsPage() {
    console.log('Initializing Wards & Beds Page'); // Debug log for initialization

    // Set the active page in the sidebar
    highlightSidebarLink('wards_beds.html');
    
    // Setup view toggle functionality
    setupViewToggle();
    
    // Setup filter functionality
    setupFilters();
    
    // Setup modal functionality for ward details
    setupWardModals();
    
    // Setup form actions and dynamic bed addition
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

    const viewPreference = localStorage.getItem('wardViewPreference') || 'grid';
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
        localStorage.setItem('wardViewPreference', 'grid');
        console.log('Switched to Grid view');
    }
    
    function showListView() {
        gridView.style.display = 'none';
        listView.style.display = 'block';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        localStorage.setItem('wardViewPreference', 'list');
        console.log('Switched to List view');
    }
}

// Setup filter functionality
function setupFilters() {
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const search = document.getElementById('wardSearch').value;
            const status = document.getElementById('statusFilter').value;
            
            showToast(`Filtering wards by Name: ${search || 'All'}, Status: ${status || 'All'}`);
            
            filterBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Filtering...';
            filterBtn.disabled = true;
            
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter me-1"></i> Filter';
                filterBtn.disabled = false;
            }, 1000);
        });
    }
}

// Setup ward detail modals
function setupWardModals() {
    const viewButtons = document.querySelectorAll('[data-bs-target="#viewWardModal"]');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('View Ward modal triggered');
        });
    });

    const editButtons = document.querySelectorAll('[data-bs-target="#editWardModal"]');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Edit Ward modal triggered');
        });
    });
}

// Setup form actions and dynamic bed addition
function setupFormActions() {
    // Add ward form submission
    const saveButton = document.getElementById('saveWard');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const form = document.getElementById('addWardForm');
            if (form.checkValidity()) {
                showToast('Ward added successfully!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('addWardModal'));
                modal.hide();
                form.reset();
                document.getElementById('bedStatusContainer').innerHTML = '';
            } else {
                form.reportValidity();
            }
        });
    }

    // Edit ward form submission
    const updateButton = document.getElementById('updateWard');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            const form = document.getElementById('editWardForm');
            if (form.checkValidity()) {
                showToast('Ward updated successfully!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('editWardModal'));
                modal.hide();
            } else {
                form.reportValidity();
            }
        });
    }

    // Dynamic bed addition in Add Ward modal
    const addBedBtn = document.getElementById('addBedBtn');
    if (addBedBtn) {
        let bedCount = 1;
        addBedBtn.addEventListener('click', function() {
            const container = document.getElementById('bedStatusContainer');
            const bedDiv = document.createElement('div');
            bedDiv.className = 'mb-2';
            bedDiv.innerHTML = `
                <p>
                    <span class="badge bg-secondary">Bed ${bedCount}</span>
                    <select class="form-select form-select-sm ms-2" style="display: inline-block; width: auto;">
                        <option value="available" selected>Available</option>
                        <option value="occupied">Occupied</option>
                    </select>
                    <button type="button" class="btn btn-sm btn-danger ms-2 remove-bed">
                        <i class="fas fa-trash"></i>
                    </button>
                </p>
            `;
            container.appendChild(bedDiv);
            bedCount++;

            // Remove bed functionality
            const removeBtn = bedDiv.querySelector('.remove-bed');
            removeBtn.addEventListener('click', function() {
                container.removeChild(bedDiv);
            });
        });
    }

    // Dynamic bed addition in Edit Ward modal
    const editAddBedBtn = document.getElementById('editAddBedBtn');
    if (editAddBedBtn) {
        let editBedCount = 4; // Start after the initial 3 beds
        editAddBedBtn.addEventListener('click', function() {
            const container = document.getElementById('editBedStatusContainer');
            const bedDiv = document.createElement('p');
            bedDiv.className = 'mb-2';
            bedDiv.innerHTML = `
                <span class="badge bg-secondary">Bed ${editBedCount}</span>
                <select class="form-select form-select-sm ms-2" style="display: inline-block; width: auto;">
                    <option value="available" selected>Available</option>
                    <option value="occupied">Occupied</option>
                </select>
                <button type="button" class="btn btn-sm btn-danger ms-2 remove-bed">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            container.appendChild(bedDiv);
            editBedCount++;

            // Remove bed functionality
            const removeBtn = bedDiv.querySelector('.remove-bed');
            removeBtn.addEventListener('click', function() {
                container.removeChild(bedDiv);
            });
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

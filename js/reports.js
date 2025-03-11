// Reports page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load properly with a slightly longer timeout
    setTimeout(initializeReportsPage, 500); // Increased to 500ms for reliability
});

function initializeReportsPage() {
    console.log('Initializing Reports Page'); // Debug log for initialization

    // Set the active page in the sidebar
    highlightSidebarLink('reports.html');
    
    // Setup filter functionality
    setupFilters();
    
    // Setup report generation
    setupReportGeneration();
    
    // Setup export functionality
    setupExport();
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

// Setup filter functionality
function setupFilters() {
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            const reportType = document.getElementById('reportType').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            showToast(`Generating report for ${reportType || 'All'} from ${startDate || 'Start'} to ${endDate || 'End'}`);
            
            applyFilterBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Applying...';
            applyFilterBtn.disabled = true;
            
            setTimeout(() => {
                applyFilterBtn.innerHTML = '<i class="fas fa-filter me-1"></i> Apply Filters';
                applyFilterBtn.disabled = false;
                generateSampleReport(); // Placeholder for report generation
            }, 1000);
        });
    }
}

// Setup report generation (placeholder with sample data)
function setupReportGeneration() {
    const generateReportBtn = document.getElementById('generateReportBtn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            showToast('Generating report...');
            generateSampleReport();
        });
    }
}

function generateSampleReport() {
    // Placeholder for chart generation (integrate with Chart.js)
    const ctx1 = document.getElementById('admissionsChart').getContext('2d');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Jan 2025', 'Feb 2025'],
                datasets: [{
                    label: 'Admissions',
                    data: [60, 90],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    const ctx2 = document.getElementById('billingChart').getContext('2d');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Paid', 'Pending'],
                datasets: [{
                    data: [7500, 2500],
                    backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)']
                }]
            }
        });
    }

    const ctx3 = document.getElementById('medicineChart').getContext('2d');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['Pain Relief', 'Antibiotics'],
                datasets: [{
                    data: [200, 300],
                    backgroundColor: ['rgba(255, 206, 86, 0.5)', 'rgba(153, 102, 255, 0.5)']
                }]
            }
        });
    }
}

// Setup export functionality
function setupExport() {
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const format = document.getElementById('exportFormat').value;
            if (format) {
                showToast(`Exporting report as ${format.toUpperCase()}...`);
                const modal = bootstrap.Modal.getInstance(document.getElementById('exportModal'));
                modal.hide();
                // Placeholder for export logic (e.g., trigger download)
                setTimeout(() => showToast(`Report exported as ${format.toUpperCase()} successfully!`), 1000);
            } else {
                showToast('Please select an export format.');
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

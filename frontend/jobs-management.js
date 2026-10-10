// ============================================================
// CareerHub - Admin Jobs Management
// Handles job data, search, filters, sorting and pagination
// ============================================================


// ------------------------------------------------------------
// 1. Demo Job Data
// ------------------------------------------------------------

const jobsData = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova Solutions",
        type: "Full Time",
        location: "Noida, India",
        salary: 850000,
        posted: "2026-09-18",
        applications: 124,
        status: "Active"
    },

    {
        id: 2,
        title: "Backend Developer",
        company: "CodeCraft Technologies",
        type: "Full Time",
        location: "Bangalore, India",
        salary: 1100000,
        posted: "2026-09-17",
        applications: 96,
        status: "Active"
    },

    {
        id: 3,
        title: "Java Developer Intern",
        company: "Infosphere Labs",
        type: "Internship",
        location: "Gurugram, India",
        salary: 250000,
        posted: "2026-09-16",
        applications: 218,
        status: "Pending"
    },

    {
        id: 4,
        title: "Full Stack Developer",
        company: "WebWorks India",
        type: "Full Time",
        location: "Delhi, India",
        salary: 1250000,
        posted: "2026-09-15",
        applications: 87,
        status: "Active"
    },

    {
        id: 5,
        title: "UI/UX Designer",
        company: "Creative Minds",
        type: "Contract",
        location: "Remote",
        salary: 700000,
        posted: "2026-09-14",
        applications: 64,
        status: "Active"
    },

    {
        id: 6,
        title: "Data Analyst",
        company: "DataCore Analytics",
        type: "Full Time",
        location: "Pune, India",
        salary: 900000,
        posted: "2026-09-12",
        applications: 72,
        status: "Expired"
    },

    {
        id: 7,
        title: "React Developer",
        company: "AppSphere",
        type: "Remote",
        location: "Remote",
        salary: 950000,
        posted: "2026-09-11",
        applications: 153,
        status: "Active"
    },

    {
        id: 8,
        title: "Python Developer",
        company: "CloudMatrix",
        type: "Full Time",
        location: "Hyderabad, India",
        salary: 1050000,
        posted: "2026-09-09",
        applications: 118,
        status: "Pending"
    },

    {
        id: 9,
        title: "Software Engineer",
        company: "NextGen Systems",
        type: "Full Time",
        location: "Mumbai, India",
        salary: 1350000,
        posted: "2026-09-07",
        applications: 91,
        status: "Active"
    },

    {
        id: 10,
        title: "Marketing Intern",
        company: "GrowthHub",
        type: "Internship",
        location: "Noida, India",
        salary: 180000,
        posted: "2026-09-05",
        applications: 76,
        status: "Expired"
    },

    {
        id: 11,
        title: "DevOps Engineer",
        company: "CloudPeak Technologies",
        type: "Full Time",
        location: "Bangalore, India",
        salary: 1450000,
        posted: "2026-09-03",
        applications: 58,
        status: "Rejected"
    },

    {
        id: 12,
        title: "Mobile App Developer",
        company: "MobileFirst Labs",
        type: "Contract",
        location: "Remote",
        salary: 800000,
        posted: "2026-09-01",
        applications: 83,
        status: "Active"
    }
];


// ------------------------------------------------------------
// 2. Pagination Variables
// ------------------------------------------------------------

let filteredJobs = [...jobsData];

let currentPage = 1;

const jobsPerPage = 6;


// ------------------------------------------------------------
// 3. Get HTML Elements
// ------------------------------------------------------------

const jobSearch = document.getElementById("jobSearch");

const jobStatusFilter =
    document.getElementById("jobStatusFilter");

const jobTypeFilter =
    document.getElementById("jobTypeFilter");

const jobSort =
    document.getElementById("jobSort");

const jobsTableBody =
    document.getElementById("jobsTableBody");

const jobsEmptyState =
    document.getElementById("jobsEmptyState");

const jobsPaginationInfo =
    document.getElementById("jobsPaginationInfo");

const jobsPreviousBtn =
    document.getElementById("jobsPreviousBtn");

const jobsNextBtn =
    document.getElementById("jobsNextBtn");

const jobsPageButtons =
    document.getElementById("jobsPageButtons");


// ------------------------------------------------------------
// 4. Format Date
// ------------------------------------------------------------

function formatJobDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// ------------------------------------------------------------
// 5. Format Salary
// ------------------------------------------------------------

function formatSalary(salary) {

    return "₹" + (salary / 100000).toFixed(1) + " LPA";
}


// ------------------------------------------------------------
// 6. Get Status Class
// ------------------------------------------------------------

function getJobStatusClass(status) {

    if (status === "Active") {
        return "status-active";
    }

    if (status === "Pending") {
        return "status-pending";
    }

    if (status === "Expired") {
        return "status-expired";
    }

    if (status === "Rejected") {
        return "status-rejected";
    }

    return "";
}


// ------------------------------------------------------------
// 7. Render Jobs
// ------------------------------------------------------------

function renderJobs() {

    jobsTableBody.innerHTML = "";

    // Calculate starting and ending index for current page
    const startIndex =
        (currentPage - 1) * jobsPerPage;

    const endIndex =
        startIndex + jobsPerPage;

    const pageJobs =
        filteredJobs.slice(startIndex, endIndex);


    // If no jobs are available
    if (pageJobs.length === 0) {

        jobsEmptyState.style.display = "block";

        updatePagination();

        return;
    }


    jobsEmptyState.style.display = "none";


    // Create table row for every job
    pageJobs.forEach(job => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="table-user">
                    <div class="table-avatar">
                        ${job.title.charAt(0)}
                    </div>

                    <div>
                        <strong>${job.title}</strong>
                        <small>${job.location}</small>
                    </div>
                </div>
            </td>

            <td>
                ${job.company}
            </td>

            <td>
                ${job.type}
            </td>

            <td>
                ${formatJobDate(job.posted)}
            </td>

            <td>
                ${job.applications}
            </td>

            <td>
                <span class="status-badge ${getJobStatusClass(job.status)}">
                    ${job.status}
                </span>
            </td>

            <td>
                <div class="table-actions">

                    <button
                        class="table-action-btn"
                        onclick="viewJob(${job.id})"
                    >
                        View
                    </button>

                    <button
                        class="table-action-btn"
                        onclick="editJob(${job.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="table-action-btn danger"
                        onclick="deleteJob(${job.id})"
                    >
                        Delete
                    </button>

                </div>
            </td>
        `;

        jobsTableBody.appendChild(row);
    });


    updatePagination();
}


// ------------------------------------------------------------
// 8. Apply Search and Filters
// ------------------------------------------------------------

function applyJobFilters() {

    const searchValue =
        jobSearch.value.trim().toLowerCase();

    const selectedStatus =
        jobStatusFilter.value;

    const selectedType =
        jobTypeFilter.value;


    filteredJobs = jobsData.filter(job => {

        // Search by job title or company
        const matchesSearch =
            job.title.toLowerCase().includes(searchValue) ||
            job.company.toLowerCase().includes(searchValue);


        // Check selected status
        const matchesStatus =
            selectedStatus === "all" ||
            job.status === selectedStatus;


        // Check selected job type
        const matchesType =
            selectedType === "all" ||
            job.type === selectedType;


        return (
            matchesSearch &&
            matchesStatus &&
            matchesType
        );
    });


    currentPage = 1;

    applyJobSort();
}


// ------------------------------------------------------------
// 9. Apply Sorting
// ------------------------------------------------------------

function applyJobSort() {

    const sortValue = jobSort.value;


    if (sortValue === "newest") {

        filteredJobs.sort(
            (a, b) =>
                new Date(b.posted) -
                new Date(a.posted)
        );

    }


    else if (sortValue === "oldest") {

        filteredJobs.sort(
            (a, b) =>
                new Date(a.posted) -
                new Date(b.posted)
        );

    }


    else if (sortValue === "salary-high") {

        filteredJobs.sort(
            (a, b) =>
                b.salary - a.salary
        );

    }


    else if (sortValue === "salary-low") {

        filteredJobs.sort(
            (a, b) =>
                a.salary - b.salary
        );

    }


    else if (sortValue === "title-az") {

        filteredJobs.sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );

    }


    else if (sortValue === "title-za") {

        filteredJobs.sort(
            (a, b) =>
                b.title.localeCompare(a.title)
        );

    }


    renderJobs();
}


// ------------------------------------------------------------
// 10. Update Pagination
// ------------------------------------------------------------

function updatePagination() {

    const totalJobs =
        filteredJobs.length;

    const totalPages =
        Math.ceil(totalJobs / jobsPerPage);


    // Calculate visible range
    if (totalJobs === 0) {

        jobsPaginationInfo.textContent =
            "Showing 0 jobs";

    } else {

        const start =
            (currentPage - 1) * jobsPerPage + 1;

        const end =
            Math.min(
                currentPage * jobsPerPage,
                totalJobs
            );

        jobsPaginationInfo.textContent =
            `Showing ${start}–${end} of ${totalJobs} jobs`;
    }


    // Previous button
    jobsPreviousBtn.disabled =
        currentPage === 1;


    // Next button
    jobsNextBtn.disabled =
        currentPage >= totalPages ||
        totalPages === 0;


    renderPageButtons(totalPages);
}


// ------------------------------------------------------------
// 11. Render Page Number Buttons
// ------------------------------------------------------------

function renderPageButtons(totalPages) {

    jobsPageButtons.innerHTML = "";


    // No pages
    if (totalPages === 0) {
        return;
    }


    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        const button =
            document.createElement("button");

        button.textContent = page;

        if (page === currentPage) {
            button.classList.add("current-page");
        }


        button.addEventListener(
            "click",
            () => {

                currentPage = page;

                renderJobs();
            }
        );


        jobsPageButtons.appendChild(button);
    }
}


// ------------------------------------------------------------
// 12. Previous Page
// ------------------------------------------------------------

function goToPreviousPage() {

    if (currentPage > 1) {

        currentPage--;

        renderJobs();
    }
}


// ------------------------------------------------------------
// 13. Next Page
// ------------------------------------------------------------

function goToNextPage() {

    const totalPages =
        Math.ceil(
            filteredJobs.length / jobsPerPage
        );


    if (currentPage < totalPages) {

        currentPage++;

        renderJobs();
    }
}


// ------------------------------------------------------------
// 14. View Job
// ------------------------------------------------------------

function viewJob(jobId) {

    const job =
        jobsData.find(
            item => item.id === jobId
        );


    if (!job) {
        return;
    }


    alert(
        `Job Details\n\n` +
        `Title: ${job.title}\n` +
        `Company: ${job.company}\n` +
        `Type: ${job.type}\n` +
        `Location: ${job.location}\n` +
        `Salary: ${formatSalary(job.salary)}\n` +
        `Applications: ${job.applications}\n` +
        `Status: ${job.status}`
    );
}


// ------------------------------------------------------------
// 15. Edit Job
// ------------------------------------------------------------

function editJob(jobId) {

    const job =
        jobsData.find(
            item => item.id === jobId
        );


    if (!job) {
        return;
    }


    alert(
        `Edit Job\n\n` +
        `You selected: ${job.title}\n\n` +
        `The edit form will be connected to the backend later.`
    );
}


// ------------------------------------------------------------
// 16. Delete Job
// ------------------------------------------------------------

function deleteJob(jobId) {

    const job =
        jobsData.find(
            item => item.id === jobId
        );


    if (!job) {
        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to delete "${job.title}"?`
        );


    if (!confirmed) {
        return;
    }


    const index =
        jobsData.findIndex(
            item => item.id === jobId
        );


    if (index !== -1) {

        jobsData.splice(index, 1);

        filteredJobs =
            [...jobsData];

        currentPage = 1;

        applyJobFilters();

        alert("Job deleted successfully.");
    }
}


// ------------------------------------------------------------
// 17. Event Listeners
// ------------------------------------------------------------


// Search
jobSearch.addEventListener(
    "input",
    applyJobFilters
);


// Status filter
jobStatusFilter.addEventListener(
    "change",
    applyJobFilters
);


// Job type filter
jobTypeFilter.addEventListener(
    "change",
    applyJobFilters
);


// Sorting
jobSort.addEventListener(
    "change",
    () => {

        currentPage = 1;

        applyJobSort();
    }
);


// Previous button
jobsPreviousBtn.addEventListener(
    "click",
    goToPreviousPage
);


// Next button
jobsNextBtn.addEventListener(
    "click",
    goToNextPage
);


// ------------------------------------------------------------
// 18. Initialize Jobs Management Page
// ------------------------------------------------------------

function initializeJobsManagement() {

    // Initial filtering and rendering
    applyJobFilters();
}


// Run after HTML has loaded
document.addEventListener(
    "DOMContentLoaded",
    initializeJobsManagement
);
// ============================================================
// CareerHub - Admin Applications Management
// Handles application data, search, filters, sorting,
// pagination and application actions.
// ============================================================


// ------------------------------------------------------------
// 1. Demo Application Data
// ------------------------------------------------------------

const applicationsData = [
    {
        id: 1,
        candidate: "Arjun Saini",
        email: "arjun@example.com",
        initials: "AS",
        job: "Frontend Developer",
        jobType: "Full Time",
        company: "TechNova Solutions",
        applied: "2026-09-15",
        status: "Under Review"
    },

    {
        id: 2,
        candidate: "Ankit Mehta",
        email: "ankit@example.com",
        initials: "AM",
        job: "Java Backend Developer",
        jobType: "Full Time",
        company: "DataCore Technologies",
        applied: "2026-09-14",
        status: "Shortlisted"
    },

    {
        id: 3,
        candidate: "Priya Kapoor",
        email: "priya@example.com",
        initials: "PK",
        job: "Product Designer",
        jobType: "Full Time",
        company: "FinEdge",
        applied: "2026-09-13",
        status: "Interview"
    },

    {
        id: 4,
        candidate: "Rahul Sharma",
        email: "rahul@example.com",
        initials: "RS",
        job: "Software Engineer",
        jobType: "Full Time",
        company: "CloudWorks",
        applied: "2026-09-12",
        status: "Selected"
    },

    {
        id: 5,
        candidate: "Vikash Kumar",
        email: "vikash@example.com",
        initials: "VK",
        job: "Junior Software Developer",
        jobType: "Full Time",
        company: "SoftPeak Labs",
        applied: "2026-09-10",
        status: "Rejected"
    },

    {
        id: 6,
        candidate: "Neha Patel",
        email: "neha@example.com",
        initials: "NP",
        job: "Marketing Intern",
        jobType: "Internship",
        company: "GrowthLabs",
        applied: "2026-09-08",
        status: "Applied"
    },

    {
        id: 7,
        candidate: "Rohit Kumar",
        email: "rohit@example.com",
        initials: "RK",
        job: "React Developer",
        jobType: "Full Time",
        company: "AppSphere",
        applied: "2026-09-07",
        status: "Under Review"
    },

    {
        id: 8,
        candidate: "Sneha Kapoor",
        email: "sneha@example.com",
        initials: "SK",
        job: "UI/UX Designer",
        jobType: "Contract",
        company: "Creative Minds",
        applied: "2026-09-06",
        status: "Shortlisted"
    },

    {
        id: 9,
        candidate: "Amit Dubey",
        email: "amit@example.com",
        initials: "AD",
        job: "Python Developer",
        jobType: "Full Time",
        company: "CloudMatrix",
        applied: "2026-09-05",
        status: "Applied"
    },

    {
        id: 10,
        candidate: "Pooja Singh",
        email: "pooja@example.com",
        initials: "PS",
        job: "HR Intern",
        jobType: "Internship",
        company: "PeopleFirst",
        applied: "2026-09-04",
        status: "Rejected"
    },

    {
        id: 11,
        candidate: "Mohit Tiwari",
        email: "mohit@example.com",
        initials: "MT",
        job: "DevOps Engineer",
        jobType: "Full Time",
        company: "CloudPeak Technologies",
        applied: "2026-09-03",
        status: "Interview"
    },

    {
        id: 12,
        candidate: "Nisha Sharma",
        email: "nisha@example.com",
        initials: "NS",
        job: "Software Engineer Intern",
        jobType: "Internship",
        company: "NextGen Systems",
        applied: "2026-09-01",
        status: "Selected"
    }
];


// ------------------------------------------------------------
// 2. Pagination Variables
// ------------------------------------------------------------

let filteredApplications = [...applicationsData];

let currentApplicationPage = 1;

const applicationsPerPage = 6;


// ------------------------------------------------------------
// 3. Get HTML Elements
// ------------------------------------------------------------

const applicationSearch =
    document.getElementById("applicationSearch");

const applicationStatusFilter =
    document.getElementById("applicationStatusFilter");

const applicationJobTypeFilter =
    document.getElementById("applicationJobTypeFilter");

const applicationSort =
    document.getElementById("applicationSort");

const applicationsTableBody =
    document.getElementById("applicationsTableBody");

const applicationsEmptyState =
    document.getElementById("applicationsEmptyState");

const applicationsPaginationInfo =
    document.getElementById("applicationsPaginationInfo");

const applicationsPreviousBtn =
    document.getElementById("applicationsPreviousBtn");

const applicationsNextBtn =
    document.getElementById("applicationsNextBtn");

const applicationsPageButtons =
    document.getElementById("applicationsPageButtons");


// ------------------------------------------------------------
// 4. Format Application Date
// ------------------------------------------------------------

function formatApplicationDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// ------------------------------------------------------------
// 5. Get Status Class
// ------------------------------------------------------------

function getApplicationStatusClass(status) {

    switch (status) {

        case "Applied":
            return "applied";

        case "Under Review":
            return "review";

        case "Shortlisted":
            return "shortlisted";

        case "Interview":
            return "interview";

        case "Selected":
            return "selected";

        case "Rejected":
            return "rejected";

        default:
            return "";
    }
}


// ------------------------------------------------------------
// 6. Render Applications
// ------------------------------------------------------------

function renderApplications() {

    applicationsTableBody.innerHTML = "";


    const startIndex =
        (currentApplicationPage - 1) *
        applicationsPerPage;


    const endIndex =
        startIndex + applicationsPerPage;


    const pageApplications =
        filteredApplications.slice(
            startIndex,
            endIndex
        );


    // Show empty state when no application is found
    if (pageApplications.length === 0) {

        applicationsEmptyState.style.display = "block";

        updateApplicationPagination();

        return;
    }


    applicationsEmptyState.style.display = "none";


    // Create table row for each application
    pageApplications.forEach(application => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="user-cell">

                    <div class="table-avatar">
                        ${application.initials}
                    </div>

                    <div>

                        <strong>
                            ${application.candidate}
                        </strong>

                        <span>
                            ${application.email}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <div class="application-job-cell">

                    <strong>
                        ${application.job}
                    </strong>

                    <span>
                        ${application.jobType}
                    </span>

                </div>

            </td>


            <td>
                ${application.company}
            </td>


            <td>
                ${formatApplicationDate(application.applied)}
            </td>


            <td>

                <span
                    class="application-admin-status ${getApplicationStatusClass(application.status)}"
                >
                    ${application.status}
                </span>

            </td>


            <td>

                <div class="table-actions">

                    <button
                        class="table-action-btn"
                        onclick="viewApplication(${application.id})"
                    >
                        View
                    </button>

                    <button
                        class="table-action-btn"
                        onclick="updateApplicationStatus(${application.id})"
                    >
                        Update
                    </button>

                </div>

            </td>

        `;


        applicationsTableBody.appendChild(row);
    });


    updateApplicationPagination();
}


// ------------------------------------------------------------
// 7. Apply Search and Filters
// ------------------------------------------------------------

function applyApplicationFilters() {

    const searchValue =
        applicationSearch.value
            .trim()
            .toLowerCase();


    const selectedStatus =
        applicationStatusFilter.value;


    const selectedJobType =
        applicationJobTypeFilter.value;


    filteredApplications =
        applicationsData.filter(application => {


            // Search candidate, job or company
            const matchesSearch =

                application.candidate
                    .toLowerCase()
                    .includes(searchValue)

                ||

                application.job
                    .toLowerCase()
                    .includes(searchValue)

                ||

                application.company
                    .toLowerCase()
                    .includes(searchValue);


            // Check status
            const matchesStatus =
                selectedStatus === "all" ||
                application.status === selectedStatus;


            // Check job type
            const matchesJobType =
                selectedJobType === "all" ||
                application.jobType === selectedJobType;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesJobType
            );
        });


    currentApplicationPage = 1;

    applyApplicationSort();
}


// ------------------------------------------------------------
// 8. Apply Sorting
// ------------------------------------------------------------

function applyApplicationSort() {

    const sortValue =
        applicationSort.value;


    if (sortValue === "newest") {

        filteredApplications.sort(
            (a, b) =>
                new Date(b.applied) -
                new Date(a.applied)
        );

    }


    else if (sortValue === "oldest") {

        filteredApplications.sort(
            (a, b) =>
                new Date(a.applied) -
                new Date(b.applied)
        );

    }


    else if (sortValue === "candidate-az") {

        filteredApplications.sort(
            (a, b) =>
                a.candidate.localeCompare(
                    b.candidate
                )
        );

    }


    else if (sortValue === "candidate-za") {

        filteredApplications.sort(
            (a, b) =>
                b.candidate.localeCompare(
                    a.candidate
                )
        );

    }


    renderApplications();
}


// ------------------------------------------------------------
// 9. Update Pagination
// ------------------------------------------------------------

function updateApplicationPagination() {

    const totalApplications =
        filteredApplications.length;


    const totalPages =
        Math.ceil(
            totalApplications /
            applicationsPerPage
        );


    if (totalApplications === 0) {

        applicationsPaginationInfo.textContent =
            "Showing 0 applications";

    }

    else {

        const start =
            (currentApplicationPage - 1) *
            applicationsPerPage + 1;


        const end =
            Math.min(
                currentApplicationPage *
                applicationsPerPage,
                totalApplications
            );


        applicationsPaginationInfo.textContent =
            `Showing ${start}–${end} of ${totalApplications} applications`;
    }


    // Previous button
    applicationsPreviousBtn.disabled =
        currentApplicationPage === 1;


    // Next button
    applicationsNextBtn.disabled =
        currentApplicationPage >= totalPages ||
        totalPages === 0;


    renderApplicationPageButtons(totalPages);
}


// ------------------------------------------------------------
// 10. Render Pagination Buttons
// ------------------------------------------------------------

function renderApplicationPageButtons(totalPages) {

    applicationsPageButtons.innerHTML = "";


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


        if (
            page === currentApplicationPage
        ) {

            button.classList.add(
                "current-page"
            );
        }


        button.addEventListener(
            "click",
            () => {

                currentApplicationPage =
                    page;

                renderApplications();
            }
        );


        applicationsPageButtons.appendChild(
            button
        );
    }
}


// ------------------------------------------------------------
// 11. Previous Page
// ------------------------------------------------------------

function goToPreviousApplicationPage() {

    if (currentApplicationPage > 1) {

        currentApplicationPage--;

        renderApplications();
    }
}


// ------------------------------------------------------------
// 12. Next Page
// ------------------------------------------------------------

function goToNextApplicationPage() {

    const totalPages =
        Math.ceil(
            filteredApplications.length /
            applicationsPerPage
        );


    if (
        currentApplicationPage <
        totalPages
    ) {

        currentApplicationPage++;

        renderApplications();
    }
}


// ------------------------------------------------------------
// 13. View Application
// ------------------------------------------------------------

function viewApplication(applicationId) {

    const application =
        applicationsData.find(
            item =>
                item.id === applicationId
        );


    if (!application) {
        return;
    }


    alert(
        `Application Details\n\n` +

        `Candidate: ${application.candidate}\n` +

        `Email: ${application.email}\n` +

        `Job: ${application.job}\n` +

        `Job Type: ${application.jobType}\n` +

        `Company: ${application.company}\n` +

        `Applied: ${formatApplicationDate(application.applied)}\n` +

        `Status: ${application.status}`
    );
}


// ------------------------------------------------------------
// 14. Update Application Status
// ------------------------------------------------------------

function updateApplicationStatus(applicationId) {

    const application =
        applicationsData.find(
            item =>
                item.id === applicationId
        );


    if (!application) {
        return;
    }


    const newStatus =
        prompt(
            `Update status for ${application.candidate}\n\n` +

            `Enter one of:\n` +

            `Applied\n` +

            `Under Review\n` +

            `Shortlisted\n` +

            `Interview\n` +

            `Selected\n` +

            `Rejected`
        );


    if (!newStatus) {
        return;
    }


    const validStatuses = [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected"
    ];


    if (!validStatuses.includes(newStatus)) {

        alert(
            "Invalid status. Please enter a valid status."
        );

        return;
    }


    application.status = newStatus;


    // Refresh filtered data
    applyApplicationFilters();


    alert(
        `Application status updated to "${newStatus}".`
    );
}


// ------------------------------------------------------------
// 15. Event Listeners
// ------------------------------------------------------------


// Search
applicationSearch.addEventListener(
    "input",
    applyApplicationFilters
);


// Status filter
applicationStatusFilter.addEventListener(
    "change",
    applyApplicationFilters
);


// Job type filter
applicationJobTypeFilter.addEventListener(
    "change",
    applyApplicationFilters
);


// Sorting
applicationSort.addEventListener(
    "change",
    () => {

        currentApplicationPage = 1;

        applyApplicationSort();
    }
);


// Previous button
applicationsPreviousBtn.addEventListener(
    "click",
    goToPreviousApplicationPage
);


// Next button
applicationsNextBtn.addEventListener(
    "click",
    goToNextApplicationPage
);


// ------------------------------------------------------------
// 16. Initialize Applications Page
// ------------------------------------------------------------

function initializeApplicationsPage() {

    applyApplicationFilters();
}


// Run after HTML has loaded
document.addEventListener(
    "DOMContentLoaded",
    initializeApplicationsPage
);
// ============================================================
// CareerHub - Admin Companies Management
// Handles company data, search, filters, sorting and pagination
// ============================================================


// ------------------------------------------------------------
// 1. Demo Company Data
// ------------------------------------------------------------

const companiesData = [
    {
        id: 1,
        name: "TechNova Solutions",
        industry: "Technology",
        location: "Noida, India",
        jobs: 42,
        joined: "2026-09-15",
        status: "Active"
    },

    {
        id: 2,
        name: "CodeCraft Technologies",
        industry: "Technology",
        location: "Bangalore, India",
        jobs: 36,
        joined: "2026-09-12",
        status: "Active"
    },

    {
        id: 3,
        name: "HealthPlus Healthcare",
        industry: "Healthcare",
        location: "Delhi, India",
        jobs: 28,
        joined: "2026-09-10",
        status: "Active"
    },

    {
        id: 4,
        name: "FinEdge Capital",
        industry: "Finance",
        location: "Mumbai, India",
        jobs: 31,
        joined: "2026-09-08",
        status: "Pending"
    },

    {
        id: 5,
        name: "ShopSphere",
        industry: "E-Commerce",
        location: "Gurugram, India",
        jobs: 24,
        joined: "2026-09-05",
        status: "Active"
    },

    {
        id: 6,
        name: "LearnBridge Academy",
        industry: "Education",
        location: "Pune, India",
        jobs: 18,
        joined: "2026-09-02",
        status: "Active"
    },

    {
        id: 7,
        name: "DataCore Analytics",
        industry: "Technology",
        location: "Hyderabad, India",
        jobs: 27,
        joined: "2026-08-30",
        status: "Active"
    },

    {
        id: 8,
        name: "GlobalConsult Partners",
        industry: "Consulting",
        location: "Delhi, India",
        jobs: 15,
        joined: "2026-08-27",
        status: "Pending"
    },

    {
        id: 9,
        name: "CloudPeak Technologies",
        industry: "Technology",
        location: "Bangalore, India",
        jobs: 39,
        joined: "2026-08-24",
        status: "Active"
    },

    {
        id: 10,
        name: "MediCare Systems",
        industry: "Healthcare",
        location: "Chennai, India",
        jobs: 21,
        joined: "2026-08-20",
        status: "Suspended"
    },

    {
        id: 11,
        name: "GrowthHub India",
        industry: "Consulting",
        location: "Noida, India",
        jobs: 13,
        joined: "2026-08-17",
        status: "Active"
    },

    {
        id: 12,
        name: "EduTech Innovations",
        industry: "Education",
        location: "Jaipur, India",
        jobs: 16,
        joined: "2026-08-14",
        status: "Active"
    }
];


// ------------------------------------------------------------
// 2. Pagination Variables
// ------------------------------------------------------------

let filteredCompanies = [...companiesData];

let currentCompanyPage = 1;

const companiesPerPage = 6;


// ------------------------------------------------------------
// 3. Get HTML Elements
// ------------------------------------------------------------

const companySearch =
    document.getElementById("companySearch");

const companyIndustryFilter =
    document.getElementById("companyIndustryFilter");

const companyStatusFilter =
    document.getElementById("companyStatusFilter");

const companySort =
    document.getElementById("companySort");

const companiesTableBody =
    document.getElementById("companiesTableBody");

const companiesEmptyState =
    document.getElementById("companiesEmptyState");

const companiesPaginationInfo =
    document.getElementById("companiesPaginationInfo");

const companiesPreviousBtn =
    document.getElementById("companiesPreviousBtn");

const companiesNextBtn =
    document.getElementById("companiesNextBtn");

const companiesPageButtons =
    document.getElementById("companiesPageButtons");

const addCompanyBtn =
    document.getElementById("addCompanyBtn");


// ------------------------------------------------------------
// 4. Format Date
// ------------------------------------------------------------

function formatCompanyDate(dateString) {

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

function getCompanyStatusClass(status) {

    if (status === "Active") {
        return "status-active";
    }

    if (status === "Pending") {
        return "status-pending";
    }

    if (status === "Suspended") {
        return "status-suspended";
    }

    return "";
}


// ------------------------------------------------------------
// 6. Render Companies
// ------------------------------------------------------------

function renderCompanies() {

    companiesTableBody.innerHTML = "";

    const startIndex =
        (currentCompanyPage - 1) * companiesPerPage;

    const endIndex =
        startIndex + companiesPerPage;

    const pageCompanies =
        filteredCompanies.slice(startIndex, endIndex);


    // Show empty state when no company matches
    if (pageCompanies.length === 0) {

        companiesEmptyState.style.display = "block";

        updateCompanyPagination();

        return;
    }


    companiesEmptyState.style.display = "none";


    // Create table row for every company
    pageCompanies.forEach(company => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>

                <div class="table-user">

                    <div class="table-avatar">
                        ${company.name.charAt(0)}
                    </div>

                    <div>

                        <strong>
                            ${company.name}
                        </strong>

                        <small>
                            Company ID: #${company.id}
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${company.industry}
            </td>


            <td>
                ${company.location}
            </td>


            <td>
                ${company.jobs}
            </td>


            <td>
                ${formatCompanyDate(company.joined)}
            </td>


            <td>

                <span class="status-badge ${getCompanyStatusClass(company.status)}">
                    ${company.status}
                </span>

            </td>


            <td>

                <div class="table-actions">

                    <button
                        class="table-action-btn"
                        onclick="viewCompany(${company.id})"
                    >
                        View
                    </button>


                    <button
                        class="table-action-btn"
                        onclick="editCompany(${company.id})"
                    >
                        Edit
                    </button>


                    <button
                        class="table-action-btn danger"
                        onclick="deleteCompany(${company.id})"
                    >
                        Delete
                    </button>

                </div>

            </td>
        `;

        companiesTableBody.appendChild(row);
    });


    updateCompanyPagination();
}


// ------------------------------------------------------------
// 7. Apply Search and Filters
// ------------------------------------------------------------

function applyCompanyFilters() {

    const searchValue =
        companySearch.value
            .trim()
            .toLowerCase();

    const selectedIndustry =
        companyIndustryFilter.value;

    const selectedStatus =
        companyStatusFilter.value;


    filteredCompanies =
        companiesData.filter(company => {

            // Search company name
            const matchesSearch =
                company.name
                    .toLowerCase()
                    .includes(searchValue);


            // Check industry
            const matchesIndustry =
                selectedIndustry === "all" ||
                company.industry === selectedIndustry;


            // Check status
            const matchesStatus =
                selectedStatus === "all" ||
                company.status === selectedStatus;


            return (
                matchesSearch &&
                matchesIndustry &&
                matchesStatus
            );
        });


    currentCompanyPage = 1;

    applyCompanySort();
}


// ------------------------------------------------------------
// 8. Apply Sorting
// ------------------------------------------------------------

function applyCompanySort() {

    const sortValue =
        companySort.value;


    if (sortValue === "newest") {

        filteredCompanies.sort(
            (a, b) =>
                new Date(b.joined) -
                new Date(a.joined)
        );

    }


    else if (sortValue === "oldest") {

        filteredCompanies.sort(
            (a, b) =>
                new Date(a.joined) -
                new Date(b.joined)
        );

    }


    else if (sortValue === "name-az") {

        filteredCompanies.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    else if (sortValue === "name-za") {

        filteredCompanies.sort(
            (a, b) =>
                b.name.localeCompare(a.name)
        );

    }


    else if (sortValue === "jobs-high") {

        filteredCompanies.sort(
            (a, b) =>
                b.jobs - a.jobs
        );

    }


    else if (sortValue === "jobs-low") {

        filteredCompanies.sort(
            (a, b) =>
                a.jobs - b.jobs
        );

    }


    renderCompanies();
}


// ------------------------------------------------------------
// 9. Update Pagination
// ------------------------------------------------------------

function updateCompanyPagination() {

    const totalCompanies =
        filteredCompanies.length;

    const totalPages =
        Math.ceil(
            totalCompanies / companiesPerPage
        );


    if (totalCompanies === 0) {

        companiesPaginationInfo.textContent =
            "Showing 0 companies";

    } else {

        const start =
            (currentCompanyPage - 1) *
            companiesPerPage + 1;

        const end =
            Math.min(
                currentCompanyPage *
                companiesPerPage,
                totalCompanies
            );

        companiesPaginationInfo.textContent =
            `Showing ${start}–${end} of ${totalCompanies} companies`;
    }


    // Previous button
    companiesPreviousBtn.disabled =
        currentCompanyPage === 1;


    // Next button
    companiesNextBtn.disabled =
        currentCompanyPage >= totalPages ||
        totalPages === 0;


    renderCompanyPageButtons(totalPages);
}


// ------------------------------------------------------------
// 10. Render Page Buttons
// ------------------------------------------------------------

function renderCompanyPageButtons(totalPages) {

    companiesPageButtons.innerHTML = "";


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


        if (page === currentCompanyPage) {

            button.classList.add(
                "current-page"
            );
        }


        button.addEventListener(
            "click",
            () => {

                currentCompanyPage = page;

                renderCompanies();
            }
        );


        companiesPageButtons.appendChild(button);
    }
}


// ------------------------------------------------------------
// 11. Previous Page
// ------------------------------------------------------------

function goToPreviousCompanyPage() {

    if (currentCompanyPage > 1) {

        currentCompanyPage--;

        renderCompanies();
    }
}


// ------------------------------------------------------------
// 12. Next Page
// ------------------------------------------------------------

function goToNextCompanyPage() {

    const totalPages =
        Math.ceil(
            filteredCompanies.length /
            companiesPerPage
        );


    if (currentCompanyPage < totalPages) {

        currentCompanyPage++;

        renderCompanies();
    }
}


// ------------------------------------------------------------
// 13. View Company
// ------------------------------------------------------------

function viewCompany(companyId) {

    const company =
        companiesData.find(
            item => item.id === companyId
        );


    if (!company) {
        return;
    }


    alert(
        `Company Details\n\n` +

        `Name: ${company.name}\n` +

        `Industry: ${company.industry}\n` +

        `Location: ${company.location}\n` +

        `Jobs: ${company.jobs}\n` +

        `Joined: ${formatCompanyDate(company.joined)}\n` +

        `Status: ${company.status}`
    );
}


// ------------------------------------------------------------
// 14. Edit Company
// ------------------------------------------------------------

function editCompany(companyId) {

    const company =
        companiesData.find(
            item => item.id === companyId
        );


    if (!company) {
        return;
    }


    alert(
        `Edit Company\n\n` +

        `You selected: ${company.name}\n\n` +

        `The edit form will be connected to the backend later.`
    );
}


// ------------------------------------------------------------
// 15. Delete Company
// ------------------------------------------------------------

function deleteCompany(companyId) {

    const company =
        companiesData.find(
            item => item.id === companyId
        );


    if (!company) {
        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to delete "${company.name}"?`
        );


    if (!confirmed) {
        return;
    }


    const index =
        companiesData.findIndex(
            item => item.id === companyId
        );


    if (index !== -1) {

        companiesData.splice(index, 1);

        filteredCompanies =
            [...companiesData];

        currentCompanyPage = 1;

        applyCompanyFilters();

        alert(
            "Company deleted successfully."
        );
    }
}


// ------------------------------------------------------------
// 16. Add Company
// ------------------------------------------------------------

function addCompany() {

    alert(
        "Add Company\n\n" +
        "The company creation form will be connected to the backend later."
    );
}


// ------------------------------------------------------------
// 17. Event Listeners
// ------------------------------------------------------------


// Search
companySearch.addEventListener(
    "input",
    applyCompanyFilters
);


// Industry filter
companyIndustryFilter.addEventListener(
    "change",
    applyCompanyFilters
);


// Status filter
companyStatusFilter.addEventListener(
    "change",
    applyCompanyFilters
);


// Sort
companySort.addEventListener(
    "change",
    () => {

        currentCompanyPage = 1;

        applyCompanySort();
    }
);


// Previous button
companiesPreviousBtn.addEventListener(
    "click",
    goToPreviousCompanyPage
);


// Next button
companiesNextBtn.addEventListener(
    "click",
    goToNextCompanyPage
);


// Add company button
addCompanyBtn.addEventListener(
    "click",
    addCompany
);


// ------------------------------------------------------------
// 18. Initialize Companies Page
// ------------------------------------------------------------

function initializeCompaniesPage() {

    // Load companies when page opens
    applyCompanyFilters();
}


// Run after HTML has loaded
document.addEventListener(
    "DOMContentLoaded",
    initializeCompaniesPage
);
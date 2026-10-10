/* =========================================================
   CAREERHUB - USERS MANAGEMENT JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. USER DATA
   ---------------------------------------------------------
   Abhi demo data hai.
   Later Spring Boot + MySQL se ye data API ke through aayega.
   ========================================================= */

const usersData = [

    {
        initials: "AS",
        name: "Arjun Saini",
        email: "arjun@example.com",
        role: "Job Seeker",
        joined: "2026-09-12",
        applications: 12,
        status: "Active"
    },

    {
        initials: "AM",
        name: "Ankit Mehta",
        email: "ankit@example.com",
        role: "Job Seeker",
        joined: "2026-09-10",
        applications: 8,
        status: "Active"
    },

    {
        initials: "PK",
        name: "Priya Kapoor",
        email: "priya@example.com",
        role: "Job Seeker",
        joined: "2026-09-08",
        applications: 15,
        status: "Active"
    },

    {
        initials: "RS",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        role: "Employer",
        joined: "2026-09-05",
        applications: null,
        status: "Active"
    },

    {
        initials: "VK",
        name: "Vikash Kumar",
        email: "vikash@example.com",
        role: "Employer",
        joined: "2026-09-03",
        applications: null,
        status: "Suspended"
    },

    {
        initials: "NP",
        name: "Neha Patel",
        email: "neha@example.com",
        role: "Job Seeker",
        joined: "2026-08-29",
        applications: 6,
        status: "Active"
    },

    {
        initials: "RK",
        name: "Rohit Kumar",
        email: "rohit@example.com",
        role: "Job Seeker",
        joined: "2026-08-25",
        applications: 10,
        status: "Active"
    },

    {
        initials: "SK",
        name: "Sneha Kapoor",
        email: "sneha@example.com",
        role: "Employer",
        joined: "2026-08-22",
        applications: null,
        status: "Active"
    },

    {
        initials: "AD",
        name: "Amit Dubey",
        email: "amit@example.com",
        role: "Job Seeker",
        joined: "2026-08-20",
        applications: 4,
        status: "Active"
    },

    {
        initials: "PS",
        name: "Pooja Singh",
        email: "pooja@example.com",
        role: "Job Seeker",
        joined: "2026-08-17",
        applications: 9,
        status: "Suspended"
    },

    {
        initials: "MT",
        name: "Mohit Tiwari",
        email: "mohit@example.com",
        role: "Employer",
        joined: "2026-08-15",
        applications: null,
        status: "Active"
    },

    {
        initials: "NS",
        name: "Nisha Sharma",
        email: "nisha@example.com",
        role: "Admin",
        joined: "2026-08-10",
        applications: null,
        status: "Active"
    }

];



/* =========================================================
   2. VARIABLES
   ========================================================= */

let filteredUsers = [...usersData];

let currentPage = 1;

const usersPerPage = 6;



/* =========================================================
   3. GET HTML ELEMENTS
   ========================================================= */

const userSearch =
    document.getElementById("userSearch");

const userRoleFilter =
    document.getElementById("userRoleFilter");

const userStatusFilter =
    document.getElementById("userStatusFilter");

const userSort =
    document.getElementById("userSort");

const usersTableBody =
    document.getElementById("usersTableBody");

const usersEmptyState =
    document.getElementById("usersEmptyState");

const usersPaginationInfo =
    document.getElementById("usersPaginationInfo");

const usersPreviousBtn =
    document.getElementById("usersPreviousBtn");

const usersNextBtn =
    document.getElementById("usersNextBtn");

const usersPageButtons =
    document.getElementById("usersPageButtons");



/* =========================================================
   4. FORMAT DATE
   ---------------------------------------------------------
   Database format:
   2026-09-12

   Display format:
   Sep 12, 2026
   ========================================================= */

function formatUserDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {

        month: "short",

        day: "2-digit",

        year: "numeric"

    });

}



/* =========================================================
   5. RENDER USERS
   ---------------------------------------------------------
   filteredUsers ke data ko table ke andar display karta hai.
   ========================================================= */

function renderUsers() {

    if (!usersTableBody) {
        return;
    }


    usersTableBody.innerHTML = "";


    /* Total pages calculate */

    const totalPages =
        Math.ceil(filteredUsers.length / usersPerPage);


    /* Agar current page invalid ho jaye */

    if (currentPage > totalPages && totalPages > 0) {

        currentPage = totalPages;

    }


    /* Current page ka starting index */

    const startIndex =
        (currentPage - 1) * usersPerPage;


    /* Current page ke users */

    const pageUsers =
        filteredUsers.slice(
            startIndex,
            startIndex + usersPerPage
        );


    /* No users found */

    if (pageUsers.length === 0) {

        if (usersEmptyState) {

            usersEmptyState.style.display = "block";

        }

        updatePagination();

        return;

    }


    /* Users mil gaye */

    if (usersEmptyState) {

        usersEmptyState.style.display = "none";

    }


    /* Har user ke liye table row */

    pageUsers.forEach(function (user) {

        const row =
            document.createElement("tr");


        /*
           Employer ke applications nahi hote,
           isliye null hone par — display karenge.
        */

        const applications =
            user.applications === null
                ? "—"
                : user.applications;


        /*
           Status ke according CSS class.
        */

        const statusClass =
            user.status === "Active"
                ? "active-status"
                : "suspended-status";


        /*
           Role ke according CSS class.
        */

        const roleClass =
            user.role === "Employer"
                ? "employer"
                : user.role === "Admin"
                    ? "admin"
                    : "seeker";


        row.innerHTML = `

            <td>

                <div class="user-cell">

                    <div class="table-avatar">
                        ${user.initials}
                    </div>

                    <div>

                        <strong>
                            ${user.name}
                        </strong>

                        <span>
                            ${user.email}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <span class="role-badge ${roleClass}">
                    ${user.role}
                </span>

            </td>


            <td>
                ${formatUserDate(user.joined)}
            </td>


            <td>
                ${applications}
            </td>


            <td>

                <span class="user-status ${statusClass}">
                    ${user.status}
                </span>

            </td>


            <td>

                <a
                    href="#"
                    class="table-action"
                    data-user-email="${user.email}"
                >
                    View
                </a>

            </td>

        `;


        usersTableBody.appendChild(row);

    });


    updatePagination();

}



/* =========================================================
   6. SEARCH + FILTER
   ========================================================= */

function applyUserFilters() {

    const searchValue =
        userSearch
            ? userSearch.value.toLowerCase().trim()
            : "";


    const selectedRole =
        userRoleFilter
            ? userRoleFilter.value
            : "all";


    const selectedStatus =
        userStatusFilter
            ? userStatusFilter.value
            : "all";


    /*
       Original data se filtering start karte hain.
    */

    filteredUsers =
        usersData.filter(function (user) {


            /* Search */

            const matchesSearch =
                user.name.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue);


            /* Role */

            const matchesRole =
                selectedRole === "all" ||
                user.role === selectedRole;


            /* Status */

            const matchesStatus =
                selectedStatus === "all" ||
                user.status === selectedStatus;


            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );

        });


    currentPage = 1;


    applyUserSort(false);


    renderUsers();

}



/* =========================================================
   7. SORT USERS
   ========================================================= */

function applyUserSort(shouldRender = true) {

    const selectedSort =
        userSort
            ? userSort.value
            : "newest";


    if (selectedSort === "newest") {

        filteredUsers.sort(function (a, b) {

            return new Date(b.joined) - new Date(a.joined);

        });

    }


    else if (selectedSort === "oldest") {

        filteredUsers.sort(function (a, b) {

            return new Date(a.joined) - new Date(b.joined);

        });

    }


    else if (selectedSort === "nameAsc") {

        filteredUsers.sort(function (a, b) {

            return a.name.localeCompare(b.name);

        });

    }


    else if (selectedSort === "nameDesc") {

        filteredUsers.sort(function (a, b) {

            return b.name.localeCompare(a.name);

        });

    }


    if (shouldRender) {

        currentPage = 1;

        renderUsers();

    }

}



/* =========================================================
   8. PAGINATION
   ========================================================= */

function updatePagination() {

    const totalUsers =
        filteredUsers.length;


    const totalPages =
        Math.ceil(totalUsers / usersPerPage);


    /* Pagination information */

    if (usersPaginationInfo) {

        if (totalUsers === 0) {

            usersPaginationInfo.textContent =
                "Showing 0 users";

        }

        else {

            const start =
                (currentPage - 1) * usersPerPage + 1;

            const end =
                Math.min(
                    currentPage * usersPerPage,
                    totalUsers
                );


            usersPaginationInfo.textContent =
                `Showing ${start}–${end} of ${totalUsers} users`;

        }

    }


    /* Previous button */

    if (usersPreviousBtn) {

        usersPreviousBtn.disabled =
            currentPage === 1;

    }


    /* Next button */

    if (usersNextBtn) {

        usersNextBtn.disabled =
            currentPage >= totalPages ||
            totalPages === 0;

    }


    renderPageButtons(totalPages);

}



/* =========================================================
   9. PAGE BUTTONS
   ========================================================= */

function renderPageButtons(totalPages) {

    if (!usersPageButtons) {
        return;
    }


    usersPageButtons.innerHTML = "";


    /*
       Maximum 4 page buttons display karenge.
    */

    const maxButtons =
        Math.min(totalPages, 4);


    for (let page = 1; page <= maxButtons; page++) {

        const button =
            document.createElement("button");


        button.type = "button";


        button.textContent = page;


        button.dataset.page = page;


        if (page === currentPage) {

            button.classList.add("current-page");

        }


        button.addEventListener(
            "click",
            function () {

                currentPage = page;

                renderUsers();

            }
        );


        usersPageButtons.appendChild(button);

    }

}



/* =========================================================
   10. PREVIOUS PAGE
   ========================================================= */

function goToPreviousPage() {

    if (currentPage > 1) {

        currentPage--;

        renderUsers();

    }

}



/* =========================================================
   11. NEXT PAGE
   ========================================================= */

function goToNextPage() {

    const totalPages =
        Math.ceil(
            filteredUsers.length / usersPerPage
        );


    if (currentPage < totalPages) {

        currentPage++;

        renderUsers();

    }

}



/* =========================================================
   12. VIEW USER
   ========================================================= */

function handleUserView(event) {

    event.preventDefault();


    const email =
        event.target.dataset.userEmail;


    const user =
        usersData.find(function (item) {

            return item.email === email;

        });


    if (!user) {
        return;
    }


    /*
       Abhi backend/detail page nahi bana hai,
       isliye temporary information show kar rahe hain.
    */

    alert(
        `User Details\n\n` +
        `Name: ${user.name}\n` +
        `Email: ${user.email}\n` +
        `Role: ${user.role}\n` +
        `Status: ${user.status}`
    );

}



/* =========================================================
   13. EVENT LISTENERS
   ========================================================= */


/* Search */

if (userSearch) {

    userSearch.addEventListener(
        "input",
        applyUserFilters
    );

}


/* Role filter */

if (userRoleFilter) {

    userRoleFilter.addEventListener(
        "change",
        applyUserFilters
    );

}


/* Status filter */

if (userStatusFilter) {

    userStatusFilter.addEventListener(
        "change",
        applyUserFilters
    );

}


/* Sort */

if (userSort) {

    userSort.addEventListener(
        "change",
        function () {

            applyUserSort(true);

        }
    );

}


/* Previous */

if (usersPreviousBtn) {

    usersPreviousBtn.addEventListener(
        "click",
        goToPreviousPage
    );

}


/* Next */

if (usersNextBtn) {

    usersNextBtn.addEventListener(
        "click",
        goToNextPage
    );

}


/* View buttons */

if (usersTableBody) {

    usersTableBody.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "table-action"
                )
            ) {

                handleUserView(event);

            }

        }
    );

}



/* =========================================================
   14. ADD USER BUTTON
   ========================================================= */

const addUserBtn =
    document.getElementById("addUserBtn");


if (addUserBtn) {

    addUserBtn.addEventListener(
        "click",
        function () {

            alert(
                "Add User functionality will be connected to the backend later."
            );

        }
    );

}



/* =========================================================
   15. INITIALIZE USERS PAGE
   ========================================================= */

function initializeUsersPage() {

    applyUserSort(false);

    renderUsers();

}


/* Page load */

document.addEventListener(
    "DOMContentLoaded",
    initializeUsersPage
);
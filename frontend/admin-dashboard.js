/* =========================================================
   CAREERHUB - ADMIN DASHBOARD JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. ADMIN DASHBOARD DATA
   ---------------------------------------------------------
   Abhi ye demo/static data hai.
   Backend + MySQL connect hone ke baad ye data API se aayega.
   ========================================================= */

const adminDashboardData = {

    totalUsers: 8426,

    jobSeekers: 7218,

    employers: 1208,

    totalJobs: 12480,

    activeJobs: 8942,

    companies: 1084,

    applications: 38642,

    hired: 2416

};


/* =========================================================
   2. UPDATE STATISTICS
   ---------------------------------------------------------
   HTML ke statistic cards ko JavaScript data se update
   karta hai.
   ========================================================= */

function updateAdminStatistics() {

    const totalUsers = document.getElementById("adminTotalUsers");

    const jobSeekers = document.getElementById("adminJobSeekers");

    const employers = document.getElementById("adminEmployers");

    const totalJobs = document.getElementById("adminTotalJobs");

    const activeJobs = document.getElementById("adminActiveJobs");

    const companies = document.getElementById("adminCompanies");

    const applications = document.getElementById("adminApplications");

    const hired = document.getElementById("adminHired");


    /*
       Number ko readable format mein convert karne ke liye
       toLocaleString() use kar rahe hain.

       Example:
       8426 -> 8,426
       38642 -> 38,642
    */

    if (totalUsers) {
        totalUsers.textContent =
            adminDashboardData.totalUsers.toLocaleString();
    }


    if (jobSeekers) {
        jobSeekers.textContent =
            adminDashboardData.jobSeekers.toLocaleString();
    }


    if (employers) {
        employers.textContent =
            adminDashboardData.employers.toLocaleString();
    }


    if (totalJobs) {
        totalJobs.textContent =
            adminDashboardData.totalJobs.toLocaleString();
    }


    if (activeJobs) {
        activeJobs.textContent =
            adminDashboardData.activeJobs.toLocaleString();
    }


    if (companies) {
        companies.textContent =
            adminDashboardData.companies.toLocaleString();
    }


    if (applications) {
        applications.textContent =
            adminDashboardData.applications.toLocaleString();
    }


    if (hired) {
        hired.textContent =
            adminDashboardData.hired.toLocaleString();
    }

}



/* =========================================================
   3. RECENT USERS
   ========================================================= */

const recentUsers = [

    {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        role: "Job Seeker",
        joined: "Today",
        status: "Active"
    },

    {
        name: "Priya Verma",
        email: "priya@example.com",
        role: "Job Seeker",
        joined: "Today",
        status: "Active"
    },

    {
        name: "TechNova Pvt. Ltd.",
        email: "hr@technova.com",
        role: "Employer",
        joined: "Yesterday",
        status: "Active"
    },

    {
        name: "Aman Gupta",
        email: "aman@example.com",
        role: "Job Seeker",
        joined: "Yesterday",
        status: "Active"
    }

];



/* =========================================================
   4. RENDER RECENT USERS
   ---------------------------------------------------------
   Recent users table ko JavaScript se generate karta hai.
   ========================================================= */

function renderRecentUsers() {

    const usersContainer =
        document.getElementById("adminRecentUsers");


    if (!usersContainer) {
        return;
    }


    usersContainer.innerHTML = "";


    recentUsers.forEach(function (user) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>

                <strong>
                    ${user.name}
                </strong>

                <br>

                <small>
                    ${user.email}
                </small>

            </td>


            <td>
                ${user.role}
            </td>


            <td>
                ${user.joined}
            </td>


            <td>

                <span class="status-badge status-active">
                    ${user.status}
                </span>

            </td>

        `;


        usersContainer.appendChild(row);

    });

}



/* =========================================================
   5. RECENT JOBS DATA
   ========================================================= */

const recentJobs = [

    {
        title: "Frontend Developer",
        company: "TechNova Pvt. Ltd.",
        location: "Noida",
        type: "Full-time",
        status: "Active"
    },

    {
        title: "Java Backend Developer",
        company: "CloudWorks",
        location: "Noida",
        type: "Full-time",
        status: "Active"
    },

    {
        title: "UI/UX Designer",
        company: "DesignStudio",
        location: "Remote",
        type: "Full-time",
        status: "Active"
    },

    {
        title: "Data Analyst",
        company: "DataSphere",
        location: "Gurugram",
        type: "Full-time",
        status: "Active"
    }

];



/* =========================================================
   6. RENDER RECENT JOBS
   ========================================================= */

function renderRecentJobs() {

    const jobsContainer =
        document.getElementById("adminRecentJobs");


    if (!jobsContainer) {
        return;
    }


    jobsContainer.innerHTML = "";


    recentJobs.forEach(function (job) {

        const article = document.createElement("article");


        article.className = "dashboard-job-card";


        article.innerHTML = `

            <div>

                <h3>
                    ${job.title}
                </h3>

                <p>
                    ${job.company}
                </p>

                <p>
                    ${job.location} · ${job.type}
                </p>

            </div>


            <div>

                <span class="status-badge status-active">
                    ${job.status}
                </span>

            </div>

        `;


        jobsContainer.appendChild(article);

    });

}



/* =========================================================
   7. QUICK ACTION LINKS
   ---------------------------------------------------------
   Admin dashboard ke important management pages ke links
   ko verify karta hai.
   ========================================================= */

function initializeAdminQuickActions() {

    const actionLinks =
        document.querySelectorAll(".quick-action-card");


    actionLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            /*
               Normal <a> link browser ko automatically
               target page par le jayega.

               Yahan future mein permission checking,
               confirmation ya API logic add kiya ja sakta hai.
            */

            console.log(
                "Admin action:",
                link.getAttribute("href")
            );

        });

    });

}



/* =========================================================
   8. ADMIN DASHBOARD INITIALIZATION
   ---------------------------------------------------------
   Page load hone ke baad saare admin dashboard functions
   execute honge.
   ========================================================= */

function initializeAdminDashboard() {

    updateAdminStatistics();

    renderRecentUsers();

    renderRecentJobs();

    initializeAdminQuickActions();

}



/* =========================================================
   9. PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeAdminDashboard
);
// ============================================================
// CareerHub - Admin Analytics
// Handles analytics statistics, charts, tables,
// category performance and recent activity.
// ============================================================


// ------------------------------------------------------------
// 1. Analytics Data
// ------------------------------------------------------------

const analyticsData = {

    totalUsers: 8426,

    activeJobs: 8942,

    applications: 38642,

    hired: 2416,


    // Application status data
    applicationStatus: [
        {
            status: "Applied",
            count: 8240
        },
        {
            status: "Under Review",
            count: 6920
        },
        {
            status: "Shortlisted",
            count: 5480
        },
        {
            status: "Interview",
            count: 3240
        },
        {
            status: "Selected",
            count: 2416
        },
        {
            status: "Rejected",
            count: 12346
        }
    ],


    // User distribution
    userDistribution: [
        {
            role: "Job Seekers",
            count: 7218
        },
        {
            role: "Employers",
            count: 1208
        }
    ],


    // Job performance
    jobs: [
        {
            title: "Frontend Developer",
            company: "TechNova Solutions",
            applications: 842,
            interviews: 96,
            hired: 18,
            status: "Active"
        },

        {
            title: "Java Backend Developer",
            company: "DataCore Technologies",
            applications: 756,
            interviews: 84,
            hired: 15,
            status: "Active"
        },

        {
            title: "Software Engineer",
            company: "CloudWorks",
            applications: 684,
            interviews: 72,
            hired: 13,
            status: "Active"
        },

        {
            title: "Product Designer",
            company: "FinEdge",
            applications: 592,
            interviews: 64,
            hired: 11,
            status: "Active"
        },

        {
            title: "React Developer",
            company: "AppSphere",
            applications: 528,
            interviews: 58,
            hired: 9,
            status: "Active"
        },

        {
            title: "Python Developer",
            company: "CloudMatrix",
            applications: 476,
            interviews: 51,
            hired: 8,
            status: "Active"
        }
    ],


    // Monthly user growth
    userGrowth: [
        {
            month: "Apr",
            value: 4820
        },
        {
            month: "May",
            value: 5610
        },
        {
            month: "Jun",
            value: 6480
        },
        {
            month: "Jul",
            value: 7120
        },
        {
            month: "Aug",
            value: 7810
        },
        {
            month: "Sep",
            value: 8426
        }
    ],


    // Monthly applications
    applicationActivity: [
        {
            month: "Apr",
            value: 4820
        },
        {
            month: "May",
            value: 5360
        },
        {
            month: "Jun",
            value: 6120
        },
        {
            month: "Jul",
            value: 6980
        },
        {
            month: "Aug",
            value: 7560
        },
        {
            month: "Sep",
            value: 8240
        }
    ],


    // Popular job categories
    categories: [
        {
            name: "Software Development",
            jobs: 3240,
            applications: 12840
        },

        {
            name: "Data Science & AI",
            jobs: 1840,
            applications: 8240
        },

        {
            name: "Web Development",
            jobs: 1620,
            applications: 7180
        },

        {
            name: "UI/UX Design",
            jobs: 980,
            applications: 4260
        },

        {
            name: "Marketing",
            jobs: 760,
            applications: 3180
        },

        {
            name: "Finance",
            jobs: 620,
            applications: 2840
        }
    ],


    // Recent platform activity
    activity: [
        {
            icon: "👤",
            title: "New user registered",
            description: "A new job seeker joined CareerHub.",
            time: "10 minutes ago"
        },

        {
            icon: "💼",
            title: "New job posted",
            description: "TechNova Solutions posted a Frontend Developer position.",
            time: "32 minutes ago"
        },

        {
            icon: "📄",
            title: "Application received",
            description: "A candidate applied for Java Backend Developer.",
            time: "1 hour ago"
        },

        {
            icon: "🎯",
            title: "Candidate hired",
            description: "CloudWorks hired a Software Engineer.",
            time: "2 hours ago"
        },

        {
            icon: "🏢",
            title: "Company registered",
            description: "A new company created an employer account.",
            time: "3 hours ago"
        }
    ]
};


// ------------------------------------------------------------
// 2. Get HTML Elements
// ------------------------------------------------------------

const analyticsTotalUsers =
    document.getElementById("analyticsTotalUsers");

const analyticsActiveJobs =
    document.getElementById("analyticsActiveJobs");

const analyticsApplications =
    document.getElementById("analyticsApplications");

const analyticsHired =
    document.getElementById("analyticsHired");

const applicationStatusChart =
    document.getElementById("applicationStatusChart");

const userDistribution =
    document.getElementById("userDistribution");

const analyticsJobsTableBody =
    document.getElementById("analyticsJobsTableBody");

const userGrowthChart =
    document.getElementById("userGrowthChart");

const applicationActivityChart =
    document.getElementById("applicationActivityChart");

const categoryPerformance =
    document.getElementById("categoryPerformance");

const analyticsActivityList =
    document.getElementById("analyticsActivityList");

const analyticsJobPeriod =
    document.getElementById("analyticsJobPeriod");


// ------------------------------------------------------------
// 3. Render Overview Statistics
// ------------------------------------------------------------

function renderAnalyticsStats() {

    analyticsTotalUsers.textContent =
        analyticsData.totalUsers.toLocaleString("en-IN");

    analyticsActiveJobs.textContent =
        analyticsData.activeJobs.toLocaleString("en-IN");

    analyticsApplications.textContent =
        analyticsData.applications.toLocaleString("en-IN");

    analyticsHired.textContent =
        analyticsData.hired.toLocaleString("en-IN");
}


// ------------------------------------------------------------
// 4. Render Application Status Chart
// ------------------------------------------------------------

function renderApplicationStatusChart() {

    applicationStatusChart.innerHTML = "";


    const totalApplications =
        analyticsData.applicationStatus.reduce(
            (total, item) =>
                total + item.count,
            0
        );


    analyticsData.applicationStatus.forEach(item => {

        const percentage =
            (
                item.count /
                totalApplications
            ) * 100;


        const row =
            document.createElement("div");

        row.className =
            "analytics-progress-row";


        row.innerHTML = `

            <div class="analytics-progress-info">

                <span>
                    ${item.status}
                </span>

                <strong>
                    ${item.count.toLocaleString("en-IN")}
                </strong>

            </div>

            <div class="analytics-progress-track">

                <div
                    class="analytics-progress-bar"
                    style="width: ${percentage}%">
                </div>

            </div>

            <span class="analytics-percentage">
                ${percentage.toFixed(1)}%
            </span>

        `;


        applicationStatusChart.appendChild(row);
    });
}


// ------------------------------------------------------------
// 5. Render User Distribution
// ------------------------------------------------------------

function renderUserDistribution() {

    userDistribution.innerHTML = "";


    const totalUsers =
        analyticsData.userDistribution.reduce(
            (total, item) =>
                total + item.count,
            0
        );


    analyticsData.userDistribution.forEach(item => {

        const percentage =
            (
                item.count /
                totalUsers
            ) * 100;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "user-distribution-item";


        itemElement.innerHTML = `

            <div class="distribution-header">

                <span>
                    ${item.role}
                </span>

                <strong>
                    ${item.count.toLocaleString("en-IN")}
                </strong>

            </div>

            <div class="distribution-track">

                <div
                    class="distribution-bar"
                    style="width: ${percentage}%">
                </div>

            </div>

            <small>
                ${percentage.toFixed(1)}% of total users
            </small>

        `;


        userDistribution.appendChild(
            itemElement
        );
    });
}


// ------------------------------------------------------------
// 6. Render Job Performance Table
// ------------------------------------------------------------

function renderJobsTable() {

    analyticsJobsTableBody.innerHTML = "";


    analyticsData.jobs.forEach(job => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${job.title}
                </strong>
            </td>

            <td>
                ${job.company}
            </td>

            <td>
                ${job.applications.toLocaleString("en-IN")}
            </td>

            <td>
                ${job.interviews}
            </td>

            <td>
                ${job.hired}
            </td>

            <td>

                <span class="analytics-status active">
                    ${job.status}
                </span>

            </td>

        `;


        analyticsJobsTableBody.appendChild(row);
    });
}


// ------------------------------------------------------------
// 7. Render Bar Chart
// ------------------------------------------------------------

function renderBarChart(
    container,
    data
) {

    container.innerHTML = "";


    const maxValue =
        Math.max(
            ...data.map(item => item.value)
        );


    data.forEach(item => {

        const percentage =
            (
                item.value /
                maxValue
            ) * 100;


        const barItem =
            document.createElement("div");

        barItem.className =
            "analytics-bar-item";


        barItem.innerHTML = `

            <div class="analytics-bar-value">
                ${item.value.toLocaleString("en-IN")}
            </div>

            <div class="analytics-bar-wrapper">

                <div
                    class="analytics-bar"
                    style="height: ${percentage}%">
                </div>

            </div>

            <span class="analytics-bar-label">
                ${item.month}
            </span>

        `;


        container.appendChild(barItem);
    });
}


// ------------------------------------------------------------
// 8. Render Category Performance
// ------------------------------------------------------------

function renderCategoryPerformance() {

    categoryPerformance.innerHTML = "";


    const maxApplications =
        Math.max(
            ...analyticsData.categories.map(
                item => item.applications
            )
        );


    analyticsData.categories.forEach(
        (category, index) => {

            const percentage =
                (
                    category.applications /
                    maxApplications
                ) * 100;


            const element =
                document.createElement("div");

            element.className =
                "category-performance-item";


            element.innerHTML = `

                <div class="category-rank">
                    ${index + 1}
                </div>

                <div class="category-info">

                    <div class="category-title-row">

                        <strong>
                            ${category.name}
                        </strong>

                        <span>
                            ${category.jobs.toLocaleString("en-IN")}
                            jobs
                        </span>

                    </div>

                    <div class="category-track">

                        <div
                            class="category-bar"
                            style="width: ${percentage}%">
                        </div>

                    </div>

                </div>

                <div class="category-applications">

                    <strong>
                        ${category.applications.toLocaleString("en-IN")}
                    </strong>

                    <span>
                        applications
                    </span>

                </div>

            `;


            categoryPerformance.appendChild(
                element
            );
        }
    );
}


// ------------------------------------------------------------
// 9. Render Recent Activity
// ------------------------------------------------------------

function renderRecentActivity() {

    analyticsActivityList.innerHTML = "";


    analyticsData.activity.forEach(item => {

        const activity =
            document.createElement("div");

        activity.className =
            "analytics-activity-item";


        activity.innerHTML = `

            <div class="activity-icon">
                ${item.icon}
            </div>

            <div class="activity-content">

                <strong>
                    ${item.title}
                </strong>

                <p>
                    ${item.description}
                </p>

            </div>

            <span class="activity-time">
                ${item.time}
            </span>

        `;


        analyticsActivityList.appendChild(
            activity
        );
    });
}


// ------------------------------------------------------------
// 10. Job Period Change
// ------------------------------------------------------------

function handleJobPeriodChange() {

    const selectedPeriod =
        analyticsJobPeriod.value;


    if (selectedPeriod === "month") {

        renderJobsTable();

        return;
    }


    if (selectedPeriod === "quarter") {

        // Demo adjustment for quarterly view
        analyticsData.jobs.forEach(job => {

            job.applications =
                Math.round(
                    job.applications * 2.4
                );

            job.interviews =
                Math.round(
                    job.interviews * 2.2
                );

            job.hired =
                Math.round(
                    job.hired * 2
                );
        });

        renderJobsTable();

        return;
    }


    if (selectedPeriod === "year") {

        // Demo adjustment for yearly view
        analyticsData.jobs.forEach(job => {

            job.applications =
                Math.round(
                    job.applications * 8
                );

            job.interviews =
                Math.round(
                    job.interviews * 7
                );

            job.hired =
                Math.round(
                    job.hired * 6
                );
        });

        renderJobsTable();
    }
}


// ------------------------------------------------------------
// 11. Initialize Analytics Page
// ------------------------------------------------------------

function initializeAnalyticsPage() {

    renderAnalyticsStats();

    renderApplicationStatusChart();

    renderUserDistribution();

    renderJobsTable();

    renderBarChart(
        userGrowthChart,
        analyticsData.userGrowth
    );

    renderBarChart(
        applicationActivityChart,
        analyticsData.applicationActivity
    );

    renderCategoryPerformance();

    renderRecentActivity();
}


// ------------------------------------------------------------
// 12. Event Listener
// ------------------------------------------------------------

if (analyticsJobPeriod) {

    analyticsJobPeriod.addEventListener(
        "change",
        handleJobPeriodChange
    );
}


// ------------------------------------------------------------
// 13. Start After HTML Loads
// ------------------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    initializeAnalyticsPage
); 
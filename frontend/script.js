/* =========================================================
   CAREERHUB - MAIN JAVASCRIPT
   Online Job Portal Frontend
   ========================================================= */


/* =========================================================
   1. COMMON HELPERS
   ========================================================= */

// Find one element safely
function $(selector) {
    return document.querySelector(selector);
}

// Find multiple elements safely
function $$(selector) {
    return document.querySelectorAll(selector);
}

// Get data from localStorage
function getStorage(key, fallback = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch (error) {
        return fallback;
    }
}

// Save data to localStorage
function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Format numbers
function formatNumber(number) {
    return Number(number || 0).toLocaleString("en-IN");
}

// Show a simple message
function showMessage(message) {
    alert(message);
}


/* =========================================================
   PAGINATION / UI HELPERS
   ========================================================= */

const pageState = {
    saved: 1,
    myJobs: 1,
    applicants: 1,
    interviews: 1
};

const ITEMS_PER_PAGE = 5;

// Reset pagination to first page
function resetPage(key) {
    pageState[key] = 1;
}

// Get items for current page
function getPagedItems(items, key) {
    const totalPages = Math.max(
        1,
        Math.ceil(items.length / ITEMS_PER_PAGE)
    );

    if (pageState[key] > totalPages) {
        pageState[key] = totalPages;
    }

    const start =
        (pageState[key] - 1) * ITEMS_PER_PAGE;

    return {
        items: items.slice(
            start,
            start + ITEMS_PER_PAGE
        ),
        totalPages: totalPages
    };
}

// Create pagination buttons
function renderPagination(
    containerId,
    key,
    totalItems,
    onPageChange
) {
    const container = $(containerId);

    if (!container) return;

    container.innerHTML = "";

    const totalPages =
        Math.ceil(totalItems / ITEMS_PER_PAGE);

    if (totalPages <= 1) return;

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "pagination-controls";

    function addButton(
        label,
        page,
        disabled,
        active
    ) {
        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "pagination-btn" +
            (active ? " active" : "");

        button.textContent = label;
        button.disabled = disabled;

        if (!disabled) {
            button.addEventListener(
                "click",
                function () {
                    pageState[key] = page;

                    onPageChange();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            );
        }

        wrapper.appendChild(button);
    }

    addButton(
        "Previous",
        pageState[key] - 1,
        pageState[key] === 1,
        false
    );

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {
        addButton(
            String(page),
            page,
            false,
            page === pageState[key]
        );
    }

    addButton(
        "Next",
        pageState[key] + 1,
        pageState[key] === totalPages,
        false
    );

    container.appendChild(wrapper);
}


/* =========================================================
   2. JOB DATA
   ========================================================= */

const careerHubJobs = {

    "frontend-developer": {
        id: "frontend-developer",
        title: "Frontend Developer",
        company: "TechNova Solutions",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "Hybrid",
        salary: "₹8 - ₹12 LPA",
        experience: "1-3 Years",
        category: "Engineering",
        description:
            "Build responsive and modern web applications using HTML, CSS, JavaScript and modern frontend technologies.",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Git"
        ]
    },

    "java-backend-developer": {
        id: "java-backend-developer",
        title: "Java Backend Developer",
        company: "TechNova Solutions",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "Hybrid",
        salary: "₹10 - ₹15 LPA",
        experience: "2-4 Years",
        category: "Engineering",
        description:
            "Develop scalable backend services and REST APIs using Java, Spring Boot and MySQL.",
        skills: [
            "Java",
            "Spring Boot",
            "REST API",
            "MySQL",
            "Git"
        ]
    },

    "software-engineer": {
        id: "software-engineer",
        title: "Software Engineer",
        company: "TechNova Solutions",
        location: "Pune, India",
        type: "Full Time",
        mode: "Remote",
        salary: "₹12 - ₹16 LPA",
        experience: "2-5 Years",
        category: "Engineering",
        description:
            "Work with engineering teams to design, develop and maintain scalable software systems.",
        skills: [
            "Java",
            "JavaScript",
            "SQL",
            "DSA",
            "REST API"
        ]
    },

    "product-designer": {
        id: "product-designer",
        title: "Product Designer",
        company: "TechNova Solutions",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "Onsite",
        salary: "₹8 - ₹11 LPA",
        experience: "2-4 Years",
        category: "Design",
        description:
            "Design intuitive digital products and collaborate with product and engineering teams.",
        skills: [
            "Figma",
            "UI Design",
            "UX Design",
            "Prototyping"
        ]
    },

    "java-hyderabad-developer": {
        id: "java-hyderabad-developer",
        title: "Java Developer",
        company: "CloudCore Technologies",
        location: "Hyderabad, India",
        type: "Full Time",
        mode: "Hybrid",
        salary: "₹9 - ₹14 LPA",
        experience: "1-3 Years",
        category: "Engineering",
        description:
            "Develop backend applications and REST APIs using Java, Spring Boot and MySQL.",
        skills: [
            "Java",
            "Spring Boot",
            "REST API",
            "MySQL",
            "Git"
        ]
    }
};


/* =========================================================
   3. EMPLOYER JOB DATA
   ========================================================= */

const defaultEmployerJobs = [

    {
        id: "frontend-developer",
        title: "Frontend Developer",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "Hybrid",
        salary: 12,
        status: "active",
        date: "2026-09-18",
        applicants: 32,
        views: 1240
    },

    {
        id: "java-backend-developer",
        title: "Java Backend Developer",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "Hybrid",
        salary: 15,
        status: "active",
        date: "2026-09-17",
        applicants: 28,
        views: 980
    },

    {
        id: "software-engineer",
        title: "Software Engineer",
        location: "Pune, India",
        type: "Full Time",
        mode: "Remote",
        salary: 16,
        status: "active",
        date: "2026-09-15",
        applicants: 21,
        views: 760
    },

    {
        id: "product-designer",
        title: "Product Designer",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "Onsite",
        salary: 11,
        status: "closed",
        date: "2026-09-05",
        applicants: 43,
        views: 1850
    },

    {
        id: "data-analyst",
        title: "Data Analyst",
        location: "Bengaluru, India",
        type: "Full Time",
        mode: "Hybrid",
        salary: 10,
        status: "active",
        date: "2026-09-03",
        applicants: 19,
        views: 680
    },

    {
        id: "devops-engineer",
        title: "DevOps Engineer",
        location: "Hyderabad, India",
        type: "Full Time",
        mode: "Hybrid",
        salary: 14,
        status: "active",
        date: "2026-08-29",
        applicants: 17,
        views: 590
    },

    {
        id: "qa-engineer",
        title: "QA Engineer",
        location: "Pune, India",
        type: "Full Time",
        mode: "Onsite",
        salary: 9,
        status: "closed",
        date: "2026-08-25",
        applicants: 26,
        views: 820
    },

    {
        id: "ui-ux-designer",
        title: "UI/UX Designer",
        location: "Delhi, India",
        type: "Full Time",
        mode: "Remote",
        salary: 9,
        status: "draft",
        date: "2026-08-20",
        applicants: 0,
        views: 0
    }
];

const EMPLOYER_JOBS_KEY =
    "careerHubEmployerJobs";

function getEmployerJobs() {

    const savedJobs =
        getStorage(EMPLOYER_JOBS_KEY);

    if (
        savedJobs &&
        Array.isArray(savedJobs)
    ) {
        return savedJobs;
    }

    setStorage(
        EMPLOYER_JOBS_KEY,
        defaultEmployerJobs
    );

    return defaultEmployerJobs;
}

function saveEmployerJobs(jobs) {
    setStorage(
        EMPLOYER_JOBS_KEY,
        jobs
    );
}


/* =========================================================
   4. HOME PAGE SEARCH
   ========================================================= */

function initHomeSearch() {
    const searchForm =
        $("#jobSearchForm");

    if (!searchForm) {
        return;
    }

    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const keywordInput =
                $("#keywordInput");

            const locationInput =
                $("#locationInput");

            const keyword =
                keywordInput
                    ? keywordInput.value.trim()
                    : "";

            const location =
                locationInput
                    ? locationInput.value.trim()
                    : "";

            const params =
                new URLSearchParams();

            if (keyword) {
                params.set(
                    "keyword",
                    keyword
                );
            }

            if (location) {
                params.set(
                    "location",
                    location
                );
            }

            window.location.href =
                "jobs.html?" +
                params.toString();
        }
    );
}


/* =========================================================
   5. JOBS PAGE
   ========================================================= */

function initJobsPage() {

    const jobsList =
        $("#jobsList");

    if (!jobsList) {
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const keyword =
        params.get("keyword") || "";

    const location =
        params.get("location") || "";

    const searchInput =
        $("#jobSearch");

    const locationInput =
        $("#jobLocation");

    if (searchInput) {
        searchInput.value = keyword;
    }

    if (locationInput) {
        locationInput.value = location;
    }

    renderJobs();

    const searchForm =
        $("#jobsSearchForm");

    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                renderJobs();
            }
        );
    }

    const filterElements = $$(
        "#jobTypeFilter, " +
        "#jobModeFilter, " +
        "#jobExperienceFilter, " +
        "#jobCategoryFilter, " +
        "#jobSort"
    );

    filterElements.forEach(
        function (element) {

            element.addEventListener(
                "change",
                function () {
                    renderJobs();
                }
            );
        }
    );
}


async function renderJobs() {

    const jobsList =
        $("#jobsList");

    if (!jobsList) {
        return;
    }

    const searchInput =
        $("#jobSearch");

    const locationInput =
        $("#jobLocation");

    const keyword =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";

    const location =
        locationInput
            ? locationInput.value
                .toLowerCase()
                .trim()
            : "";

    const type =
        $("#jobTypeFilter")
            ? $("#jobTypeFilter").value
            : "all";

    const mode =
        $("#jobModeFilter")
            ? $("#jobModeFilter").value
            : "all";

    const experience =
        $("#jobExperienceFilter")
            ? $("#jobExperienceFilter").value
            : "all";

    const category =
        $("#jobCategoryFilter")
            ? $("#jobCategoryFilter").value
            : "all";

    const sort =
        $("#jobSort")
            ? $("#jobSort").value
            : "newest";


    let jobs;

    try {

        const backendJobs =
            await apiRequest("/jobs");

        jobs =
            backendJobs.map(
                function (job) {

                    return {
                        id: job.id,
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        salary: job.salary,
                        description: job.description,
                        type: job.jobType,
                        mode: "On-site",
                        experience: "Not specified",

                        category:
                            job.categoryId
                                ? String(job.categoryId)
                                : "all",

                        skills:
                            job.skills
                                ? job.skills
                                    .split(",")
                                    .map(
                                        function (skill) {
                                            return skill.trim();
                                        }
                                    )
                                    .filter(Boolean)
                                : []
                    };
                }
            );

    } catch (error) {

        console.error(error);

        jobsList.innerHTML = `
        <div class="empty-state">
            <h3>Unable to load jobs</h3>
            <p>
                Please try again later.
            </p>
        </div>
    `;

        updateJobCount(0);

        return;
    }


    // Apply search and filters
    jobs = jobs.filter(
        function (job) {

            const searchableText = (
                job.title +
                " " +
                job.company +
                " " +
                job.location +
                " " +
                job.category +
                " " +
                job.skills.join(" ")
            ).toLowerCase();

            const matchesKeyword =
                !keyword ||
                searchableText.includes(
                    keyword
                );

            const matchesLocation =
                !location ||
                job.location
                    .toLowerCase()
                    .includes(location);

            const matchesType =
                type === "all" ||
                job.type
                    .toLowerCase() ===
                type.toLowerCase();

            const matchesMode =
                mode === "all" ||
                job.mode
                    .toLowerCase() ===
                mode.toLowerCase();

            const matchesExperience =
                experience === "all" ||
                job.experience
                    .toLowerCase()
                    .includes(
                        experience.toLowerCase()
                    );

            const matchesCategory =
                category === "all" ||
                job.category
                    .toLowerCase() ===
                category.toLowerCase();

            return (
                matchesKeyword &&
                matchesLocation &&
                matchesType &&
                matchesMode &&
                matchesExperience &&
                matchesCategory
            );
        }
    );


    // Sorting
    if (sort === "title") {

        jobs.sort(
            function (a, b) {
                return a.title.localeCompare(
                    b.title
                );
            }
        );

    } else if (sort === "company") {

        jobs.sort(
            function (a, b) {
                return a.company.localeCompare(
                    b.company
                );
            }
        );
    }


    jobsList.innerHTML = "";


    if (jobs.length === 0) {

        jobsList.innerHTML = `
            <div class="empty-state">
                <h3>No jobs found</h3>
                <p>
                    Try changing your search
                    or filters.
                </p>
            </div>
        `;

        updateJobCount(0);

        return;
    }


    // Create job cards
    jobs.forEach(
        function (job) {

            const isSaved =
                getSavedJobs().includes(
                    job.id
                );

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "job-card";

            card.innerHTML = `

                <div class="job-card-top">

                    <div>

                        <h3>
                            <a href="job-details.html?id=${job.id}">
                                ${job.title}
                            </a>
                        </h3>

                        <p class="job-company">
                            ${job.company}
                        </p>

                    </div>

                    <button
                        class="save-job-btn ${isSaved ? "saved" : ""}"
                        data-job-id="${job.id}"
                        type="button">
                        ${isSaved ? "♥" : "♡"}
                    </button>

                </div>


                <div class="job-meta">

                    <span>
                        📍 ${job.location}
                    </span>

                    <span>
                        💼 ${job.type}
                    </span>

                    <span>
                        🏠 ${job.mode}
                    </span>

                    <span>
                        💰 ${job.salary}
                    </span>

                </div>


                <p class="job-description">
                    ${job.description}
                </p>


                <div class="job-skills">

                    ${job.skills.map(
                function (skill) {
                    return `
                                <span>
                                    ${skill}
                                </span>
                            `;
                }
            ).join("")}

                </div>


                <div class="job-card-footer">

                    <span>
                        ${job.experience}
                    </span>

                    <a
                        href="job-details.html?id=${job.id}"
                        class="secondary-btn">
                        View Job
                    </a>

                </div>

            `;

            jobsList.appendChild(card);
        }
    );


    updateJobCount(
        jobs.length
    );

    initSaveButtons();
}


function updateJobCount(count) {

    const element =
        $("#jobsResultsCount");

    if (element) {
        element.textContent =
            `${formatNumber(count)} jobs found`;
    }
}


/* =========================================================
   6. SAVED JOBS
   ========================================================= */

const SAVED_JOBS_KEY =
    "careerHubSavedJobs";


function getSavedJobs() {

    const jobs =
        getStorage(
            SAVED_JOBS_KEY,
            []
        );

    return Array.isArray(jobs)
        ? jobs
        : [];
}


function saveJob(jobId) {

    let savedJobs =
        getSavedJobs();

    if (
        !savedJobs.includes(jobId)
    ) {

        savedJobs.push(jobId);

        setStorage(
            SAVED_JOBS_KEY,
            savedJobs
        );

        return true;
    }

    return false;
}


function removeSavedJob(jobId) {

    let savedJobs =
        getSavedJobs();

    savedJobs =
        savedJobs.filter(
            function (id) {
                return id !== jobId;
            }
        );

    setStorage(
        SAVED_JOBS_KEY,
        savedJobs
    );
}


function toggleSavedJob(jobId) {

    const savedJobs =
        getSavedJobs();

    if (
        savedJobs.includes(jobId)
    ) {

        removeSavedJob(jobId);

    } else {

        saveJob(jobId);
    }
}


function initSaveButtons() {

    const buttons =
        $$(".save-job-btn");

    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const jobId =
                        button.dataset.jobId;

                    toggleSavedJob(
                        jobId
                    );

                    const saved =
                        getSavedJobs()
                            .includes(
                                jobId
                            );

                    button.classList.toggle(
                        "saved",
                        saved
                    );

                    button.textContent =
                        saved
                            ? "♥"
                            : "♡";

                    renderSavedCount();
                }
            );
        }
    );

    renderSavedCount();
}


function renderSavedCount() {

    const count =
        getSavedJobs().length;

    const elements =
        $$("#savedJobsCount");

    elements.forEach(
        function (element) {
            element.textContent =
                count;
        }
    );
}


/* =========================================================
   7. SAVED JOBS PAGE
   ========================================================= */

function renderSavedJobs() {

    const container =
        $("#savedJobsList");

    if (!container) return;


    let jobs =
        getSavedJobs()
            .map(
                function (id) {
                    return careerHubJobs[id];
                }
            )
            .filter(Boolean);


    const sort =
        $("#savedJobsSort")
            ? $("#savedJobsSort").value
            : "newest";


    // Sort saved jobs
    if (sort === "title") {

        jobs.sort(
            function (a, b) {
                return a.title.localeCompare(
                    b.title
                );
            }
        );

    } else if (sort === "company") {

        jobs.sort(
            function (a, b) {
                return a.company.localeCompare(
                    b.company
                );
            }
        );
    }


    const count =
        $("#savedJobsCount");

    if (count) {
        count.textContent =
            jobs.length;
    }


    container.innerHTML = "";

    const empty =
        $("#savedJobsEmpty");


    if (jobs.length === 0) {

        if (empty) {
            empty.style.display =
                "block";
        }

        container.innerHTML = `
            <div class="empty-state">
                <h3>No saved jobs</h3>
                <p>
                    Jobs you save will
                    appear here.
                </p>

                <a
                    href="jobs.html"
                    class="primary-btn">
                    Browse Jobs
                </a>
            </div>
        `;

        renderPagination(
            "#savedPagination",
            "saved",
            0,
            renderSavedJobs
        );

        return;
    }


    if (empty) {
        empty.style.display =
            "none";
    }


    // Get current page items
    const page =
        getPagedItems(
            jobs,
            "saved"
        );


    page.items.forEach(
        function (job) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "job-card";

            card.innerHTML = `

                <div class="job-card-top">

                    <div>

                        <h3>
                            ${job.title}
                        </h3>

                        <p>
                            ${job.company}
                        </p>

                    </div>

                    <button
                        class="save-job-btn saved"
                        data-job-id="${job.id}"
                        type="button">
                        ♥
                    </button>

                </div>


                <div class="job-meta">

                    <span>
                        📍 ${job.location}
                    </span>

                    <span>
                        💼 ${job.type}
                    </span>

                    <span>
                        💰 ${job.salary}
                    </span>

                </div>


                <div class="job-card-footer">

                    <a
                        href="job-details.html?id=${job.id}"
                        class="secondary-btn">
                        View Job
                    </a>

                </div>

            `;

            container.appendChild(card);
        }
    );


    // Create pagination
    renderPagination(
        "#savedPagination",
        "saved",
        jobs.length,
        renderSavedJobs
    );

    // Reconnect save buttons
    initSaveButtons();
}


function initSavedJobsPage() {

    if (!$("#savedJobsList")) {
        return;
    }


    const sort =
        $("#savedJobsSort");


    if (sort) {

        sort.addEventListener(
            "change",
            function () {

                resetPage("saved");

                renderSavedJobs();
            }
        );
    }


    renderSavedJobs();
}/* =========================================================
   8. JOB DETAILS PAGE
   ========================================================= */

async function initJobDetailsPage() {

    const container = $("#jobDetails");

    if (!container) {
        return;
    }

    const params =
        new URLSearchParams(window.location.search);

    const jobId =
        params.get("id");

    let job;

    try {

        job =
            await apiRequest(
                "/jobs/" + jobId
            );

    } catch (error) {

        console.error(error);

        container.innerHTML = `
        <div class="empty-state">
            <h3>Job not found</h3>
            <p>
                Unable to load this job.
            </p>
        </div>
    `;

        return;
    }

    const title = $("#jobTitle");

    if (title) {
        title.textContent = job.title;
    }

    const company = $("#jobCompany");

    if (company) {
        company.textContent = job.company;
    }

    const location = $("#jobLocation");

    if (location) {
        location.textContent = job.location;
    }

    const salary = $("#jobSalary");

    if (salary) {
        salary.textContent = job.salary;
    }

    const description = $("#jobDescription");

    if (description) {
        description.textContent =
            job.description;
    }

    const skills = $("#jobSkills");

    if (skills) {

        const skillList =
            job.skills
                ? job.skills
                    .split(",")
                    .map(function (skill) {
                        return skill.trim();
                    })
                    .filter(Boolean)
                : [];

        skills.innerHTML =
            skillList.map(function (skill) {
                return `<span>${skill}</span>`;
            }).join("");
    }
    const applyButton =
        $("#applyNowBtn");

    if (applyButton) {

        applyButton.href =
            "apply.html?id=" + job.id;
    }
    const saveButton =
        $("#jobDetailsSaveBtn");

    if (saveButton) {

        const saved =
            getSavedJobs().includes(job.id);

        saveButton.textContent =
            saved
                ? "♥ Saved"
                : "♡ Save Job";
        saveButton.classList.toggle(
            "saved",
            saved
        );

        saveButton.addEventListener(
            "click",
            function () {
                alert("SAVE CLICK");
                toggleSavedJob(job.id);

                const isSaved =
                    getSavedJobs()
                        .includes(job.id);

                saveButton.textContent =
                    isSaved
                        ? "♥ Saved"
                        : "♡ Save Job";
                saveButton.classList.toggle(
                    "saved",
                    isSaved
                );
            }
        );
    }
}


/* =========================================================
   9. APPLICATION FORM
   ========================================================= */

function initApplicationForm() {

    const form = $("#applicationForm");

    if (!form) {
        return;
    }

    const resume = $("#applicationResume");
    const resumeText = $("#resumeText");
    const terms = $("#applicationTerms");

    // Resume select hone par filename show karo
    if (resume) {
        resume.addEventListener("change", function () {

            if (resume.files.length > 0 && resumeText) {
                resumeText.textContent = resume.files[0].name;
            }
        });
    }

    // Application submit
    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Browser ki required-field validation ke baad hi ye chalega
        if (terms && !terms.checked) {
            showMessage("Please accept the application terms.");
            return;
        }

        if (resume && resume.files.length === 0) {
            showMessage("Please select your resume.");
            return;
        }

        // Job ID URL se lo
        const params =
            new URLSearchParams(
                window.location.search
            );

        const jobId =
            Number(params.get("id"));

        if (!jobId) {
            showMessage("Invalid job ID.");
            return;
        }


        // Logged-in user ka token check karo
        const token =
            localStorage.getItem("careerHubToken");

        if (!token) {
            showMessage("Please login before applying.");
            return;
        }


        try {

            // All users lao
            const users =
                await apiRequest("/users");

            // JWT se email nikalo
            // JWT se email nikalo
            const parts =
                token.split(".");

            if (parts.length !== 3) {

                showMessage(
                    "Please login again before applying."
                );

                return;
            }

            const payload =
                JSON.parse(
                    atob(
                        parts[1]
                            .replace(/-/g, "+")
                            .replace(/_/g, "/")
                    )
                );

            const email =
                payload.sub;


            // Logged-in user find karo
            const currentUser =
                users.find(
                    function (user) {
                        return user.email === email;
                    }
                );


            if (!currentUser) {
                showMessage("User not found.");
                return;
            }


            // Application backend ko bhejo
            await apiRequest(
                "/applications",
                {
                    method: "POST",

                    body: JSON.stringify({
                        jobId: jobId,
                        userId: currentUser.id,
                        resume: resume.files[0].name,
                        status: "PENDING",
                        appliedDate:
                            new Date()
                                .toISOString()
                                .split("T")[0]
                    })
                }
            );


            showMessage(
                "Application submitted successfully!"
            );
            window.location.href = "applications.html";

            // Form reset
            form.reset();


            if (resumeText) {
                resumeText.textContent =
                    "PDF, DOC or DOCX · Max 5 MB";
            }


        } catch (error) {

            console.error(error);

            showMessage(
                error.message ||
                "Unable to submit application."
            );
        }

        // Resume text ko default state me lao
        if (resumeText) {
            resumeText.textContent =
                "PDF, DOC or DOCX · Max 5 MB";
        }
    });
}

/* =========================================================
   10. PROFILE PAGE
   ========================================================= */

function initProfilePage() {

    const editButton = $("#editProfileBtn");

    if (!editButton) {
        return;
    }

    let editing = false;

    editButton.addEventListener("click", function () {

        if (!editing) {

            // Personal information ko editable inputs me convert karo
            const firstName = $("#profileFirstName");
            const lastName = $("#profileLastName");
            const email = $("#profileEmail");
            const phone = $("#profilePhone");
            const summary = $("#profileSummary");

            if (firstName) {
                firstName.innerHTML =
                    '<input type="text" id="editFirstName" value="' +
                    firstName.textContent.trim() +
                    '">';
            }

            if (lastName) {
                lastName.innerHTML =
                    '<input type="text" id="editLastName" value="' +
                    lastName.textContent.trim() +
                    '">';
            }

            if (email) {
                email.innerHTML =
                    '<input type="email" id="editEmail" value="' +
                    email.textContent.trim() +
                    '">';
            }

            if (phone) {
                phone.innerHTML =
                    '<input type="text" id="editPhone" value="' +
                    phone.textContent.trim() +
                    '">';
            }

            if (summary) {
                summary.innerHTML =
                    '<textarea id="editSummary">' +
                    summary.textContent.trim() +
                    '</textarea>';
            }

            editButton.textContent = "Save Profile";

            editing = true;

        } else {

            // Updated values ko wapas normal text me show karo
            const firstName = $("#profileFirstName");
            const lastName = $("#profileLastName");
            const email = $("#profileEmail");
            const phone = $("#profilePhone");
            const summary = $("#profileSummary");

            const editFirstName = $("#editFirstName");
            const editLastName = $("#editLastName");
            const editEmail = $("#editEmail");
            const editPhone = $("#editPhone");
            const editSummary = $("#editSummary");

            if (firstName && editFirstName) {
                firstName.textContent =
                    editFirstName.value;
            }

            if (lastName && editLastName) {
                lastName.textContent =
                    editLastName.value;
            }

            if (email && editEmail) {
                email.textContent =
                    editEmail.value;
            }

            if (phone && editPhone) {
                phone.textContent =
                    editPhone.value;
            }

            if (summary && editSummary) {
                summary.textContent =
                    editSummary.value;
            }

            editButton.textContent = "Edit profile";

            editing = false;

            showMessage(
                "Profile updated successfully!"
            );
        }
    });
}


/* =========================================================
   11. PROFILE EXPERIENCE
   ========================================================= */

function initExperience() {

    const addButton =
        $("#addExperienceBtn");

    const experienceList =
        $("#experienceList");

    if (
        !addButton ||
        !experienceList
    ) {
        return;
    }

    addButton.addEventListener(
        "click",
        function () {

            const item =
                document.createElement("div");

            item.className =
                "experience-item";

            item.innerHTML = `

                <div>

                    <strong>
                        New Position
                    </strong>

                    <p>
                        Company Name
                    </p>

                </div>

                <button
                    type="button"
                    class="danger-btn remove-experience">
                    Remove
                </button>

            `;

            experienceList.appendChild(item);
        }
    );


    experienceList.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "remove-experience"
                )
            ) {

                event.target
                    .closest(".experience-item")
                    .remove();
            }
        }
    );
}


/* =========================================================
   12. APPLICATIONS PAGE
   ========================================================= */

function initApplicationsPage() {

    const applicationList = $("#applicationsList");

    if (!applicationList) {
        return;
    }

    const tabs = $$(".application-tab");
    const sort = $("#applicationSort");

    let activeStatus = "all";

    // Demo applications

    let applications = [];
    async function loadApplications() {

        try {

            const token =
                localStorage.getItem("careerHubToken");

            if (!token) {

                applicationList.innerHTML = `
                <div class="empty-state">
                    <h3>Please login first</h3>
                    <p>Login to view your applications.</p>
                </div>
            `;

                return;
            }


            const users =
                await apiRequest("/users");


            const parts =
                token.split(".");


            if (parts.length !== 3) {

                throw new Error(
                    "Invalid login session."
                );
            }


            const payload =
                JSON.parse(
                    atob(
                        parts[1]
                            .replace(/-/g, "+")
                            .replace(/_/g, "/")
                    )
                );


            const currentUser =
                users.find(function (user) {

                    return user.email === payload.sub;

                });


            if (!currentUser) {

                throw new Error(
                    "User not found."
                );
            }


            const backendApplications =
                await apiRequest(
                    "/applications"
                );


            applications =
                await Promise.all(

                    backendApplications

                        .filter(function (application) {

                            return (
                                application.userId ===
                                currentUser.id
                            );

                        })

                        .map(async function (application) {

                            const job =
                                await apiRequest(
                                    "/jobs/" +
                                    application.jobId
                                );


                            const status =
                                normalizeStatus(
                                    application.status
                                );


                            return {

                                jobId:
                                    application.jobId,

                                company:
                                    job.company,

                                job:
                                    job.title,

                                status:
                                    status === "pending"
                                        ? "applied"
                                        : status,

                                date:
                                    application.appliedDate
                            };

                        })

                );


            updateStats();

            renderApplications();


        } catch (error) {

            console.error(error);


            applicationList.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load applications</h3>
                <p>Please try again later.</p>
            </div>
        `;
        }
    }

    function normalizeStatus(value) {

        const status = String(value || "")
            .toLowerCase()
            .replace(/[_\s]+/g, "-");

        if (status === "under-review") {
            return "review";
        }

        if (status === "pending") {
            return "applied";
        }

        return status;
    }


    function updateStats() {

        const set = function (id, value) {

            const element = $(id);

            if (element) {
                element.textContent = value;
            }
        };

        set(
            "#totalApplications",
            applications.length
        );

        set(
            "#reviewApplications",
            applications.filter(function (app) {
                return app.status === "review";
            }).length
        );

        set(
            "#shortlistedApplications",
            applications.filter(function (app) {
                return app.status === "shortlisted";
            }).length
        );

        set(
            "#interviewApplications",
            applications.filter(function (app) {
                return app.status === "interview";
            }).length
        );
    }


    function renderApplications() {

        let visibleApplications =
            applications.filter(function (app) {

                return (
                    activeStatus === "all" ||
                    normalizeStatus(app.status) ===
                    activeStatus
                );

            });


        const selectedSort =
            sort ? sort.value : "newest";


        visibleApplications.sort(
            function (a, b) {

                if (selectedSort === "oldest") {
                    return (
                        new Date(a.date) -
                        new Date(b.date)
                    );
                }

                if (selectedSort === "updated") {
                    return (
                        new Date(b.date) -
                        new Date(a.date)
                    );
                }

                return (
                    new Date(b.date) -
                    new Date(a.date)
                );
            }
        );


        applicationList.innerHTML = "";


        visibleApplications.forEach(
            function (app) {

                const card =
                    document.createElement("article");

                card.className =
                    "application-card";

                card.dataset.status =
                    app.status;

                card.dataset.date =
                    app.date;

                card.innerHTML = `
                    <div class="application-card-content">

                        <div class="application-company">
                            <strong>${app.company}</strong>
                        </div>

                        <div class="application-info">
                            <h3>${app.job}</h3>
                            <p>${app.company}</p>
                        </div>

                        <div class="application-status">
                            <span class="status-badge ${app.status}">
                                ${app.status === "review"
                        ? "Under Review"
                        : app.status.charAt(0).toUpperCase() +
                        app.status.slice(1)}
                            </span>

                            <span>
                                Applied:
                                ${app.date}
                            </span>
                        </div>

                    </div>
                `;

                applicationList.appendChild(card);
            }
        );
    }


    // Tabs
    tabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                activeStatus =
                    normalizeStatus(
                        tab.dataset.status || "all"
                    );

                tabs.forEach(function (item) {

                    item.classList.remove("active");

                });

                tab.classList.add("active");

                renderApplications();
            }
        );
    });


    // Sorting
    if (sort) {

        sort.addEventListener(
            "change",
            renderApplications
        );
    }


    loadApplications();
}

/* =========================================================
   STUDENT DASHBOARD
   ========================================================= */

async function initDashboardPage() {

    const dashboard =
        $(".dashboard-page");

    if (!dashboard) {
        return;
    }

    const token =
        localStorage.getItem("careerHubToken");

    if (!token) {
        return;
    }

    try {

        // Logged-in user
        const currentUser =
            await apiRequest("/users/me");

        if (!currentUser) {
            return;
        }

        // User name
        const userName =
            $("#dashboardUserName");

        if (userName) {
            userName.textContent =
                currentUser.name;
        }

        // Greeting
        const greeting =
            $("#dashboardGreeting");

        if (greeting) {

            const firstName =
                currentUser.name
                    .split(" ")[0];

            greeting.textContent =
                "Good evening, " +
                firstName;
        }

        // User ki applications
        const applications =
            await apiRequest("/applications");

        const myApplications =
            applications.filter(
                function (application) {

                    return (
                        application.userId ===
                        currentUser.id
                    );

                }
            );

        // Total applications count
        const applicationsCount =
            $("#applicationsCount");

        if (applicationsCount) {

            applicationsCount.textContent =
                myApplications.length;
        }

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );
    }
}
/* =========================================================
   13. RESUME PAGE
   ========================================================= */

function initResumePage() {

    const fileInput = $("#resumeFileInput");
    const chooseButton = $("#chooseResumeBtn");
    const uploadTopButton = $("#uploadResumeTopBtn");
    const uploadBox = $("#resumeUploadBox");

    const previewButton = $("#previewResumeBtn");
    const downloadButton = $("#downloadResumeBtn");

    const selectedInfo = $("#selectedResumeInfo");
    const selectedName = $("#selectedResumeName");

    const currentName = $("#currentResumeName");
    const currentDate = $("#currentResumeDate");
    const currentSize = $("#currentResumeSize");
    const badge = $("#resumeActiveBadge");

    if (!fileInput && !currentName) {
        return;
    }

    const RESUME_META_KEY = "careerHubResumeMeta";

    let selectedFile = null;


    // Convert file size into KB or MB
    function formatSize(bytes) {

        if (!bytes) {
            return "0 KB";
        }

        if (bytes < 1024 * 1024) {
            return Math.round(bytes / 1024) + " KB";
        }

        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }


    // Update resume profile strength
    function updateStrength() {

        const fields = [
            "#resumeFullName",
            "#resumeEmail",
            "#resumePhone",
            "#resumeLocation"
        ];

        let completed = fields.filter(function (id) {

            const element = $(id);

            return (
                element &&
                element.value.trim()
            );

        }).length;


        if (selectedFile) {
            completed++;
        }


        const percent = Math.round(
            (completed / 5) * 100
        );


        const value = $("#resumeStrengthValue");
        const label = $("#resumeStrengthLabel");
        const bar = $("#resumeStrengthBar");
        const message = $("#resumeStrengthMessage");


        if (value) {
            value.textContent = percent + "%";
        }

        if (bar) {
            bar.style.width = percent + "%";
        }

        if (label) {
            label.textContent =
                percent >= 80
                    ? "Strong"
                    : percent >= 60
                        ? "Good"
                        : "Needs improvement";
        }

        if (message) {
            message.textContent =
                percent >= 80
                    ? "Your resume profile is looking strong."
                    : "Complete more profile information to improve your resume.";
        }
    }


    // Load saved resume information
    function loadMeta() {

        const meta = getStorage(
            RESUME_META_KEY,
            null
        );

        if (!meta) {
            return;
        }


        if (currentName) {
            currentName.textContent =
                meta.name || "No resume uploaded";
        }

        if (currentDate) {
            currentDate.textContent =
                meta.date || "";
        }

        if (currentSize) {
            currentSize.textContent =
                meta.size
                    ? "Resume · " + meta.size
                    : "";
        }

        if (badge) {
            badge.textContent =
                meta.name
                    ? "Active"
                    : "No Resume";
        }
    }


    // Validate selected resume
    function handleFile(file) {

        if (!file) {
            return;
        }


        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];


        // Check extension
        const extensionOK =
            /\.(pdf|doc|docx)$/i.test(file.name);


        // Check file type
        if (
            !allowedTypes.includes(file.type) &&
            !extensionOK
        ) {

            showMessage(
                "Please select a PDF, DOC or DOCX resume."
            );

            fileInput.value = "";
            return;
        }


        // Maximum size = 5 MB
        if (file.size > 5 * 1024 * 1024) {

            showMessage(
                "Resume size must be 5 MB or less."
            );

            fileInput.value = "";
            return;
        }


        // Store selected file
        selectedFile = file;


        // Show selected file section
        if (selectedInfo) {
            selectedInfo.style.display = "block";
        }


        // Show filename
        if (selectedName) {
            selectedName.textContent =
                file.name +
                " (" +
                formatSize(file.size) +
                ")";
        }


        // Save resume information
        const meta = {
            name: file.name,
            size: formatSize(file.size),
            date: new Date().toLocaleDateString("en-IN")
        };


        setStorage(
            RESUME_META_KEY,
            meta
        );


        // Update current resume section
        loadMeta();

        // Update profile strength
        updateStrength();
    }


    // Choose File button
    if (chooseButton) {

        chooseButton.addEventListener(
            "click",
            function () {

                if (fileInput) {
                    fileInput.click();
                }

            }
        );
    }


    // Upload New Resume button
    if (uploadTopButton) {

        uploadTopButton.addEventListener(
            "click",
            function () {

                if (fileInput) {
                    fileInput.click();
                }

            }
        );
    }


    // Clicking upload box opens file picker
    if (uploadBox) {

        uploadBox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.closest("button")
                ) {
                    return;
                }

                if (fileInput) {
                    fileInput.click();
                }

            }
        );
    }


    // File selected
    if (fileInput) {

        fileInput.addEventListener(
            "change",
            function () {

                handleFile(
                    fileInput.files[0]
                );

            }
        );
    }


    // Preview selected resume
    if (previewButton) {

        previewButton.addEventListener(
            "click",
            function () {

                if (!selectedFile) {

                    showMessage(
                        "Please select a resume first."
                    );

                    return;
                }


                const url =
                    URL.createObjectURL(selectedFile);


                window.open(
                    url,
                    "_blank"
                );


                setTimeout(
                    function () {

                        URL.revokeObjectURL(url);

                    },
                    60000
                );

            }
        );
    }


    // Download selected resume
    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            function () {

                if (!selectedFile) {

                    showMessage(
                        "Please select a resume first."
                    );

                    return;
                }


                const url =
                    URL.createObjectURL(selectedFile);


                const link =
                    document.createElement("a");


                link.href = url;
                link.download = selectedFile.name;

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);


                setTimeout(
                    function () {

                        URL.revokeObjectURL(url);

                    },
                    1000
                );

            }
        );
    }


    // Load previously saved resume metadata
    loadMeta();

    // Calculate initial profile strength
    updateStrength();
}/* =========================================================
   14. SETTINGS PAGE
   ========================================================= */

function initSettingsPage() {

    const navItems =
        $$(".settings-nav-item");

    const sections =
        $$(".settings-section");


    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const target =
                    item.dataset.section;

                navItems.forEach(function (nav) {
                    nav.classList.remove("active");
                });

                sections.forEach(function (section) {
                    section.classList.remove("active");
                });

                item.classList.add("active");

                const targetSection =
                    document.getElementById(
                        `settings-${target}`
                    );

                if (targetSection) {
                    targetSection.classList.add("active");
                }
            }
        );
    });


    const saveAccount =
        $("#saveAccountSettings");

    if (saveAccount) {

        saveAccount.addEventListener(
            "click",
            function () {

                showMessage(
                    "Account settings saved successfully!"
                );
            }
        );
    }


    const saveNotifications =
        $("#saveNotificationSettings");

    if (saveNotifications) {

        saveNotifications.addEventListener(
            "click",
            function () {

                showMessage(
                    "Notification settings saved successfully!"
                );
            }
        );
    }


    const savePreferences =
        $("#saveJobPreferences");

    if (savePreferences) {

        savePreferences.addEventListener(
            "click",
            function () {

                showMessage(
                    "Job preferences saved successfully!"
                );
            }
        );
    }


    const savePrivacy =
        $("#savePrivacySettings");

    if (savePrivacy) {

        savePrivacy.addEventListener(
            "click",
            function () {

                showMessage(
                    "Privacy settings saved successfully!"
                );
            }
        );
    }


    const changePassword =
        $("#changePasswordBtn");

    if (changePassword) {

        changePassword.addEventListener(
            "click",
            function () {

                showMessage(
                    "Password change form is ready."
                );
            }
        );
    }


    const logout =
        $("#logoutBtn");

    if (logout) {

        logout.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );

                if (confirmLogout) {

                    localStorage.removeItem(
                        "careerHubToken"
                    );

                    window.location.href =
                        "login.html";
                }
            }
        );
    }


    const deleteAccount =
        $("#deleteAccountBtn");

    if (deleteAccount) {

        deleteAccount.addEventListener(
            "click",
            function () {

                const confirmDelete =
                    confirm(
                        "Are you sure you want to delete your account?"
                    );

                if (confirmDelete) {

                    localStorage.clear();

                    showMessage(
                        "Account data cleared."
                    );

                    window.location.href =
                        "index.html";
                }
            }
        );
    }
}


/* =========================================================
   15. EMPLOYER DASHBOARD
   ========================================================= */

function initEmployerDashboard() {

    const dashboard =
        $("#employerJobsList");

    if (!dashboard) {
        return;
    }

    renderEmployerDashboard();
}

async function renderEmployerDashboard() {

    const token =
        localStorage.getItem("careerHubToken");

    if (!token) {
        return;
    }

    try {

        // JWT se logged-in employer ka email nikalo
        const parts =
            token.split(".");

        if (parts.length !== 3) {
            return;
        }

        const payload =
            JSON.parse(
                atob(
                    parts[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );

        // Current logged-in employer
        const currentUser =
            await apiRequest("/users/me");

        if (!currentUser) {
            return;
        }


        // Backend se employer ke jobs lao
        const jobs =
            await apiRequest(
                "/jobs/employer/" +
                currentUser.id
            );


        let totalApplicants = 0;
        let totalInterviews = 0;
        let totalHired = 0;


        // Har job ke applications count karo
        const jobData =
            await Promise.all(
                jobs.map(async function (job) {

                    const applications =
                        await apiRequest(
                            "/applications/job/" +
                            job.id
                        );


                    totalApplicants +=
                        applications.length;


                    applications.forEach(
                        function (application) {

                            if (
                                application.status ===
                                "INTERVIEW"
                            ) {
                                totalInterviews++;
                            }

                            if (
                                application.status ===
                                "HIRED"
                            ) {
                                totalHired++;
                            }
                        }
                    );


                    return {
                        id: job.id,
                        title: job.title,
                        location: job.location,
                        mode: job.jobType ||
                            "Not specified",
                        status: "active",
                        applicants:
                            applications.length
                    };
                })
            );


        // Active Jobs
        const activeElement =
            $("#employerActiveJobs");

        if (activeElement) {
            activeElement.textContent =
                jobs.length;
        }


        // Total Applicants
        const applicantElement =
            $("#employerApplicants");

        if (applicantElement) {
            applicantElement.textContent =
                formatNumber(totalApplicants);
        }


        // Interviews
        const interviewElement =
            $("#employerInterviews");

        if (interviewElement) {
            interviewElement.textContent =
                totalInterviews;
        }


        // Hired
        const hiredElement =
            $("#employerHired");

        if (hiredElement) {
            hiredElement.textContent =
                totalHired;
        }


        // Recent Jobs
        const jobsList =
            $("#employerJobsList");

        if (jobsList) {

            jobsList.innerHTML = "";


            jobData
                .slice(0, 4)
                .forEach(function (job) {

                    const card =
                        document.createElement("div");

                    card.className =
                        "employer-job-card";

                    card.dataset.status =
                        job.status;


                    card.innerHTML = `

                        <div>

                            <h3>
                                ${job.title}
                            </h3>

                            <p>
                                ${job.location}
                                · ${job.mode}
                            </p>

                        </div>

                        <div>

                            <span class="job-status">
                                ${job.status}
                            </span>

                            <p>
                                ${job.applicants}
                                applicants
                            </p>

                        </div>

                    `;


                    jobsList.appendChild(card);
                });
        }

    } catch (error) {

        console.error(
            "Employer dashboard error:",
            error
        );
    }
}


/* =========================================================
   16. MY JOBS PAGE
   ========================================================= */

function initMyJobsPage() {

    const jobsList =
        $("#myJobsList");

    if (!jobsList) {
        return;
    }

    renderMyJobs();

    const search =
        $("#myJobsSearch");

    const status =
        $("#myJobsStatusFilter");

    const sort =
        $("#myJobsSort");


    if (search) {

        search.addEventListener(
            "input",
            function () {

                resetPage("myJobs");

                renderMyJobs();
            }
        );
    }


    if (status) {

        status.addEventListener(
            "change",
            function () {

                resetPage("myJobs");

                renderMyJobs();
            }
        );
    }


    if (sort) {

        sort.addEventListener(
            "change",
            function () {

                resetPage("myJobs");

                renderMyJobs();
            }
        );
    }


    jobsList.addEventListener(
        "click",
        function (event) {

            const editButton =
                event.target.closest(
                    ".job-edit-btn"
                );

            const toggleButton =
                event.target.closest(
                    ".job-toggle-btn"
                );


            if (editButton) {

                editEmployerJob(
                    editButton.dataset.jobId
                );
            }


            if (toggleButton) {

                toggleEmployerJob(
                    toggleButton.dataset.jobId
                );
            }
        }
    );
}


async function renderMyJobs() {

    const container =
        $("#myJobsList");

    if (!container) {
        return;
    }


    try {

        // ================================
        // LOGIN CHECK
        // ================================

        const token =
            localStorage.getItem("careerHubToken");

        if (!token) {

            showMessage(
                "Please login before viewing your jobs."
            );

            return;
        }


        // ================================
        // JWT SE EMAIL
        // ================================

        const parts =
            token.split(".");

        if (parts.length !== 3) {
            throw new Error("Invalid login session.");
        }


        const payload =
            JSON.parse(
                atob(
                    parts[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );


        // ================================
        // CURRENT EMPLOYER
        // ================================

        const currentUser =
            await apiRequest("/users/me");


        if (!currentUser) {
            throw new Error("Employer account not found.");
        }


        if (currentUser.role !== "EMPLOYER") {
            throw new Error("Only employers can view My Jobs.");
        }


        // ================================
        // BACKEND SE EMPLOYER JOBS
        // ================================

        let jobs =
            await apiRequest(
                "/jobs/employer/" +
                currentUser.id
            );


        // ================================
        // HAR JOB KE APPLICANTS COUNT
        // ================================

        jobs =
            await Promise.all(
                jobs.map(async function (job) {

                    let applications = [];

                    try {

                        applications =
                            await apiRequest(
                                "/applications/job/" +
                                job.id
                            );

                    } catch (error) {

                        console.error(
                            "Unable to load applications for job:",
                            job.id,
                            error
                        );

                    }


                    return {

                        ...job,

                        // Backend me status nahi hai
                        status: "active",

                        // Actual application count
                        applicants:
                            applications.length,

                        // Backend me views nahi hain
                        views: 0,

                        // Frontend ke old field ko support
                        date:
                            job.postedDate ||
                            "",

                        mode:
                            job.jobType ||
                            "Not specified",

                        salary:
                            job.salary || "Not specified"

                    };

                })
            );


        // ================================
        // SEARCH
        // ================================

        const search =
            $("#myJobsSearch")
                ? $("#myJobsSearch")
                    .value
                    .toLowerCase()
                    .trim()
                : "";


        const status =
            $("#myJobsStatusFilter")
                ? $("#myJobsStatusFilter").value
                : "all";


        const sort =
            $("#myJobsSort")
                ? $("#myJobsSort").value
                : "newest";


        // ================================
        // FILTER
        // ================================

        jobs =
            jobs.filter(function (job) {

                const matchesSearch =
                    !search ||
                    job.title
                        .toLowerCase()
                        .includes(search) ||
                    job.location
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =
                    status === "all" ||
                    job.status === status;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            });


        // ================================
        // SORT
        // ================================

        if (sort === "oldest") {

            jobs.sort(function (a, b) {

                return (
                    new Date(a.date) -
                    new Date(b.date)
                );

            });

        } else if (sort === "applicants") {

            jobs.sort(function (a, b) {

                return (
                    b.applicants -
                    a.applicants
                );

            });

        } else if (sort === "views") {

            jobs.sort(function (a, b) {

                return (
                    b.views -
                    a.views
                );

            });

        } else {

            jobs.sort(function (a, b) {

                return (
                    new Date(b.date) -
                    new Date(a.date)
                );

            });

        }


        // ================================
        // UPDATE STATS
        // ================================

        updateMyJobsStats();


        container.innerHTML = "";


        const resultCount =
            $("#myJobsResultsCount");


        if (resultCount) {

            resultCount.textContent =
                `${jobs.length} jobs found`;

        }


        const empty =
            $("#myJobsEmpty");


        if (jobs.length === 0) {

            if (empty) {

                empty.style.display =
                    "block";

            }


            renderPagination(
                "#myJobsPagination",
                "myJobs",
                0,
                renderMyJobs
            );

            return;
        }


        if (empty) {

            empty.style.display =
                "none";

        }


        // ================================
        // PAGINATION
        // ================================

        const page =
            getPagedItems(
                jobs,
                "myJobs"
            );


        // ================================
        // RENDER JOB CARDS
        // ================================

        page.items.forEach(function (job) {

            const card =
                document.createElement("article");


            card.className =
                "my-job-card";


            card.dataset.jobId =
                job.id;


            card.dataset.status =
                job.status;


            card.innerHTML = `

                <div class="my-job-main">

                    <div>

                        <h3>
                            ${job.title}
                        </h3>

                        <p>
                            ${job.location}
                            · ${job.mode}
                        </p>

                        <small>
                            Posted ${job.date}
                        </small>

                    </div>


                    <span class="job-status">
                        ${job.status}
                    </span>

                </div>


                <div class="my-job-stats">

                    <span>

                        <strong>
                            ${job.applicants}
                        </strong>

                        Applicants

                    </span>


                    <span>

                        <strong>
                            ${formatNumber(job.views)}
                        </strong>

                        Views

                    </span>


                    <span>

                        <strong>
                            ${job.salary}
                        </strong>

                        Salary

                    </span>

                </div>


                <div class="my-job-actions">

                    <button
                        type="button"
                        class="secondary-btn job-edit-btn"
                        data-job-id="${job.id}">
                        Edit
                    </button>


                    <button
                        type="button"
                        class="secondary-btn job-toggle-btn"
                        data-job-id="${job.id}">
                        Close Job
                    </button>

                </div>

            `;


            container.appendChild(card);

        });


        renderPagination(
            "#myJobsPagination",
            "myJobs",
            jobs.length,
            renderMyJobs
        );


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    Unable to load your jobs
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }
}


function updateMyJobsStats() {

    const jobs =
        getEmployerJobs();


    const total =
        jobs.length;


    const active =
        jobs.filter(function (job) {
            return job.status === "active";
        }).length;


    const closed =
        jobs.filter(function (job) {
            return job.status === "closed";
        }).length;


    const applicants =
        jobs.reduce(function (total, job) {

            return total +
                Number(
                    job.applicants || 0
                );

        }, 0);


    if ($("#myJobsTotal")) {

        $("#myJobsTotal").textContent =
            total;
    }


    if ($("#myJobsActive")) {

        $("#myJobsActive").textContent =
            active;
    }


    if ($("#myJobsClosed")) {

        $("#myJobsClosed").textContent =
            closed;
    }


    if ($("#myJobsApplicants")) {

        $("#myJobsApplicants").textContent =
            formatNumber(applicants);
    }
}


function editEmployerJob(jobId) {

    if (!jobId) {
        return;
    }

    window.location.href =
        `post-job.html?edit=${jobId}`;
}


function toggleEmployerJob(jobId) {

    const jobs =
        getEmployerJobs();


    const job =
        jobs.find(function (item) {

            return item.id === jobId;
        });


    if (!job) {
        return;
    }


    job.status =
        job.status === "active"
            ? "closed"
            : "active";


    saveEmployerJobs(jobs);

    renderMyJobs();
}


/* =========================================================
   17. EMPLOYER NAVIGATION
   ========================================================= */

function initEmployerNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    $$(".nav-links a").forEach(
        function (link) {

            const href =
                link.getAttribute("href");


            if (href === currentPage) {

                link.classList.add(
                    "active"
                );
            }
        }
    );
}


/* =========================================================
   18. MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const navbar =
        $(".navbar");

    if (!navbar) {
        return;
    }


    const navLinks =
        $(".nav-links");

    const menuButton =
        $(".mobile-menu-btn");


    if (
        !navLinks ||
        !menuButton
    ) {
        return;
    }


    menuButton.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "mobile-open"
            );
        }
    );
}


/* =========================================================
   19. APPLICANTS DATA
   ========================================================= */

const careerHubApplicants = [

    {
        id: 1,
        name: "Rahul Sharma",
        jobId: "frontend-developer",
        job: "Frontend Developer",
        status: "review",
        date: "2026-09-19",
        email: "rahul@example.com",
        experience: "2 Years",
        location: "Delhi, India"
    },

    {
        id: 2,
        name: "Priya Verma",
        jobId: "java-backend-developer",
        job: "Java Backend Developer",
        status: "shortlisted",
        date: "2026-09-18",
        email: "priya@example.com",
        experience: "3 Years",
        location: "Bengaluru, India"
    },

    {
        id: 3,
        name: "Aman Gupta",
        jobId: "software-engineer",
        job: "Software Engineer",
        status: "interview",
        date: "2026-09-17",
        email: "aman@example.com",
        experience: "4 Years",
        location: "Pune, India"
    },

    {
        id: 4,
        name: "Neha Singh",
        jobId: "frontend-developer",
        job: "Frontend Developer",
        status: "review",
        date: "2026-09-16",
        email: "neha@example.com",
        experience: "1 Year",
        location: "Noida, India"
    },

    {
        id: 5,
        name: "Vikas Kumar",
        jobId: "product-designer",
        job: "Product Designer",
        status: "rejected",
        date: "2026-09-15",
        email: "vikas@example.com",
        experience: "2 Years",
        location: "Delhi, India"
    },

    {
        id: 6,
        name: "Anjali Mehta",
        jobId: "java-backend-developer",
        job: "Java Backend Developer",
        status: "shortlisted",
        date: "2026-09-14",
        email: "anjali@example.com",
        experience: "3 Years",
        location: "Gurugram, India"
    },

    {
        id: 7,
        name: "Rohit Yadav",
        jobId: "software-engineer",
        job: "Software Engineer",
        status: "review",
        date: "2026-09-13",
        email: "rohit@example.com",
        experience: "2 Years",
        location: "Ghaziabad, India"
    },

    {
        id: 8,
        name: "Simran Kaur",
        jobId: "frontend-developer",
        job: "Frontend Developer",
        status: "interview",
        date: "2026-09-12",
        email: "simran@example.com",
        experience: "3 Years",
        location: "Chandigarh, India"
    }
];


/* =========================================================
   20. APPLICANTS PAGE
   ========================================================= */

function initApplicantsPage() {

    const list =
        $("#applicantsList");

    if (!list) {
        return;
    }


    renderApplicants();


    const search =
        $("#applicantSearch");

    const jobFilter =
        $("#applicantJobFilter");

    const statusFilter =
        $("#applicantStatusFilter");

    const sort =
        $("#applicantSort");


    if (search) {

        search.addEventListener(
            "input",
            function () {

                resetPage("applicants");

                renderApplicants();
            }
        );
    }


    if (jobFilter) {

        jobFilter.addEventListener(
            "change",
            function () {

                resetPage("applicants");

                renderApplicants();
            }
        );
    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                resetPage("applicants");

                renderApplicants();
            }
        );
    }


    if (sort) {

        sort.addEventListener(
            "change",
            function () {

                resetPage("applicants");

                renderApplicants();
            }
        );
    }


    list.addEventListener(
        "click",
        handleApplicantAction
    );
}

async function renderApplicants() {

    const list =
        $("#applicantsList");

    if (!list) {
        return;
    }


    try {

        // ================================
        // LOGIN CHECK
        // ================================

        const token =
            localStorage.getItem("careerHubToken");

        if (!token) {
            throw new Error("Please login first.");
        }


        const parts =
            token.split(".");

        if (parts.length !== 3) {
            throw new Error("Invalid login session.");
        }


        const payload =
            JSON.parse(
                atob(
                    parts[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );


        // ================================
        // CURRENT EMPLOYER
        // ================================

        const currentUser =
            await apiRequest("/users/me");


        if (!currentUser) {
            throw new Error("Employer account not found.");
        }


        if (currentUser.role !== "EMPLOYER") {
            throw new Error("Only employers can view applicants.");
        }


        // ================================
        // EMPLOYER KE JOBS
        // ================================

        const jobs =
            await apiRequest(
                "/jobs/employer/" +
                currentUser.id
            );


        // ================================
        // APPLICATIONS COLLECT
        // ================================

        let applicants = [];


        for (const job of jobs) {

            let applications = [];

            try {

                applications =
                    await apiRequest(
                        "/applications/job/" +
                        job.id
                    );

            } catch (error) {

                console.error(
                    "Unable to load applications for job:",
                    job.id,
                    error
                );

                continue;
            }


            for (const application of applications) {

                const applicantUser =
                    users.find(function (user) {

                        return (
                            user.id ===
                            application.userId
                        );

                    });


                if (!applicantUser) {
                    continue;
                }


                let status = "review";


                if (
                    application.status ===
                    "SHORTLISTED"
                ) {

                    status = "shortlisted";

                } else if (
                    application.status ===
                    "INTERVIEW"
                ) {

                    status = "interview";

                } else if (
                    application.status ===
                    "REJECTED"
                ) {

                    status = "rejected";

                } else if (
                    application.status ===
                    "UNDER_REVIEW"
                ) {

                    status = "review";

                } else {

                    status = "review";

                }


                applicants.push({

                    id:
                        application.id,

                    name:
                        applicantUser.name,

                    email:
                        applicantUser.email,

                    jobId:
                        String(job.id),

                    job:
                        job.title,

                    location:
                        job.location,

                    experience:
                        "Not specified",

                    status:
                        status,

                    date:
                        application.appliedDate || ""

                });

            }
        }


        // ================================
        // FILTER VALUES
        // ================================

        const search =
            $("#applicantSearch")
                ? $("#applicantSearch")
                    .value
                    .toLowerCase()
                    .trim()
                : "";


        const jobFilter =
            $("#applicantJobFilter")
                ? $("#applicantJobFilter").value
                : "all";


        const statusFilter =
            $("#applicantStatusFilter")
                ? $("#applicantStatusFilter").value
                : "all";


        const sort =
            $("#applicantSort")
                ? $("#applicantSort").value
                : "newest";


        // ================================
        // FILTER
        // ================================

        applicants =
            applicants.filter(
                function (applicant) {

                    const matchesSearch =
                        !search ||
                        applicant.name
                            .toLowerCase()
                            .includes(search) ||
                        applicant.job
                            .toLowerCase()
                            .includes(search) ||
                        applicant.location
                            .toLowerCase()
                            .includes(search);


                    const matchesJob =
                        jobFilter === "all" ||
                        applicant.jobId ===
                        jobFilter;


                    const matchesStatus =
                        statusFilter === "all" ||
                        applicant.status ===
                        statusFilter;


                    return (
                        matchesSearch &&
                        matchesJob &&
                        matchesStatus
                    );

                }
            );


        // ================================
        // SORT
        // ================================

        if (sort === "oldest") {

            applicants.sort(
                function (a, b) {

                    return (
                        new Date(a.date) -
                        new Date(b.date)
                    );

                }
            );

        } else if (sort === "name") {

            applicants.sort(
                function (a, b) {

                    return a.name.localeCompare(
                        b.name
                    );

                }
            );

        } else {

            applicants.sort(
                function (a, b) {

                    return (
                        new Date(b.date) -
                        new Date(a.date)
                    );

                }
            );
        }


        // ================================
        // STATS
        // ================================

        const total =
            applicants.length;


        const review =
            applicants.filter(function (item) {
                return item.status === "review";
            }).length;


        const shortlisted =
            applicants.filter(function (item) {
                return item.status === "shortlisted";
            }).length;


        const interview =
            applicants.filter(function (item) {
                return item.status === "interview";
            }).length;


        const totalElement =
            $("#applicantsTotal");

        if (totalElement) {
            totalElement.textContent = total;
        }


        const reviewElement =
            $("#applicantsReview");

        if (reviewElement) {
            reviewElement.textContent = review;
        }


        const shortlistedElement =
            $("#applicantsShortlisted");

        if (shortlistedElement) {
            shortlistedElement.textContent = shortlisted;
        }


        const interviewElement =
            $("#applicantsInterview");

        if (interviewElement) {
            interviewElement.textContent = interview;
        }


        // ================================
        // RESULT COUNT
        // ================================

        const resultCount =
            $("#applicantsResultsCount");


        if (resultCount) {

            resultCount.textContent =
                `${applicants.length} applicants found`;

        }


        list.innerHTML = "";


        const empty =
            $("#applicantsEmpty");


        if (applicants.length === 0) {

            if (empty) {
                empty.style.display = "block";
            }


            renderPagination(
                "#applicantsPagination",
                "applicants",
                0,
                renderApplicants
            );

            return;
        }


        if (empty) {
            empty.style.display = "none";
        }


        // ================================
        // PAGINATION
        // ================================

        const page =
            getPagedItems(
                applicants,
                "applicants"
            );


        // ================================
        // RENDER
        // ================================

        page.items.forEach(
            function (applicant) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "applicant-card";


                card.dataset.id =
                    applicant.id;


                card.innerHTML = `

                    <div class="applicant-main">

                        <div>

                            <h3>
                                ${applicant.name}
                            </h3>

                            <p>
                                ${applicant.job}
                            </p>

                            <small>
                                ${applicant.location}
                                · ${applicant.experience}
                            </small>

                        </div>


                        <span class="applicant-status">
                            ${applicant.status}
                        </span>

                    </div>


                    <div class="applicant-details">

                        <span>
                            ${applicant.email}
                        </span>

                        <span>
                            Applied ${applicant.date}
                        </span>

                    </div>


                    <div class="applicant-actions">

                        <button
                            type="button"
                            class="secondary-btn view-applicant-btn"
                            data-id="${applicant.id}">
                            View
                        </button>


                        <button
                            type="button"
                            class="secondary-btn shortlist-applicant-btn"
                            data-id="${applicant.id}">
                            Shortlist
                        </button>


                        <button
                            type="button"
                            class="secondary-btn interview-applicant-btn"
                            data-id="${applicant.id}">
                            Interview
                        </button>

                    </div>

                `;


                list.appendChild(card);

            }
        );


        renderPagination(
            "#applicantsPagination",
            "applicants",
            applicants.length,
            renderApplicants
        );


    } catch (error) {

        console.error(error);


        list.innerHTML = `

            <div class="empty-state">

                <h3>
                    Unable to load applicants
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }
}


function updateApplicantStats() {

    const total =
        careerHubApplicants.length;


    const review =
        careerHubApplicants.filter(
            function (applicant) {
                return applicant.status ===
                    "review";
            }
        ).length;


    const shortlisted =
        careerHubApplicants.filter(
            function (applicant) {
                return applicant.status ===
                    "shortlisted";
            }
        ).length;


    const interview =
        careerHubApplicants.filter(
            function (applicant) {
                return applicant.status ===
                    "interview";
            }
        ).length;


    if ($("#applicantsTotal")) {
        $("#applicantsTotal").textContent =
            total;
    }

    if ($("#applicantsReview")) {
        $("#applicantsReview").textContent =
            review;
    }

    if ($("#applicantsShortlisted")) {
        $("#applicantsShortlisted").textContent =
            shortlisted;
    }

    if ($("#applicantsInterview")) {
        $("#applicantsInterview").textContent =
            interview;
    }
}


async function handleApplicantAction(event) {

    const viewButton =
        event.target.closest(
            ".view-applicant-btn"
        );

    const shortlistButton =
        event.target.closest(
            ".shortlist-applicant-btn"
        );

    const interviewButton =
        event.target.closest(
            ".interview-applicant-btn"
        );


    const id =
        Number(
            (
                viewButton ||
                shortlistButton ||
                interviewButton
            )?.dataset.id
        );


    if (!id) {
        return;
    }


    // ================================
    // VIEW APPLICANT
    // ================================

    if (viewButton) {

        try {

            const application =
                await apiRequest(
                    "/applications/" + id
                );


            if (!application) {

                showMessage(
                    "Application not found."
                );

                return;
            }


            const users =
                await apiRequest("/users");


            const user =
                users.find(function (item) {

                    return (
                        item.id ===
                        application.userId
                    );

                });


            if (!user) {

                showMessage(
                    "Applicant not found."
                );

                return;
            }


            showMessage(
                `Applicant: ${user.name}\n` +
                `Email: ${user.email}\n` +
                `Resume: ${application.resume}\n` +
                `Status: ${application.status}`
            );


        } catch (error) {

            console.error(error);

            showMessage(
                error.message ||
                "Unable to load applicant."
            );

        }

        return;
    }


    // ================================
    // SHORTLIST
    // ================================

    if (shortlistButton) {

        try {

            await apiRequest(
                "/applications/" +
                id +
                "/status?status=SHORTLISTED",
                {
                    method: "PUT"
                }
            );


            showMessage(
                "Applicant shortlisted successfully!"
            );


            renderApplicants();


        } catch (error) {

            console.error(error);

            showMessage(
                error.message ||
                "Unable to shortlist applicant."
            );

        }

        return;
    }


    // ================================
    // INTERVIEW
    // ================================

    if (interviewButton) {

        try {

            await apiRequest(
                "/applications/" +
                id +
                "/status?status=INTERVIEW",
                {
                    method: "PUT"
                }
            );


            showMessage(
                "Applicant moved to interview!"
            );


            renderApplicants();


        } catch (error) {

            console.error(error);

            showMessage(
                error.message ||
                "Unable to update applicant."
            );

        }
    }
}
/* =========================================================
   22. INTERVIEW DATA
   ========================================================= */

const careerHubInterviews = [

    {
        id: 1,
        candidate: "Aman Gupta",
        job: "Software Engineer",
        status: "upcoming",
        type: "video",
        date: "2026-09-22",
        time: "10:30"
    },

    {
        id: 2,
        candidate: "Priya Verma",
        job: "Java Backend Developer",
        status: "upcoming",
        type: "video",
        date: "2026-09-23",
        time: "14:00"
    },

    {
        id: 3,
        candidate: "Neha Kapoor",
        job: "Product Designer",
        status: "upcoming",
        type: "onsite",
        date: "2026-09-24",
        time: "11:00"
    },

    {
        id: 4,
        candidate: "Karan Mehta",
        job: "Frontend Developer",
        status: "upcoming",
        type: "phone",
        date: "2026-09-25",
        time: "16:00"
    },

    {
        id: 5,
        candidate: "Rahul Sharma",
        job: "Frontend Developer",
        status: "upcoming",
        type: "video",
        date: "2026-09-27",
        time: "12:30"
    },

    {
        id: 6,
        candidate: "Riya Sharma",
        job: "Backend Developer",
        status: "completed",
        type: "video",
        date: "2026-09-15",
        time: "15:00"
    },

    {
        id: 7,
        candidate: "Vivek Singh",
        job: "Software Engineer",
        status: "completed",
        type: "onsite",
        date: "2026-09-12",
        time: "11:30"
    },

    {
        id: 8,
        candidate: "Ankit Jain",
        job: "Java Developer",
        status: "cancelled",
        type: "phone",
        date: "2026-09-10",
        time: "16:00"
    }
];


/* =========================================================
   23. INTERVIEWS PAGE
   ========================================================= */

function initInterviewsPage() {

    const list =
        $("#interviewsList");

    if (!list) return;

    renderInterviews();

    const search =
        $("#interviewSearch");

    const status =
        $("#interviewStatusFilter");

    const type =
        $("#interviewTypeFilter");

    const sort =
        $("#interviewSort");


    if (search) {
        search.addEventListener(
            "input",
            function () {
                resetPage("interviews");
                renderInterviews();
            }
        );
    }


    if (status) {
        status.addEventListener(
            "change",
            function () {
                resetPage("interviews");
                renderInterviews();
            }
        );
    }


    if (type) {
        type.addEventListener(
            "change",
            function () {
                resetPage("interviews");
                renderInterviews();
            }
        );
    }


    if (sort) {
        sort.addEventListener(
            "change",
            function () {
                resetPage("interviews");
                renderInterviews();
            }
        );
    }


    const scheduleButton =
        $("#scheduleInterviewBtn");

    if (scheduleButton) {
        scheduleButton.addEventListener(
            "click",
            scheduleInterview
        );
    }


    list.addEventListener(
        "click",
        handleInterviewAction
    );

    updateInterviewStats();
}

async function renderInterviews() {

    const container =
        $("#interviewsList");

    if (!container) return;


    try {

        const token =
            localStorage.getItem("careerHubToken");

        if (!token) {
            return;
        }


        const parts =
            token.split(".");

        if (parts.length !== 3) {
            return;
        }


        const payload =
            JSON.parse(
                atob(
                    parts[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );


        const email =
            payload.sub;


        // Current employer find karo
        const users =
            await apiRequest("/users");

        const currentUser =
            users.find(function (user) {
                return user.email === email;
            });


        if (!currentUser) {
            return;
        }


        // Employer ke interviews lao
        const backendInterviews =
            await apiRequest(
                "/interviews/employer/" +
                currentUser.id
            );


        // Users + Applications + Jobs ki information attach karo
        const interviews =
            await Promise.all(
                backendInterviews.map(
                    async function (interview) {

                        const candidate =
                            users.find(
                                function (user) {
                                    return user.id ===
                                        interview.userId;
                                }
                            );


                        let jobTitle =
                            "Job";


                        try {

                            const application =
                                await apiRequest(
                                    "/applications/" +
                                    interview.applicationId
                                );


                            if (application) {

                                const job =
                                    await apiRequest(
                                        "/jobs/" +
                                        application.jobId
                                    );


                                if (job) {
                                    jobTitle =
                                        job.title;
                                }
                            }

                        } catch (error) {

                            console.error(
                                "Job details error:",
                                error
                            );
                        }


                        return {

                            id: interview.id,

                            candidate:
                                candidate
                                    ? candidate.name
                                    : "Candidate",

                            job:
                                jobTitle,

                            date:
                                interview.interviewDate,

                            time:
                                interview.interviewTime,

                            type:
                                interview.mode,

                            status:
                                interview.status,

                            meetingLink:
                                interview.meetingLink
                        };
                    }
                )
            );


        // Search
        const search =
            $("#interviewSearch")
                ? $("#interviewSearch")
                    .value
                    .toLowerCase()
                    .trim()
                : "";


        // Status filter
        const status =
            $("#interviewStatusFilter")
                ? $("#interviewStatusFilter").value
                : "all";


        // Type filter
        const type =
            $("#interviewTypeFilter")
                ? $("#interviewTypeFilter").value
                : "all";


        // Sort
        const sort =
            $("#interviewSort")
                ? $("#interviewSort").value
                : "soonest";


        let filtered =
            interviews.filter(
                function (interview) {

                    const matchesSearch =
                        !search ||
                        interview.candidate
                            .toLowerCase()
                            .includes(search) ||
                        interview.job
                            .toLowerCase()
                            .includes(search);


                    const matchesStatus =
                        status === "all" ||
                        interview.status === status;


                    const matchesType =
                        type === "all" ||
                        interview.type === type;


                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesType
                    );
                }
            );


        // Sorting
        if (sort === "latest") {

            filtered.sort(
                function (a, b) {

                    return new Date(
                        `${b.date}T${b.time}`
                    ) -
                        new Date(
                            `${a.date}T${a.time}`
                        );
                }
            );

        } else if (sort === "candidate") {

            filtered.sort(
                function (a, b) {

                    return a.candidate.localeCompare(
                        b.candidate
                    );
                }
            );

        } else {

            filtered.sort(
                function (a, b) {

                    return new Date(
                        `${a.date}T${a.time}`
                    ) -
                        new Date(
                            `${b.date}T${b.time}`
                        );
                }
            );
        }


        container.innerHTML = "";


        const resultCount =
            $("#interviewResultsCount");


        if (resultCount) {

            resultCount.textContent =
                `${filtered.length} interviews found`;
        }


        const empty =
            $("#interviewsEmpty");


        if (filtered.length === 0) {

            if (empty) {
                empty.style.display = "block";
            }

            renderPagination(
                "#interviewsPagination",
                "interviews",
                0,
                renderInterviews
            );

            return;
        }


        if (empty) {
            empty.style.display = "none";
        }


        const page =
            getPagedItems(
                filtered,
                "interviews"
            );


        page.items.forEach(
            function (interview) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "interview-card";


                card.dataset.interviewId =
                    interview.id;


                card.innerHTML = `

                    <div class="interview-main">

                        <div class="interview-avatar">
                            ${getInitials(
                    interview.candidate
                )}
                        </div>

                        <div>

                            <h3>
                                ${interview.candidate}
                            </h3>

                            <p>
                                ${interview.job}
                            </p>

                            <small>
                                ${formatInterviewType(
                    interview.type
                )}
                            </small>

                        </div>

                    </div>


                    <div class="interview-date">

                        <strong>
                            ${formatInterviewDate(
                    interview.date
                )}
                        </strong>

                        <span>
                            ${interview.time}
                        </span>

                    </div>


                    <div>

                        <span class="status-badge ${interview.status}">
                            ${formatInterviewStatus(
                    interview.status
                )}
                        </span>

                    </div>


                    <div class="interview-actions">

                        <button
                            type="button"
                            class="secondary-btn view-interview-btn">
                            View
                        </button>

                        ${interview.status === "upcoming"
                        ? `
                                <button
                                    type="button"
                                    class="secondary-btn reschedule-interview-btn">
                                    Reschedule
                                </button>
                            `
                        : ""
                    }

                    </div>

                `;


                container.appendChild(card);
            }
        );


        renderPagination(
            "#interviewsPagination",
            "interviews",
            filtered.length,
            renderInterviews
        );


    } catch (error) {

        console.error(
            "Interview loading error:",
            error
        );

        container.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load interviews</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

function updateInterviewStats() {

    const total =
        careerHubInterviews.length;

    const upcoming =
        careerHubInterviews.filter(
            function (item) {
                return item.status === "upcoming";
            }
        ).length;

    const completed =
        careerHubInterviews.filter(
            function (item) {
                return item.status === "completed";
            }
        ).length;

    const cancelled =
        careerHubInterviews.filter(
            function (item) {
                return item.status === "cancelled";
            }
        ).length;


    if ($("#interviewsTotal")) {
        $("#interviewsTotal").textContent =
            total;
    }

    if ($("#interviewsUpcoming")) {
        $("#interviewsUpcoming").textContent =
            upcoming;
    }

    if ($("#interviewsCompleted")) {
        $("#interviewsCompleted").textContent =
            completed;
    }

    if ($("#interviewsCancelled")) {
        $("#interviewsCancelled").textContent =
            cancelled;
    }
}


function handleInterviewAction(event) {

    const card =
        event.target.closest(
            ".interview-card"
        );

    if (!card) return;


    const interviewId =
        Number(
            card.dataset.interviewId
        );


    const interview =
        careerHubInterviews.find(
            function (item) {
                return item.id === interviewId;
            }
        );


    if (!interview) return;


    if (
        event.target.closest(
            ".view-interview-btn"
        )
    ) {

        showMessage(
            `Candidate: ${interview.candidate}\n` +
            `Position: ${interview.job}\n` +
            `Type: ${formatInterviewType(
                interview.type
            )}\n` +
            `Date: ${interview.date}\n` +
            `Time: ${interview.time}\n` +
            `Status: ${formatInterviewStatus(
                interview.status
            )}`
        );

        return;
    }


    if (
        event.target.closest(
            ".reschedule-interview-btn"
        )
    ) {

        rescheduleInterview(
            interview
        );
    }
}


function scheduleInterview() {

    const candidate =
        prompt(
            "Enter candidate name:"
        );

    if (!candidate) return;


    const job =
        prompt(
            "Enter job title:"
        );

    if (!job) return;


    const date =
        prompt(
            "Enter interview date (YYYY-MM-DD):"
        );

    if (!date) return;


    const time =
        prompt(
            "Enter interview time (HH:MM):"
        );

    if (!time) return;


    careerHubInterviews.push({

        id: Date.now(),

        candidate: candidate,

        job: job,

        status: "upcoming",

        type: "video",

        date: date,

        time: time
    });


    resetPage("interviews");

    renderInterviews();

    updateInterviewStats();


    showMessage(
        "Interview scheduled successfully."
    );
}


function rescheduleInterview(interview) {

    const newDate =
        prompt(
            "Enter new date (YYYY-MM-DD):",
            interview.date
        );

    if (!newDate) return;


    const newTime =
        prompt(
            "Enter new time (HH:MM):",
            interview.time
        );

    if (!newTime) return;


    interview.date =
        newDate;

    interview.time =
        newTime;


    renderInterviews();


    showMessage(
        "Interview rescheduled successfully."
    );
}


function formatInterviewDate(date) {

    const dateObject =
        new Date(
            `${date}T00:00:00`
        );

    return dateObject.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function formatInterviewType(type) {

    const types = {

        video: "Video Interview",

        phone: "Phone Interview",

        onsite: "On-site Interview"
    };

    return types[type] || type;
}


function formatInterviewStatus(status) {

    const statuses = {

        upcoming: "Upcoming",

        completed: "Completed",

        cancelled: "Cancelled"
    };

    return statuses[status] || status;
}


/* =========================================================
   24. COMPANY PROFILE
   ========================================================= */

const COMPANY_PROFILE_KEY =
    "careerHubCompanyProfile";


const defaultCompanyProfile = {

    name:
        "TechNova Solutions",

    industry:
        "Technology & Software",

    location:
        "Bengaluru, India",

    website:
        "https://technova.example.com",

    size:
        "201–500 employees",

    founded:
        "2018",

    description:
        "TechNova Solutions is a technology company focused on building modern digital products and scalable software solutions.",

    culture:
        "We believe in continuous learning, collaborative problem solving, ownership and building products that create meaningful impact.",

    mission:
        "Build technology that makes everyday work simpler and more productive.",

    vision:
        "Become a trusted technology partner for businesses worldwide.",

    linkedin:
        "https://linkedin.com/company/technova",

    twitter:
        "",

    email:
        "careers@technova.example.com",

    phone:
        "+91 80 4000 0000"
};


function getCompanyProfile() {

    return getStorage(
        COMPANY_PROFILE_KEY,
        defaultCompanyProfile
    );
}


function saveCompanyProfileData(profile) {

    setStorage(
        COMPANY_PROFILE_KEY,
        profile
    );
}


function initCompanyProfile() {

    const companyName =
        $("#companyName");

    if (!companyName) return;


    loadCompanyProfile();


    const saveButton =
        $("#saveCompanyProfile");

    const saveBottom =
        $("#saveCompanyProfileBottom");


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            saveCompanyProfile
        );
    }


    if (saveBottom) {

        saveBottom.addEventListener(
            "click",
            saveCompanyProfile
        );
    }


    updateCompanyJobStats();
}


function loadCompanyProfile() {

    const profile =
        getCompanyProfile();


    setFieldValue(
        "companyName",
        profile.name
    );

    setFieldValue(
        "companyIndustry",
        profile.industry
    );

    setFieldValue(
        "companyLocation",
        profile.location
    );

    setFieldValue(
        "companyWebsite",
        profile.website
    );

    setFieldValue(
        "companySize",
        profile.size
    );

    setFieldValue(
        "companyFounded",
        profile.founded
    );

    setFieldValue(
        "companyDescription",
        profile.description
    );

    setFieldValue(
        "companyCulture",
        profile.culture
    );

    setFieldValue(
        "companyMission",
        profile.mission
    );

    setFieldValue(
        "companyVision",
        profile.vision
    );

    setFieldValue(
        "companyLinkedin",
        profile.linkedin
    );

    setFieldValue(
        "companyTwitter",
        profile.twitter
    );

    setFieldValue(
        "companyEmail",
        profile.email
    );

    setFieldValue(
        "companyPhone",
        profile.phone
    );


    updateCompanyPreview(
        profile
    );
}


function setFieldValue(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.value =
            value || "";
    }
}


function saveCompanyProfile() {

    const profile = {

        name:
            getFieldValue(
                "companyName"
            ),

        industry:
            getFieldValue(
                "companyIndustry"
            ),

        location:
            getFieldValue(
                "companyLocation"
            ),

        website:
            getFieldValue(
                "companyWebsite"
            ),

        size:
            getFieldValue(
                "companySize"
            ),

        founded:
            getFieldValue(
                "companyFounded"
            ),

        description:
            getFieldValue(
                "companyDescription"
            ),

        culture:
            getFieldValue(
                "companyCulture"
            ),

        mission:
            getFieldValue(
                "companyMission"
            ),

        vision:
            getFieldValue(
                "companyVision"
            ),

        linkedin:
            getFieldValue(
                "companyLinkedin"
            ),

        twitter:
            getFieldValue(
                "companyTwitter"
            ),

        email:
            getFieldValue(
                "companyEmail"
            ),

        phone:
            getFieldValue(
                "companyPhone"
            )
    };


    if (!profile.name.trim()) {

        showMessage(
            "Company name is required."
        );

        return;
    }


    saveCompanyProfileData(
        profile
    );

    updateCompanyPreview(
        profile
    );


    showMessage(
        "Company profile saved successfully!"
    );
}


function getFieldValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value
        : "";
}


function updateCompanyPreview(
    profile
) {

    const name =
        $("#companyPreviewName");

    if (name) {
        name.textContent =
            profile.name;
    }


    const industry =
        $("#companyPreviewIndustry");

    if (industry) {
        industry.textContent =
            profile.industry;
    }
}


function updateCompanyJobStats() {

    const jobs =
        getEmployerJobs();


    const active =
        jobs.filter(
            function (job) {
                return job.status === "active";
            }
        ).length;


    const applicants =
        jobs.reduce(
            function (total, job) {

                return total +
                    Number(
                        job.applicants || 0
                    );

            },
            0
        );


    if ($("#companyProfileActiveJobs")) {

        $("#companyProfileActiveJobs")
            .textContent =
            active;
    }


    if ($("#companyProfileApplicants")) {

        $("#companyProfileApplicants")
            .textContent =
            formatNumber(
                applicants
            );
    }


    if ($("#companyProfileInterviews")) {

        $("#companyProfileInterviews")
            .textContent =
            careerHubInterviews.filter(
                function (item) {
                    return (
                        item.status ===
                        "upcoming"
                    );
                }
            ).length;
    }


    if ($("#companyProfileHired")) {

        $("#companyProfileHired")
            .textContent =
            "5";
    }


    const jobsContainer =
        $("#companyProfileJobs");

    if (!jobsContainer) return;


    jobsContainer.innerHTML = "";


    jobs
        .filter(
            function (job) {
                return job.status === "active";
            }
        )
        .forEach(
            function (job) {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "company-job-item";

                item.innerHTML = `

                    <div>

                        <h3>
                            ${job.title}
                        </h3>

                        <p>
                            ${job.location}
                            · ${job.mode}
                        </p>

                    </div>

                    <span>
                        ${job.applicants}
                        applicants
                    </span>

                `;

                jobsContainer.appendChild(
                    item
                );
            }
        );
}


/* =========================================================
   25. POST JOB PAGE
   ========================================================= */

async function initPostJobPage() {

    const form =
        $("#postJobForm");

    if (!form) return;


    const params =
        new URLSearchParams(
            window.location.search
        );

    const editId =
        params.get("edit");


    // ================================
    // EDIT JOB
    // ================================

    if (editId) {

        try {

            const job =
                await apiRequest(
                    "/jobs/" + Number(editId)
                );


            if (!job) {

                showMessage(
                    "Job not found."
                );

                return;
            }


            loadPostJobData(job);


        } catch (error) {

            console.error(error);

            showMessage(
                error.message ||
                "Unable to load job."
            );

        }
    }


    // ================================
    // FORM SUBMIT
    // ================================

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            savePostJob(
                editId
            );

        }
    );
}

function loadPostJobData(job) {

    const fields = {

        jobTitle:
            job.title || "",

        jobCompany:
            job.company || "",

        jobLocation:
            job.location || "",

        jobType:
            job.jobType || "",

        jobMode:
            job.mode || "",

        jobSalary:
            job.salary || "",

        jobDescription:
            job.description || "",

        jobSkills:
            job.skills || ""

    };


    Object.keys(fields).forEach(
        function (id) {

            const element =
                document.getElementById(id);


            if (element) {

                element.value =
                    fields[id];

            }

        }
    );
}


async function savePostJob(editId) {

    const title =
        getFieldValue("jobTitle");

    const company =
        getFieldValue("jobCompany");

    const location =
        getFieldValue("jobLocation");

    const type =
        getFieldValue("jobType");

    const mode =
        getFieldValue("jobMode");

    const salary =
        getFieldValue("jobSalary");

    const description =
        getFieldValue("jobDescription");

    const skills =
        getFieldValue("jobSkills");


    // Required fields check
    if (
        !title ||
        !company ||
        !location ||
        !type ||
        !salary ||
        !description ||
        !skills
    ) {

        showMessage(
            "Please fill all required job fields."
        );

        return;
    }


    // Login check
    const token =
        localStorage.getItem("careerHubToken");

    if (!token) {

        showMessage(
            "Please login before posting a job."
        );

        return;
    }


    try {

        // JWT payload se logged-in user ki email nikalo
        const parts =
            token.split(".");

        if (parts.length !== 3) {

            throw new Error(
                "Invalid login session."
            );
        }


        const payload =
            JSON.parse(
                atob(
                    parts[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );


        const email =
            payload.sub;


        // Current logged-in user find karo
        const users =
            await apiRequest("/users");


        const currentUser =
            users.find(
                function (user) {
                    return user.email === email;
                }
            );


        if (!currentUser) {

            throw new Error(
                "Employer account not found."
            );
        }


        // Employer role check
        if (currentUser.role !== "EMPLOYER") {

            throw new Error(
                "Only employers can post jobs."
            );
        }


        const jobData = {

            title: title,

            company: company,

            location: location,

            salary: salary,

            description: description,

            jobType: type,

            skills: skills,

            postedDate:
                new Date()
                    .toISOString()
                    .split("T")[0],

            categoryId: null,

            employerId:
                currentUser.id
        };


        let result;


        // EDIT JOB
        if (editId) {

            result =
                await apiRequest(
                    "/jobs/" + Number(editId),
                    {
                        method: "PUT",

                        body:
                            JSON.stringify(
                                jobData
                            )
                    }
                );


            if (!result) {

                throw new Error(
                    "Job not found."
                );
            }


            showMessage(
                "Job updated successfully!"
            );


        } else {

            // NEW JOB
            result =
                await apiRequest(
                    "/jobs",
                    {
                        method: "POST",

                        body:
                            JSON.stringify(
                                jobData
                            )
                    }
                );


            showMessage(
                "Job posted successfully!"
            );
        }


        // My Jobs page par redirect
        setTimeout(
            function () {

                window.location.href =
                    "my-jobs.html";

            },
            800
        );


    } catch (error) {

        console.error(error);

        showMessage(
            error.message ||
            "Unable to save job."
        );
    }
}


function initLoginPage() {

    const form =
        document.querySelector(
            ".auth-card form"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                $("#email").value.trim();

            const password =
                $("#password").value;

            if (!email || !password) {

                showMessage(
                    "Please enter email and password."
                );

                return;
            }

            try {

                const response =
                    await fetch(
                        API_BASE_URL + "/users/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );

                const token =
                    await response.text();

                if (!response.ok) {

                    showMessage(
                        token ||
                        "Invalid email or password."
                    );

                    return;
                }

                // JWT token save karo
                localStorage.setItem(
                    "careerHubToken",
                    token
                );

                showMessage(
                    "Login successful!"
                );

                

                // Exact logged-in user backend se lo
                const currentUser =
                    await apiRequest("/users/me");
                if (!currentUser) {

                    showMessage(
                        "User account not found."
                    );

                    return;
                }

                // Role ke according dashboard
                if (
                    currentUser.role ===
                    "EMPLOYER"
                ) {

                    window.location.href =
                        "employer-dashboard.html";

                } else {

                    window.location.href =
                        "dashboard.html";
                }

            } catch (error) {

                console.error(error);

                showMessage(
                    "Unable to connect to server."
                );
            }
        }
    );
}

function initRegisterPage() {

    const form =
        document.querySelector(
            ".auth-card form"
        );

    // Login page par register handler nahi chalna chahiye
    if (!form || !document.getElementById("register-email")) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const firstName =
                $("#first-name").value.trim();

            const lastName =
                $("#last-name").value.trim();

            const email =
                $("#register-email").value.trim();

            const password =
                $("#register-password").value;

            const confirmPassword =
                $("#confirm-password").value;

            const terms =
                $("#terms");


            if (
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                showMessage(
                    "Please fill all required fields."
                );

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    "Passwords do not match."
                );

                return;
            }


            if (terms && !terms.checked) {

                showMessage(
                    "Please accept the Terms and Conditions."
                );

                return;
            }


            const selectedRole =
                document.querySelector(
                    'input[name="role"]:checked'
                );


            const role =
                selectedRole &&
                    selectedRole.value === "employer"
                    ? "EMPLOYER"
                    : "JOB_SEEKER";


            const name =
                firstName + " " + lastName;


            try {

                const response =
                    await fetch(
                        API_BASE_URL + "/users/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                name: name,
                                email: email,
                                password: password,
                                role: role
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    showMessage(
                        data.error ||
                        "Registration failed."
                    );

                    return;
                }


                showMessage(
                    "Registration successful!"
                );


                window.location.href =
                    "login.html";

            } catch (error) {

                console.error(error);

                showMessage(
                    "Unable to connect to server."
                );
            }
        }
    );
}
/* =========================================================
   26. GLOBAL PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initHomeSearch();

        initJobsPage();

        initJobDetailsPage();

        initSaveButtons();

        initSavedJobsPage();

        initApplicationForm();

        initLoginPage();

        initRegisterPage();

        initProfilePage();

        initExperience();
        initDashboardPage();

        initApplicationsPage();

        initResumePage();

        initSettingsPage();

        initEmployerDashboard();

        initMyJobsPage();

        initPostJobPage();

        initApplicantsPage();

        initInterviewsPage();

        initCompanyProfile();

        initEmployerNavigation();

        initMobileMenu();

    }
);
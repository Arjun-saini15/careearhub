// =====================================================
// CareerHub - Company Profile
// =====================================================


// =====================================================
// 1. DEFAULT COMPANY DATA
// =====================================================

const defaultCompanyProfile = {

    name: "CloudWorks",

    industry: "Technology",

    location: "Noida, India",

    website: "https://cloudworks.example.com",

    size: "51-200",

    founded: "2018",

    description:
        "CloudWorks is a technology company building modern digital products and solutions for businesses. We focus on creating reliable software, developing talented teams and solving meaningful problems through technology.",

    culture:
        "We believe in collaboration, continuous learning, ownership and creating an environment where people can grow professionally.",

    mission:
        "Build technology that helps businesses and people work better.",

    vision:
        "Create a future where technology makes professional work more accessible, efficient and meaningful.",

    linkedin: "",

    twitter: "",

    email: "hr@cloudworks.example.com",

    phone: "+91 98765 43210"

};


// =====================================================
// 2. LOAD COMPANY PROFILE
// =====================================================

function getCompanyProfile() {

    const savedProfile =
        localStorage.getItem(
            "careerHubCompanyProfile"
        );


    // Agar saved profile nahi hai
    // to default data return karo

    if (!savedProfile) {

        return {
            ...defaultCompanyProfile
        };

    }


    try {

        const profile =
            JSON.parse(savedProfile);


        // Default data + saved data merge
        return {
            ...defaultCompanyProfile,
            ...profile
        };

    } catch (error) {

        console.error(
            "Unable to load company profile:",
            error
        );


        return {
            ...defaultCompanyProfile
        };
    }
}


// =====================================================
// 3. SAVE COMPANY PROFILE
// =====================================================

function saveCompanyProfileData(profile) {

    localStorage.setItem(
        "careerHubCompanyProfile",
        JSON.stringify(profile)
    );

}


// =====================================================
// 4. UPDATE COMPANY PREVIEW
// =====================================================

function updateCompanyPreview(profile) {

    const previewName =
        document.getElementById(
            "companyPreviewName"
        );


    const previewIndustry =
        document.getElementById(
            "companyPreviewIndustry"
        );


    const previewLogo =
        document.getElementById(
            "companyPreviewLogo"
        );


    if (previewName) {

        previewName.textContent =
            profile.name || "Company Name";

    }


    if (previewIndustry) {

        previewIndustry.textContent =
            profile.industry || "Industry";

    }


    if (previewLogo) {

        // Company name ka first letter logo mein show hoga
        previewLogo.textContent =
            profile.name
                ? profile.name
                    .charAt(0)
                    .toUpperCase()
                : "C";

    }

}


// =====================================================
// 5. FILL FORM WITH COMPANY DATA
// =====================================================

function fillCompanyForm(profile) {

    const fields = {

        companyName: profile.name,

        companyIndustry: profile.industry,

        companyLocation: profile.location,

        companyWebsite: profile.website,

        companySize: profile.size,

        companyFounded: profile.founded,

        companyDescription: profile.description,

        companyCulture: profile.culture,

        companyMission: profile.mission,

        companyVision: profile.vision,

        companyLinkedin: profile.linkedin,

        companyTwitter: profile.twitter,

        companyEmail: profile.email,

        companyPhone: profile.phone

    };


    Object.keys(fields).forEach(function (id) {

        const field =
            document.getElementById(id);


        if (field) {

            field.value =
                fields[id] || "";

        }

    });

}


// =====================================================
// 6. GET FORM DATA
// =====================================================

function getCompanyFormData() {

    return {

        name:
            document.getElementById(
                "companyName"
            )?.value.trim() || "",


        industry:
            document.getElementById(
                "companyIndustry"
            )?.value.trim() || "",


        location:
            document.getElementById(
                "companyLocation"
            )?.value.trim() || "",


        website:
            document.getElementById(
                "companyWebsite"
            )?.value.trim() || "",


        size:
            document.getElementById(
                "companySize"
            )?.value || "",


        founded:
            document.getElementById(
                "companyFounded"
            )?.value.trim() || "",


        description:
            document.getElementById(
                "companyDescription"
            )?.value.trim() || "",


        culture:
            document.getElementById(
                "companyCulture"
            )?.value.trim() || "",


        mission:
            document.getElementById(
                "companyMission"
            )?.value.trim() || "",


        vision:
            document.getElementById(
                "companyVision"
            )?.value.trim() || "",


        linkedin:
            document.getElementById(
                "companyLinkedin"
            )?.value.trim() || "",


        twitter:
            document.getElementById(
                "companyTwitter"
            )?.value.trim() || "",


        email:
            document.getElementById(
                "companyEmail"
            )?.value.trim() || "",


        phone:
            document.getElementById(
                "companyPhone"
            )?.value.trim() || ""

    };

}


// =====================================================
// 7. COMPANY PROFILE FORM
// =====================================================

function initCompanyProfile() {

    const form =
        document.getElementById(
            "companyProfileForm"
        );


    // Agar company profile page nahi hai
    // to function stop

    if (!form) {

        return;

    }


    // Saved profile load karo

    let profile =
        getCompanyProfile();


    // Form mein data show karo

    fillCompanyForm(profile);


    // Preview update karo

    updateCompanyPreview(profile);


    // ---------------------------------------------
    // FORM SUBMIT
    // ---------------------------------------------

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const newProfile =
                getCompanyFormData();


            // Basic validation

            if (!newProfile.name) {

                alert(
                    "Please enter company name."
                );

                return;

            }


            if (!newProfile.industry) {

                alert(
                    "Please enter company industry."
                );

                return;

            }


            if (!newProfile.location) {

                alert(
                    "Please enter company location."
                );

                return;

            }


            // LocalStorage mein save karo

            saveCompanyProfileData(
                newProfile
            );


            // Preview immediately update karo

            updateCompanyPreview(
                newProfile
            );


            // Current profile update karo

            profile =
                newProfile;


            alert(
                "Company profile saved successfully!"
            );

        }
    );


    // ---------------------------------------------
    // CANCEL BUTTON
    // ---------------------------------------------

    const cancelButton =
        document.getElementById(
            "cancelCompanyProfile"
        );


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                // Saved data dobara load karo

                const savedProfile =
                    getCompanyProfile();


                // Form ko saved values par reset karo

                fillCompanyForm(
                    savedProfile
                );


                // Preview bhi reset karo

                updateCompanyPreview(
                    savedProfile
                );

            }
        );

    }


    // ---------------------------------------------
    // LIVE COMPANY NAME PREVIEW
    // ---------------------------------------------

    const companyNameInput =
        document.getElementById(
            "companyName"
        );


    const companyIndustryInput =
        document.getElementById(
            "companyIndustry"
        );


    if (companyNameInput) {

        companyNameInput.addEventListener(
            "input",
            function () {

                const name =
                    companyNameInput.value.trim();


                const previewName =
                    document.getElementById(
                        "companyPreviewName"
                    );


                const previewLogo =
                    document.getElementById(
                        "companyPreviewLogo"
                    );


                if (previewName) {

                    previewName.textContent =
                        name || "Company Name";

                }


                if (previewLogo) {

                    previewLogo.textContent =
                        name
                            ? name
                                .charAt(0)
                                .toUpperCase()
                            : "C";

                }

            }
        );

    }


    if (companyIndustryInput) {

        companyIndustryInput.addEventListener(
            "input",
            function () {

                const industry =
                    companyIndustryInput.value.trim();


                const previewIndustry =
                    document.getElementById(
                        "companyPreviewIndustry"
                    );


                if (previewIndustry) {

                    previewIndustry.textContent =
                        industry || "Industry";

                }

            }
        );

    }


    // Company jobs render karo

    renderCompanyJobs();

}


// =====================================================
// 8. COMPANY JOB DATA
// =====================================================

const companyProfileJobs = [

    {
        title: "Frontend Developer",
        location: "Noida, India",
        type: "Full-time",
        mode: "Hybrid",
        salary: "₹8–12 LPA"
    },

    {
        title: "Java Backend Developer",
        location: "Noida, India",
        type: "Full-time",
        mode: "On-site",
        salary: "₹9–14 LPA"
    },

    {
        title: "Software Engineer",
        location: "Pune, India",
        type: "Full-time",
        mode: "Hybrid",
        salary: "₹10–16 LPA"
    }

];


// =====================================================
// 9. RENDER COMPANY JOBS
// =====================================================

function renderCompanyJobs() {

    const container =
        document.getElementById(
            "companyProfileJobs"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    companyProfileJobs.forEach(
        function (job) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "dashboard-job-card";


            card.innerHTML = `

                <div>

                    <h3>
                        ${job.title}
                    </h3>

                    <p>
                        ${job.location}
                    </p>

                    <p>
                        ${job.type} · ${job.mode}
                    </p>

                </div>


                <div>

                    <strong>
                        ${job.salary}
                    </strong>

                    <br>

                    <a
                        href="my-jobs.html"
                        class="btn btn-secondary"
                        style="margin-top:10px;"
                    >
                        View Job
                    </a>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// =====================================================
// 10. INITIALIZE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initCompanyProfile();

    }
);
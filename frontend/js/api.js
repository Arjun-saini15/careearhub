/* =========================================================
   CAREERHUB API HELPER
   ========================================================= */

const API_BASE_URL = "http://localhost:8080/api";


async function apiRequest(
    endpoint,
    options = {}
) {

    const token =
        localStorage.getItem("careerHubToken");


    const headers = {
        ...(options.headers || {})
    };


    // JSON request ke liye
    if (
        options.body &&
        !(options.body instanceof FormData)
    ) {
        headers["Content-Type"] =
            "application/json";
    }


    // JWT token available ho to bhejo
    if (token) {
        headers["Authorization"] =
            `Bearer ${token}`;
    }


    const response =
        await fetch(
            API_BASE_URL + endpoint,
            {
                ...options,
                headers: headers
            }
        );


    // JSON response read karo
    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            "Something went wrong"
        );
    }


    return data;
}
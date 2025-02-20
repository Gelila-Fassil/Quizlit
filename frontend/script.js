const API_URL = "http://localhost:8000";  // Change this if your backend is hosted

// Register User
async function registerUser() {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    alert(data.message);
    if (data.success) {
        window.location.href = "index.html";  // Redirect to login page
    }
}

// Login User
async function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        alert("Login successful!");
        window.location.href = "quiz.html";  // Redirect to quiz page
    } else {
        alert("Login failed!");
    }
}

// Fetch Quizzes
async function fetchQuizzes() {
    const response = await fetch(`${API_URL}/quizzes`);
    const quizzes = await response.json();
    const quizContainer = document.getElementById("quizzes");
    quizContainer.innerHTML = "";
    quizzes.forEach(quiz => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${quiz.title}</h3><p>${quiz.description}</p>`;
        quizContainer.appendChild(div);
    });
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

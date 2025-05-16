
const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();  

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  const formData = {
    username,
    email,
    password
  };

  try {
   
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Signup successful! Please login.");
      window.location.href = "login.html";  
    } else {
      alert(result.msg || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Server error. Please try again later.");
  }
});



const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();  

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

 
  const formData = {
    email,
    password
  };

  try {

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
 
      localStorage.setItem("authToken", result.token);
      alert("Login successful!");
      window.location.href = "signup.html"; 
    } else {
      alert(result.msg || "Invalid credentials. Please try again.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Server error. Please try again later.");
  }
});

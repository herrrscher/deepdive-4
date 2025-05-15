document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const repeatPassword = document.querySelector('input[placeholder="Repeat Password"]').value;

    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return;
    }

    const user = {
        username: username,
        password: password,
        balance: 1000
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert("Account aangemaakt! Je bent nu ingelogd.");
    window.location.href = "index.html";
});
// Registration form submission
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (registerForm.password.value !== registerForm.confirmPassword.value) {
        alert("Passwords don't match");
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: registerForm.username.value,
                password: registerForm.password.value,
                confirmPassword: registerForm.confirmPassword.value,
                role: registerForm.role.value
            })
        });

        if (response.ok) {
            window.location.href = '/dashboard.html';
        } else {
            const error = await response.text();
            alert(error || 'Registration failed');
        }
    } catch (error) {
        alert('An error occurred during registration');
        console.error('Registration error:', error);
    }
});

// Login form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginForm.username.value,
                password: loginForm.password.value
            })
        });

        if (response.ok) {
            window.location.href = '/dashboard.html';
        } else {
            const error = await response.text();
            alert(error || 'Login failed');
        }
    } catch (error) {
        alert('An error occurred during login');
        console.error('Login error:', error);
    }
});

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetForm = tab.dataset.tab;

        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show/hide forms
        document.querySelectorAll('.auth-form').forEach(form => {
            if (form.id === `${targetForm}Form`) {
                form.classList.remove('hidden');
            } else {
                form.classList.add('hidden');
            }
        });
    });
});
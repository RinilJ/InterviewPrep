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
                email: registerForm.email.value,
                password: registerForm.password.value,
                role: registerForm.role.value,
                department: registerForm.department.value,
                batch: registerForm.batch.value,
                year: registerForm.year.value
            })
        });

        if (response.ok) {
            const user = await response.json();
            console.log('Registration successful:', user); // Debug log
            // Redirect based on role
            window.location.href = user.role === 'teacher' ? '/teacher-dashboard.html' : '/dashboard.html';
        } else {
            const error = await response.text();
            alert(error || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
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
            const user = await response.json();
            console.log('Login successful:', user); // Debug log
            // Redirect based on role
            window.location.href = user.role === 'teacher' ? '/teacher-dashboard.html' : '/dashboard.html';
        } else {
            const error = await response.text();
            alert(error || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
});

// Forgot password form submission
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: forgotPasswordForm.email.value
            })
        });

        if (response.ok) {
            alert('Password reset instructions sent to your email');
            document.querySelector('[data-tab="login"]').click();
        } else {
            const error = await response.text();
            alert(error || 'Failed to reset password');
        }
    } catch (error) {
        alert('An error occurred during password reset');
        console.error('Password reset error:', error);
    }
});

// Forgot password link handling
document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.auth-form').forEach(form => form.classList.add('hidden'));
    forgotPasswordForm.classList.remove('hidden');
});

// Back to login link handling
document.getElementById('backToLoginLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.auth-form').forEach(form => form.classList.add('hidden'));
    document.getElementById('loginForm').classList.remove('hidden');
});

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show/hide forms
        const targetTab = tab.dataset.tab;
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.toggle('hidden', form.id !== `${targetTab}Form`);
        });
    });
});

// Handle hash-based navigation
window.addEventListener('load', () => {
    if (window.location.hash === '#register') {
        document.querySelector('[data-tab="register"]').click();
    }
});
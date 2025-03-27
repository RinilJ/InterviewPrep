// Registration form submission
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (registerForm.password.value !== registerForm.confirmPassword.value) {
        showToast('Error', "Passwords don't match");
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
            showToast('Success', 'Registration successful! Redirecting...');
            // Redirect after a short delay to allow toast to be visible
            setTimeout(() => {
                window.location.href = user.role === 'teacher' ? '/teacher-dashboard.html' : '/dashboard.html';
            }, 1500);
        } else {
            const error = await response.text();
            showToast('Error', error || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showToast('Error', 'An error occurred during registration');
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
            showToast('Success', 'Login successful! Redirecting...');
            // Redirect after a short delay to allow toast to be visible
            setTimeout(() => {
                window.location.href = user.role === 'teacher' ? '/teacher-dashboard.html' : '/dashboard.html';
            }, 1500);
        } else {
            const error = await response.text();
            showToast('Error', error || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('Error', 'An error occurred during login');
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
            showToast('Success', 'Password reset instructions sent to your email');
            document.querySelector('[data-tab="login"]').click();
        } else {
            const error = await response.text();
            showToast('Error', error || 'Failed to reset password');
        }
    } catch (error) {
        showToast('Error', 'An error occurred during password reset');
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

// Toast notification system
function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${title.toLowerCase()}`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="fas fa-${title === 'Success' ? 'check-circle' : title === 'Error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <strong>${title}</strong>
        </div>
        <div class="toast-body">${message}</div>
    `;
    document.body.appendChild(toast);

    // Add showing class after a small delay to trigger transition
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
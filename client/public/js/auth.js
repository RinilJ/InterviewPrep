// Show toast notification
function showToast(message, type = 'error') {
    // Create a simpler toast container
    const toast = document.createElement('div');
    toast.className = `simple-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// Add CSS for simple toast if not already included
function addToastStyles() {
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .simple-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 10px 15px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                animation: simple-slide-in 0.3s ease-out forwards;
            }
            .simple-toast.success {
                background-color: #28a745;
            }
            .simple-toast.error {
                background-color: #dc3545;
            }
            .simple-toast.info {
                background-color: #17a2b8;
            }
            .simple-toast.fade-out {
                opacity: 0;
                transition: opacity 0.3s;
            }
            @keyframes simple-slide-in {
                from {
                    transform: translateY(-20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize toast styles
addToastStyles();

// Registration form submission
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (registerForm.password.value !== registerForm.confirmPassword.value) {
        showToast("Passwords don't match", 'error');
        return;
    }

    try {
        // Show loading state on the button
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Registering...`;

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
            showToast('Registration successful! Redirecting...', 'success');
            // Redirect based on role after a short delay
            setTimeout(() => {
                window.location.href = user.role === 'teacher' ? '/teacher-dashboard.html' : '/dashboard.html';
            }, 1000);
        } else {
            const error = await response.text();
            showToast(error || 'Registration failed. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Registration error:', error);
        showToast('An error occurred during registration. Please try again.', 'error');
        
        // Reset button state
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Register';
    }
});

// Login form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        // Show loading state on the button
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Logging in...`;

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
            showToast('Login successful! Redirecting...', 'success');
            // Redirect based on role after a short delay
            setTimeout(() => {
                window.location.href = user.role === 'teacher' ? '/teacher-dashboard.html' : '/dashboard.html';
            }, 1000);
        } else {
            const error = await response.text();
            showToast(error || 'Invalid username or password', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('An error occurred during login. Please try again.', 'error');
        
        // Reset button state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Login';
    }
});

// Forgot password form submission
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        // Show loading state on the button
        const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

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
            showToast('Password reset instructions sent to your email', 'success');
            setTimeout(() => {
                document.querySelector('[data-tab="login"]').click();
            }, 1000);
        } else {
            const error = await response.text();
            showToast(error || 'Failed to reset password', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Password reset error:', error);
        showToast('An error occurred during password reset. Please try again.', 'error');
        
        // Reset button state
        const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Reset Password';
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
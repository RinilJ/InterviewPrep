// Show toast notification
function showToast(title, message, type = 'error') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <strong>${title}</strong>
            <button type="button" class="close-toast">&times;</button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    document.body.appendChild(toast);
    
    // Add event listener to close button
    const closeBtn = toast.querySelector('.close-toast');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        });
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// Add CSS for toast if not already included
function addToastStyles() {
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                min-width: 300px;
                background-color: white;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                overflow: hidden;
                animation: slide-in 0.3s ease-out forwards;
            }
            .toast-header {
                display: flex;
                align-items: center;
                padding: 12px 15px;
                background-color: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
            }
            .toast-header i {
                margin-right: 8px;
            }
            .toast-header strong {
                flex-grow: 1;
            }
            .close-toast {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                opacity: 0.5;
            }
            .close-toast:hover {
                opacity: 1;
            }
            .toast-body {
                padding: 12px 15px;
            }
            .toast.success .toast-header {
                background-color: #d4edda;
                color: #155724;
            }
            .toast.error .toast-header {
                background-color: #f8d7da;
                color: #721c24;
            }
            .toast.info .toast-header {
                background-color: #d1ecf1;
                color: #0c5460;
            }
            .toast.fade-out {
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease-out;
            }
            @keyframes slide-in {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
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
        showToast('Registration Error', "Passwords don't match", 'error');
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
            showToast('Success', 'Registration successful! Redirecting...', 'success');
            // Redirect based on role after a short delay
            setTimeout(() => {
                window.location.href = user.role === 'teacher' ? '/teacher-dashboard.html' : '/dashboard.html';
            }, 1000);
        } else {
            const error = await response.text();
            showToast('Registration Failed', error || 'Registration failed. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Registration error:', error);
        showToast('Error', 'An error occurred during registration. Please try again.', 'error');
        
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
            showToast('Success', 'Login successful! Redirecting...', 'success');
            // Redirect based on role after a short delay
            setTimeout(() => {
                window.location.href = user.role === 'teacher' ? '/teacher-dashboard.html' : '/dashboard.html';
            }, 1000);
        } else {
            const error = await response.text();
            showToast('Login Failed', error || 'Invalid username or password', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('Error', 'An error occurred during login. Please try again.', 'error');
        
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
            showToast('Success', 'Password reset instructions sent to your email', 'success');
            setTimeout(() => {
                document.querySelector('[data-tab="login"]').click();
            }, 1000);
        } else {
            const error = await response.text();
            showToast('Reset Failed', error || 'Failed to reset password', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Password reset error:', error);
        showToast('Error', 'An error occurred during password reset. Please try again.', 'error');
        
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
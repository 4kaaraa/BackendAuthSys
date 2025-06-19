window.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.querySelector('span');
    if (signInBtn) {
      signInBtn.addEventListener('click', () => {
        window.location.href = 'http://localhost/login';
      });
    }
  
    const form = document.getElementById('registerForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const licenseKey = document.getElementById('licenseKey').value.trim();
  
        if (!username || !password || !licenseKey) {
          alert('Please fill in all fields.');
          return;
        }
  
        const url = `http://localhost/api/information/user/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&keys=${encodeURIComponent(licenseKey)}`;
  
        try {
          const response = await fetch(url);
          const result = await response.json();
  
          if (response.ok) {
            window.location.href = 'http://localhost/customer';
          } else {
            alert(result.message || 'Registration failed.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Could not connect to the server.');
        }
      });
    }
  });

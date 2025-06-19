window.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.querySelector('span');
    if (signInBtn) {
      signInBtn.addEventListener('click', () => {
        window.location.href = 'http://localhost/register';
      });
    }
  
    const form = document.getElementById('loginForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
  
        if (!username || !password) {
          alert('Please fill in all fields.');
          return;
        }
  
        const url = `http://localhost/api/information/user/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  
        try {
          const response = await fetch(url);
          const result = await response.json();
  
          if (response.ok) {
            window.location.href = 'http://localhost/customer';
          } else {
            alert(result.message || 'Login failed.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Could not connect to the server.');
        }
      });
    }
  });
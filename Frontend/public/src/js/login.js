const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

const signUp = document.querySelector('#signup');
const logIn = document.querySelector('#login');

const loginMessage = document.querySelector('#message-logIn');
const signUpMessage = document.querySelector('#message-signUp');

const Username = document.querySelector('#userName');
const Password = document.querySelector('#password');
const Email = document.querySelector('#email');

const LEmail = document.querySelector('#Lemail');
const LPassword = document.querySelector('#Lpassword');

signUp.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userName = Username.value;
  const password = Password.value;
  const email = Email.value;

  const data = { userName, password, email };

  try {/* in here is where we make a call to our backend, to post the data */
    const response = await fetch('http://localhost:5000/api/register/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Success ' + result);
      Username.value = '';
      Password.value = '';
      Email.value = '';

      wrapper.classList.remove('active');
      loginMessage.innerText = 'Heey now Log in!😉';
      loginMessage.style.visibility = 'visible';
      signUpMessage.style.visibility = 'hidden';
    } else {
      const result = await response.json();
      console.error('Error: ', response.statusText);
      signUpMessage.innerText = 'Hmm 🤔' + result.message;
      signUpMessage.style.visibility = 'visible';
    }
  } catch (error) {
    console.error('An error occured: ' + error);
  }
});

logIn.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = LEmail.value;
  const password = LPassword.value;

  const logInData = { email, password };
  console.log(logInData);

  try {
    const response = await fetch('http://localhost:5000/api/login/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(logInData),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('userEmail', email);
      window.location.href = 'index.html';
      console.log('Success log in : ', +result);
    } else if (response.status == 401) {
      const result = await response.json();
      loginMessage.innerText = result.message + '🙄';
      loginMessage.style.visibility = 'visible';
      LPassword.value = '';
    } else {
      alert(response.statusText);
      LPassword.value = '';
    }
  } catch (error) {
    console.error('An error occured: ' + error);
    alert(error);
  }
});

registerLink.onclick = () => {
  wrapper.classList.add('active');
  loginMessage.style.visibility = 'hidden';
  LPassword.value = '';
  LEmail.value = '';
};

loginLink.onclick = () => {
  wrapper.classList.remove('active');
  signUpMessage.style.visibility = '';
};

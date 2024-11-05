const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

const signUp = document.querySelector('#signup');


signUp.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const Username = document.querySelector('#userName');
    const Password = document.querySelector('#password');
    const Email = document.querySelector('#email');

    const userName = Username.value;
    const password = Password.value;
    const email = Email.value;

    const data = {userName, password, email};

    try{

        const response = await fetch('http://localhost:5000/api/register/user',{
            method : 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.ok){
            const result = await response.json();
            console.log('Success ' + result);
           window.location.href = 'logIn.html';
        }
        else{
            console.error('Error: ', response.statusText);
        }
    }
    catch(error){
            console.error('An error occured: ' + error);
    }
})

registerLink.onclick = () => {
    wrapper.classList.add('active');
}

loginLink.onclick = () => {
    wrapper.classList.remove('active');

}
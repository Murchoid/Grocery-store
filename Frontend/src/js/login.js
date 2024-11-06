const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

const signUp = document.querySelector('#signup');
const logIn = document.querySelector('#login');


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

        const response = await fetch('https://groceryapi-m4veid9dg-murchoids-projects.vercel.app/api/register/user',{
            method : 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.ok){
            const result = await response.json();
            console.log('Success ' + result);
            Username.value = '';
            Password.value = '';
            Email.value = '';
            wrapper.classList.remove('active');

        
        }
        else{
            console.error('Error: ', response.statusText);
        }
    }
    catch(error){
            console.error('An error occured: ' + error);
    }
})

logIn.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const Email = document.querySelector('#Lemail');
    const Password = document.querySelector('#Lpassword');

    const email = Email.value;
    const password = Password.value;

    const logInData = {email,password};
    console.log(logInData);

    try{
        const response = await fetch('http://localhost:5000/api/login/user',{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(logInData)
        });


        if(response.ok){
            const result= await response.json();
            window.location.href='index.html';
            console.log('Success log in : ', + result);
        }
        else if(response.status==401){
            alert('Wrong password');
            Password.value='';
        }
        else{
            alert(response.statusText);
            Password.value='';
        }
    }
    catch(error){
        console.error('An error occured: ' + error);
        alert(error);
    }

})


registerLink.onclick = () => {
    wrapper.classList.add('active');
}

loginLink.onclick = () => {
    wrapper.classList.remove('active');

}
let form = document.getElementById('form');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');
let checkbox = document.getElementById('agree');
let drowpdown = document.getElementById('Location');
let zipCode = document.getElementById('zipCode')
let phone = document.getElementById('phone');
let male = document.getElementById('male');
let female = document.getElementById('female');
let result = document.getElementById('result');


let setError = (element, message) => {
    let inputControl = element.parentElement;
    let errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

let setSuccess = element => {
    let inputControl = element.parentElement;
    let errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

let isValidEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
let isZipCode = str => {
    return /^\d{5}(-\d{4})?$/.test(str);
}

let isPhone = str => {
    let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return reg.test(str);
}



let validateInputs = () => {
    let usernameValue = username.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let password2Value = password2.value.trim();
    let valid = true



    if (phone.value === '') {
        setError(phone, 'Phone Number Required')
        valid = false;
    }
    else if (!isPhone(phone.value)) {
        setError(phone, 'Enter a Correct Phone Number');
        valid = false;
    }
    else {
        setSuccess(phone);
    }

    if (zipCode.value === '') {
        setError(zipCode, 'Postal Code Required')
        valid = false;
    }
    else if (!isZipCode(zipCode.value)) {
        setError(zipCode, 'Enter a Correct Postal Code');
        valid = false;
    }
    else {
        setSuccess(zipCode);
    }

    if (usernameValue === '') {
        setError(username, 'Username is required');
        valid = false;
    } else {
        setSuccess(username);
    }


    if (emailValue === '') {
        setError(email, 'Email is required');
        valid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        valid = false;
    } else {
        setSuccess(email);
    }


    if (passwordValue === '') {
        setError(password, 'Password is required');
        valid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 character.')
        valid = false;
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
        valid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
        valid = false;
    } else {
        setSuccess(password2);
    }

    if (!checkbox.checked) {
        setError(checkbox, 'Cant proceed as you didnt agree to the terms!');
        valid = false;
    }
    else {
        setSuccess(checkbox)
    }
    if (drowpdown.value === '') {
        setError(drowpdown, 'Please Select Your City');
        valid = false;
    } else {
        setSuccess(drowpdown);
    }



    if (!male.checked && !female.checked) {
        setError(result, 'You Must Select Your Gender!');
        valid = false;

    }
    else {
        setSuccess(result)
    }

    return valid;

};


form.addEventListener('submit', e => {

    if (validateInputs() === true) {
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => (data[key] = value));
        fetch('http://127.0.0.1:5500/redirect.html',{
            method:'POST',
            headers:{"Content-Type":"Application/JSON"},
            body: JSON.stringify(data)
    
          })
            .then((response)=>{
              
            })
            .catch((error)=>{
    
            })
      }
       

    
    else {
        e.preventDefault();
                  
    }
});





let users = JSON.parse(localStorage.getItem('users')) || [];

function signup() {
    const email = document.getElementById('signupEmail').value;
    const mobileNo = document.getElementById('moblieNo').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (email && mobileNo && password && confirmPassword) {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if(mobileNo.length != 10){
            alert(`Mobile No invalid`);
            return;
        }
        
        const userExists = users.some(user => user.email === email || user.mobileNo === mobileNo );
        if (userExists) {
            alert('User already exists!');
        } else {
            users.push({ email,mobileNo, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful!');
            window.location.href = 'login.html';
        }
    } else {
        alert('Please fill in all fields.');
    }
}

function login() {
    const email = document.getElementById('loginEmail')
    const mobileNo = document.getElementById('mobileNo')
    let val;
    if (email != null){
       val =  email.value;
    }
    else{
        val = mobileNo.value;
    }
    
    const password = document.getElementById('loginPassword').value;

    if (val && password) {
        // Check if user exists
        const user = users.find(user => (user.email === val || user.mobileNo === val) && user.password === password);
        if (user) {
            alert('Login successful!');
            window.location.href = 'products.html';
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('Please fill in all fields.');
    }
}

let showpass=false;
function createMainPassword() {
  if (localStorage.getItem('mainpassword')) {
    alert('Password was already created!');
    return;
  }
  const x = document.getElementById('passinput').value.trim();
  if (x === '') {
    alert('Enter valid password');
  } else {
    alert('Password created successfully');
    localStorage.setItem('mainpassword', x);
    document.getElementById('passinput').value='';
  }
}
function reset() {
    localStorage.removeItem('mainpassword');
    alert('Password reset success create new password!')
}

function showPassword() {
  const passwordField = document.getElementById('pass');
  if(showpass==false){
    showpass=true;
  passwordField.type = 'text';
  }
  else{
     showpass=false;
    passwordField.type = 'password';
  }
}

function savePassword() {
  let webname = document.getElementById('web').value.trim();
  let username = document.getElementById('username').value.trim();
  let userpassword = document.getElementById('pass').value.trim();

  if (!webname || !username || !userpassword) {
    alert('Enter valid credentials');
    return;
  }

  let savedList = JSON.parse(localStorage.getItem('savedPasswords')) || [];
  savedList.push({ website: webname, username, password: userpassword });
  localStorage.setItem('savedPasswords', JSON.stringify(savedList));

  const btn = document.getElementById('savebut');
  btn.textContent = 'Saved Successfully✅';
  setTimeout(() => {
    btn.textContent = 'Save Password';
  }, 3000);
  document.getElementById('web').value = '';
  document.getElementById('username').value = '';
  document.getElementById('pass').value = '';cument.getElementById('pass').innerText='';

}

function searchPasswords() {
  const searchText = document.getElementById('sin').value.toLowerCase();
  const container = document.getElementById('saved');
  container.innerHTML = '';

  const savedata = JSON.parse(localStorage.getItem('savedPasswords')) || [];

  const filtered = savedata.filter(entry =>
    entry.website.toLowerCase().includes(searchText)
  );

  if (filtered.length === 0) {
    container.innerHTML = '<p>No matching credentials found.</p>';
    return;
  }

  filtered.forEach((entry, index) => {
    const item = document.createElement('div');
    item.className = 'list';
    item.innerHTML = `
      <div><strong>Website:</strong> ${entry.website}</div>
      <div><strong>Username:</strong> ${entry.username}</div>
      <div><strong>Password:</strong> ${entry.password}</div>
      <button class="delbtn" data-website="${entry.website}" data-username="${entry.username}" data-password="${entry.password}">Delete</button>
    `;
    container.appendChild(item);
  });

  document.querySelectorAll('.delbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const website = btn.getAttribute('data-website');
      const username = btn.getAttribute('data-username');
      const password = btn.getAttribute('data-password');

      const updatedList = savedata.filter(entry =>
        !(entry.website === website && entry.username === username && entry.password === password)
      );

      localStorage.setItem('savedPasswords', JSON.stringify(updatedList));
      searchPasswords();
    });
  });
}
function verify(){
    let v=document.createElement('div');
    v.classList.add('Verify');
    v.innerHTML=`
       <h2>Enter password to verify</h2>
       <input type="password" id="verifyin" class='passinput' placeholder="Enter password">
       <button id='vbtn'>Verify</button>
       <button id='back'>back</button>
    `

    document.getElementById('addpass').appendChild(v);
    const mp=localStorage.getItem('mainpassword');
    
    eventfunction();
    function eventfunction(){
        let backbtn=document.getElementById('back');
       backbtn.addEventListener('click', function(){
      document.getElementById('addpass').removeChild(v);
     })
    let vb=document.getElementById('vbtn');
    vb.addEventListener('click',function(){
       let val=document.getElementById('verifyin').value;
       console.log(val);
       if(val==mp){
        document.getElementById('addpass').removeChild(v);
         searchPasswords();
       }
       else{
        
         v.innerHTML=`
            <h1>Incorrect password!</h1>
             <input type="password" id="verifyin" class='passinput' placeholder="Enter password">
             <button id='vbtn'>Verify</button>
             <button id='back'>back</button>
            <p>Enter correct password to show your credentials</p>
         `
         eventfunction();
       }

    })
  }
    
}

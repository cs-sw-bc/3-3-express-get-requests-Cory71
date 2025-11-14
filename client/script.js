document.getElementById('fetchButton').addEventListener('click', function() {
    alert("Fetching random user data from backend!")
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            document.getElementById('userName').textContent = `${data.name.title} ${data.name.first} ${data.name.last}`;
            document.getElementById('userEmail').textContent = data.email;
            document.getElementById('userAge').textContent = data.dob.age;
        })
        .catch(error => console.error('Error fetching data: ', error));
});

document.getElementById('healthCheckButton').addEventListener('click', function() {
    const message = document.getElementById('healthMessage').value;
    fetch(`http://localhost:3000/health/${encodeURIComponent(message)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('healthResponse').innerHTML = `<p>${data.message}</p>`;
        })
        .catch(error => console.error('Error checking health: ', error));
});

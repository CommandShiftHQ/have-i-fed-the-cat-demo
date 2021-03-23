async function login(event) {
  event.preventDefault();

  const email = document.getElementById('emailField').value;
  const password = document.getElementById('passwordField').value;

  const body = JSON.stringify({
    email,
    password
  })

  const response = await fetch(`http://${window.location.host}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })

  if (!response.ok) {
    window.alert('Oops: Something went wrong :(');
  } else {
    const responseBody = await response.json()
    setToken(responseBody.token);
    window.location.replace(`http://${window.location.host}/`);
  }
}
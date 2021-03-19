async function postCat(event) {
  event.preventDefault();

  const name = document.getElementById('catNameField').value;
  const breed = document.getElementById('catBreedField').value;
  const markings = document.getElementById('catMarkingsField').value;
  const image = document.getElementById('catImageField').files[0];

  const formData = new FormData();

  formData.append('name', name);
  formData.append('breed', breed);
  formData.append('markings', markings);
  formData.append('image', image);

  const response = await fetch(`http://${window.location.host}/cats`, {
      method: 'POST',
      body: formData
  })

  const responseBody = await response.json()

  if (!response.ok) {
    window.alert('Oops: Something went wrong :(');
  } else {
    window.location.replace(`http://${window.location.host}/html/profile.html?catId=${responseBody.id}`);
  }
}
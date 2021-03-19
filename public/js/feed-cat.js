const feedCat = async (id) => {
  const response = await fetch(`http://${window.location.host}/feed/${id}`, { method: 'PATCH' });

  if (!response.ok) {
    window.alert('Oops: Something went wrong :(');
  } else {
    window.location.replace(`http://${window.location.host}/html/profile.html?catId=${id}`);
  }
  return data;
};
const getCat = async (id) => {
  const response = await fetch(`http://${window.location.host}/cats/${id}`, {
    headers: {
      Authorization: getToken()
    }
  });
  const data = await response.json();
  return data;
};
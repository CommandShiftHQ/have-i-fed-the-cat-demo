const getCats = async () => {
  const response = await fetch(`http://${window.location.host}/cats`, {
    headers: {
      Authorization: getToken()
    }
  });
  const data = await response.json();
  return data.cats;
};
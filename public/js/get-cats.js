const getCats = async () => {
  const response = await fetch(`http://${window.location.host}/cats`);
  const data = await response.json();
  return data.cats;
};
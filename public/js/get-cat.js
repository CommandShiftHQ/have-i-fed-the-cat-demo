const getCat = async (id) => {
  const response = await fetch(`http://${window.location.host}/cats/${id}`);
  const data = await response.json();
  return data;
};
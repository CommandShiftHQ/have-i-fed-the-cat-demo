const deleteCat = async (id) => {
  if (window.confirm("Do you really want to delete this cat?")) {
    const response = await fetch(`http://${window.location.host}/cats/${id}`, { method: 'DELETE' });
  
    if (!response.ok) {
      window.alert('Oops: Something went wrong :(');
    } else {
      window.location.replace(`http://${window.location.host}/`);
    }
  }
};
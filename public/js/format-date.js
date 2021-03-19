const formatDate = (dateString) => {
  const lastFedData = new Date(dateString);
  const lastFedTime = `${lastFedData.getHours()}:${lastFedData.getMinutes()}`;
  const lastFedDate = `${lastFedData.getDate()}/${lastFedData.getMonth()}/${lastFedData.getFullYear()}`;

  return `${lastFedTime} ${lastFedDate}`;
}
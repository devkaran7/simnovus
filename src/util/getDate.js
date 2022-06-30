const getDate = (diff = 0) => {
  let curr_date = new Date().getTime();
  curr_date += diff * 24 * 60 * 60 * 1000;
  curr_date = new Date(curr_date);
  let month = curr_date.getMonth() + 1;
  let day = curr_date.getDate();
  const year = curr_date.getFullYear();
  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();
  return (year + '-' + month + '-' + day);
}

export default getDate;
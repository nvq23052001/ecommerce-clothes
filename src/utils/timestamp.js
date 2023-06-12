const timestamp = (time) => {
  const d = new Date(time);
  const fd = d.toLocaleDateString() + ' ' + d.toTimeString().substring(0, d.toTimeString().indexOf('GMT'));
  return time ? fd.slice(0, -1) : '-';
};

export default timestamp;

/*
  ex: timestamp('2022-03-22T08:03:17.673Z') => 22/3/2022 15:03:17
*/

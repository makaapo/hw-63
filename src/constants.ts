const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const pad = (s: number): string => (s < 10 ? '0' + s : s.toString());
  return [pad(date.getMonth() + 1),
      pad(date.getDate()),
      date.getFullYear()].join('.') + ' ' +
    [pad(date.getHours()),
      pad(date.getMinutes()),
      pad(date.getSeconds())].join(':');
};

export default formatDate;
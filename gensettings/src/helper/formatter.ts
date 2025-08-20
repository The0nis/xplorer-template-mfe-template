export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }).replace(',', ' -');
  };

export const truncateText = (text: string, maxLength: number = 20): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export const calculateWeekdays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
};


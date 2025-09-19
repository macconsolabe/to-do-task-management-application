export const formatDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'short' });
  const year = today.getFullYear();
  
  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return day + 'th';
    switch (day % 10) {
      case 1: return day + 'st';
      case 2: return day + 'nd';
      case 3: return day + 'rd';
      default: return day + 'th';
    }
  };
  
  return `${getDayWithSuffix(day)} ${month} ${year}`;
};

export const formatTaskDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTaskDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const dateStr = formatTaskDate(dateString);
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZoneName: 'short'
  });
  return `${dateStr} | ${timeStr}`;
};

export const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date();
};

// Change format time to MM/DD/YYYY TT:TT(AM)
export default function changeFormatTime(time) {
    function formatTime(hours, minutes) {
      const meridiem = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = String(minutes).padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}${meridiem}`;
    }
    const inputDateString = time;
    const inputDate = new Date(inputDateString);
    return `${
      inputDate.getMonth() + 1
    }/${inputDate.getDate()}/${inputDate.getFullYear()} ${formatTime(
      inputDate.getHours(),
      inputDate.getMinutes()
    )}`;
  }
  
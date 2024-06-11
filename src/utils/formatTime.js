import moment from "moment-timezone";

export const userActivityTime = (lastActiveTime) => {
  const currentTime = moment.tz("Asia/Ho_Chi_Minh").add(7, "hours");
  const lastActiveMoment = moment.tz(lastActiveTime, "Asia/Ho_Chi_Minh");
  const duration = moment.duration(currentTime.diff(lastActiveMoment));
  const minutesDiff = duration.asMinutes();
  const hoursDiff = duration.asHours();
  const daysDiff = duration.asDays();
  if (minutesDiff < 1) {
    return "Active a few seconds ago";
  } else if (minutesDiff < 60) {
    return `Activate ${Math.floor(minutesDiff)} minutes ago`;
  } else if (hoursDiff < 24) {
    return `Activate ${Math.floor(hoursDiff)} hours ago`;
  } else {
    return `Activate ${Math.floor(daysDiff)} days ago`;
  }
};

export function formatTimeMessage(time) {
  if (!time) {
    return undefined;
  }
  // Tạo đối tượng Date từ chuỗi ngày giờ ISO
  const date = new Date(time);

  // Lấy giờ và phút từ đối tượng Date
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Định dạng giờ và phút thành chuỗi HH:MM
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime; // Output: 11:17
}

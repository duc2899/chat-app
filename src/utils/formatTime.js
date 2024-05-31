// import { format, getTime, formatDistanceToNow } from "date-fns";

// // ----------------------------------------------------------------------

// export function fDate(date) {
//   return format(new Date(date), "dd MMMM yyyy");
// }

// export function fDateTime(date) {
//   return format(new Date(date), "dd MMM yyyy HH:mm");
// }

// export function fTimestamp(date) {
//   return getTime(new Date(date));
// }

// export function fDateTimeSuffix(date) {
//   return format(new Date(date), "dd/MM/yyyy hh:mm p");
// }

// export function fToNow(date) {
//   return formatDistanceToNow(new Date(date), {
//     addSuffix: true,
//   });
// }

export function formatTimeMessage(time) {
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

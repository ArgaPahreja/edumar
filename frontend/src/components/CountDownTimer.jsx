import React from "react";

const CountDownTimer = ({ hoursMinSecs }) => {
  // Mengambil nilai hours, minutes, dan seconds dari prop hoursMinSecs menggunakan destructuring
  const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;

  // State untuk menyimpan nilai hours, minutes, dan seconds
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  // Fungsi untuk mengurangi waktu
  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      // Jika waktu telah habis, panggil fungsi reset
      reset();
    } else if (mins === 0 && secs === 0) {
      // Jika menit dan detik habis, kurangi jam dan atur menit dan detik ke nilai maksimum
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      // Jika detik habis, kurangi menit dan atur detik ke nilai maksimum
      setTime([hrs, mins - 1, 59]);
    } else {
      // Kurangi detik
      setTime([hrs, mins, secs - 1]);
    }
  };

  // Fungsi untuk mengatur ulang waktu ke nilai awal
  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  // Menggunakan useEffect untuk menjalankan fungsi tick setiap detik
  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    // Membersihkan interval ketika komponen di-unmount
    return () => clearInterval(timerId);
  });

  // Menampilkan waktu dalam format HH:MM:SS
  return (
    <div>
      <p>{`${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownTimer;

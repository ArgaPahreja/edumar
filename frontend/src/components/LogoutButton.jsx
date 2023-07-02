import React from 'react';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Lakukan permintaan HTTP POST ke endpoint logout di server
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Logout berhasil
        console.log('Logout successful');
        // Lakukan aksi tambahan setelah logout, seperti mengubah state atau mengarahkan pengguna ke halaman lain
      } else {
        // Logout gagal
        console.log('Logout failed');
        // Handle error, misalnya dengan menampilkan pesan kesalahan kepada pengguna
      }
    } catch (error) {
      console.log('Error:', error);
      // Handle error, misalnya dengan menampilkan pesan kesalahan kepada pengguna
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
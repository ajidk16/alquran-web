"use client";

import { useState } from "react";

interface LocationInfo {
  city: string;
  state: string;
  country: string;
}

export default function LocationButton() {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocationName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      if (!response.ok) {
        throw new Error(
          "Gagal mengambil nama lokasi dari server OpenStreetMap."
        );
      }
      const data = await response.json();

      setLocation({
        city:
          data.address.city ||
          data.address.town ||
          data.address.county ||
          "Tidak diketahui",
        state: data.address.state || "Tidak diketahui",
        country: data.address.country || "Tidak diketahui",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memproses nama lokasi."
      );
    } finally {
      setLoading(false);
    }
  };

  console.log('location', location);
  

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);
    setLocation(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationName(latitude, longitude);
        },
        // --- INI BAGIAN YANG DIPERBARUI ---
        (err) => {
          console.error("GEOLOCATION ERROR:", err); // Untuk debugging di console
          let friendlyMessage = "Terjadi kesalahan yang tidak diketahui.";

          switch (err.code) {
            case err.PERMISSION_DENIED:
              friendlyMessage =
                "Anda telah memblokir akses lokasi. Silakan izinkan di pengaturan browser Anda.";
              break;
            case err.POSITION_UNAVAILABLE:
              friendlyMessage =
                "Informasi lokasi tidak tersedia. Pastikan GPS atau layanan lokasi di perangkat Anda aktif.";
              break;
            case err.TIMEOUT:
              friendlyMessage =
                "Waktu permintaan lokasi habis. Coba lagi dengan koneksi internet yang lebih baik.";
              break;
          }

          // Menambahkan pesan asli untuk detail tambahan
          setError(`${friendlyMessage} (Pesan asli: ${err.message})`);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation tidak didukung oleh browser ini.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation} disabled={loading}>
        {loading ? "Mendeteksi..." : "Dapatkan Lokasi Saya"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "1rem", maxWidth: "400px" }}>
          {error}
        </p>
      )}

      {location && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Lokasi Terdeteksi:</h3>
          <p>Kota: {location.city}</p>
          <p>Provinsi: {location.state}</p>
          <p>Negara: {location.country}</p>
        </div>
      )}
    </div>
  );
}

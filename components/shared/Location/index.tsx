"use client";

import { Button } from "@/components/ui/button";
import { getLocation, getPrayerTimes } from "@/lib/prayer-api";
import { useQuranStore } from "@/lib/store";
import { useState } from "react";

export default function LocationDirection() {
  const { updateSettings, setPrayerTimes } = useQuranStore();
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

      const redat = await getLocation(
        data.address.city || data.address.town || data.address.county
      );

      const times = await getPrayerTimes(redat.id);

      updateSettings({
        location: {
          id: redat.id,
          lokasi: redat.lokasi,
          city: times.lokasi,
          state: times.daerah,
          country: data.address.country,
        },
      });

      setPrayerTimes(times);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memproses nama lokasi."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationName(latitude, longitude);
        },

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
    <>
      <Button onClick={handleGetLocation} disabled={loading}>
        {loading ? "Mendeteksi..." : "Dapatkan Lokasi Saya"}
      </Button>

      {error && (
        <p style={{ color: "red", marginTop: "1rem", maxWidth: "400px" }}>
          {error}
        </p>
      )}
    </>
  );
}

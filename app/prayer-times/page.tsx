import { PrayerTimesCard } from "@/components/prayer-times-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Sholat - Al-Quran Digital",
  description:
    "Jadwal waktu sholat harian berdasarkan lokasi Anda dengan akurasi tinggi",
};

export default function PrayerTimesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Jadwal Sholat</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Waktu sholat yang akurat berdasarkan lokasi Anda
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <PrayerTimesCard />
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Settings, MapPin, Bell, Type, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useQuranStore } from "@/lib/store"

export default function SettingsPage() {
  const { settings, updateSettings } = useQuranStore()
  const { toast } = useToast()
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    updateSettings(localSettings)
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan Anda telah berhasil disimpan",
    })
  }

  const updateLocalSettings = (key: string, value: any) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateLocationSettings = (key: string, value: any) => {
    setLocalSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [key]: value,
      },
    }))
  }

  const updateNotificationSettings = (key: string, value: any) => {
    setLocalSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Pengaturan
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Sesuaikan pengalaman membaca Al-Quran Anda</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Location Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Lokasi
            </CardTitle>
            <CardDescription>Pengaturan lokasi untuk jadwal sholat yang akurat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Kota</Label>
                <Input
                  id="city"
                  value={localSettings.location.city}
                  onChange={(e) => updateLocationSettings("city", e.target.value)}
                  placeholder="Jakarta"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Negara</Label>
                <Input
                  id="country"
                  value={localSettings.location.country}
                  onChange={(e) => updateLocationSettings("country", e.target.value)}
                  placeholder="Indonesia"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prayer-method">Metode Perhitungan Sholat</Label>
              <Select
                value={localSettings.prayerMethod.toString()}
                onValueChange={(value) => updateLocalSettings("prayerMethod", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">University of Islamic Sciences, Karachi</SelectItem>
                  <SelectItem value="2">Islamic Society of North America</SelectItem>
                  <SelectItem value="3">Muslim World League</SelectItem>
                  <SelectItem value="4">Umm Al-Qura University, Makkah</SelectItem>
                  <SelectItem value="5">Egyptian General Authority of Survey</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifikasi
            </CardTitle>
            <CardDescription>Pengaturan pengingat waktu sholat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Aktifkan Notifikasi</Label>
                <p className="text-sm text-muted-foreground">Terima pengingat waktu sholat</p>
              </div>
              <Switch
                checked={localSettings.notifications.enabled}
                onCheckedChange={(checked) => updateNotificationSettings("enabled", checked)}
              />
            </div>
            {localSettings.notifications.enabled && (
              <div className="space-y-2">
                <Label htmlFor="notification-time">Pengingat Sebelum (menit)</Label>
                <Select
                  value={localSettings.notifications.beforeMinutes.toString()}
                  onValueChange={(value) => updateNotificationSettings("beforeMinutes", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 menit</SelectItem>
                    <SelectItem value="10">10 menit</SelectItem>
                    <SelectItem value="15">15 menit</SelectItem>
                    <SelectItem value="30">30 menit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reading Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Tampilan Bacaan
            </CardTitle>
            <CardDescription>Sesuaikan tampilan teks Al-Quran</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-size">Ukuran Font</Label>
              <Select value={localSettings.fontSize} onValueChange={(value) => updateLocalSettings("fontSize", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Kecil</SelectItem>
                  <SelectItem value="medium">Sedang</SelectItem>
                  <SelectItem value="large">Besar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="arabic-font">Font Arab</Label>
              <Select
                value={localSettings.arabicFont}
                onValueChange={(value) => updateLocalSettings("arabicFont", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amiri">Amiri</SelectItem>
                  <SelectItem value="uthmanic">Uthmanic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tampilkan Tafsir</Label>
                <p className="text-sm text-muted-foreground">Tampilkan tafsir pada setiap ayat</p>
              </div>
              <Switch
                checked={localSettings.showTafsir}
                onCheckedChange={(checked) => updateLocalSettings("showTafsir", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end">
          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Simpan Pengaturan
          </Button>
        </div>
      </div>
    </div>
  )
}

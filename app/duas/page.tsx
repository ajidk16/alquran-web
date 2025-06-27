"use client"
import { Heart, Copy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { dailyDuas, duaCategories } from "@/lib/duas-data"
import { useQuranStore } from "@/lib/store"

export default function DuasPage() {
  const { toast } = useToast()
  const { selectedDuaCategory, setSelectedDuaCategory } = useQuranStore()

  const handleCopyDua = (dua: any) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}\n\n${dua.reference || ""}`
    navigator.clipboard.writeText(text)
    toast({
      title: "Disalin",
      description: "Doa telah disalin ke clipboard",
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
          <Heart className="h-8 w-8 text-primary" />
          Doa Harian
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Kumpulan doa-doa harian yang dianjurkan dalam Islam
        </p>
      </div>

      <Tabs value={selectedDuaCategory} onValueChange={setSelectedDuaCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {duaCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              <span className="mr-1">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {duaCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="text-center py-4">
              <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                <span className="text-3xl">{category.icon}</span>
                Doa {category.name}
              </h2>
            </div>

            <div className="grid gap-6">
              {dailyDuas
                .filter((dua) => dua.category === category.id)
                .map((dua) => (
                  <Card key={dua.id} className="animate-fade-in">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{dua.title}</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => handleCopyDua(dua)} className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      {dua.reference && (
                        <CardDescription>
                          <Badge variant="outline" className="text-xs">
                            {dua.reference}
                          </Badge>
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-right">
                        <p className="font-arabic text-2xl leading-relaxed mb-4">{dua.arabic}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground italic">{dua.transliteration}</p>
                        <p className="text-base leading-relaxed">{dua.translation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

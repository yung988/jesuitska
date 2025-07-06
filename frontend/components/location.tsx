import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Location() {
  return (
    <section id="location" className="py-24 md:py-32 px-6 md:px-20 bg-cream/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-wider uppercase text-center mb-4">
          Lokalita
        </h2>
        <div className="w-24 h-px bg-dark-gray/30 mx-auto mb-16" />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-serif mb-6">Historické centrum Znojma</h3>
            <p className="text-lg mb-6 leading-relaxed">
              Pension Jesuitská se nachází v jedné z nejkrásnějších částí historického centra Znojma - v okolí kostela sv. Michala a bývalé Jezuitské koleje, kde působil i Prokop Diviš.
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Prostředí pensionu je velmi klidné a naši hosté nejsou rušeni žádnými vnějšími vlivy ani nepříjemnými ruchy z ulice. Z pensionu máte snadný přístup k hlavním památkám města a okolním vinařstvím.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-lg">
                <p className="font-medium">2 min</p>
                <p className="text-sm text-dark-gray/70">ke kostelu sv. Michala</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-lg">
                <p className="font-medium">5 min</p>
                <p className="text-sm text-dark-gray/70">k historickému centru</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-lg">
                <p className="font-medium">10 min</p>
                <p className="text-sm text-dark-gray/70">ke Znojemskému hradu</p>
              </div>
            </div>

            <Button className="rounded-full bg-dark-gray text-white px-8 py-6 uppercase tracking-widest text-sm hover:bg-black transition-colors">
              Zobrazit na mapě
            </Button>
          </div>

          <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden order-1 md:order-2">
            <Image
              src="/images/hero/hero.png"
              alt="Pension Jesuitská ve Znojmě - pohled na lokalitu"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

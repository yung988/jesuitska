import Image from "next/image"

export default function Intro() {
  return (
    <section id="intro" className="py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-wider uppercase text-center mb-4">
        O pensionu
      </h2>
      <div className="w-24 h-px bg-dark-gray/30 mx-auto mb-12" />

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            Náš pension je umístěn v jedné z nejkrásnějších částí historického centra Znojma - v okolí kostela sv. Michala a bývalé Jezuitské koleje, kde působil i Prokop Diviš. Máte tak možnost zažít intimní atmosféru a genius loci historického Znojma.
          </p>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            Prostředí pensionu je velmi klidné a naši hosté nejsou rušeni žádnými vnějšími vlivy ani nepříjemnými ruchy z ulice. K dispozici máme dvoulůžkové pokoje, apartmán a jednolůžkový pokoj. Každý pokoj je jinak uspořádán a má tak vlastní atmosféru.
          </p>
        </div>
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Image
            src="/images/gallery/balkon.png"
            alt="Pension Jesuitská ve Znojmě"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

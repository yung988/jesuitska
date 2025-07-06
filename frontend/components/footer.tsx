import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-cream py-20 px-6 md:px-20 border-t border-dark-gray/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-serif text-3xl tracking-wider mb-4">PENSION JESUITSKÁ</div>
          <p className="text-dark-gray/70 max-w-md mx-auto">
            Pohodlné ubytování v historickém centru Znojma s vinným sklípkem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="uppercase tracking-widest text-sm mb-6">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple mt-1" />
                <p>
                  Jesuitská 5/183
                  <br />
                  669 02 Znojmo
                  <br />
                  Česká republika
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purple" />
                <p>+420 737 263 466</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple" />
                <p>jesuitska@seznam.cz</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-sm mb-6">Menu</h3>
            <nav className="space-y-3">
              <Link href="#intro" className="block hover:text-purple transition-colors">
                O pensionu
              </Link>
              <Link href="#rooms" className="block hover:text-purple transition-colors">
                Pokoje
              </Link>
              <Link href="#gallery" className="block hover:text-purple transition-colors">
                Galerie
              </Link>
              <Link href="#location" className="block hover:text-purple transition-colors">
                Lokalita
              </Link>
              <Link href="#contact" className="block hover:text-purple transition-colors">
                Kontakt
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-sm mb-6">Důležité informace</h3>
            <div className="space-y-3">
              <p className="text-sm">IČO: 172 03 350</p>
              <p className="text-sm">Vlastník: Ondřej Sabáček</p>
              <p className="text-sm">Založeno: 1994</p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-dark-gray/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-dark-gray/70 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Pension Jesuitská. Všechna práva vyhrazena.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-dark-gray/70 hover:text-purple transition-colors">
              Zásady ochrany osobních údajů
            </Link>
            <Link href="#" className="text-sm text-dark-gray/70 hover:text-purple transition-colors">
              Podmínky použití
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

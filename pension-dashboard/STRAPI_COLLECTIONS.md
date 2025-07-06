# Strapi Collections pro Pension Dashboard

## 1. Bookings (Rezervace)
**Název kolekce:** `bookings`

### Atributy:
- `guest_name` (String) - Jméno hosta
- `email` (String) - Email hosta
- `phone` (String) - Telefon hosta
- `room` (String) - Číslo/název pokoje
- `check_in` (Date) - Datum příjezdu
- `check_out` (Date) - Datum odjezdu
- `guests` (Number) - Počet hostů
- `total_price` (Number) - Celková cena
- `status` (Enumeration) - Status rezervace
  - `confirmed` - Potvrzeno
  - `pending` - Čeká na potvrzení
  - `cancelled` - Zrušeno
  - `checked-in` - Ubytován
- `payment_status` (Enumeration) - Status platby
  - `paid` - Zaplaceno
  - `pending` - Čeká na platbu
  - `partial` - Částečně zaplaceno
  - `refunded` - Vráceno
- `source` (String) - Zdroj rezervace (Booking.com, Airbnb, Přímá rezervace, atd.)
- `notes` (Text) - Poznámky

---

## 2. Tasks (Úkoly)
**Název kolekce:** `tasks`

### Atributy:
- `title` (String) - Název úkolu
- `description` (Text) - Popis úkolu
- `assignee` (String) - Přiřazeno komu
- `room` (String) - Číslo pokoje / místo
- `priority` (Enumeration) - Priorita
  - `high` - Vysoká
  - `medium` - Střední
  - `low` - Nízká
- `status` (Enumeration) - Status úkolu
  - `in-progress` - Probíhá
  - `pending` - Čeká
  - `completed` - Dokončeno
  - `paused` - Pozastaveno
- `due_time` (DateTime) - Termín dokončení
- `estimated_time` (String) - Odhadovaný čas
- `category` (String) - Kategorie úkolu

---

## 3. Lost and Found (Ztráty a nálezy)
**Název kolekce:** `lost_found_items`

### Atributy:
- `item_name` (String) - Název předmětu
- `description` (Text) - Popis předmětu
- `location` (String) - Místo nálezu
- `found_date` (Date) - Datum nálezu
- `found_by` (String) - Kdo našel
- `status` (Enumeration) - Status
  - `found` - Nalezeno
  - `stored` - Uskladněno
  - `returned` - Vráceno
  - `claimed` - Vyzvednuto
  - `disposed` - Zlikvidováno
- `category` (String) - Kategorie (Osobní věci, Elektronika, Šperky, Hračky, atd.)
- `guest_contact` (String) - Kontakt na hosta
- `image` (Media) - Fotka předmětu

---

## 4. Schedule (Rozvrh směn)
**Název kolekce:** `schedules`

### Atributy:
- `employee_name` (String) - Jméno zaměstnance
- `role` (String) - Role/pozice
- `shift_start` (DateTime) - Začátek směny
- `shift_end` (DateTime) - Konec směny
- `date` (Date) - Datum směny
- `status` (Enumeration) - Status
  - `active` - Aktivní
  - `scheduled` - Naplánováno
  - `completed` - Dokončeno
  - `absent` - Nepřítomen
- `tasks` (JSON) - Seznam úkolů pro směnu

---

## 5. Concierge Requests (Concierge požadavky)
**Název kolekce:** `concierge_requests`

### Atributy:
- `guest_name` (String) - Jméno hosta
- `room` (String) - Číslo pokoje
- `request_title` (String) - Název požadavku
- `description` (Text) - Popis požadavku
- `priority` (Enumeration) - Priorita
  - `high` - Vysoká
  - `medium` - Střední
  - `low` - Nízká
- `status` (Enumeration) - Status
  - `pending` - Čeká
  - `in-progress` - Probíhá
  - `completed` - Dokončeno
  - `cancelled` - Zrušeno
- `assigned_to` (String) - Přiřazeno komu
- `category` (Enumeration) - Kategorie
  - `dining` - Restaurace
  - `transport` - Doprava
  - `tourism` - Turistika
  - `other` - Ostatní
- `created_at` (DateTime) - Čas vytvoření

---

## 6. Concierge Services (Doporučené služby)
**Název kolekce:** `concierge_services`

### Atributy:
- `name` (String) - Název služby
- `category` (String) - Kategorie
- `rating` (Decimal) - Hodnocení
- `distance` (String) - Vzdálenost
- `phone` (String) - Telefon
- `description` (Text) - Popis
- `address` (Text) - Adresa
- `website` (String) - Web
- `opening_hours` (JSON) - Otevírací doba

---

## 7. Stock Items (Skladové položky)
**Název kolekce:** `stock_items`

### Atributy:
- `name` (String) - Název položky
- `category` (String) - Kategorie
- `current_stock` (Number) - Aktuální zásoba
- `min_stock` (Number) - Minimální zásoba
- `max_stock` (Number) - Maximální zásoba
- `unit` (String) - Jednotka (ks, kg, l, balení, atd.)
- `location` (String) - Umístění ve skladu
- `last_restocked` (Date) - Poslední doplnění
- `supplier` (String) - Dodavatel
- `status` (Enumeration) - Status
  - `good` - Dostatečné
  - `low` - Nízké
  - `critical` - Kritické
  - `overstock` - Přebytek
- `price_per_unit` (Decimal) - Cena za jednotku

---

## 8. Rooms (Pokoje)
**Název kolekce:** `rooms`

### Atributy:
- `room_number` (String) - Číslo pokoje
- `room_type` (String) - Typ pokoje (Standard, Deluxe Suite, Family Room, atd.)
- `capacity` (Number) - Kapacita osob
- `price_per_night` (Number) - Cena za noc
- `status` (Enumeration) - Status
  - `available` - Volný
  - `occupied` - Obsazený
  - `maintenance` - Údržba
  - `cleaning` - Úklid
- `floor` (Number) - Patro
- `amenities` (JSON) - Vybavení pokoje

---

## 9. Employees (Zaměstnanci)
**Název kolekce:** `employees`

### Atributy:
- `first_name` (String) - Jméno
- `last_name` (String) - Příjmení
- `email` (String) - Email
- `phone` (String) - Telefon
- `role` (String) - Pozice
- `department` (String) - Oddělení
- `hire_date` (Date) - Datum nástupu
- `status` (Enumeration) - Status
  - `active` - Aktivní
  - `on_leave` - Na dovolené
  - `inactive` - Neaktivní

---

## Relace mezi kolekcemi:

1. **Bookings → Rooms** (Many-to-One)
   - Každá rezervace může být spojena s pokojem

2. **Tasks → Employees** (Many-to-One)
   - Každý úkol může být přiřazen zaměstnanci

3. **Tasks → Rooms** (Many-to-One)
   - Úkol může být spojen s konkrétním pokojem

4. **Schedule → Employees** (Many-to-One)
   - Každá směna je přiřazena zaměstnanci

5. **Concierge Requests → Bookings** (Many-to-One)
   - Požadavek může být spojen s rezervací

6. **Stock Items → Suppliers** (Many-to-One)
   - Skladová položka může mít dodavatele

---

## Poznámky pro implementaci:

1. **API Permissions**: Všechny kolekce by měly mít povolené operace:
   - find
   - findOne
   - create
   - update
   - delete

2. **Validace**: Přidat validační pravidla pro povinná pole

3. **Indexy**: Vytvořit indexy na často vyhledávaná pole (guest_name, email, room_number, atd.)

4. **Webhooks**: Možnost přidat webhooky pro notifikace při změnách (např. nová rezervace, kritické zásoby)

5. **Filtry a řazení**: Povolit filtrování a řazení podle důležitých atributů

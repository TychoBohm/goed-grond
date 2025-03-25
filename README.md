# Goed Grond Project - README

## Downloaden en Installeren

### Benodigdheden

- PHP 8.1 of hoger
- Composer
- Node.js en npm
- MySQL of een andere database ondersteund door Laravel
- Git

### Stappen voor Installatie

1. **Clone het repository**

    ```
    git clone https://github.com/uw-username/goed-grond.git
    cd goed-grond
    ```

2. **Installeer PHP dependencies**

    ```
    composer install
    ```

3. **Installeer JavaScript dependencies**

    ```
    npm install
    ```

4. **Configuratie voorbereiden**

    ```
    cp .env.example .env
    php artisan key:generate
    ```

5. **Database configureren**

    - Open het `.env` bestand en vul je database gegevens in:
        ```
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=goed_grond
        DB_USERNAME=root
        DB_PASSWORD=
        ```

6. **Migraties uitvoeren**
    ```
    php artisan migrate
    ```

## Project Opstarten

1. **Start de Laravel applicatie**

    ```
    composer run dev
    ```

2. **Bezoek de applicatie**
    - Open je browser en ga naar `http://localhost:8000`

## Testdata Genereren via Tinker

Je kunt Tinker gebruiken om testdata voor projecten aan te maken:

1. **Start Tinker**

    ```
    php artisan tinker
    ```

2. **Maak een enkel project aan**

    ```php
    App\Models\Project::factory()->create();
    ```

3. **Meerdere projecten aanmaken**

    ```php
    App\Models\Project::factory()->count(10)->create();
    ```

4. **Project aanmaken met specifieke waarden**

    ```php
    App\Models\Project::factory()->create([
        'title' => 'Bodemonderzoek Amstelveen',
        'opdrachtgever' => 'Gemeente Amstelveen'
    ]);
    ```

5. **Afsluiten van Tinker**
    ```
    exit
    ```

## Veelvoorkomende Problemen en Oplossingen

### Database connectie issues

- Controleer of je database service draait
- Verifieer je database gegevens in het `.env` bestand
- Probeer `php artisan config:clear` om de cache te wissen

### Permissie problemen

- Zorg dat de `storage` en `bootstrap/cache` mappen schrijfbaar zijn:
    ```
    chmod -R 775 storage bootstrap/cache
    ```

### Composer problemen

- Als je dependency errors krijgt, probeer:
    ```
    composer dump-autoload
    ```
    of
    ```
    composer update
    ```

### Migratie problemen

- Als migraties vastlopen, probeer:
    ```
    php artisan migrate:fresh
    ```
    (Let op: dit verwijdert alle data in de database)

### Node modules problemen

- Bij JavaScript/npm fouten, probeer:
    ```
    rm -rf node_modules
    npm cache clean --force
    npm install
    ```

### Maximum execution time exceeded

- Verhoog de `max_execution_time` in je `php.ini` bestand
- Of voer langlopende commando's uit met:
    ```
    php -d max_execution_time=300 artisan [commando]
    ```

### Fail to listen probleem

- Als je een foutmelding krijgt zoals "Failed to listen on localhost", controleer of de `php.ini` configuratie correct is ingesteld:
    1. Open je `php.ini` bestand.
    2. Zoek naar de regel `variables_order = "EGPCS"` en verwijder eventueel het puntkomma (`;`) aan het begin van de regel, verander daarna deze regel als volgt:
        ```
        variables_order = "GPCS"
        ```
    3. Sla het bestand op en herstart je webserver of PHP-service.

### 500 Server Error zonder andere log

- Als je een 500 server error krijgt zonder verdere foutmeldingen in de logs, kan dit te maken hebben met de locatie van je project. Probeer het volgende:
    1. Als je **XAMPP** gebruikt:
        - Verplaats het project naar de `htdocs` map van je XAMPP-installatie.
    2. Als je **Herd** gebruikt:
        - Verplaats het project naar de `Herd` map.
    3. Start je webserver opnieuw en probeer de applicatie opnieuw te laden.

Als je andere problemen tegenkomt, controleer de Laravel logs in `storage/logs/laravel.log` voor meer informatie, of kom bij mij langs dan kunnen we het samen oplossen.

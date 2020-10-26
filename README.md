# KSA Rooyghem

## Setup the project
Eerste en vooral moet je het project clonen voor als je hem nog niet heb gedaan. Je moet deze command kopiëren en plakken in je terminal.

```
git clone https://github.com/AlI230/rooyghem.git
```

### Initialiseren van de databank

Voor de databank maken we gebruik van [MySql](https://www.mysql.com/). Installeer dit op je machine en zorg dat je zeker de Server versie hebt. De Workbench is een aanrader, maar geen vereiste.

Om de databank te initialiseren, doe volgende stappen:
1. Maak een instance van MySQL. Zorg dat de gebruikersnaam en het wachtwoord allebei 'root' zijn
2. Maak een databank aan genaamd 'rooyghem'
3. Run het script init-db-solution.sql om de tabellen aan te maken
4. Run het eerste deel van het script fill-db.sql. Dit deel loopt tot en met de INSERT INTO activities... (dit eindigt bij een ;).
5. We hebben nu al locaties, groepen en activiteiten. Voor we newsfeeds en users kunnen toevoegen, hebben we een admin nodig. Open je favoriete console (waarschijnlijk CMD, behalve voor de MacOS-snobs) in de rootfolder van het project en voer het commando "node admins.js" uit. Het kan zijn dat het script niet vanzelf stopt en je dus moet stoppen door CTRL+C te doen.
6. Test of de admin is toegevoegd: ga in je databank (met een CLI of via de workbench) en voer de SQL-query "SELECT * FROM users;" uit. Je zou moeten 1 user hebben met naam "admin". Je kan inloggen als admin met gebruikersnaam "admin" en wachtwoord "AdminAdmins"
7. Nu kunnen newsfeeds uitgevoerd worden door het laatste deel van fill-db.sql uit te voeren

Als de structuur van de databank veranderd is, moet je die tabellen opnieuw definieren en vullen. De gemakkelijkste manier is om alle tabellen te verwijderen en het stappenplan vanaf stap 3 uit te voeren. Als je weet waar je mee bezig bent, kan je het ook anders doen.
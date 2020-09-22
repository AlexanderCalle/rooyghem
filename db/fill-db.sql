INSERT INTO locations(name, adress, picture)
VALUES("Lokaal Paalbos", "Paalbos 39, 8310 Sint-Kruis", "path/to/paalbos/picture"),
      ("Hoofdlokaal", "Engelendalelaan 18, 8310 Sint-Kruis", "path/to/engelendale/picture"),
	  ("Lokaal Maleveld", "Brieversweg 375, 8310 Sint-Kruis", "path/to/male/picture");
	  
INSERT INTO groups(name, story, logo, location_id)
VALUES("Kabouters", "Kabouters hebben vk", "path/kabouter/logo", 0),
      ("Pagadders", "Pagadders hebben vk", "path/pagadder/logo", 1),
	  ("Jongknapen", "Jongknapen hebben vk", "path/jongknapen/logo", 1),
      ("Knapen", "Knapen hebben vk", "path/knapen/logo", 2),
      ("Jonghernieuwers", "Jonghernieuwers hebben vk", "path/jonghernieuwers/logo", 2),
      ("Aspiranten", "Aspiranten hebben vk", "path/aspiranten/logo", 1),
      ("Hernieuwers", "Hernieuwers hebben vk", "path/hernieuwers/logo", 1),
      ("Oudercomite", "OC hebben vk", "path/oc/logo", 1)	  
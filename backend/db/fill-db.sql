INSERT INTO locations(name, adress, picture)
VALUES("Lokaal Paalbos", "Paalbos 39, 8310 Sint-Kruis", "path/to/paalbos/picture"),
      ("Hoofdlokaal", "Engelendalelaan 18, 8310 Sint-Kruis", "path/to/engelendale/picture"),
	  ("Lokaal Maleveld", "Brieversweg 375, 8310 Sint-Kruis", "path/to/male/picture");
	  
INSERT INTO `groups`(name, story, logo, location_id)
VALUES("Kabouters", "Kabouters hebben vk", "/public/images/banlogos/kabouters.jpg", 1),
      ("Pagadders", "Pagadders hebben vk", "/public/images/banlogos/pagadders.jpg", 2),
	  ("Jongknapen", "Jongknapen hebben vk", "/public/images/banlogos/jongknapen.jpg", 2),
      ("Knapen", "Knapen hebben vk", "/public/images/banlogos/knapen.jpg", 3),
      ("Jonghernieuwers", "Jonghernieuwers hebben vk", "/public/images/banlogos/jonghernieuwers.jpg", 3),
      ("Aspiranten", "Aspiranten hebben vk", "/public/images/banlogos/aspiranten.jpg", 2),
      ("Hernieuwers", "Hernieuwers hebben vk", "/public/images/banlogos/hernieuwers.jpg", 2),
      ("Oudercomite", "OC hebben vk", "/public/images/banlogos/hernieuwers.jpg", 2),
      ("Webteam", "Nerd van Rooyghem", "/public/images/banlogos/webteam.jpg", 2);

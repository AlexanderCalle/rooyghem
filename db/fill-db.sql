INSERT INTO locations(name, adress, picture)
VALUES("Lokaal Paalbos", "Paalbos 39, 8310 Sint-Kruis", "path/to/paalbos/picture"),
      ("Hoofdlokaal", "Engelendalelaan 18, 8310 Sint-Kruis", "path/to/engelendale/picture"),
	  ("Lokaal Maleveld", "Brieversweg 375, 8310 Sint-Kruis", "path/to/male/picture");
	  
INSERT INTO `groups`(name, story, logo, location_id)
VALUES("Kabouters", "Kabouters hebben vk", "path/kabouter/logo", 1),
      ("Pagadders", "Pagadders hebben vk", "path/pagadder/logo", 2),
	  ("Jongknapen", "Jongknapen hebben vk", "path/jongknapen/logo", 2),
      ("Knapen", "Knapen hebben vk", "path/knapen/logo", 3),
      ("Jonghernieuwers", "Jonghernieuwers hebben vk", "path/jonghernieuwers/logo", 3),
      ("Aspiranten", "Aspiranten hebben vk", "path/aspiranten/logo", 2),
      ("Hernieuwers", "Hernieuwers hebben vk", "path/hernieuwers/logo", 2),
      ("Oudercomite", "OC hebben vk", "path/oc/logo", 2)

INSERT INTO activities (activity_id, title, start_date, end_date, meeting_point, description, start_publication, end_publication, group_id)
VALUES (1, "KAB 1", "2020-10-24T14:00:00", "2020-10-24T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe kabouteractiviteit", "2020-10-20", "2020-11-10", 1),
       (2, "KAB 2", "2020-10-31T14:00:00", "2020-10-31T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe kabouteractiviteit 2", "2020-10-20", "2020-11-10", 1),
       (3, "KAB 3", "2020-11-07T14:00:00", "2020-11-07T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe kabouteractiviteit 3", "2020-10-20", "2020-11-10", 1),
       (4, "PAG 1", "2020-10-24T14:00:00", "2020-10-24T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe pagadderactiviteit", "2020-10-20", "2020-11-10", 2),
       (5, "PAG 2", "2020-10-31T14:00:00", "2020-10-31T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe pagadderactiviteit 2", "2020-10-20", "2020-11-10", 2),
       (6, "PAG 3", "2020-11-07T14:00:00", "2020-11-07T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe pagadderactiviteit 3", "2020-10-20", "2020-11-10", 2)
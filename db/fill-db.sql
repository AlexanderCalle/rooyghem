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
      ("Oudercomite", "OC hebben vk", "/public/images/banlogos/hernieuwers.jpg", 2);

INSERT INTO activities (activity_id, title, start_date, end_date, meetingpoint, description, start_publication, end_publication, group_id)
VALUES (1, "KAB 1", "2020-10-24T14:00:00", "2020-10-24T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe kabouteractiviteit", "2020-10-20", "2020-11-10", 1),
       (2, "KAB 2", "2020-10-31T14:00:00", "2020-10-31T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe kabouteractiviteit 2", "2020-10-20", "2020-11-10", 1),
       (3, "KAB 3", "2020-11-07T14:00:00", "2020-11-07T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe kabouteractiviteit 3", "2020-10-20", "2020-11-10", 1),
       (4, "PAG 1", "2020-10-24T14:00:00", "2020-10-24T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe pagadderactiviteit", "2020-10-20", "2020-11-10", 2),
       (5, "PAG 2", "2020-10-31T14:00:00", "2020-10-31T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe pagadderactiviteit 2", "2020-10-20", "2020-11-10", 2),
       (6, "PAG 3", "2020-11-07T14:00:00", "2020-11-07T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe pagadderactiviteit 3", "2020-10-20", "2020-11-10", 2),
       (7, "JKN 1", "2020-10-24T14:00:00", "2020-10-24T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe jongknapenactiviteit", "2020-10-20", "2020-11-10", 3),
       (8, "JKN 2", "2020-10-31T14:00:00", "2020-10-31T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe jongknapenactiviteit 2", "2020-10-20", "2020-11-10", 3),
       (9, "JKN 3", "2020-11-07T14:00:00", "2020-11-07T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe jongknapenactiviteit 3", "2020-10-20", "2020-11-10", 3),
       (10, "KN 1", "2020-10-24T14:00:00", "2020-10-24T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe knapenactiviteit", "2020-10-20", "2020-11-10", 4),
       (11, "KN 2", "2020-10-31T14:00:00", "2020-10-31T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe knapenactiviteit 2", "2020-10-20", "2020-11-10", 4),
       (12, "KN 3", "2020-11-07T14:00:00", "2020-11-07T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe knapenactiviteit 3", "2020-10-20", "2020-11-10", 4),
       (13, "JHN 1", "2020-10-24T14:00:00", "2020-10-24T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe jonghernieuweractiviteit", "2020-10-20", "2020-11-10", 5),
       (14, "JHN 2", "2020-10-31T14:00:00", "2020-10-31T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe jonghernieuweractiviteit 2", "2020-10-20", "2020-11-10", 5),
       (15, "JHN 3", "2020-11-07T14:00:00", "2020-11-07T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe jonghernieuweractiviteit 3", "2020-10-20", "2020-11-10", 5),
       (16, "ASPI 1", "2020-10-24T14:00:00", "2020-10-24T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe aspirantenactiviteit", "2020-10-20", "2020-11-10", 6),
       (17, "ASPI 2", "2020-10-31T14:00:00", "2020-10-31T17:00:00", "Engelendalelaan 18, 8310 Sint-Kruis","Een super toffe aspirantenactiviteit 2", "2020-10-20", "2020-11-10", 6);
       
INSERT INTO newsfeeds (feed_id, title, description, start_publication, end_publication, picture_path, created_by)
VALUES (1, "Artikel 1", "Dit is een nieuwtje dat we hebben meegemaakt met onze KSA", "2020-10-25", "2020-11-25", "/public/images/newsfeedpictures/picture1.jpg", "1"),
       (2, "Artikel 2", "Dit is nog een nieuwtje dat we hebben meegemaakt met onze KSA", "2020-10-25", "2020-11-25", "/public/images/newsfeedpictures/picture2.jpg", "1"),
       (3, "Artikel 3", "Dit is ook nog een nieuwtje dat we hebben meegemaakt met onze KSA", "2020-10-25", "2020-11-25", "/public/images/newsfeedpictures/picture3.jpg", "1"),
       (4, "Artikel 4", "Dit is alweer een nieuwtje dat we hebben meegemaakt met onze KSA, wat zijn wij toch cool", "2020-10-25", "2020-11-25", "/public/images/newsfeedpictures/picture4.jpg", "1");

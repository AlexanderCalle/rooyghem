import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/groups/`, {
      credentials: "include",
    });
    const json = await res.json();
    setGroups(json.groups);
    console.log(json);
  }, []);

  const renderList = (group) => {
    switch (group.group_id) {
      case groups[0].group_id:
        return (
          <p>
            De jongste leden van onze beweging noemen we de Kabouters. KSA
            betekent voor hen spelen, spelen en nog eens spelen. Ze kunnen zich
            op elke activiteit verwonderen over de nieuwe ervaringen die ze
            opdoen. Hun levendige fantasie zorgt ervoor dat ze op reis kunnen
            naar eender waar, met eender wie, om eender welk probleem op te
            lossen. Leiders zijn tijdens die reizen hun troost en toeverlaat.
          </p>
        );

      case groups[1].group_id:
        return (
          <p>
            De Pagadders zitten halfweg hun carrière op de lagere school en zijn
            niet langer de jongste leden van KSA. Het is een enthousiaste bende
            die geregeld al echt samen kan spelen. De spelletjes worden al wat
            complexer. Lang stilzitten is niet aan hen besteed, in onze
            jeugdbeweging kunnen ze bewegen en vanalles uitproberen wat thuis
            niet kan.
          </p>
        );

      case groups[2].group_id:
        return (
          <p>
            De Jongknapen vinden in KSA vooral actie en spanning. Ze mogen zelf
            al eens het initiatief nemen om de activiteiten wat op te vullen, al
            houdt de leiding steeds een oogje in het zeil. Ze zijn de waaghalzen
            van KSA die graag in competitie treden met elkaar. In de
            jeugdbeweging mogen ze echt bij de groep horen en nieuwe vrienden
            leren kennen.
          </p>
        );

      case groups[3].group_id:
        return (
          <p>
            De leden van 12 tot 14 jaar heten in KSA de Knapen. Ze zijn stilaan
            'groot' geworden en mogen de echte wereld gaan verkennen. Ze
            gebruiken de vrijheid die ze genieten als pubers om op avontuur te
            trekken. Ook in KSA kunnen ze met vanalles gaan experimenteren. Die
            groep avonturiers is al redelijk zelfstandig geworden in al wat ze
            doen. Aangezien Knapen, Jimmers en Knimmers volop zichzelf aan het
            ontdekken zijn, leidt dat geregeld eens tot kleine crisissen waar de
            leid(st)er als moderator nodig is. De activiteiten worden al heel
            wat avontuurlijker en de vriendengroep heel wat hechter.
          </p>
        );

      case groups[4].group_id:
        return (
          <p>
            KSA wordt voor de Jonghernieuwers een ontmoetingsplaats met
            vrienden. Ze willen soms eens stilzitten om wat gezellig te
            babbelen, maar trekken er even graag samen op uit om de meest
            uiteenlopende stunts te beleven. De leid(st)ers zetten activiteiten
            op die een uitdaging vormen voor de leden en hen uitnodigen om samen
            te werken om hun doel te bereiken. Er wordt al heel wat
            verantwoordelijkheid doorgespeeld naar de leden en de groep mag
            geregeld zelf één en ander organiseren. In KSA mogen ze zichzelf
            zijn, los van de doordeweekse verplichtingen en verwachtingen.
          </p>
        );

      case groups[5].group_id:
        return (
          <p>
            Eens je 16 bent geworden in KSA, kom je bij de +16’ers terecht. Voor
            hen worden nog heel wat activiteiten georganiseerd, maar ze leren
            ook de kneepjes kennen van het leiding-zijn. Ze zijn actief bezig
            een eigen identiteit op te bouwen en daarin kan KSA een belangrijke
            rol spelen. Ze nemen een zeker engagement op binnen de groep en
            hebben inspraak in de richting die het uit moet. Ze maken plannen en
            keuzes voor de toekomst en denken na over de maatschappij en hoe die
            er zou moeten uitzien.
          </p>
        );

      default:
        return <p>Loading...</p>;
        break;
    }
  };

  if (!groups) {
    return (
      <>
        <p>Aan het laden...</p>
      </>
    );
  }

  return (
    <div class="full_page">
      <Navbar />
      <main class="container">
        <div class="groupscontainer">
          {groups.map((group) => (
            <div class="groupCard">
              <img
                src={group.logo}
                height="300"
                alt={"Group" + group.name}
                class="grouplogo image"
              />
              <div class="middle">
                {renderList(group)}
                <form action={"/groups/" + group.name + "/info"} method="get">
                  <button>{group.name}</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GroupList;

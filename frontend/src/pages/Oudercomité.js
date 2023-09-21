import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/over_ons.css";

const Oudercomité = () => {
  return (
    <div class="full_page">
      <Navbar />
      <main class="overOns">
        <h2>Oudercomité</h2>
        <p>
          Ook de ouders kunnen met hun interesse en engagement in KSA Rooyghem
          terecht! Er bestaat namelijk een oudercomité (OC) van zo'n 25 leden.
          Hier horen zij van de bondsleiding en volwassen begeleiders het nieuws
          uit de bond. Als vzw behartigt het oudercomité het beheer van de
          lokalen. Naast de maandelijkse vergaderingen, kunnen de leden hun
          engagement via een werkgroepje verruimen. Zo is er de BBQ van de
          startdag, de organisatie van wafelbak, kookouder, of eens het gras
          afrijden, het klusteam, … <br /> Alle ouders met kinderen in KSA
          Rooyghem zijn welkom.
          <br />
          <br />
          Wie interesse heeft in meer info of zich reeds wil opgeven, kan dit
          bij de voorzitter Nico Lagauw, 0475 53 58 03 of
          oudercomité@ksarooyghem.be
          <br />
          <br />
          Tot dan!
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Oudercomité;

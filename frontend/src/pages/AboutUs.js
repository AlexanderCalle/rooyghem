import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../style/over_ons.css';

const AboutUs = () => {

    return (
        <>
            <Navbar />
            <main class="overOns">
            <h2>Over ons</h2>   
            <p>KSA Rooyghem is een jeugdbeweging voor jongens vanaf 6 jaar uit Sint-Kruis en Male. We geven een degelijke ontspanning aan jongeren en dit in een sfeervol kader. De ontspanning kan vele gezichten aannemen: bos- en pleinspelen, weekend en kampen, avontuur en zelfkook, trektochten… </p>
            <p>We geven in onze werking ook aandacht aan opvoeding in zowel sociale als technische vaardigheden: kompas lezen, sjorren, geld beheren, omgaan met anderen, een hand toereiken aan diegene die het moeilijk heeft, een open en kritische blik op de maatschappij, positief denken in zowel goede als minder goeie momenten… </p>
            <p>Een leidingsploeg van meer dan 30 vrienden draagt de groep. Zij engageren zich ongeremd en vrijwillig om de jongeren te begeleiden en te leren leven in groep.</p>
            <p>De leden worden ingedeeld in verschillende groepen (bannen) naargelang hun leeftijd. Iedere ban houdt om de twee weken een activiteit in hun eigen lokaal, doorgaans op zaterdagmiddag van 14 uur tot 17 uur. Elke activiteit is ingekaderd in een bepaald verhaal en de lokalen zijn ingekleed in een tot de verbeelding sprekend decor.</p>
            <p>Naast de gewone activiteiten gaat iedere ban elk jaar ook op weekend en begin augustus op kamp, meestal in de Kempen of de Ardennen. De jongste bannen (kabouters, pagadders en jongknapen) gaan op heemkamp en de oudere bannen (knapen, jonghernieuwers en aspiranten) op tentenkamp. De kampen zijn ook steevast schitterend ingekleed in een bepaald thema. Deze zes (voor de jongsten) tot tien (voor de oudsten) dagen zijn steeds het hoogtepunt van het jaar voor alle KSA'ers.</p>
            <p>KSA Rooyghem beschikt over heel wat lokalen in Sint-Kruis en Male. De headquarters bevinden zich in de Engelendalelaan. Hier hebben ook de pagadders, jongknapen, aspiranten  en hernieuwers hun lokaal. Het lokaal van de kabouters bevindt zich in het Paalbos. De knapen en jonghernieuwers hun lokaal bevindt zich in de Brieversweg, naast de voetbalvelden van Jong Male.</p>
	    <br/>
	    <p>Mede dank aan Cera voor het sponseren van onze renovatie aan de lokalen van Male</p>
            <form action="/contact" method="get">
                <button type="submit">Contact</button>
            </form>
        </main>
            <Footer />
        </>
    )

}

export default AboutUs;

import React, {useState, useEffect} from 'react'
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import CreateActivityForm from '../components/CreateActivityForm';
import axios from 'axios'

const BackofficeCreateAct = () => {
    return (
       <>
        <Navbar />
        <main class="container" id="backofficecontainer">
            <BackofficeMenu />
            <div id="backofficecreation">
                <CreateActivityForm />
            </div>
        </main>
       </>
    )
}

export default BackofficeCreateAct

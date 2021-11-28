import React from 'react'
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import CreateNewsfeedForm from '../components/CreateNewsfeedForm'

function BackofficeNewsfeedCreate() {

    
    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateNewsfeedForm />
                </div>
            </main>
        </>
    )
}

export default BackofficeNewsfeedCreate;

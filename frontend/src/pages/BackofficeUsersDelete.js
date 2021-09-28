import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import UsersForm from '../components/UsersForm';

const BackofficeUsersDelete = () => {
    const params = useParams();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/users/single/' + params.user_id, {credentials: 'include'});
            const json = await res.json();
            setUserInfo(json.user);
        };

        fetchData();
    }, [setUserInfo, params.user_id])

    if(!userInfo) {
        return(
            <>
            <p>Aan het laden...</p>
            </>
        )
    }

    const deleteUser = async () => {
        const response = await fetch('http://localhost:2000/users/delete/single/' + userInfo.user_id, {'credentials': 'include'});
        window.location = "/backoffice/users";
    };

    return(
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <UsersForm user={userInfo} readOnly={true}/>
                    <button onClick={deleteUser}>Verwijder gebruiker</button>
                </div>
            </main>
        </>
    );
}

export default BackofficeUsersDelete;
import React, { useEffect, useState } from "react";
import Header from "../Header";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Footer from "../Footer";
import axios from "axios";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClimbingBoxLoader";

function Home(){
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const [authCookie, setAuthCookie] = useState(null);
    
    function addNote(newNote) {
        const config = {
            headers: {
                Authorization: "Bearer " + authCookie
            }
        };
        axios
        .post("https://keeperapp-server.onrender.com/api/addNote", newNote, config)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }
    
    function deleteNote(id) {
        const config = {
            headers: {
                Authorization: "Bearer " + authCookie
            }
        };
        axios
        .post("https://keeperapp-server.onrender.com/api/deleteNote", {id: id}, config)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            console.log(Cookies.get("_auth"));
            setAuthCookie(Cookies.get("_auth"));
        }, 2000);
    }, []);
      
    useEffect(() => {
        if (authCookie) {
            console.log(authCookie);
            const config = {
                headers: {
                    Authorization: "Bearer " + authCookie
                }
            };
            axios
            .get("https://keeperapp-server.onrender.com/api/home", config)
            .then((res) => {
                setNotes(res.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
        }
    }, [authCookie]);
    
    return(
    <div>
        <Header />
        {loading ? <ClipLoader color="#f5ba13" size={100} className="home-loading"/> : <CreateArea onAdd={addNote} />}
        {
            !loading && 
            notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            })
        }
        
        <Footer color="#ccc"/>
    </div>
    )
}

export default Home;
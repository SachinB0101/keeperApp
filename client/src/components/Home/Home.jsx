import React, { useEffect, useState } from "react";
import Header from "../Header";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Footer from "../Footer";
import axios from "axios";
import Cookies from "js-cookie";

function Home(){
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
        const cookieValue = Cookies.get("_auth");
        setAuthCookie(cookieValue);
    }, []);
    
    useEffect(() => {
        if (authCookie) {
            const config = {
                headers: {
                    Authorization: "Bearer " + authCookie
                }
            };
            axios
            .get("https://keeperapp-server.onrender.com/api/home", config)
            .then((res) => setNotes(res.data))
            .catch((error) => console.log(error));
        }
    }, [authCookie, []]);
    
    return (
    <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
            return (
                <Note
                    key={index}
                    id={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                />
            );
        })}
        <Footer color="#ccc"/>
    </div>
    )
}

export default Home;
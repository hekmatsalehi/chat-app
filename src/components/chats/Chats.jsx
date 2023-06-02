import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import "./chats.scss";
import { ChatContext } from "../../context/ChatContext";

function Chats() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(
                doc(db, "userChats", currentUser.uid),
                (doc) => {
                    setChats(doc.data());
                }
            );

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user });
    };

    const sortedChats = Object.entries(chats).sort((a , b) => b[1].date - a[1].date);

    return (
        <div className="chats">
            {sortedChats?.map((chat) => (
                <div
                    className="userChat"
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{truncateMessage(chat[1].lastMessage?.text)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function truncateMessage(message) {
    if(!message) {
        return "";
    }
    const words = message.split(" ");
    const truncatedWords = words.slice(0, 5);

    return truncatedWords.join(" ") + (words.length > 5 ? "..." : "");
}

export default Chats;

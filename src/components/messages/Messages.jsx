import { useContext, useEffect, useState } from "react";
import Message from "../message/Message";
import "./messages.scss";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, "chats", data.chatId), (doc) => {
              doc.exists() && setMessages(doc.data().messages);
            }
        );

        return () => {
            unsub();
        };
    }, [data.chatId]);

    console.log(messages)

    return (
        <div className="messages">
          {messages.map((message) => <Message key={message.id} message={message}/>)}
        </div>
    );
}

export default Messages;

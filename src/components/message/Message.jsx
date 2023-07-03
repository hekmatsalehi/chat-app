import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import "./message.scss";

function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const chatRef = useRef(null);

    console.log("--- message", message)

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    return (
        <div
            className={`message ${
                message.senderId === currentUser.uid && "owner"
            }`}
            ref={chatRef}
        >
            <div className="messageInfo">
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
}

export default Message;

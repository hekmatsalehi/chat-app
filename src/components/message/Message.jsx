import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { convertEpochToTime } from "../../utils/convertEpochToTime";
import { convertEpochToDate } from "../../utils/convertEpochToDate";
import "./message.scss";

function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const chatRef = useRef(null);

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
            </div>
            <div className="messageContainer">
                <div className="messageContent">
                    <p>{message.text}</p>
                    <div className="dateTime">
                        <span>{convertEpochToTime (message.date.seconds)}</span>
                        <span>{convertEpochToDate (message.date.seconds)}</span>
                    </div>
                </div>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
}

export default Message;

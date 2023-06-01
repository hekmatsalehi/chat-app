import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import "./message.scss";

function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    return (
        <div className="message owner">
            {/* <div className="messageInfo">
                <img
                    src="https://images.unsplash.com/photo-1661261656149-879b82aaad59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                <img
                    src="https://images.unsplash.com/photo-1678644897769-8eeaa24b1980?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
            </div> */}
        </div>
    );
}

export default Message;

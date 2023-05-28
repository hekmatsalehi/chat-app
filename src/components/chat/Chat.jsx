import { IoMdVideocam, IoMdPersonAdd } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import Messages from "../messages/Messages";
import Input from "../input/Input"
import "./chat.scss";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

function Chat() {

    const { data } = useContext(ChatContext);

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <IoMdVideocam className="icon" />
                    <IoMdPersonAdd className="icon" />
                    <BsThreeDots className="icon" />
                </div>
            </div>

            <Messages />
            <Input/>
        </div>
    );
}

export default Chat;

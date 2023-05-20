import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./chats.scss";
import { AuthContext } from "../../context/AuthContext";

function Chats() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);

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

        currentUser.uid && getChats()
        
    }, [currentUser.uid]);

    console.log(Object.entries(chats));

    return (
        <div className="chats">
            <div className="userChat">
                <img
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Tom</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Tom</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Tom</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    );
}

export default Chats;

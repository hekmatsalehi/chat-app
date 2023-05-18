import { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import "./search.scss";

function Search() {
    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("displayName", "==", username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            setError(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const response = await getDoc(doc(db, "chats", combinedId));

            if(!response.exists()) {
                await setDoc(doc(db, "chats", combinedId), {
                    messages: []
                });

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL        
                    },
                    [combinedId+".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL        
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
            }
        } catch (error) {
            console.log(error)
        }

        setUser(null);
        setUserName("")
    };

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                />
            </div>
            {error && <span>user not found</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;

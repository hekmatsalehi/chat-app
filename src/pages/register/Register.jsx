import { BsImageFill } from "react-icons/bs";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import "./register.scss";

function Register() {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
            const storageRef = ref(storage, displayName); // displayName is as a fileName

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;

                        default:
                            console.log(snapshot.state);
                            break;
                    }
                },
                (error) => {
                    setError(error.message);
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            await updateProfile(response.user, {
                                displayName,
                                photoURL: downloadURL,
                            });

                            await setDoc(doc(db, "users", response.user.uid), {
                                uid: response.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                            });

                            await setDoc(doc(db, "userChats", response.user.uid), {}) // Create user chats, at the begining it would be empty
                            navigate("/")
                          }
                    );
                }
            );
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Sky Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <label htmlFor="file">
                        <BsImageFill className="avatar" />
                        Add an avatar
                    </label>
                    <input style={{ display: "none" }} type="file" id="file" />
                    {error && <span className="errorMsg">{error}</span>}
                    <button>Sign up</button>
                </form>
                <p>Do you have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;

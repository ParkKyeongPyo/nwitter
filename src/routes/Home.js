import { useState } from "react";
import { dbService } from "fbase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

function Home() {
  const [nweet, setnweet] = useState("");

  const onChange = (e) => {
    setnweet(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "nweet"), {
        nweet,
        createAt: Date.now(),
      });  
      console.log("Document written with ID: ", docRef.id);
      setnweet("");
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  


  return (
    <div>
      <div>Home</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          placeholder="Write in your mind!"
          maxLength="120"
          onChange={onChange}
        />
        <input type="submit" value="nweet" />
      </form>
    </div>
  );
}

export default Home;

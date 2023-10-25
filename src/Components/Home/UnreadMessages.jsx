import { useDispatch, useSelector } from "react-redux";
import MessageCard from "../MessageCard";
import { setEmailMessages, setLoading } from "../../../store/Slice";
import { useEffect } from "react";

export default function UnreadMessages() {
  const dispatch = useDispatch();
  const { emailMessages, readMessage, loading } = useSelector(
    (data) => data.emailSlice,
  );

  async function fetchMessages() {
    setLoading(true);
    const data = await fetch("https://flipkart-email-mock.now.sh");
    const { list } = await data.json();
    dispatch(setEmailMessages(list));
    setLoading(false);
  }
  useEffect(() => {
    if (emailMessages.length > 0) return;
    fetchMessages();
  }, []);



  return (
    <section className={`email-section messages ${readMessage && "shrink"}`}>
      {emailMessages.length > 0 && !loading ? (
        emailMessages.map((msg, index) => {
          return <MessageCard key={index} msg={msg} />;
        })
      ) : (
        <div
          style={{
            margin: "5px auto",
            width: "fit-content",
            fontSize: "1.8rem",
            fontWeight: "500",
          }}
        >
          Fetching Messages...
        </div>
      )}
    </section>
  );
}


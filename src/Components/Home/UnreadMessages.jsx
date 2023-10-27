import { useDispatch, useSelector } from "react-redux";
import MessageCard from "../MessageCard";
import { setEmailLoading, setEmailMessages, setLoading } from "../../../store/Slice";
import { useEffect } from "react";
import Spinner from "../Spinner";

export default function UnreadMessages() {
  const dispatch = useDispatch();
  const { emailMessages, readMessage, emailLoading } = useSelector(
    (data) => data.emailSlice,
  );

  async function fetchMessages() {
    dispatch(setEmailLoading(true))
    const data = await fetch("https://flipkart-email-mock.now.sh");
    const { list } = await data.json();
    dispatch(setEmailMessages(list));
    dispatch(setEmailLoading(false))
  }
  useEffect(() => {
    if (emailMessages.length > 0) return;
    fetchMessages();
  }, []);



  return (
    <section className={`email-section messages ${readMessage && "shrink"}`}>
      {emailMessages.length > 0 && !emailLoading ? (
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
          <Spinner />
        </div>
      )}
    </section>
  );
}


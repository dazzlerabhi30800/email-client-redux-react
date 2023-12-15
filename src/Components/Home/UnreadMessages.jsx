import { useDispatch, useSelector } from "react-redux";
import MessageCard from "../MessageCard";
import { fetchEmailMessages } from "../../../store/Slice";
import { useEffect } from "react";
import Spinner from "../Spinner";

export default function UnreadMessages() {
  const dispatch = useDispatch();
  const { emailMessages, readMessage, emailLoading } = useSelector(
    (data) => data.emailSlice,
  );

  useEffect(() => {
    return () => dispatch(fetchEmailMessages());
  }, [dispatch]);

  if (!emailMessages) return false;
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

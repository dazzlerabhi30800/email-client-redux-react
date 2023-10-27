import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFavorite, setLoading, setReadMessage } from "../../store/Slice";
import DOMPurify from "dompurify";
import { localTime } from "../utils/FuncUtils";
import Spinner from "./Spinner";

export default function MessageBody() {
  const { readMessage, emailMessages, loading } = useSelector((data) => data.emailSlice);
  const dispatch = useDispatch();

  async function fetchReadItem() {
    dispatch(setLoading(true));
    const data = await fetch(
      `https://flipkart-email-mock.now.sh/?id=${readMessage.id}`,
    );
    const response = await data.json();
    if (!response) return;
    setTimeout(() => {
      dispatch(setReadMessage({ ...readMessage, body: response.body }));
      dispatch(setLoading(false));
    }, 1000)
  }

  useEffect(() => {
    if (readMessage.id) {
      fetchReadItem();
    }
  }, [emailMessages]);





  return (
    <section className="email-section message-body">
      <div className="profile-image message-img">F</div>
      <div className="message-info-wrapper">
        <div className="message-info-container">
          <div className="message-info">
            <h1>{readMessage?.from.name}</h1>
            <p className="message-time">{localTime(readMessage?.date)}</p>
          </div>
          <button
            onClick={() => dispatch(handleFavorite(readMessage?.id))}
            className="btn favorite-btn"
          >
            {readMessage.favorite ? "Marked as Favorite" : "Mark as Favorite"}
          </button>
        </div>
        {readMessage?.body ? (
          <div
            className="message-desc"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(readMessage?.body),
            }}
          ></div>
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
}

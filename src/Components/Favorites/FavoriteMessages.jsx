import { useSelector } from "react-redux";
import MessageCard from "../MessageCard";

export default function FavoriteMessages() {
  const { favoriteMessages, readMessage } = useSelector(
    (data) => data.emailSlice,
  );

  console.log(favoriteMessages);

  return (
    <section className={`email-section messages ${readMessage && "shrink"}`}>
      {favoriteMessages.length > 0 ? (
        favoriteMessages.map((msg, item) => {
          return <MessageCard msg={msg} key={item} />;
        })
      ) : (
        <p style={{ width: "fit-content", margin: "0 auto" }}>
          There are no Favorite Messages
        </p>
      )}
    </section>
  );
}

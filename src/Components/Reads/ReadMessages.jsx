import { useSelector } from "react-redux";
import MessageCard from "../MessageCard";

export default function ReadMessages() {
    const { readMessages, readMessage } = useSelector(data => data.emailSlice);





    return (
        <section className={`email-section messages ${readMessage && "shrink"}`}>
            {readMessages.length > 0 ?
                (
                    readMessages.map((msg, item) => {
                        return (
                            <MessageCard msg={msg} key={item} />
                        )
                    })
                )
                :
                (
                    <p style={{ width: "fit-content", margin: "0 auto" }}>There are no Readed Messages</p>
                )
            }
        </section>
    )
}
import { useDispatch, useSelector } from "react-redux";
import MessageCard from "../MessageCard";
import { setEmailMessages } from "../../../store/Slice";
import { useEffect } from "react";

export default function UnreadMessages() {

    const dispatch = useDispatch();
    const { emailMessages, readMessage } = useSelector(data => data.emailSlice);

    async function fetchMessages() {
        const data = await fetch("https://flipkart-email-mock.now.sh");
        const { list } = await data.json();
        dispatch(setEmailMessages(list));
        console.log("this function ran one time");
    }
    useEffect(() => {
        if(emailMessages.length > 0) return;
        fetchMessages();
    }, [])



    return (
        <section className={`email-section messages ${readMessage && "shrink"}`}>
            {emailMessages &&
                emailMessages.map((msg, index) => {
                    return (
                        <MessageCard key={index} msg={msg} />
                    )
                })
            }
        </section>
    )
}
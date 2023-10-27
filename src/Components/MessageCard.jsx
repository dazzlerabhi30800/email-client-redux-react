import { useDispatch, useSelector } from "react-redux"
import { handleRead } from "../../store/Slice";
import { localTime } from "../utils/FuncUtils";

export default function MessageCard({ msg }) {
    const dispatch = useDispatch();
    const { loading } = useSelector(data => data.emailSlice);
    return (
        <div className={`message ${msg?.read && "active"} ${msg?.current && "current"}`} onClick={() => !loading && dispatch(handleRead(msg.id))}>
            <div className="profile-image">F</div>
            <div className="email-info">
                <p>From: <span>{msg?.from.name} {"<"}{msg.from.email}{">"} </span></p>
                <p>Subject: <span>{msg?.subject}</span></p>
                <p className="description">{msg?.short_description.substring(0, 40)}...</p>
                <div className="time">
                    <p>{localTime(msg?.date)}</p>
                    {msg?.favorite &&
                        <small className="favorite">Favorite</small>
                    }
                </div>
            </div>
        </div>
    )
}
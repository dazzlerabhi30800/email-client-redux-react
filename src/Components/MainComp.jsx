
import { Route, Routes, useSearchParams } from 'react-router-dom';
import UnreadMessages from './Home/UnreadMessages';
import ReadMessages from './Reads/ReadMessages';
import FavoriteMessages from './Favorites/FavoriteMessages';
import { useSelector } from 'react-redux';
import MessageBody from './MessageBody';



export default function MainComp() {
    const { readMessage } = useSelector(data => data.emailSlice);
    return (
        <main>
            <Routes>
                <Route exact path="/" element={<UnreadMessages />} />
                <Route exact path="/reads" element={<ReadMessages />} />
                <Route exact path="/favorites" element={<FavoriteMessages />} />
            </Routes>
            {readMessage &&
                <MessageBody />
            }
        </main>
    )
}
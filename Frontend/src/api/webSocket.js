import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const useWebSocketComponent = ({ url, message })  => {
    const [history, setHistory] = useState([]);
    const { sendMessage, lastMessage } = useWebSocket(url);

    useEffect(() => {
        if (lastMessage !== null) {
            setHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage]);

    useEffect(() => {
        sendMessage(message);
    }, [message]);

    return { history };
}

export default useWebSocketComponent;

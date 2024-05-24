import { Button, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';
import { Timer, Time, TimerOptions } from 'timer-node';
import timer from '../../utils/timer';
import { useContext, useEffect, useRef, useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import useWebSocket from 'react-use-websocket';
import { AuthContext } from '../../context/AuthContext';


function CommentOthers({ comment }) {
    const time = timer(comment)
    const [showChat, setShowChat] = useState(false);

    const [postedComment, setPostedComment] = useState("")
    const { sendMessage, lastMessage } = useWebSocket("ws://localhost:8080/api/v1/websocket-comment");
    const {user} = useContext(AuthContext)

    const handleTextChange = (e) => {
        setPostedComment(e.target.value)
    }

    const handleClickSendComment = () => {
        const message = {
            user: {
                id: user?.userId,
                name: user?.name,
                email: user?.email
            },
            repliedUserID: comment?.user.id,
            filmID: comment.filmID,
            content: postedComment,
            replyCommentID: comment?.id, 
            action: "reply"
        }
        sendMessage(JSON.stringify(message))
    }

    const boxRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setShowChat(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <Box
            sx={{
                display: "flex",
                marginTop: "1rem",
                marginRight: "auto",
                flexDirection: "column",
                width: "100%",
            }}
            ref={boxRef}
        >
            <Box
                sx={{
                    display: "flex",
                    marginTop: "1rem",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "auto",
                }}
            >
                <Avatar
                    sx={{ bgcolor: "black", marginRight: "1rem" }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                >
                    B
                </Avatar>
                <Box>
                    <Typography>{comment?.user?.name}</Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: "bold",
                            fontStyle: "italic",
                        }}
                    >
                        {comment?.content}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                        gap={2}
                    >
                        {time} ago
                        <ReplyIcon 
                            onClick={() => setShowChat(!showChat)} 
                            sx={{
                                ":hover": {
                                    cursor: "pointer",
                                },
                            }}
                        />
                    </Typography>
                </Box>
            </Box>

            {(showChat && user) && (
                <Box
                    sx={{
                        display: "flex",
                        marginTop: "1rem",
                        marginLeft: "2rem",
                    }}
                >
                    <Avatar
                        sx={{ bgcolor: "black", marginRight: "1rem", marginTop: "1rem" }}
                        alt="Remy Sharp"
                        src="/broken-image.jpg"
                    >
                        B
                    </Avatar>
                    <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Write a comment..."
                        sx={{ width: "100%", mt: 2 }}
                        onChange={handleTextChange}                        
                    />
                    <Button onClick={handleClickSendComment}>Bình luận</Button>
                </Box>
            )}
        </Box>
    );
}

export default CommentOthers;

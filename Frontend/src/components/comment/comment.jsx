import { Typography, TextField, List, ListItem, Button, Collapse, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import CommentOthers from "./commentOthers";
import { useContext, useEffect, useState } from "react";
import { getComments } from "../../api/getComments";
import useWebSocket, { ReadyState } from "react-use-websocket";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import StarBorder from '@mui/icons-material/StarBorder';
import { AuthContext } from "../../context/AuthContext";

function renderComment(comment, index) {
    return (
        <ListItem key={index}>
            <CommentOthers comment={comment} />
        </ListItem>
    );
}

function Comment({ filmID }) {

    const [postedComment, setPostedComment] = useState("")
    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8080/api/v1/websocket-comment", { share: true });
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const [comments, setComments] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getComments(filmID, 0, 5)
            .then((value) => {
                setComments(value || [])
            })
            .catch((error) => {
                console.error(error)
            })
    }, [filmID])

    useEffect(() => {
        if (lastMessage !== null) {
            setComments((prev) => prev.concat([JSON.parse(lastMessage.data)]))
        }
    }, [lastMessage])

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
            filmID,
            content: postedComment,
            action: "add"
        }
        sendMessage(JSON.stringify(message))
        setPostedComment("")
    }

    return (
        <Box
            sx={{
                marginTop: "3rem",
                alignSelf: "flex-start",
                width: "100%",
                height: "50rem",
            }}
        >
            <Typography
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <InsertCommentIcon />
                Comment
            </Typography>
            <Typography
                sx={{
                    fontWeight: "bold",
                }}
            >
                {comments.length} Comment
            </Typography>
            <Divider />
            <Box
                sx={{
                    display: "flex",
                    marginTop: "1rem",
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
                    value={postedComment}
                    onChange={handleTextChange}
                    disabled={readyState !== ReadyState.OPEN || !user}
                />
                <Button onClick={handleClickSendComment} disabled={!user}>Bình luận</Button>
            </Box>
            <Box
                sx={{
                    maxHeight: "60%", // Adjust this value to change the maximum height of the list
                    overflow: "auto",
                }}
            >
                <List>
                    {comments.map((comment, index) => {

                        if (comment.repliedComments && comment.repliedComments.length > 0) {
                            return (
                                <ListItem key={index}>
                                    <List>
                                        <ListItem
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                padding: "1rem",
                                                marginTop: "1rem",
                                            }}
                                        >
                                            {renderComment(comment, index)}
                                            <Box
                                                sx={{
                                                    marginLeft: "2rem",
                                                    maxHeight: "50rem",
                                                    overflow: "auto",
                                                }}
                                            >
                                                {comment.repliedComments.map((reply, index) => {
                                                    return renderComment(reply, index);
                                                })}
                                            </Box>
                                        </ListItem>
                                    </List>
                                </ListItem>
                            );
                        } else {
                            return renderComment(comment, index);
                        }
                    })}
                </List>
            </Box>
        </Box>
    );
}

export default Comment;

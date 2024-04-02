import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import BuildIcon from "@mui/icons-material/Build";

const examples = [
  "Suggest beautiful places to see on an upcoming road trip",
  "What's the reaction to and impact of autonomous vehicles",
  "Come up with a recipe for an upcoming event",
  "Evaluate and rank common camera categories",
];

const Dashboard = () => {
  const [chat, setChat] = useState([]);
  const [title, setTitle] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      setChat([...chat, { role: "user", content: input }]);
      setInput("");
      try {
        const response = await axios.post(`/api/v1/openai/chat`, {
          messages: [...chat, { role: "user", content: input }],
        });

        const aiResponse = response.data.data;
        setChat([
          ...chat,
          { role: "user", content: input },
          { role: "assistant", content: aiResponse },
        ]);

        if (!title) {
          const createTitle = await axios.post("/api/v1/openai/title", {
            title: input,
          });

          const newTitle = createTitle.data.data;
          setTitle(newTitle);
          setChatHistory([...chatHistory, { title: newTitle }]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#050509" }}>
      <Box sx={{ width: "20%", bgcolor: "#0c0c15", color: "white", p: 2 }}>
        <Box sx={{ height: "5%" }}>
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            sx={{ height: 50, borderRadius: 1 }}
            onClick={() => {
              setChat([]);
              setTitle("");
            }}
          >
            <AddIcon sx={{ mr: 1 }} /> New Chat
          </Button>
        </Box>
        <Box
          sx={{ height: "70%", overflowY: "auto", mt: 2, mb: 1, boxShadow: 1 }}
        >
          <List>
            {chatHistory.map((item, index) => (
              <ListItem
                key={index}
                button
                sx={{
                  py: 1,
                  textAlign: "center",
                  mt: 1,
                  borderRadius: 1,
                  bgcolor: "#1a1a1a",
                  "&:hover": { bgcolor: "#2b2b2b" },
                }}
              >
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider sx={{ borderColor: "white" }} />
        <Box sx={{ height: "20%", overflowY: "auto", mt: 1 }}>
          <List>
            <Button
              color="inherit"
              fullWidth
              sx={{ height: 50 }}
              onClick={() => {}}
            >
              <BuildIcon sx={{ mr: 1 }} /> Tools
            </Button>
          </List>
        </Box>
      </Box>
      <Box sx={{ width: "80%" }}>
        {chat.length > 0 ? (
          <Box sx={{ height: "80%", overflowY: "auto", pt: 4 }}>
            {chat.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: "60%",
                  mx: "auto",
                  p: 2,
                  color: "white",
                  display: "flex",
                  bgcolor:
                    item.role === "assistant" ? "#1a1a1a" : "transparent",
                  borderRadius: item.role === "assistant" ? 1 : 0,
                }}
              >
                <IconButton
                  sx={{
                    mr: 2,
                    bgcolor: "#595959",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  {item.role === "user" ? <PersonIcon /> : <SmartToyIcon />}
                </IconButton>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {item.content}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <Typography variant="h4" fontWeight="bold" mb={4}>
              Code-Craft
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: 900,
              }}
            >
              {examples.map((item, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  fontWeight="light"
                  mt={2}
                  p={2}
                  border={1}
                  borderRadius={1}
                  sx={{
                    cursor: "pointer",
                    minWidth: 400,
                    "&:hover": { bgcolor: "#1a1a1a" },
                  }}
                  onClick={() => setInput(item)}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
        <Box sx={{ height: "20%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "white",
            }}
          >
            <Box
              sx={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <TextField
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                variant="outlined"
                sx={{ bgcolor: "#595959", borderRadius: 1, pr: 6 }}
                InputProps={{
                  style: { color: "white" },
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
            <Typography variant="caption" color="textSecondary" mt={1}>
              AI can generate incorrect information.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

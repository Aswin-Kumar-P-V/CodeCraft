import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme, 
  useMediaQuery,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    axios.get(`/api/v1/record/history/${userEmail}`).then(response => {
      setHistory(response.data);
      console.log(response.data);
    });
    
    axios.get(`/api/v1/record/favorites/${userEmail}`).then(response => {
      setFavorites(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Box
      width={isNotMobile ? "70%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show History" : "Show Favorites"}
      </Button>

      <Card>
        <CardContent>
          {showFavorites ? (
            <>
              <Typography variant="h4" align="center">Favorites</Typography>
              <List>
                {favorites.map((item, index) => (
                  <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
                    <ListItem>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle1" style={{ whiteSpace: 'pre-wrap' }}><b>User:</b> {item.Userprompt}</Typography>
                        <Typography variant="subtitle2" style={{ whiteSpace: 'pre-wrap' }}><b>CodeCraft:</b> {item.GeneratedResult}</Typography>
                      </ListItemText>
                    </ListItem>
                  </Card>
                ))}
              </List>
            </>
          ) : (
            <>
              <Typography variant="h4" align="center">History</Typography>
              <List>
                {history.map((item, index) => (
                  <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
                    <ListItem>
                      <ListItemIcon>
                        <MessageIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle1" style={{ whiteSpace: 'pre-wrap' }}><b>User:</b> {item.Userprompt}</Typography>
                        <Typography variant="subtitle2" style={{ whiteSpace: 'pre-wrap' }}><b>CodeCraft: </b>{item.GeneratedResult}</Typography>
                      </ListItemText>
                    </ListItem>
                  </Card>
                ))}
              </List>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
    </Box>
  );
}

export default Dashboard;
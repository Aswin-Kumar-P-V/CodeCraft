import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Card, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Login from "./Login";


const Commenter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  //fields
  const [text, settext] = useState("");
  const [comment, setcomment] = useState("");
  const [error, setError] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const loggedInEmail = localStorage.getItem("userEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      data = await axios.post('/api/v1/openai/commenter', {
        text
      });
      console.log(data.message);
      setcomment(data.data.data);
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    const userPrompt = text +"\n" + "After Adding Comments : ";
    try {
      await axios.post('/api/v1/record/save-record', {
        Userprompt: userPrompt,
        GeneratedResult: data.data.data,
        userEmail: loggedInEmail
      });
      console.log('Record saved!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(comment);
    toast.success('Copied to clipboard');
  };

  return (
    <>
    {loggedIn ? (<Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Add Comments</Typography>
        <TextField
          label="enter the code to add comments to"
          multiline
          type="text"
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Submit
        </Button>
        <Typography mt={2}>
          not this tool ? <Link to="/tools">Go Back</Link>
        </Typography>
      </form>
      {comment ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
            position: 'relative', // Add this to position the IconButton absolutely within the Card
          }}
        >
          <Typography p={2} sx={{ whiteSpace: "pre-line" }}>
            {comment}
          </Typography>
          <IconButton 
            aria-label="copy to clipboard" 
            onClick={handleCopy}
            sx={{ position: 'absolute', top: 8, right: 8 }} // Position the button at the top right corner of the Card
          >
            <FileCopyIcon />
          </IconButton>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "450px",
            }}
          >
            Code With Comments Will Appear Here
          </Typography>
        </Card>
      )}
    </Box> ) :( < Login />)}
    </>
    
  );
};

export default Commenter;

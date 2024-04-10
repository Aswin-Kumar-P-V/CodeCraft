import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Login from "./Login";
import axios from "axios";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Card, IconButton, Select, MenuItem } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Code from "@mui/icons-material/Code";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Generator = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, settext] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const loggedInEmail = localStorage.getItem("userEmail");
  const [recordId, setRecordId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const languages = ["JavaScript", "Python", "Java", "C#", "C++", "PHP", "Swift", "Go", "Kotlin", "Ruby", "TypeScript", "Rust", "Scala", "Perl", "Lua"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      const response = await axios.post('/api/v1/openai/prompt', {
        text,
        language
      });
      data = response.data;
      console.log(data.message);
      setCode(data.data);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  
    const userPrompt = text + " In the language " + language;
  
    try {
      const response = await axios.post('/api/v1/record/save-record', {
        Userprompt: userPrompt,
        GeneratedResult: data.data,
        userEmail: loggedInEmail
      });
      console.log('Record saved! ID:', response.data.id);
      setRecordId(response.data.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard');
  };

  const handleHeartClick = async () => {
    console.log('Heart button clicked');
    console.log('Record ID:', recordId);
  
    try {
      const response = await axios.put(`/api/v1/record/update-record/${recordId}`, {
        isFavorite: !isFavorite,
      });
  
      if (response.status === 200) {
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update favorite status');
    }
  };

  return (
    <>
    {loggedIn ? (<Box
      width={isNotMobile ? "70%" : "80%"}
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
        <Typography variant="h3">Prompt To Code</Typography>
        <TextField
          label="enter the prompt to generate the code"
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
        <Select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
          fullWidth
          sx={{ mt: 2 }}
        >
          {languages.map((lang) => (
            <MenuItem value={lang} key={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Submit
        </Button>
      </form>
      {code ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
            position: 'relative',
          }}
        >
          <Typography p={2} sx={{ whiteSpace: "pre-line" }}>
            {code}
          </Typography>
          <IconButton 
            aria-label="copy to clipboard" 
            onClick={handleCopy}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <FileCopyIcon />
          </IconButton>
          <IconButton 
            aria-label="heart" 
            onClick={handleHeartClick}
            sx={{ position: 'absolute', top: 8, right: 48 }}
          >
            <FavoriteIcon color={isFavorite ? 'error' : 'action'} />
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
            Code Will Appear Here
          </Typography>
        </Card>
      )}
    </Box>) : (<Login />)}
    </>
    
  );
};

export default Generator;
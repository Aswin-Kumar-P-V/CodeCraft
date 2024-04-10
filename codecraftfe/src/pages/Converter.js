import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Card, IconButton, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Code from "@mui/icons-material/Code";
import Login from "./Login";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Converter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  //fields
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState(""); 
  const [convertedCode, setConvertedCode] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  // Add this state variable for the selected language
  const [recordId, setRecordId] = useState(null); // Add this state variable
  const [isFavorite, setIsFavorite] = useState(false); // Add this state variable

  const languages = ["JavaScript", "Python", "Java", "C#", "C++", "PHP", "Swift", "Go", "Kotlin", "Ruby", "TypeScript", "Rust", "Scala", "Perl", "Lua"]; // Add this array of languages

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      const response = await axios.post('/api/v1/openai/converter', {
        code,
        language // Include the selected language in the request body
      });
      console.log(response.message);
      data = response.data; // Save the response data to a variable
      setConvertedCode(data.data); // Set the converted code here
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
    const loggedInEmail = localStorage.getItem("userEmail");
  
    const userPrompt = code + " convert to " +  language;
    const response = await axios.post('/api/v1/record/save-record', {
      Userprompt: userPrompt,
      GeneratedResult: data.data,
      userEmail: loggedInEmail
    });
    console.log('Record saved! ID:', response.data.id);
    setRecordId(response.data.id); // Save the record ID here
    // ...
  };
  
  // Update the handleCopy function to copy the convertedCode
  const handleCopy = () => {
    navigator.clipboard.writeText(convertedCode);
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
      width={isNotMobile ? "50%" : "80%"}
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
        <Typography variant="h3">Code Converter</Typography>
        <TextField
          label="Enter Your Code Here"
          multiline
          type="textarea"
          required
          margin="normal"
          fullWidth
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <FormControl fullWidth>
  <InputLabel id="language-label">Language</InputLabel>
  <Select
    labelId="language-label"
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
</FormControl>
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
      <Typography mt={2}>
          not this tool ? <Link to="/tools">Go Back</Link>
        </Typography>
      {convertedCode ? (
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
      {convertedCode}
    </Typography>
    <IconButton 
      aria-label="copy to clipboard" 
      onClick={handleCopy}
      sx={{ position: 'absolute', top: 8, right: 8 }} // Position the button at the top right corner of the Card
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
    </Box>) : ( <Login /> ) }
    
    </>
  );
};

export default Converter;
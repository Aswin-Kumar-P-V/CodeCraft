import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Card, IconButton } from  "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Login from "./Login";
import FavoriteIcon from '@mui/icons-material/Favorite';


const Refactor = () => {
  const theme = useTheme();
  
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  //fields
  const [text, settext] = useState("");
  const [refactor, setrefactor] = useState("");
  const [error, setError] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const loggedInEmail = localStorage.getItem("userEmail");
  const [recordId, setRecordId] = useState(null); // Add useState for recordId
  const [isFavorite, setIsFavorite] = useState(false); // Add useState for isFavorite


  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      data= await axios.post(`/api/v1/openai/refactor` , {
        text
      });
      console.log(data.message);
      setrefactor(data.data.data);
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
    const userPrompt = text + "\n After Refactoring : ";
    try {
      const response = await axios.post('/api/v1/record/save-record', {
        Userprompt: userPrompt,
        GeneratedResult: data.data.data,
        userEmail: loggedInEmail
      });
      console.log('Record saved! ID:', response.data.id);
      setRecordId(response.data.id);
    } catch (err) {
      console.error(err);
    }
    console.log(recordId);
  };

  const handleCopy = () => {
    if (refactor) {
      navigator.clipboard.writeText(refactor);
      toast.success("Copied to clipboard");
    }
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
        <Typography variant="h3">Refactor-Code</Typography>
        <TextField
          label="Refactor the code"
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
      {refactor ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
            position: 'relative', // Add this line
          }}
        >
          <Typography p={2} sx={{ whiteSpace: "pre-line" }}> 
            {refactor}
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
            Code will Display Here
          </Typography>
        </Card>
      )}
    </Box>):(<Login/>)}
    </>
    
  );
};

export default Refactor;
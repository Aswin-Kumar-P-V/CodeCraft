import React from "react";
import { Box, Typography, Card, Stack, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";
import Generator from "./Generator";

const Tools = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={7}>
      <Card sx={{ p: 0, mt: 5, mb: 5, marginLeft: '30px', border: '1px solid black', boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
          <Generator />
        </Card>
      </Grid>
      <Grid item xs={5}>
        <Card sx={{ p: 2, mt: 2, mb: 2,marginRight:"30px", border: '1px solid black', boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
          <Typography variant="h4" mb={2} fontWeight="bold">
            Tools
          </Typography>
          <table>
            <tr>
              <td>
                <Box p={2}>
                  <Typography variant="h4" mb={2} fontWeight="bold">
                    Code Converter
                  </Typography>
                  {
                    <Card
                      onClick={() => navigate("/code")}
                      sx={{
                        boxShadow: 2,
                        borderRadius: 5,
                        height: 190,
                        width: 200,
                        "&:hover": {
                          border: 2,
                          boxShadow: 0,
                          borderColor: "primary.dark",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <DescriptionRounded
                        sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
                      />
                      <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">
                          Code Convertion
                        </Typography>
                        <Typography variant="h6">
                          Convert The Code Into Another Language
                        </Typography>
                      </Stack>
                    </Card>
                  }
                </Box>
              </td>
              <td>
                <Box p={2}>
                  <Typography variant="h4" mb={2} fontWeight="bold">
                    Code Optimizer
                  </Typography>
                  {
                    <Card
                      onClick={() => navigate("/optimization")}
                      sx={{
                        boxShadow: 2,
                        borderRadius: 5,
                        height: 190,
                        width: 200,
                        "&:hover": {
                          border: 2,
                          boxShadow: 0,
                          borderColor: "primary.dark",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <FormatAlignLeftOutlined
                        sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
                      />
                      <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">
                          Optimizer
                        </Typography>
                        <Typography variant="h6">
                          Generates Optimzed Code
                        </Typography>
                      </Stack>
                    </Card>
                  }
                </Box>
              </td>
            </tr>
            <tr>
              <td>
                <Box p={2}>
                  <Typography variant="h4" mb={2} fontWeight="bold">
                    Commenter
                  </Typography>
                  {
                    <Card
                      onClick={() => navigate("/commenter")}
                      sx={{
                        boxShadow: 2,
                        borderRadius: 5,
                        height: 190,
                        width: 200,
                        "&:hover": {
                          border: 2,
                          boxShadow: 0,
                          borderColor: "primary.dark",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <ChatRounded
                        sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
                      />
                      <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">
                          Add Comments
                        </Typography>
                        <Typography variant="h6">Adds Meaningful Comments To Your Code</Typography>
                      </Stack>
                    </Card>
                  }
                </Box>
              </td>
              <td>
                <Box p={2}>
                  <Typography variant="h4" mb={2} fontWeight="bold">
                    Code Explanation
                  </Typography>
                  {
                    <Card
                      onClick={() => navigate("/explanation")}
                      sx={{
                        boxShadow: 2,
                        borderRadius: 5,
                        height: 190,
                        width: 200,
                        "&:hover": {
                          border: 2,
                          boxShadow: 0,
                          borderColor: "primary.dark",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <ChatRounded
                        sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
                      />
                      <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">
                          Explanation
                        </Typography>
                        <Typography variant="h6">
                          Gives an explanation to the code
                        </Typography>
                      </Stack>
                    </Card>
                  }
                </Box>
              </td>
            </tr>
            <tr>
              <td>
                <Box p={2}>
                  <Typography variant="h4" mb={2} fontWeight="bold">
                    Code Refactor
                  </Typography>
                  {
                    <Card
                      onClick={() => navigate("/refactor")}
                      sx={{
                        boxShadow: 2,
                        borderRadius: 5,
                        height: 190,
                        width: 200,
                        "&:hover": {
                          border: 2,
                          boxShadow: 0,
                          borderColor: "primary.dark",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <ChatRounded
                        sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
                      />
                      <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">
                          Code Refactor
                        </Typography>
                        <Typography variant="h6">Refactors Code Without Changing It's Behaviour</Typography>
                      </Stack>
                    </Card>
                  }
                </Box>
              </td>
              <td>
                <Box p={2}>
                  <Typography variant="h4" mb={2} fontWeight="bold">
                    Fix Bugs
                  </Typography>
                  {
                    <Card
                      onClick={() => navigate("/bugfix")}
                      sx={{
                        boxShadow: 2,
                        borderRadius: 5,
                        height: 190,
                        width: 200,
                        "&:hover": {
                          border: 2,
                          boxShadow: 0,
                          borderColor: "primary.dark",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <ChatRounded
                        sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
                      />
                      <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">
                          Fix Bugs
                        </Typography>
                        <Typography variant="h6">Fixes Bugs In Your Code</Typography>
                      </Stack>
                    </Card>
                  }
                </Box>
              </td>
            </tr>
          </table>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Tools;
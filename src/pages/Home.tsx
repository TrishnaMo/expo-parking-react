import React, { useState } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [lotsCount, setLotsCount] = useState<string>("");

  const navigateToParkingLots = () => {
    const tempLots = parseInt(lotsCount);
    if (isNaN(tempLots) || tempLots <= 0) {
      alert("Please enter valid number");
    } else {
      history.push(`/parking-lots/${tempLots}`);
    }
  };

  return (
    <Container
      component="main"
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xs"
        style={{
          border: "1px solid #ccc",
          padding: 30,
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Enter number of lots"
          onChange={(e) => setLotsCount(e.target.value)}
          value={lotsCount}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          style={{
            padding: 12,
            marginTop: 30,
          }}
          onClick={navigateToParkingLots}
          disabled={lotsCount.length === 0}
        >
          Submit
        </Button>
      </Container>
    </Container>
  );
};

export default Home;

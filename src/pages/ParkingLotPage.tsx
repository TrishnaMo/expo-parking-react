import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button } from "@material-ui/core";
import { ParkingSlot } from "../types";
import ParkingArea from "../components/ParkingArea";
import moment from "moment";

const ParkingLotPage = () => {
  const { lotSize } = useParams<{ lotSize: string }>();
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [regdNo, setRegdNo] = useState<string>("");

  const createSlot = (id: number): ParkingSlot => {
    return {
      id: id,
      isAvailable: true,
    };
  };

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  useEffect(() => {
    const lotSizeInNum = parseInt(lotSize);
    const parkingSlots = [...Array(lotSizeInNum)].map((_, index) => {
      return createSlot(index + 1);
    });

    setSlots(parkingSlots);
    console.log("Size", parkingSlots.length);
  }, []);

  const parkVehicle = () => {
    const availableSlots = slots.filter((slot) => slot.isAvailable);
    if (availableSlots.length === 0) {
      alert("Parking full");
    } else {
      const randomNumber = getRandomNumber(0, availableSlots.length);
      const randomSlot = availableSlots[randomNumber];

      const bookedSlot: ParkingSlot = {
        ...randomSlot,
        registrationNumber: regdNo,
        isAvailable: false,
        startTime: moment(),
      };

      const slotsWithBookedSlot = slots.map((slot) =>
        slot.id === bookedSlot.id ? bookedSlot : slot
      );
      setSlots(slotsWithBookedSlot);
    }
  };

  const releaseSlot = (slot: ParkingSlot) => {
    const releasedSlot: ParkingSlot = {
      ...slot,
      registrationNumber: null,
      isAvailable: true,
      startTime: null
    };

    const slotsWithReleasedSlot = slots.map((slot) =>
      slot.id === releasedSlot.id ? releasedSlot : slot
    );
    setSlots(slotsWithReleasedSlot);
  }

  return (
    <Container
      style={{
        height: "100vh",
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
          placeholder="Enter vehicle registration number"
          onChange={(e) => setRegdNo(e.target.value)}
          value={regdNo}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          style={{
            padding: 12,
            marginTop: 30,
          }}
          onClick={parkVehicle}
          disabled={regdNo.length === 0}
        >
          Park Vehicle
        </Button>
      </Container>

      <ParkingArea slots={slots} releaseSlot={releaseSlot}/>
    </Container>
  );
};

export default ParkingLotPage;

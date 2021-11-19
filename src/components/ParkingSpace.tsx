import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
} from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { ParkingSlot } from "../types";

type Props = {
  slot: ParkingSlot;
  releaseSlot: (slot: ParkingSlot) => void;
};

const ParkingSpace: React.FC<Props> = ({ slot, releaseSlot }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { id, registrationNumber, startTime, isAvailable } = slot;

  const handleClose = () => {
    setShowConfirmationModal(false);
  };

  const getParkingDuration = (slot: ParkingSlot) => {
    if (!slot.startTime) {
      return 0;
    }
    const hours = moment.duration(moment().diff(slot.startTime)).asHours();

    return Math.ceil(hours);
  };

  const getCharges = (slot: ParkingSlot) => {
    if (!slot.startTime) {
      return 0;
    }

    const parkingDuration = getParkingDuration(slot);
    const hoursAboveTwoHours = parkingDuration > 2 ? parkingDuration - 2 : 0;
    const basePrice = 10;
    const charges = basePrice + hoursAboveTwoHours * basePrice;

    return charges;
  };
  return (
    <>
      <Box
        style={{
          width: 220,
          margin: 30,
          textAlign: "center",
          backgroundColor: `${
            slot.isAvailable ? "rgba(0, 255, 0, 0.4)" : "rgba(255, 0, 0, 0.4)"
          }`,
        }}
        key={slot.id}
      >
        <>
          <p style={{ fontWeight: "bold" }}>
            {isAvailable ? "Free" : "This lot is allocated"}
          </p>
          <p>Slot ID : {id}</p>
          {registrationNumber && <p>Regd Number: {registrationNumber}</p>}
          {!isAvailable && (
            <Button
              color="primary"
              variant="contained"
              style={{
                marginBottom: 10,
              }}
              onClick={() => setShowConfirmationModal(true)}
            >
              Release
            </Button>
          )}
        </>
      </Box>
      <Dialog onClose={handleClose} open={showConfirmationModal}>
        <DialogContent>
          <Typography>{`Slot ID: ${id}`}</Typography>
          <Typography>{`Start time: ${startTime?.format(
            "DD-MMM-YYYY, hh:mm A"
          )}`}</Typography>
          <Typography>{`End time: ${moment().format(
            "DD-MMM-YYYY, hh:mm A"
          )}`}</Typography>
          <Typography>{`Charges: $${getCharges(slot)}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{ backgroundColor: "#FF0000", color: "#fff" }}
            data-testid="submit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              releaseSlot(slot);
              setShowConfirmationModal(false);
            }}
            variant="contained"
            style={{ backgroundColor: "#FF0000", color: "#fff" }}
            data-testid="submit"
          >
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ParkingSpace;

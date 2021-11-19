import { Container } from "@material-ui/core";
import React from 'react';
import { ParkingSlot } from '../types';
import ParkingSpace from "./ParkingSpace";

type Props = {
    slots: ParkingSlot[]
    releaseSlot: (slot: ParkingSlot) => void
}

const ParkingArea: React.FC<Props> = ({slots, releaseSlot}) => {
    return (
        <Container
        maxWidth="md"
        style={{
          border: "1px solid #ccc",
          marginTop: 30,
          padding: 30,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {slots.map(slot => <ParkingSpace slot={slot} releaseSlot={releaseSlot}/>)}
      </Container>
    )
}

export default ParkingArea

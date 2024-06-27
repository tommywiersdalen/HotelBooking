import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RoomHistory } from "../utils/HotelRoom";
import { Divider, Paper } from "@mui/material";

const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};
interface HistoryModalProps {
	roomHistory: RoomHistory | null;
}

export default function HistoryModal(props: HistoryModalProps) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>View History</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}>
				<Fade in={open}>
					<Box sx={style}>
						<Typography
							id="transition-modal-title"
							variant="h6"
							component="h2">
							{props.roomHistory ? "Room History" : "No History"}
						</Typography>
						<Typography
							id="transition-modal-description"
							sx={{ mt: 2, marginBottom: 1 }}>
							Usage precentage: {props.roomHistory?.UsagePrecentage}
						</Typography>
						<Divider />
						<Typography
							id="transition-modal-description"
							sx={{ mt: 2 }}>
							Incidents:
						</Typography>
						{props.roomHistory?.incidents.map((incident) => {
							return (
								<Paper
									key={incident.id}
									sx={{ padding: 2, marginBottom: 1 }}>
									<Typography>
										<p>Date: {incident.date.toDateString()}</p>
										<p>Type: {incident.type}</p>
										<p>Description: {incident.description}</p>
										<p>Guest: {incident.guest}</p>
										<p>Status: {incident.status}</p>
									</Typography>
								</Paper>
							);
						})}
						<Divider />
						<Typography
							id="transition-modal-description"
							sx={{ mt: 2 }}>
							Previous bookings:
						</Typography>
						{props.roomHistory?.HistoryBookings.map((booking) => {
							return (
								<Paper
									key={booking.id}
									sx={{ padding: 2, marginBottom: 1 }}>
									<Typography>
										<p>From: {booking.fromDate.toDateString()}</p>
										<p>To: {booking.toDate.toDateString()}</p>
									</Typography>
								</Paper>
							);
						})}
						<Divider />
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

import { Box, Button, Card, CardActions, CardMedia } from "@mui/material";
import { HotelRoom } from "../utils/HotelRoom";
import HistoryModal from "./HistoryModal";
import BookingDialog from "./BookingDialog";
import { Dayjs } from "dayjs";

interface RoomBookingCardProps {
	room: HotelRoom | null;
	fromDate: Dayjs | null;
	toDate: Dayjs | null;
	handleRoomBooking: () => void;
	handleChangeFromDate: (date: Dayjs) => void;
	handleChangeToDate: (date: Dayjs) => void;
	cancelBooking: (roomId: string, bookingId: string) => void;
}

export default function RoomBookingCard(props: RoomBookingCardProps) {
	return (
		<Box
			sx={{
				minWidth: 120,
				maxWidth: 1 / 2,
				display: "flex",
				flexGrow: 1,
				marginTop: 4,
			}}>
			<Card sx={{ width: 1, padding: 2 }}>
				{props.room ? (
					<>
						<CardMedia
							component="img"
							alt={props.room.description}
							height="240"
							image={props.room.image}
						/>
						<div style={{ paddingLeft: "14px" }}>
							<h2>Room {props.room.roomNumber}</h2>
							<p>{props.room.roomType} Bed</p>
							<p>{props.room.price}$ per night</p>
							{props.room.bookings[0] ? (
								<>
									<p>
										Booked from {props.room.bookings[0].fromDate.toDateString()}
									</p>
									<p>
										Booked to {props.room.bookings[0].toDate.toDateString()}
									</p>
								</>
							) : (
								<p>Room is available</p>
							)}
						</div>

						<CardActions>
							{props.room.bookings[0] ? (
								<>
									<Button>Extend Booking</Button>
									<Button
										onClick={() =>
											props.room &&
											props.cancelBooking(
												props.room.id,
												props.room.bookings[0].id
											)
										}>
										Cancel Booking
									</Button>
								</>
							) : (
								<BookingDialog
									room={props.room}
									fromDate={props.fromDate}
									toDate={props.toDate}
									handleChangeFromDate={props.handleChangeFromDate}
									handleChangeToDate={props.handleChangeToDate}
									handleRoomBooking={props.handleRoomBooking}
								/>
							)}
							<HistoryModal roomHistory={props.room.history} />
						</CardActions>
					</>
				) : (
					<h2>Please select a room</h2>
				)}
			</Card>
		</Box>
	);
}

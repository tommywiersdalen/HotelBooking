import { Alert, Container, SelectChangeEvent } from "@mui/material";
import TheAppBar from "./TheAppBar";
import RoomSelect from "./RoomSelect";
import RoomBookingCard from "./RoomBookingCard";
import { useState } from "react";
import { hotelRooms } from "../utils/HotelRoom";
import { HotelRoom } from "../utils/HotelRoom";
import dayjs, { Dayjs } from "dayjs";

export default function Layout() {
	const rooms = hotelRooms;
	const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs());
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs());
	const handleRoomSelect = (event: SelectChangeEvent) => {
		const roomId = event.target.value;
		const selectedRoom = rooms.find((room) => room.id === roomId);
		setSelectedRoom(selectedRoom || null);
	};
	const [showAlert, setShowAlert] = useState(false);
	const handleAlertClose = () => {
		setShowAlert(false);
	};
	const handleChangeFromDate = (date: Dayjs) => {
		setFromDate(date);
	};
	const handleChangeToDate = (date: Dayjs) => {
		setToDate(date);
	};
	const handleRoomBooking = () => {
		if (selectedRoom) {
			selectedRoom.bookings.push({
				id: (selectedRoom.bookings.length + 1).toString(),
				fromDate: fromDate ? fromDate.toDate() : new Date(), // Convert Dayjs to Date
				toDate: toDate ? toDate.toDate() : new Date(), // Convert Dayjs to Date
			});
			setSelectedRoom({ ...selectedRoom });
			setShowAlert(true);
		}
	};

	const cancelBooking = (roomId: string, bookingId: string) => {
		const room = rooms.find((room) => room.id === roomId);
		if (room) {
			room.bookings = room.bookings.filter(
				(booking) => booking.id !== bookingId
			);
			setSelectedRoom({ ...room });
			setShowAlert(true);
		}
	};

	return (
		<>
			{showAlert && selectedRoom?.bookings[0] && (
				<Alert
					severity="success"
					onClose={handleAlertClose}>
					Booking successful
				</Alert>
			)}
			{showAlert && !selectedRoom?.bookings[0] && (
				<Alert
					severity="warning"
					onClose={handleAlertClose}>
					Booking canceled
				</Alert>
			)}
			<TheAppBar />
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: 4,
				}}
				disableGutters
				maxWidth="xl">
				<h1>Room Booking</h1>

				<RoomSelect
					selectedRoom={selectedRoom}
					rooms={rooms}
					onRoomSelect={handleRoomSelect}
				/>
				<RoomBookingCard
					room={selectedRoom}
					fromDate={fromDate}
					toDate={toDate}
					handleChangeFromDate={handleChangeFromDate}
					handleChangeToDate={handleChangeToDate}
					handleRoomBooking={handleRoomBooking}
					cancelBooking={cancelBooking}
				/>
			</Container>
		</>
	);
}

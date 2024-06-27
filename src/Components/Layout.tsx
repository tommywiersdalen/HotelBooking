import { Container, SelectChangeEvent } from "@mui/material";
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
		}
	};

	const cancelBooking = (roomId: string, bookingId: string) => {
		const room = rooms.find((room) => room.id === roomId);
		if (room) {
			room.bookings = room.bookings.filter(
				(booking) => booking.id !== bookingId
			);
			setSelectedRoom({ ...room });
		}
	};

	return (
		<>
			<TheAppBar />
			<Container
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

import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";

import { hotelRooms } from "../utils/HotelRoom";
import { HotelRoom } from "../utils/HotelRoom";

interface RoomSelectProps {
	rooms: HotelRoom[];
	selectedRoom: HotelRoom | null;
	onRoomSelect: (event: SelectChangeEvent) => void;
}

export default function RoomSelect(props: RoomSelectProps) {
	return (
		<Box sx={{ minWidth: 120, maxWidth: 1 / 2, display: "flex", flexGrow: 1 }}>
			<FormControl fullWidth>
				<InputLabel htmlFor="room-select">Room</InputLabel>
				<Select
					sx={{ minWidth: 220 }}
					labelId="room-select-label"
					id="room-select"
					label="Room"
					value={props.selectedRoom ? props.selectedRoom.id : ""}
					onChange={props.onRoomSelect}>
					{hotelRooms.map((room: HotelRoom) => {
						return (
							<MenuItem
								key={room.id}
								value={room.id}>
								{"Room" +
									" " +
									room.roomNumber +
									" " +
									room.roomType +
									" " +
									"$" +
									room.price}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
}

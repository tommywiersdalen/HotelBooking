import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	useMediaQuery,
	useTheme,
	Container,
} from "@mui/material";
import React from "react";
import { HotelRoom } from "../utils/HotelRoom";
import { DatePicker } from "@mui/x-date-pickers";
import AddBoxIcon from "@mui/icons-material/AddBox";
import dayjs, { Dayjs } from "dayjs";

interface BookingDialogProps {
	room: HotelRoom | null;
	fromDate: Dayjs | null;
	toDate: Dayjs | null;
	handleChangeFromDate: (date: Dayjs) => void;
	handleChangeToDate: (date: Dayjs) => void;
	handleRoomBooking: () => void;
}

export default function BookingDialog(props: BookingDialogProps) {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Button
				variant="contained"
				onClick={handleClickOpen}>
				<AddBoxIcon />
				Book Room {props.room?.roomNumber}
			</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title">
				<DialogTitle id="responsive-dialog-title">
					{"Use Google's location service?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Select the dates you want to book the room for.
					</DialogContentText>
					<Container sx={{ display: "flex", gap: 2, marginTop: 2 }}>
						<DatePicker
							label="From Date"
							value={dayjs(props.fromDate)}
							minDate={dayjs()}
							onChange={(date: Dayjs | null) => {
								if (date) {
									return props.handleChangeFromDate(date);
								}
							}}
						/>
						<DatePicker
							label="To Date"
							value={dayjs(props.toDate)}
							minDate={dayjs(props.fromDate)}
							onChange={(date: Dayjs | null) => {
								if (date) {
									return props.handleChangeToDate(date);
								}
							}}
						/>
					</Container>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={handleClose}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							props.handleRoomBooking();
							handleClose();
						}}
						autoFocus>
						Book
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

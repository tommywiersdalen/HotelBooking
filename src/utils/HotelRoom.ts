export interface HotelRoom {
	id: string;
	roomType: string;
	roomNumber: number;
	price: number;
	description: string;
	image: string;
	bookings: Booking[];
	history: RoomHistory | null;
}

export interface Booking {
	id: string;
	fromDate: Date;
	toDate: Date;
}

export interface RoomHistory {
	id: string;
	incidents: Incident[];
	HistoryBookings: Booking[];
	UsagePrecentage: string;
}

export interface Incident {
	id: string;
	date: Date;
	type: string;
	description: string;
	guest: string;
	status: string;
}

export const hotelRooms: HotelRoom[] = [
	{
		id: '1',
		roomType: "Single",
		roomNumber: 101,
		price: 100,
		description: "Single bed",
		image:
			"/public/img/single.jpg",
		history: {
			id: '1',
			incidents: [
				{
					id: '1',
					date: new Date("2021-10-01"),
					type: "Complaint",
					description: "Noisy neighbours",
					guest: "John Doe",
					status: "Resolved",
				},
			],
			HistoryBookings: [
				{
					id: '1',
					fromDate: new Date("2021-11-01"),
					toDate: new Date("2021-11-03"),
				},
			],
			UsagePrecentage: "50%",
		},
		bookings: [],
	},
	{
		id: '2',
		roomType: "Double",
		roomNumber: 201,
		price: 150,
		description: "Double bed",
		image:
			"/public/img/double.avif",
		bookings: [],
		history: {
			id: '1',
			incidents: [
				{
					id: '1',
					date: new Date("2021-10-01"),
					type: "Damage",
					description: "Broken TV",
					guest: "John Doe",
					status: "Resolved",
				},
				{
					id: '2',
					date: new Date("2021-10-02"),
					type: "Complaint",
					description: "Noisy neighbours",
					guest: "Jane Doe",
					status: "Resolved",
				},

			],
			HistoryBookings: [
				{
					id: '1',
					fromDate: new Date("2021-11-01"),
					toDate: new Date("2021-11-03"),
				},
			],
			UsagePrecentage: "70%",
		},
	},
];

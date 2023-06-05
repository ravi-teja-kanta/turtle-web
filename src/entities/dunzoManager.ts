import { Address, LatLong, UserDetails } from "@/app/checkout/page";
import axios from "axios";
import { User } from "./userRepo";
import {v4 as uuid} from "uuid";

const DUNZO_CLIENT_ID = "fe73ca36-02ae-47c5-94c1-d6ba5909ffc4";
const DUNZO_CLIENT_SECRET = "86841c7d-3210-4d18-b6aa-035bb8b5c78d";

export async function getQuoteFromDunzo(latLong: LatLong) {
    try {
        return await axios.post("/api/quote",
        {
            "pickup_details": [
                {
                    "lat": 12.927923,
                    "lng": 77.627106,
                    "reference_id": "pickup-ref"
                } 
            ],
            "drop_details": [{
                "lat": latLong.geoLat,
                "lng": latLong.geoLong,
                "reference_id": "ref35"
            }]
        })
    } catch(e) {
        throw Error("Dunzo get quote failed");
    }
}

export async function createTask(orderId: string, user: User) {
	try {
		console.log(user)
		return await axios.post("/api/createTask", {
				request_id: orderId.split("-")[0],
				payment_method: "DUNZO_CREDIT",
				pickup_details: [
					{
						address: {
							street_address_1: "Villa 05, Wonder Cherish Villas",
							street_address_2: "Masjid Banda, Kondapur, Telangana 500084",
							lat: 17.462945136742796,
							lng: 78.3409437605288,
							contact_details: {
								name: "Mayabazaar Restaurant",
								phone_number: "7093793540"
							}
						},
						reference_id: "05888f90-71de-4824-b99a-b4360dc77c49"
					}
				],
				drop_details: [
					{
						address: {
							street_address_1: user.address.line1,
							street_address_2: user.address.line2,
							lat: 17.462210 || user.address.latLong.geoLat, // 17.462210 || 
							lng: 78.356850 || user.address.latLong.geoLong, // 78.356850 ||
							city: user.address.city,
							pincode: user.address.pincode,
							contact_details: {
								name: user.name,
								phone_number: user.phoneNumber
							}
						},
						reference_id: uuid() 
						
					}
				] 
		})
	} catch(e) {
		console.log(e)
		throw Error("Couldnt create Dunzo task")
	}
    
}

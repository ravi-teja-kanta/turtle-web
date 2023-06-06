import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const DUNZO_CLIENT_ID = "3c3c82cd-5602-4d79-8943-5a5c2c0db4da" || "fe73ca36-02ae-47c5-94c1-d6ba5909ffc4";
const DUNZO_CLIENT_SECRET = "801181c3-f959-11ed-ba8f-3a405b85d06d"||"86841c7d-3210-4d18-b6aa-035bb8b5c78d";

const dunzoLink = "api.dunzo.in" || "apis-staging.dunzo.in"

let token: string = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleV9pZF8xIiwidHlwIjoiSldUIiwidmVyc2lvbiI6IjEifQ.eyJ0eXBlIjoiIiwicmVzb3VyY2VzIjpudWxsLCJ1c2VyX2lkIjowLCJ1c2VyX3V1aWQiOiI4ZDM5MzJhNS1mYWVhLTRjYWQtYmExNS1kMGJlZWU4YmFmZjQiLCJ1c2VyX3R5cGUiOiJEIiwiZnVsbF9uYW1lIjoiIiwic2Vzc2lvbl9pZCI6IiIsIm1ldGEiOnsiaXNfYXBpX3VzZXIiOnRydWUsInVzZXJuYW1lIjoiM2MzYzgyY2QtNTYwMi00ZDc5LTg5NDMtNWE1YzJjMGRiNGRhIn0sImlzcyI6ImR1bnpvLWF1dGgtc3ZjIiwic3ViIjoiMCIsImV4cCI6MTg0MzgyNzc0MywiaWF0IjoxNjg2MDI3NzQzLCJqdGkiOiI1YWI5MjA1OC0wZDAxLTQ2ZWMtODU4NS0xYjMyZjRhNGRhZDEifQ.I6eke3R1AhebKTMGWl2s5jCX9HAupme2eLsDF5K4M3iU8h2LSDlhVq5jv5pp3phAozxXWIceSe5VLGQ1T6d4rw"|| "eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleV9pZF8xIiwidHlwIjoiSldUIiwidmVyc2lvbiI6IjEifQ.eyJ0eXBlIjoiIiwicmVzb3VyY2VzIjpudWxsLCJ1c2VyX2lkIjowLCJ1c2VyX3V1aWQiOiIzNWFmYjQwNS1iY2Y0LTQ3NzAtOGJiZS1kZWI1MGQzYTI0M2UiLCJ1c2VyX3R5cGUiOiJEIiwiZnVsbF9uYW1lIjoiIiwic2Vzc2lvbl9pZCI6IiIsIm1ldGEiOnsiaXNfYXBpX3VzZXIiOnRydWUsInVzZXJuYW1lIjoiZmU3M2NhMzYtMDJhZS00N2M1LTk0YzEtZDZiYTU5MDlmZmM0In0sImlzcyI6ImR1bnpvLWF1dGgtc3ZjIiwic3ViIjoiMCIsImV4cCI6MTg0MzE1OTQ1NCwiaWF0IjoxNjg1MzU5NDU0LCJqdGkiOiI3NjNmOWY0MS0xNjQ4LTQzYzMtYmVlOS1mMTJiNDc3ODMxYmYifQ.rJW7ov2FqMTNZ0CYJDhQRsczHQxKYOu9XCtJaRHCwSXeeQ5t4PwCeVVbt03X3DE6eLer_g3GTf_ty0IqAs6PJQ"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = `https://${dunzoLink}/api/v2/quote`;
    const headers = {
      'client-id': DUNZO_CLIENT_ID,
      'client-secret': DUNZO_CLIENT_SECRET,
      'Accept-Language': 'en_US',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Authorization': token,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body),
    });

	if (response.status === 401) {
		token = await getToken();
		await handler(req, res);
	} else {
		const data = await response.json();
		// console.log(data);
		res.status(200).json(data);
	}
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

async function getToken(): Promise<string> {
	try {
	  const url = 'https://apis-staging.dunzo.in/api/v1/token';
	  const headers = {
		'client-id': DUNZO_CLIENT_ID,
		'client-secret': DUNZO_CLIENT_SECRET,
		'Accept-Language': 'en_US',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
	  };
  
	  const response = await fetch(url, {
		method: 'GET',
		headers,
	  });
	  const data = await response.json(); 
	  return data.token;
	  
	} catch (error) {
	  console.error(error);
	  throw Error("asdasd")
	}
  }
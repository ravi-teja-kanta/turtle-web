import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
let token: string = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleV9pZF8xIiwidHlwIjoiSldUIiwidmVyc2lvbiI6IjEifQ.eyJ0eXBlIjoiIiwicmVzb3VyY2VzIjpudWxsLCJ1c2VyX2lkIjowLCJ1c2VyX3V1aWQiOiIzNWFmYjQwNS1iY2Y0LTQ3NzAtOGJiZS1kZWI1MGQzYTI0M2UiLCJ1c2VyX3R5cGUiOiJEIiwiZnVsbF9uYW1lIjoiIiwic2Vzc2lvbl9pZCI6IiIsIm1ldGEiOnsiaXNfYXBpX3VzZXIiOnRydWUsInVzZXJuYW1lIjoiZmU3M2NhMzYtMDJhZS00N2M1LTk0YzEtZDZiYTU5MDlmZmM0In0sImlzcyI6ImR1bnpvLWF1dGgtc3ZjIiwic3ViIjoiMCIsImV4cCI6MTg0MzE1OTQ1NCwiaWF0IjoxNjg1MzU5NDU0LCJqdGkiOiI3NjNmOWY0MS0xNjQ4LTQzYzMtYmVlOS1mMTJiNDc3ODMxYmYifQ.rJW7ov2FqMTNZ0CYJDhQRsczHQxKYOu9XCtJaRHCwSXeeQ5t4PwCeVVbt03X3DE6eLer_g3GTf_ty0IqAs6PJQ"; 
const DUNZO_CLIENT_ID = "fe73ca36-02ae-47c5-94c1-d6ba5909ffc4";
const DUNZO_CLIENT_SECRET = "86841c7d-3210-4d18-b6aa-035bb8b5c78d";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = 'https://apis-staging.dunzo.in/api/v2/tasks';
    const headers = {
      'client-id': DUNZO_CLIENT_ID,
      'client-secret': DUNZO_CLIENT_SECRET,
      'Authorization': token,
      'Accept-Language': 'en_US',
      'Content-Type': 'application/json',
    };
    console.log(req.body)
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
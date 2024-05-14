import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("https://swapi.dev/api/people/");
    const characters = response.data.results;
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching characters" });
  }
}

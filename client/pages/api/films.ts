import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("https://swapi.dev/api/films/");
    const films = response.data.results;
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: "Error fetching films" });
  }
}

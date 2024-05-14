import axios from "axios";

const fetchFilmDetails = async (id: number) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/films/${id}/`);

    const filmDetails = response.data;

    return filmDetails;
  } catch (error) {
    console.error("Error fetching film details:", error);
    throw new Error("Failed to fetch film details");
  }
};

export default fetchFilmDetails;

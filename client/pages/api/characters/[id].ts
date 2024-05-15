import axios from "axios";

const fetchCharactersDetails = async (id: number) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);

    const charDetails = response.data;

    return charDetails;
  } catch (error) {
    console.error("Error fetching characters details:", error);
    throw new Error("Failed to fetch character details");
  }
};

export default fetchCharactersDetails;

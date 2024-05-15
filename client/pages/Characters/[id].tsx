import { GetServerSideProps } from "next";
import axios from "axios";
import CardDetailCharacter from "@/components/CardDetailCharacter";
import BackButton from "@/components/BackButton";

interface Character {
  name: string;
  eye_color: string;
  birth_year: string;
  hair_color: string;
  height: string;
  skin_color: string;
  mass: string;
}

interface CharacterDetailProps {
  character: Character;
}

const CharacterDetailPage = ({ character }: CharacterDetailProps) => {
  return (
    <div className="w-full h-full min-h-[100vh] bg-char-wars bg-cover bg-no-repeat bg-center backdrop-blur-sm">
      <div className="w-full h-full min-h-[100vh] backdrop-blur-xs p-4 flex justify-center">
        <BackButton textColor="white" destination="/Characters" />
        <CardDetailCharacter character={character} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const characterId = params?.id;
    const response = await axios.get(
      `https://swapi.dev/api/people/${characterId}/`
    );
    const character: Character = response.data;

    return {
      props: {
        character,
      },
    };
  } catch (error) {
    console.error("Error fetching character:", error);
    return {
      notFound: true,
    };
  }
};

export default CharacterDetailPage;

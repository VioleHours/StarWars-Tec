import { GetServerSideProps } from "next";
import axios from "axios";
import CardDetailFilm, { Film } from "@/components/CardDetailFilms";

interface FilmDetailProps {
  film: Film;
}

export default function FilmDetail({ film }: FilmDetailProps) {
  return (
    <div className="w-full h-full min-h-[100vh] bg-films-wars bg-cover bg-no-repeat bg-center backdrop-blur-sm">
      <div className="w-full h-full min-h-[100vh] backdrop-blur-xs p-4 flex justify-center">
        <CardDetailFilm
          film={film}
          character={{
            name: "",
            url: "",
          }}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const filmId = params?.id as string;
    const response = await axios.get(`https://swapi.dev/api/films/${filmId}/`);
    const film: Film = response.data;

    return {
      props: {
        film,
      },
    };
  } catch (error) {
    console.error("Error fetching film details:", error);
    return {
      notFound: true,
    };
  }
};

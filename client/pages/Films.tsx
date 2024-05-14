import axios from "axios";
import { GetStaticProps } from "next";
import CardFilms from "../components/CardFilms";

interface Film {
  title: string;
  episode_id: number;
}

interface FilmsProps {
  films: Film[];
}

export default function Films({ films }: FilmsProps) {
  const sortedFilms = films.sort((a, b) => a.episode_id - b.episode_id);

  return (
    <div className="w-full h-full min-h-[100vh] bg-films-wars bg-cover bg-no-repeat bg-center backdrop-blur-sm">
      <div className="w-full h-full min-h-[100vh] backdrop-blur-xs p-4">
        <h1 className="flex justify-center items-center p-4 text-2xl">Films</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedFilms.map((film) => (
            <CardFilms key={film.episode_id} film={film} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("http://localhost:3000/api/films");
  const films = response.data;

  return {
    props: {
      films,
    },
  };
};

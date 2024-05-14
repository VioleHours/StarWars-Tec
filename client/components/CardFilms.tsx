import Link from "next/link";

interface Film {
  title: string;
  episode_id: number;
}

interface CardFilmsProps {
  film: Film;
}

const CardFilms: React.FC<CardFilmsProps> = ({ film }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-blue-gradient text-black">
      <img src="/img/GenericFilm.jpg" alt="Generic Film" />
      <h2 className="text-lg font-semibold">{film.title}</h2>
      <p className="text-sm">Episode: {film.episode_id}</p>
      <Link href={`/films/${film.episode_id}`}>
        <p className="text-blue-500 hover:underline">View Details</p>
      </Link>
    </div>
  );
};

export default CardFilms;

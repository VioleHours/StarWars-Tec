import Image from "next/image";
import Link from "next/link";

interface Film {
  title: string;
  episode_id: number;
}

interface CardFilmsProps {
  film: Film;
}

const episodeIdMapping: Record<number, number> = {
  1: 4,
  2: 5,
  3: 6,
  4: 1,
  5: 2,
  6: 3,
};

const CardFilms: React.FC<CardFilmsProps> = ({ film }) => {
  const episodeNumber = episodeIdMapping[film.episode_id];
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-blue-gradient text-black">
      <Image
        src="/img/GenericFilm.jpg"
        alt="Generic Film"
        width={500}
        height={300}
      />
      <h2 className="text-lg font-semibold">{film.title}</h2>
      <p className="text-sm">Episode: {film.episode_id}</p>
      <Link href={`/Films/${episodeNumber}`}>
        <p className="text-blue-500 hover:underline">View Details</p>
      </Link>
    </div>
  );
};

export default CardFilms;

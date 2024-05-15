import Link from "next/link";
import { useRouter } from "next/router";

interface BackButtonProps {
  textColor: string;
  destination: string;
}

const BackButton: React.FC<BackButtonProps> = ({ textColor, destination }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(destination);
  };

  return (
    <button
      className={`absolute top-4 left-4 text-${textColor} bg-transparent border border-${textColor} rounded-md px-4 py-2`}
      onClick={handleClick}
    >
      Back
    </button>
  );
};

export default BackButton;

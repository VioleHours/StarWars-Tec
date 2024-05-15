import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  imgFilter: string;
  title: string;
  gradientFrom?: string;
  gradientTo?: string;
  color: string
}

export default function Button({
  href,
  imgSrc,
  imgAlt,
  imgFilter,
  title,
  gradientFrom,
  gradientTo,
  color
}: ButtonProps) {
  return (
    <button className="border-white relative w-[15rem]">
      <Link href={href}>
        <div style={{ filter: imgFilter }}>
          <Image src={imgSrc} alt={imgAlt} width={500} height={300} />
          <h3 className="font-bold text-2xl">
            <span
              className={`${color} bg-clip-text `}
            >
              {title}
            </span>
          </h3>
        </div>
      </Link>
    </button>
  );
}

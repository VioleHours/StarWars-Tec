import Link from "next/link";

interface ButtonProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  imgFilter: string;
  title: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function Button({
  href,
  imgSrc,
  imgAlt,
  imgFilter,
  title,
  gradientFrom,
  gradientTo,
}: ButtonProps) {
  return (
    <button className="border-white relative w-[15rem]">
      <Link href={href}>
        <div style={{ filter: imgFilter }}>
          <img src={imgSrc} alt={imgAlt} />
          <h3 className="font-bold text-2xl">
            <span
              className={`bg-gradient-to-r from-${gradientFrom} to-${gradientTo} bg-clip-text text-transparent`}
            >
              {title}
            </span>
          </h3>
        </div>
      </Link>
    </button>
  );
}

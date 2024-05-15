import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="w-full h-full min-h-[100vh] bg-star-wars bg-cover bg-no-repeat bg-center">
      <div className="w-full h-full min-h-[100vh] flex justify-between p-4">
        <div className="w-full flex items-center justify-evenly gap-8">
          <Button
            href="/Films"
            imgSrc="/img/Jedi_symbol.svg"
            imgAlt="Jedi Emblem"
            imgFilter="drop-shadow(0px 4px 4px rgba(255, 255, 255, 0.7))"
            title="FILMS"
            color="text-blue-500"
          />
          <Button
            href="/Characters"
            imgSrc="/img/Imperial_Emblem.svg"
            imgAlt="Imperial Emblem"
            imgFilter="drop-shadow(0px 4px 4px rgba(51, 51, 51, 0.7))"
            title="CHARACTERS"
            color="text-red-800"
          />
        </div>
      </div>
    </div>
  );
}

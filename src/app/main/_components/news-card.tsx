import Image from "next/image";

interface NewsCardProps {
  title: string;
  link: string;
}

function NewsCard({ title, link }: NewsCardProps) {
  const handleClick = () => {
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:shadow-md h-281 w-308 overflow-hidden rounded-lg bg-white text-left transition-shadow"
    >
      <div className="relative h-182 overflow-hidden pt-0">
        <Image
          src="/images/NEWs.jpg"
          alt={title}
          fill
          className="rounded-lg object-cover px-5"
          sizes="308px"
        />
      </div>
      <div className="p-6">
        <div className="group relative">
          <h3 className="mt-5 truncate text-16-600 text-gray-900">{title}</h3>
          <div className="shadow-lg absolute left-0 z-20 hidden max-w-308 rounded-md bg-white p-2 text-14-400 group-hover:block">
            {title}
          </div>
        </div>
      </div>
    </button>
  );
}

export default NewsCard;

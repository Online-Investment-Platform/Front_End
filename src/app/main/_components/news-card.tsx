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
      className="h-271 w-308 overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition-shadow hover:shadow-md"
    >
      <div className="relative h-182 overflow-hidden">
        <Image
          src="/images/news-placeholder.jpg" // public 폴더 내 기본 이미지
          alt={title}
          fill
          className="object-cover"
          sizes="308px"
        />
      </div>
      <div className="p-4">
        <div className="group relative">
          <h3 className="truncate text-14-400 text-gray-900">{title}</h3>
          <div className="absolute left-0 top-full z-20 hidden max-w-308 rounded-md bg-white p-2 text-14-400 shadow-lg group-hover:block">
            {title}
          </div>
        </div>
      </div>
    </button>
  );
}

export default NewsCard;

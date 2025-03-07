import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white p-4 shadow-md flex items-center">
      <div className="flex items-center">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="mr-4" />
        <h1 className="text-4xl font-bold">Mini Wiki Anime/Manga</h1>
      </div>
    </header>
  );
};

export default Header;

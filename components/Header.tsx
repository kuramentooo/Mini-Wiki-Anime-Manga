const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white p-4 shadow-md flex items-center">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="mr-4 w-12 h-12" />
        <h1 className="text-4xl font-bold">Mini Wiki Anime/Manga</h1>
      </div>
    </header>
  );
};

export default Header;

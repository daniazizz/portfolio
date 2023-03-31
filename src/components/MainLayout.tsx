const MainLayout = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 bg-green-400 h-screen w-screen">
      {Array.from(Array(9).keys()).map((el) => (
        <div className="bg-green-600 text-black text-4xl">{el + 1}</div>
      ))}
    </div>
  );
};

export default MainLayout;

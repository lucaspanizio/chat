import background from '@/assets/bg-messages.png';

export function Main() {
  return (
    <div
      className="relative bg-[#0c1317] bg-repeat text-[#d1d7db] min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute inset-0 bg-black opacity-85 pointer-events-none" />
      <h1 className="relative text-4xl font-bold">Main Page</h1>
    </div>
  );
}

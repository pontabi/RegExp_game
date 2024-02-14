import IconImg from "../assets/icon.png";
export default function Header() {
  return (
    <header className="">
      <img src={IconImg} alt="" className="w-64 mx-auto" />
      <h1 className="text-3xl font-bold text-center text-cyan-900 ">
        / RegEx /
      </h1>
    </header>
  );
}

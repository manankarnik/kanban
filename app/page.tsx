import Header from "./_components/Header";
import DarkModeToggle from "./_components/DarkModeToggle";
import Home from "./_components/Home";

function Page() {
  return (
    <Home>
      <Header>
        <DarkModeToggle />
      </Header>
    </Home>
  );
}

export default Page;

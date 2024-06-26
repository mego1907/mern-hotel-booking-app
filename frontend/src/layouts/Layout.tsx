import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface PropsTypes {
  children: React.ReactNode;
}

const Layout = ({ children }: PropsTypes) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container flex-1 py-10 mx-auto">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;

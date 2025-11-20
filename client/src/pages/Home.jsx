import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProductsPreview from "../components/ProductsPreview";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <HeroSection />
        <ProductsPreview />
      </main>
      <Footer />
    </div>
  );
}

export default Home;

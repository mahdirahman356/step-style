import Banner from "./Banner";
import NewProducts from "./NewProducts";
import Products from "./Products";
import WelcomeSection from "./WelcomeSection";

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <WelcomeSection></WelcomeSection>
           <NewProducts></NewProducts>
           <Products></Products>
        </div>
    );
};

export default Home;
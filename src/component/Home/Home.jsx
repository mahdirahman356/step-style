import Banner from "./Banner";
import NewProducts from "./NewProducts";
import WelcomeSection from "./WelcomeSection";

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <WelcomeSection></WelcomeSection>
           <NewProducts></NewProducts>
        </div>
    );
};

export default Home;
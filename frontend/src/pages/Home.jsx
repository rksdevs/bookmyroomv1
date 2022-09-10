import Header from "../components/Header";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Featured from "../components/Featured";
import PropertyList from "../components/PropertyList";
import FeaturedProperty from "../components/FeaturedProperty";
import MailList from "../components/MailList";
import Footer from "../components/footer/Footer";

const HomeContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const PropertyHeading = styled.h1`
  width: 1024px;
  font-size: 20px;
`;

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <HomeContainer>
        <Featured />
        <PropertyHeading>Browse by property type</PropertyHeading>
        <PropertyList />
        <PropertyHeading>Browse by property type</PropertyHeading>
        <FeaturedProperty />
        <MailList />
        <Footer />
      </HomeContainer>
    </div>
  );
};
export default Home;

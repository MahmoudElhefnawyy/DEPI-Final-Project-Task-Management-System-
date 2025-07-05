import Header from '../layouts/Header'
import Hero from '../components/Hero'
import Client from '../components/Client'
import Usage from '../components/Usage'
import Community from '../components/Community';
import Analysis from '../components/Analysis';
import Market from '../components/Market';
import Footer from '../layouts/Footer';
import ChatBot from '../components/ChatBot';
const Home = () => {
  return (
    <>
      <Header />
      <Hero/>
      <Client/>
      <Usage/>
      <Community/>
      <Analysis/>
      <Market/>
      <ChatBot/>
      <Footer/>
    </>
  );
};

export default Home;
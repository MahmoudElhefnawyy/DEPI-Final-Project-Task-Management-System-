
import NavBar from "../components/navBar";
import MainBody from "../components/mainBody";
import SideBar from "../components/sideBar";
const WorkSpace = () => {

  return (
    <div className="flex flex-col" style={{backgroundColor:'#f8f9fa',height:'100vh'}}>
      <NavBar />  
      <div className="flex row w-100">
          <SideBar/>
          <MainBody/>
      </div>
    </div>
  );
};

export default WorkSpace;
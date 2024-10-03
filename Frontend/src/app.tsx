import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/home-page'
import { Member } from './pages/member-page'
import { History } from './pages/history-page'
import { Awards } from './pages/awards-page'
import { Welcome } from './pages/information-welcome-page';
import { News } from './pages/information-news-page';
import { GuildStatus } from './pages/information-guildstatus-page';
import { Newmember } from './pages/information-newmember-page';
import { Recruitment } from './pages/information-recruitment-page';
import { Terms } from './pages/terms_of_services';
import { Contact } from './pages/contactus-page';
import { Navbar } from './components/navbar';
import IllidanImg from './assets/icon/illidan.jpg'
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';


export function App() {

  // function handleClickLoginButton() {
  //   setLoginButton(true)
  // }


  return (
    <Router>
      <div className="h-full w-full bg-cover bg-no-repeat" style={{backgroundImage: `url(${IllidanImg})`, opacity: '1.0'}}>
        <Navbar/>
        
        <div className="sm:w-[640px] md:w-[900px] lg:w-[1150px] w-[360px] h-screen bg-gradient-to-t from-black/80 to-black/45 justify-center mx-auto rounded-md overflow-y-auto border-2 border-slate-950 pb-[10rem]">
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>

            <Route path="/register" element={<RegisterPage />}>
            </Route>

            <Route path="/login" element={<LoginPage />}>
            </Route>

            <Route path="/members" element={<Member />}>
            </Route>

            <Route path="/history" element={<History/>}>
            </Route>

            <Route path="/awards" element={<Awards/>}>
            </Route>

            <Route path="/information/welcome" element={<Welcome />}>
            </Route>

            <Route path="/information/news" element={<News />}>
            </Route>

            <Route path="/information/status" element={<GuildStatus/>}>
            </Route>

            <Route path="/information/newmembers" element={<Newmember/>}>
            </Route>

            <Route path="/information/recruitment" element={<Recruitment/>}>
            </Route>

            <Route path="/terms_of_services" element={<Terms/>}>
            </Route>

            <Route path="/contactus" element={<Contact/>}>
            </Route>
          </Routes>
          </div>

        <footer className="flex text-slate-400 text-sm relative justify-center items-center">
          <Link to="/terms_of_services" className="p-3 hover:underline m-4">Terms of services</Link>
          <Link to="/contactus" className="p-3 m-4 hover:underline">Contact us</Link>
        </footer>
      </div>

    </Router>
    
  );
}

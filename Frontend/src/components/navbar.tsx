// import { FormsInvitational } from './components/formInvitational';
// import { FormsInvitational } from './components/formInvitational';
// import { Login } from './components/login';
// import { X } from 'lucide-react'
import { useState, useEffect } from 'react';
import horde from '../assets/icon/horde_icon.png';
import youtube from '../assets/icon/youtube-icon.png';
import twitch from '../assets/icon/png-transparent-logo-twitch-logos-brands-icon-thumbnail.png';
import discord from '../assets/icon/Discord-logo.png';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { UserResponse } from './types';
import { getUser } from '../api';


export function Navbar() {

  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserResponse>();
  const token = localStorage.getItem('token');


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsLogged(true);
    }
    }, []);


  
  useEffect(() => {
  
    const fetchUserData = async (token: string) => { 
      try {
        const response = await getUser(token); // Chama a função getUsers
        setUserData(response);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (token) {
      fetchUserData(token); // Garante que fetchUserData é chamada
    }
  }, [token]);


  function handleClickNavButton(content: string) {
    setClickedButton((prevClickedButton) => (prevClickedButton === content ? prevClickedButton : content));
  }

    return(
        <div className="xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[768px] sm:max-w-[640px] max-w-[480px] items-center justify-center mx-auto space-y-3">
          <div className="xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[768px] sm:max-w-[480px] mx-auto flex items-center justify-center text-[#df0000] font-bold lg:text-4xl md:text-3xl sm:text-2xl text-1xl p-3 rounded-lg bg-[url('./assets/textures/linum-textura-vinho.jpg')] bg-cover bg-no-repeat ">
            <span className="mr-4 xl:size-12 lg:size-12 md:size-9 size-6"><img src={horde} alt="Imagem da Horda" /></span>
              <Link to="/" className="mr-4 shadow-lg">Guild - Death Chases Yoou</Link>
            <span className="xl:size-12 lg:size-12 md:size-9 sm:size-6 size-6"><img src={horde} alt="Imagem da Horda" /></span>
            {/* <button onClick={() => handleClickLoginButton()} className='flex text-lg justify-end bg-gray-300 text-slate-600 rounded-md px-2 py-1 font-semibold hover:scale-[1.04] hover:bg-white'>Login</button> */}
          </div>
          
          
          <div className='flex justify-center items-center xl:max-w-[900px] lg:max-w-[768px] md:max-w-[640px] sm:max-w-[480px] max-w-[480px] '>
            <div className="bg-[url('./assets/textures/linum-textura-vinho.jpg')] bg-cover bg-no-repeat rounded-full p-4 mx-auto md:text-2xl text-1xl text-gray-400 grid  grid-cols-4 xl:auto-rows-[44px] jg:auto-rows-[40px] md:auto-rows-[36px] sm:auto-rows-[28px] auto-rows-[20px] gap-2 group">

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <div className="inline-flex items-center md:gap-1 gap-0 hover:text-slate-300">
                    <Link to="/information" onClick={() => handleClickNavButton('Information')} className={`hover:cursor-pointer hover:outline-none hover:text-slate-300 ${(clickedButton && clickedButton.startsWith('Information')) ? 'text-slate-200 bg-black/15' : ''}`}>Information</Link>
                    <ChevronDownIcon className="hover:text-slate-300 md:size-5 size-3"/>
                  </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="md:text-lg text-sm text-slate-400 bg-slate-800 rounded-3xl p-3 border-2 border-slate-300" sideOffset={5}>
                    <DropdownMenu.Item><Link to="/information/welcome" onClick={() => handleClickNavButton('Information - Welcome')} className={`hover:text-slate-300 ${clickedButton === 'Information - Welcome' ? 'text-red-400' : ''}`}>Welcome</Link></DropdownMenu.Item>
                    <DropdownMenu.Item><Link to="/information/news" onClick={() => handleClickNavButton('Information - News')} className={`hover:text-slate-300 ${clickedButton === 'Information - News' ? 'text-red-400' : ''}`}>News and notificatios</Link></DropdownMenu.Item>
                    <DropdownMenu.Item><Link to="/information/newmembers" onClick={() => handleClickNavButton('Information - New Members')} className={`hover:text-slate-300 ${clickedButton === 'Information - New Members' ? 'text-red-400' : ''}`}>New Members</Link></DropdownMenu.Item>
                    <DropdownMenu.Item><Link to="/information/status" onClick={() => handleClickNavButton('Information - Guild Status')} className={`hover:text-slate-300 ${clickedButton === 'Information - Status' ? 'text-red-400' : ''}`}>Status</Link></DropdownMenu.Item>
                    
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                        <div className="inline-flex items-center gap-1 hover:text-slate-50">
                          <Link to="/information/recruitment" onClick={() => handleClickNavButton('Information - Recruitment')} className={`hover:cursor-pointer hover:outline-none hover:text-slate-300 ${(clickedButton && clickedButton.startsWith('Information - Recruitment')) ? 'text-red-400' : ''}`}>Recruitment</Link>
                          <ChevronRightIcon className=""/>
                        </div>
                      </DropdownMenu.SubTrigger>

                      <DropdownMenu.Portal>
                        <DropdownMenu.SubContent className="text-lg text-slate-400 bg-slate-800 p-3 rounded-md border-2 border-slate-300" sideOffset={12} alignOffset={-5}>
                          <DropdownMenu.Item><ChevronRightIcon/></DropdownMenu.Item>


                          <div className='flex flex-col'>
                            <Dialog.Root>
                              <Dialog.Trigger>
                                <div>
                                  {/*  */}
                                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScqYePFR3FAYNiYnvWZERZ5LEQQY4L6AfIwZkIFO3TQ93VOwQ/viewform?usp=sharing">
                                    <div onClick={() => handleClickNavButton('Information - Recruitment Healers')} className={`hover:cursor-pointer hover:outline-none hover:text-slate-300 ${clickedButton === 'Information - Invites Healers' ? 'text-red-400' : ''}`}>Healers</div>
                                  </a>
                                </div>
                              </Dialog.Trigger>

                              {/* <Dialog.Portal>
                                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                                <Dialog.Content className="overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-[#0f0f0f]/95 border-2 border-white/70 md:rounded-lg flex flex-col outline-none">
                                  <div>
                                    <FormsInvitational role="Healers"/>
                                    <Dialog.Close className="absolute top-0 right-0 bg-slate-800 hover:bg-red-900 p-1.5  text-slate-400 hover:text-slate-100 ">
                                      <X className="size-5"/>                          
                                    </Dialog.Close>
                                  </div>
                                </Dialog.Content>
                              </Dialog.Portal>  */}
                            </Dialog.Root>


                            <Dialog.Root>
                              <Dialog.Trigger>
                                <div>
                                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSf0rP2yW-mWBOz6yt8ObAK5cWHcXx9ST7LCONz8ob3ksEC6jw/viewform?usp=sharing">
                                    <div onClick={() => handleClickNavButton('Information - Recruitment Dps')} className={`hover:cursor-pointer hover:outline-none hover:text-gray-700 text-gray-700 ${clickedButton === 'Information - Invites Dps' ? 'text-red-400' : ''}`}>Dps</div>
                                  </a>
                                </div>
                              </Dialog.Trigger>

                              {/* <Dialog.Portal>
                                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                                <Dialog.Content className="overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-[#0f0f0f]/95 border-2 border-white/70 md:rounded-lg flex flex-col outline-none">
                                  <div>
                                    <FormsInvitational role="Dps"/>
                                    <Dialog.Close className="absolute top-0 right-0 bg-slate-800 hover:bg-red-900 p-1.5  text-slate-400 hover:text-slate-100 ">
                                      <X className="size-5"/>
                                    </Dialog.Close>
                                  </div>
                                  
                                </Dialog.Content>
                              </Dialog.Portal>  */}
                            </Dialog.Root>

                            <Dialog.Root>
                            <Dialog.Trigger>
                              <div>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSc2bngO0HB8T-Pu4KweBVmAwcdudIMmljoR5EpbFxZmNdfwtg/viewform?usp=sharing">
                                  <div onClick={() => handleClickNavButton('Information - Recruitment Tanks')} className={`hover:text-slate-300 ${clickedButton === 'Information - Invites Tanks' ? 'text-red-400' : ''}`}>Tanks</div>
                                </a>
                              </div>
                            </Dialog.Trigger>

                              {/* <Dialog.Portal>
                                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                                <Dialog.Content className="overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-[#0f0f0f]/95 border-2 border-white/70 md:rounded-lg flex flex-col outline-none">
                                  <div>
                                    <FormsInvitational role="Tanks"/>
                                    <Dialog.Close className="absolute top-0 right-0 bg-slate-800 hover:bg-red-900 p-1.5  text-slate-400 hover:text-slate-100 ">
                                      <X className="size-5"/>                          
                                    </Dialog.Close>
                                  </div>
                                </Dialog.Content>
                              </Dialog.Portal>  */}
                            </Dialog.Root>
                          </div>
                          

                        
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>


                <Link to="/members" onClick={() => handleClickNavButton('Members')} className={`flex justify-center items-center hover:text-slate-300 ${clickedButton === 'Members' ? 'text-slate-200' : ''}`}>Members</Link>
                <Link to="/history" onClick={() => handleClickNavButton('History')} className={`flex justify-center items-center hover:text-slate-300 ${clickedButton === 'History' ? 'text-slate-200' : ''}`}>History</Link>
                <Link to="/awards" onClick={() => handleClickNavButton('Awards')} className={`flex justify-center items-center hover:text-slate-300 ${clickedButton === 'Awards' ? 'text-slate-200' : ''}`}>Awards</Link>          
              </div>
              <div className="relative righ max-w-[280px] bg-[url('./assets/textures/linum-textura-vinho.jpg')] bg-cover bg-no-repeat">
                {isLogged ? (
                  <Link to="/user">{userData?.user_name}</Link>
                ):(
                <h1></h1>
                )}
              </div>
          </div>
          

          <div className="relative items-center right-10 ml-auto">
            <div className="justify-center items-center md:w-[120px] md:h-[50px] w-[100px] h-[40px] ml-auto md:right-10 right-0 grid grid-cols-3 auto-rows-[44px] md:gap-5 gap-0">
                <a href="https://www.youtube.com/@DeathChasesYou" target="_blank" rel="noopener noreferrer" className="mr-4 md:size-8 size-5 hover:size-9 duration-200 hover:cursor-pointer hover:bg-red-600/25">
                <span className="mr-4 md:size-8 size-5 hover:size-9 duration-200 hover:cursor-pointer hover:bg-red-600/25">
                    <img src={youtube} alt="Youtube icon" />
                </span>
                </a>
                
                <a href="https://www.twitch.tv/desconhecedo1" target="_blank" rel="noopener noreferrer" className="mr-4 md:size-8 size-5 hover:size-9 duration-200 hover:cursor-pointer hover:bg-red-600/25">
                <span className="mr-4 md:size-8 size-5 hover:size-9 duration-200 hover:cursor-pointer hover:bg-violet-500/50">
                    <img src={twitch} alt="Twitch icon" />
                </span>
                </a>
                
                <span className="mr-4 md:size-8 size-5 hover:size-9 duration-200 hover:cursor-pointer hover:bg-blue-500/25">
                <img src={discord} alt="Discord icon" />
                </span>
            </div>
          </div>
        </div>
    )
}
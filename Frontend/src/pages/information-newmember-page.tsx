import { useEffect, useState } from "react";
import { getNewsPlayersFromGuild } from "../api";
import { PlayersResponse } from '../components/types';
import img1 from '../assets/icon/war-icon.png'
import img2 from '../assets/icon/pala-icon.png'
import img3 from '../assets/icon/dk-icon.png'
import img4 from '../assets/icon/rogue-icon.png'
import img5 from '../assets/icon/hunter-icon.png'
import img6 from '../assets/icon/prist-icon.jpg'
import img7 from '../assets/icon/mage-icon.png'
import img8 from '../assets/icon/lock-icon.png'
import img9 from '../assets/icon/shaman-icon.png'
import img10 from '../assets/icon/druid-icon.png'

export function Newmember() {
  const [newMembers, setNews] = useState<PlayersResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dpsIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/DPS-role.png?raw=true'
  const tankIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/Tank-role.png?raw=true'
  const healerIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/Healer-role.png?raw=true'

  const sIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/S_png.png?raw=true'
  const aIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/A_png.png?raw=true'
  const bIcon = 'https://www.freeiconspng.com/thumbs/letter-b-icon-png/letter-b-icon-png-18.png'
  const cIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/C_png.png?raw=true'
  const dIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/D_png.png?raw=true'


  const roleIcons: Record<string, string> = {
    DPS: dpsIcon,
    Healer: healerIcon,
    Tank: tankIcon,
  };

  const tierIcons: Record<string, string> = {
    S: sIcon,
    A: aIcon,
    B: bIcon,
    C: cIcon,
    D: dIcon,
  };

  useEffect(() => {
    const fetchNewMembers = async () => {
      try {
        const newMembersData = await getNewsPlayersFromGuild();
        setNews(newMembersData);
      } catch (err) {
        setError('Erro ao buscar membros novos');
      } finally {
        setLoading(false);
      }
    };

    fetchNewMembers();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-t from-slate-950 to-slate-900 w-full h-full fixed flex-grow overflow-y-auto pb-[10rem] cursor-wait">
        <div className="h-px bg-gray-200 mb-1"></div>
        <div className="p-4">
          <h2 className="left-auto right-auto justify-center flex mb-2 text-slate-300 font-bold text-lg">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-t from-slate-950 to-slate-900 w-full h-full fixed flex-grow overflow-y-auto pb-[10rem]">
        <div className="h-px bg-gray-200 mb-1"></div>
        <div className="p-4">
          <h2 className="left-auto right-auto justify-center flex mb-2 text-slate-300 font-bold text-lg">{error}</h2>
        </div>
      </div>
    );
  }


  const getTierClass = (tier: string) => {
    switch (tier) {
      case 'S':
        return 'text-red-400 font-bold border-red-700';
      case 'A':
        return 'text-orange-400 font-semibold border-orange-400';
      case 'B':
        return 'text-yellow-300 font-medium border-yellow-300';
      case 'C':
        return 'text-green-500 font-normal border-green-500';
      case 'D':
        return 'text-cyan-400 border-cyan-400';
      // Adicione mais casos conforme necessário
      default:
        return 'text-gray-500 font-normal';
    }
  };

  const getMemberClass = (memberClass: string) => {
    switch(memberClass) {
      case 'Warrior':
        return img1;
      case 'Paladin':
        return img2;
      case 'Death Knight':
        return img3;
      case 'Rogue':
        return img4;
      case 'Hunter':
        return img5;
      case 'Priest':
        return img6;
      case 'Mage':
        return img7;
      case 'Warlock':
        return img8;
      case 'Shaman':
        return img9;
      case 'Druid':
        return img10;
    }
  }



  return (
    <div>
    <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
        Newests Members
    </h1>
    <div className="h-px bg-pink-100"></div>

    <h3 className="text-pink-200 text-md py-6 px-20">
    <div className="p-4">
        {newMembers.length === 0 ? (
            <p>No news available</p>
        ) : (
            <ul>
            {newMembers.map((newMembers) => (
                <li key={newMembers.id} className="mb-4 p-4 border border-red-900 rounded-md relative">
                    <div className='flex flex-col sm:justify-between flex-1'>
                        <span className="inline-flex justify-center items-center gap-3 bg-red-900/40">
                            <img src={getMemberClass(newMembers.class)} alt="" className="size-10"/>
                            <h1 className="flex text-pink-200 text-[1.1rem] my-2 font-bold justify-center">{newMembers.name}</h1>
                        </span>
                        <div className="h-px bg-red-900/40"></div>
                        <div className="grid grid-flow-col grid-cols-2">                     
                            <div className={`relative bg-red-900/40 h-auto m-2 px-4 pt-2 bottom-0 border-2 border-solid rounded-lg ${getTierClass(newMembers.tier)}`}
                            >

                          <div
                                className="absolute bg-cover size-40"
                                style={{
                                  backgroundImage: `url(${tierIcons[newMembers.tier]})`,
                                  opacity: 0.2,
                                }}
                          />

                              <div className="flex space-x-2">
                                <p className="text-pink-100 text-sm ml-5">Class: {newMembers.class}</p>
                                {roleIcons[newMembers.role] ? (
                                  <img src={roleIcons[newMembers.role]} alt={`${newMembers.role} Icon`} className="size-5" />
                                ) : (
                                  null
                                )}
                              </div>
                                <p className="text-pink-100 text-sm ml-5">Race: {newMembers.race}</p>
                                <p className="text-pink-100 text-sm ml-5">Specialization: {newMembers.specialization}</p>
                                <p className="text-pink-100 text-sm ml-5">Note: {newMembers.note}</p>
                                <p className={`ml-5`}>Tier: {newMembers.tier}</p>
                            </div>
                                <img 
                                  className="h-[12rem] w-[9rem] flex inset-0 mx-auto relative mt-2 mb-4" 
                                  src={`${newMembers.image}`} 
                                  alt={`Image of ${newMembers.name}`} 
                                />

                        </div>
                    </div>
                    <p className="text-sm text-pink-200/50 absolute top-4 right-4 p-4">
                        Date of Joining: {new Date(newMembers.date_joining).toLocaleDateString()} {new Date(newMembers.date_joining).toLocaleTimeString()}
                    </p>
                </li>
            ))}
            </ul>
        )}
    </div>


    </h3>
    </div>
);
}


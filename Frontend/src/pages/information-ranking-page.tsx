import { useEffect, useState } from "react";
import { getRankingPlayersFromGuild } from "../api";
import { PlayersResponse } from '../components/types';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
  } from 'lucide-react'

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

export function RankingPage() {
  const [rankingListPlayers, setRankingListPlayers] = useState<PlayersResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const getColorClass = (classes: string) => {
    switch (classes) {

    case 'Warrior': 
        return 'text-[#7a4c38]';

    case 'Druid': 
        return 'text-orange-600';

    case 'Shaman': 
        return 'text-[#2635ff]';

    case 'Warlock': 
        return 'text-violet-600';

    case 'Mage': 
        return 'text-sky-400';

    case 'Priest': 
        return 'text-white';

    case 'Hunter': 
        return 'text-lime-800';


    case 'Rogue': 
        return 'text-yellow-300';

    case 'Death Knight': 
        return 'text-[#af0000]';


    case 'Paladin': 
        return 'text-fuchsia-400';

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

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const rankingData = await getRankingPlayersFromGuild();
        setRankingListPlayers(rankingData);
      } catch (err) {
        setError("Erro ao buscar lista do ranking");
      }
    };

    fetchRanking();
  }, []);

  const totalPages = Math.ceil(rankingListPlayers.length / itemsPerPage);

  const currentItems = rankingListPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFirstPage = () => {
    if (currentPage != 1) {
        setCurrentPage(1)
    }
  };

  const handleLastPage = () => {
    if (currentPage != totalPages) {
        setCurrentPage(totalPages)
    }
  }

  return (
    <div className="min-h-[90vh] flex flex-col">
      <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-3 md:px-20 py-1.5 px-8">
        Ranking
      </h1>
      <div className="h-px bg-pink-100"></div>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="md:py-6 md:px-20 my-6 mx-20 text-pink-200 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px] gap-3 bg-orange-800/50 border border-black rounded-md grow">
        {currentItems.map((player) => (
          <li key={player.id} className="px-4 rounded-md relative">
            <div className="grid grid-flow-col grid-cols-2 bg-red-900/80 border border-white/25 border-solid rounded-lg">
              <div className="flex items-start justify-between">
                <div className={`relative  h-auto mx-2 px-4 bottom-0  rounded-lg`}>
                  <div className="flex space-x-4">
                  <img
                    className="h-[4rem] w-[3rem] mx-auto relative mb-1 my-auto"
                    src={`${player.image}`}
                    alt={`Image of ${player.name}`}
                />  
                <div>
                    <span className="inline-flex justify-center items-center gap-3">
                            <img src={getMemberClass(player.class)} alt="" className="size-5"/>
                            <h1 className={`flex text-[1.1rem] font-bold justify-center ${getColorClass(player.class)}`}>
                            {player.name}
                            </h1>
                        </span>
                        <p className="text-pink-100 text-sm mb-4">{player.note}</p>
                </div>
                    
                  </div>
                  
                </div>
              </div>

            </div>
            <p className="mx-2 bg-green-800 border border-green-950 rounded-[50%] text-sm text-pink-100 absolute top-1 right-4 py-3 px-2">
              Pts: {player.guild_points}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-2 px-6 bg-gray-800/20 py-4">
        <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className="text-white/80 hover:text-white px-4 py-2 rounded disabled:opacity-50 "
            >
            <div className="flex justify-center items-start">
                <span className="inline space-x-2"><ChevronsLeft /></span>
                Primeira
            </div>
        </button>

        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="text-white/80 px-4 py-2 rounded disabled:opacity-50 disabled:hover:text-white/80 hover:text-white"
        >
          <div className="flex justify-center items-start">
            <span className="inline space-x-2"><ChevronLeft /></span>
            Anterior
          </div>
        </button>

        <span className="text-white">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-white/80 hover:text-white px-4 py-2 rounded disabled:opacity-50 "
        >
          <div className="flex justify-center items-start">
            <span className="inline space-x-2"><ChevronRight /></span>
            Próxima
          </div>
        </button>

        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className="text-white/80 hover:text-white px-4 py-2 rounded disabled:opacity-50 "
        >
          <div className="flex justify-center items-start">
            <span className="inline space-x-2"><ChevronsRight /></span>
            Última
          </div>
        </button>
      </div>
    </div>
  );
}

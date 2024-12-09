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

  const getGradientColor = (index: number, total: number) => {
    const ratio = index / (total - 1); // Normaliza o índice entre 0 e 1
    const red = Math.round(255 * ratio); // Aumenta o vermelho
    const green = Math.round(255 * (1 - ratio)); // Diminui o verde
    return `rgb(${red}, ${green}, 0)`; // Retorna a cor em RGB
  };
  

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
    <div className="w-full min-h-[90vh] flex flex-col">
      <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-3 md:px-20 py-1.5 px-8">
        Ranking
      </h1>
      <div className="h-px bg-pink-100"></div>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="bg-red-500/20 sm:mx-4 mx-2 my-2 rounded-lg border border-black">
        {currentItems.map((player) => (
          <li key={player.id} className="flex items-center sm:px-3 sm:py-[1px] px-2 rounded-md">
            <div className="sm:w-[5rem] w-[3rem]">
              <p
                className="mr-2 flex justify-center text-left sm:text-lg sm:w-8 text-sm w-6 font-bold border border-slate-500 rounded-3xl"
                style={{
                  color: getGradientColor(
                    rankingListPlayers.findIndex(rankedPlayer => rankedPlayer.name === player.name),
                    rankingListPlayers.length
                  ),
                }}
              >
                {rankingListPlayers.findIndex(rankedPlayer => rankedPlayer.name === player.name) + 1}
              </p>

            </div>
            
            <div className="flex-1 flex justify-between items-center sm:my-0 my-1 bg-red-900/80 border border-white/25 border-solid rounded-lg sm:px-4 px-2 py-1 sm:text-base text-sm">
              <div className="flex items-center">
                <img
                  className="h-[4rem] w-[3rem] mr-5 ml-2 rounded border border-slate-700"
                  src={`${player.image}`}
                  alt={`Image of ${player.name}`}
                />
                
                <div>
                  <span className="inline-flex items-center gap-3">
                    <img
                      src={getMemberClass(player.class)}
                      alt=""
                      className="size-5"
                    />
                    <h1 className={`sm:text-[1.1rem] sm:font-bold text-sm ${getColorClass(player.class)}`}>
                      {player.name}
                    </h1>
                  </span>
                  <p className="text-pink-100 text-[0.75rem]">{player.note}</p>
                </div>
              </div>

              {/* Guild Points */}
              <p className="sm:mx-2 sm:text-sm  sm:px-3 sm:py-2 mx-1 text-[0.75rem]  px-2 py-1 text-pink-100 bg-green-800 border border-green-950 rounded-[50%] ">
                Pts: {player.guild_points}
              </p>
            </div>
          </li>
        ))}
      </ul>


      <div className="flex justify-between items-center mt-2 sm:px-6 bg-gray-800/20 py-4 sm:text-base text-sm">
        <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className="text-white/80 hover:text-white sm:px-4 py-2 rounded disabled:opacity-50 "
            >
            <div className="flex justify-center items-start">
                <span className="inline space-x-2"><ChevronsLeft /></span>
                <p className="hidden sm:inline">Primeira</p>
            </div>
        </button>

        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="text-white/80 px-4 py-2 rounded disabled:opacity-50 disabled:hover:text-white/80 hover:text-white"
        >
          <div className="flex justify-center items-start">
            <span className="inline space-x-2"><ChevronLeft /></span>
            <p className="hidden sm:inline">Anterior</p>
          </div>
        </button>

        <span className="text-white">
          <span className="hidden sm:inline">Página {currentPage} de {totalPages}</span>
          <span className="sm:hidden">{currentPage}/{totalPages}</span>
        </span> 


        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-white/80 hover:text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <div className="flex justify-center items-start">
            <span className="inline space-x-2"><ChevronRight /></span>
            <p className="hidden sm:inline">Próxima</p>
          </div>
        </button>

        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className="text-white/80 hover:text-white px-4 py-2 rounded disabled:opacity-50 "
        >
          <div className="flex justify-center items-start">
            <span className="inline space-x-2"><ChevronsRight /></span>
              <p className="hidden sm:inline">Última</p>
          </div>
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react"
import { getRankingPlayersFromGuild } from "../api"
import { PlayersResponse } from '../components/types';


export function RankingPage () {
    const [rankingListPlayers, setRankingListPlayers] = useState<PlayersResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchRanking = async () => {
            try {
                const rankingData = await getRankingPlayersFromGuild();
                setRankingListPlayers(rankingData);
            } catch (err) {
                setError('Erro ao buscar lista do ranking');
              } finally {
                setError('Erro');
              }
            };

            fetchRanking();
    }, []);
        


    return(
        <div className="">
            <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                Ranking
            </h1>
            <div className="h-px bg-pink-100"></div>

            <ul className="md:py-1 md:px-20 my-6 mx-20 text-pink-200 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px] gap-3 bg-orange-800/20 border border-black rounded-md">
                {rankingListPlayers.map((rankingListPlayers) => (
                    <li key={rankingListPlayers.id} className="px-4 rounded-md relative">
              
                            <div className="grid grid-flow-col grid-cols-2 bg-red-900/40 border border-white/25 border-solid rounded-lg"> 
                                <div className="">                 
                                    <div className={`relative  h-auto m-2 px-4 pt-2 bottom-0  rounded-lg`}>

                                        <div className="flex space-x-2">
                                            <span className="inline-flex justify-center items-center gap-3">
                                                <h1 className="flex text-pink-200 text-[1.1rem] my-2 font-bold justify-center">{rankingListPlayers.name}</h1>
                                            </span>   
                                        </div>
                                            <p className="text-pink-100 text-sm mb-4">Guild Points: {rankingListPlayers.guild_points}</p>
                                    </div>
                                </div>

                                    <img 
                                    className="h-[5rem] w-[4rem] flex inset-0 mx-auto relative mt-2 mb-4" 
                                    src={`${rankingListPlayers.image}`} 
                                    alt={`Image of ${rankingListPlayers.name}`} 
                                    />

                            </div>
                    <p className="mx-2 bg-green-800 border border-green-950 rounded-[50%] text-sm text-pink-100 absolute top-1 right-4 py-4 px-3">
                        Pts: {rankingListPlayers.guild_points}
                    </p>
                  </li>
                ))}
            </ul>

        </div> 
    )
}
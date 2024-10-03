import { useEffect, useState } from "react";
import horde from '../assets/icon/horde_icon.png';
import { PlayersResponse } from "../components/types";
import { getGuildStatus } from "../api";

interface GuildStatus {
    id: number;
    howManyPlayers: number;
    howManyOfficers: number;
    faction: string;
    players: PlayersResponse[];
}

export function GuildStatus() {
    const [guildStatus, setGuildStatus] = useState<GuildStatus[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuildStatus = async () => {
            try {
                const guildStatusData = await getGuildStatus();
                setGuildStatus(guildStatusData);
            } catch (err) {
                setError('Erro ao buscar informações da guilda');
            } finally {
                setLoading(false);
            }
        };

        fetchGuildStatus();
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                    Carregando...
                </h1>
                <div className="h-px bg-pink-100"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="flex justify-center items-center text-pink-300 text-[26px] font-semibold py-6 px-20">
                    Informações - Status da Guilda
                </h1>
                <div className="h-px bg-pink-100"></div>

                <h3 className="text-pink-200 md:text-[20px] sm:text-[18px] text-[16px] md:py-6 md:px-20 py-3 px-8">
                    Ocorreu um erro ao buscar informações da guilda. Por favor, tente novamente mais tarde.
                </h3>
            </div>
        );
    }

    if (guildStatus.length === 0) {
        return (
            <div>
                <h1 className="flex justify-center items-center text-pink-300 text-[26px] font-semibold py-6 px-20">
                    Informações - Status da Guilda
                </h1>
                <div className="h-px bg-pink-100"></div>

                <h3 className="text-pink-200 md:text-[20px] sm:text-[18px] text-[16px] md:py-6 md:px-20 py-3 px-8">
                    Status da guilda não disponível
                </h3>
            </div>
        );
    }

    return (
        <div>
            <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                Informações - Status da Guilda
            </h1>
            <div className="h-px bg-pink-100"></div>

            <h3 className="text-pink-200 text-md py-6 px-20">
                <span className='inline-flex items-center gap-2'>
                    <p>Facção: {guildStatus[0].faction}</p>
                    <img src={horde} className="size-10" alt="" />
                </span>
                <p className="my-1">Membros ativos: {guildStatus[0].howManyPlayers}</p>
                <p className="my-1">Oficiais ativos: {guildStatus[0].howManyOfficers}</p>
            </h3>
        </div>
    );
}

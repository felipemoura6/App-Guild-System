import { useState, useEffect } from "react";
import { AwardsResponse } from "../components/types";
import { getGuildAwards } from "../api";

export function Awards() {
    const [awards, setAwards] = useState<AwardsResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const awardsData = await getGuildAwards();
                setAwards(awardsData);
            } catch (err) {
                setError('Erro ao buscar awards da guilda');
            } finally {
                setLoading(false);
            }
        };

        fetchAwards();
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                    Loading...
                </h1>
                <div className="h-px bg-pink-100"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                    Erro ao carregar os prêmios da guilda
                </h1>
                <div className="h-px bg-pink-100"></div>

                <p className="text-pink-200 md:text-[20px] sm:text-[18px] text-[16px] md:py-6 md:px-20 py-3 px-8">
                    {error}
                </p>
            </div>
        );
    }

    if (awards.length > 0) {
        return (
            <div>
                <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                    Awards
                </h1>
                <div className="h-px bg-pink-100"></div>

                <h3 className="text-pink-200 md:text-[20px] sm:text-[18px] text-[14px] md:py-6 md:px-20 py-3 px-8">
                    {awards[0]?.awards}
                </h3>
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                    Awards
                </h1>
                <div className="h-px bg-pink-100"></div>

                <h3 className="text-pink-200 md:text-[20px] sm:text-[18px] text-[16px] md:py-6 md:px-20 py-3 px-8">
                    No awards yet!
                </h3>
            </div>
        );
    }
}

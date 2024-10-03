import { useState, useEffect } from "react"
import { HistoryResponse } from "../components/types";
import { getGuildHistory } from "../api";

export interface HistoryResponseProps {
    id: number;
    history: string;
}

export function History() {
    const [history, setHistory] = useState<HistoryResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
          try {
            const newsData = await getGuildHistory();
            setHistory(newsData);
          } catch (err) {
            setError('Erro ao buscar notícias');
          } finally {
            setLoading(false);
          }
        };
    
        fetchHistory();
      }, []);

    
      if (history && history.length > 0) {
        return(
            <div>
                <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                    History
                </h1>
                <div className="h-px bg-pink-100"></div>
    
                <h3 className="text-pink-200 md:text-[20px] sm:text-[18px] text-[14px] md:py-6 md:px-20 py-3 px-8">
                    {history.length > 0 ? history[0]?.history : 'Carregando...'}
                </h3>
    
            </div>
        );
        } else {
        // Caso seja vazio a resposta...
        return (
            <div>
            <h1 className="flex justify-center items-center text-pink-300 text-[26px] font-semibold py-6 px-20">
                Guild History
            </h1>
            <div className="h-px bg-pink-100"></div>
        
            <h3 className="text-pink-200 md:text-[20px] sm:text-[18px] text-[16px] md:py-6 md:px-20 py-3 px-8">
                Guild history not available
            </h3>
            </div>
        );
    }
}
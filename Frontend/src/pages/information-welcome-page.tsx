import { useState, useEffect } from "react";
import { WelcomeResponse } from "../components/types";
import { getGuildWelcomeText } from "../api";

export function Welcome() {
    const [welcomeText, setWelcomeText] = useState<WelcomeResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWelcome = async () => {
          try {
            const welcomeResponse = await getGuildWelcomeText();
            setWelcomeText(welcomeResponse);
          } catch (err) {
            setError('Erro ao buscar notícias');
          } finally {
            setLoading(false);
          }
        };
    
        fetchWelcome();
      }, []);

    
      if (welcomeText && welcomeText.length > 0) {
        return(
            <div>
                <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                    Welcome
                </h1>
                <div className="h-px bg-pink-100"></div>
    
                <h3 className="text-pink-200 md:text-[20px] sm:text-[18px] text-[14px] md:py-6 md:px-20 py-3 px-8">
                    {welcomeText.length > 0 ? welcomeText[0]?.welcome : 'Carregando...'}
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
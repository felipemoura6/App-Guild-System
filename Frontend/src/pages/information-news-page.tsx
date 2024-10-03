import { useEffect, useState } from "react";
import { getGuildNews } from "../api";

interface Article {
  id_news: number;
  news_name: string;
  news_content: string;
  news_post_date: string;
}

export function News() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getGuildNews();
        setNews(newsData);
      } catch (err) {
        setError('Erro ao buscar notícias');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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

  return (
    <div>
    <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
        Information - Guild News
    </h1>
    <div className="h-px bg-pink-100"></div>

    <h3 className="text-pink-200 text-md py-6 px-20">
    <div className="p-4">
        {news.length === 0 ? (
            <p>No news available</p>
        ) : (
            <ul>
            {news.map((article) => (
                <li key={article.id_news} className="mb-4 p-4 bg-slate-800/70 border border-black rounded-md relative">
                <h2 className="text-lg font-bold">{article.news_name}</h2>
                <p>{article.news_content}</p>
                <p className="text-sm text-pink-200/50 absolute top-4 right-4">
                    {new Date(article.news_post_date).toLocaleDateString()} {new Date(article.news_post_date).toLocaleTimeString()}
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


import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  MagnifyingGlassIcon,
  PlusCircledIcon,
  MinusCircledIcon,
} from '@radix-ui/react-icons';
import warrior_icon from '../assets/icon/war-icon.png';
import paladin_icon from '../assets/icon/pala-icon.png';
import dk_icon from '../assets/icon/dk-icon.png';
import rogue_icon from '../assets/icon/rogue-icon.png';
import hunter_icon from '../assets/icon/hunter-icon.png';
import priest_icon from '../assets/icon/prist-icon.jpg';
import mage_icon from '../assets/icon/mage-icon.png';
import warlock_icon from '../assets/icon/lock-icon.png';
import shaman_icon from '../assets/icon/shaman-icon.png';
import druid_icon from '../assets/icon/druid-icon.png';
import useDebounceValue from '../components/hook/use-debounce-value';
import { useLocation } from 'react-router-dom';
import { PlayersResponse } from '../components/types';
import { getPlayersFromGuild } from '../api';
import { NewMember } from '../components/newMember';
import { X } from 'lucide-react';
import { MemberBox } from '../components/membersBox';
import { DeleteMember } from '../components/deleteMember';


export function Member() {
  const [searchText, setSearchText] = useState<string>('');
  const [plusMemberClicked, setPlusMemberClicked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [membersData, setMembersData] = useState<PlayersResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  let message = '';
  if (location.state) {
    message = location.state.message;
  }

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handlePlusMemberClick = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (plusMemberClicked) {
      setPlusMemberClicked(false);
    }
  }, [plusMemberClicked]);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true); // Inicia o estado de loading

      try {
        const newsData = await getPlayersFromGuild();
        setMembersData(newsData);
        setError(null); // Limpa o estado de erro, caso exista
      } catch (err) {
        setError('Erro ao buscar membros da guilda');
      } finally {
        setLoading(false); // Finaliza o estado de loading
      }
    };

    fetchPlayers();
  }, []);

  const [memberClicked, setMemberClicked] = useState<string | null>(null);

  function handleClick(member: string) {
    setMemberClicked(member);
  }

  const classes = [
    { key: 'Warrior', color: 'text-[#7a4c38]', icon: warrior_icon },
    { key: 'Paladin', color: 'text-fuchsia-400', icon: paladin_icon },
    { key: 'Death Knight', color: 'text-[#af0000]', icon: dk_icon },
    { key: 'Rogue', color: 'text-yellow-300', icon: rogue_icon },
    { key: 'Hunter', color: 'text-lime-800', icon: hunter_icon },
    { key: 'Priest', color: 'text-white', icon: priest_icon },
    { key: 'Mage', color: 'text-sky-400', icon: mage_icon },
    { key: 'Warlock', color: 'text-violet-600', icon: warlock_icon },
    { key: 'Shaman', color: 'text-[#2635ff]', icon: shaman_icon },
    { key: 'Druid', color: 'text-orange-600', icon: druid_icon },
  ];

  const filteredMembers = useDebounceValue(searchText, 1000)
    ? membersData.filter((member) =>
        member.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : membersData;

  const filteredClasses = classes.filter(({ key }) =>
    filteredMembers.some((member) => member.class === key)
  );

  return (
    <div className="">
      <h1 className="flex items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8 justify-center gap-5">
        Members
        <Dialog.Root>
          <Dialog.Trigger>
            <PlusCircledIcon
              onClick={() => handlePlusMemberClick()}
              className="hover: cursor-pointer hover:text-slate-100"
            />
          </Dialog.Trigger>
          <Dialog.Overlay className="inset-0 fixed bg-black/50" />
          <Dialog.Portal>
            <Dialog.Content aria-describedby={undefined} className="overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-[#0f0f0f] md:rounded-lg flex flex-col outline-none overflow-y-auto">
              <Dialog.Title></Dialog.Title>
              <Dialog.Description id="dialog-description">
                
              </Dialog.Description>
              <Dialog.Close className="absolute top-0 right-0 bg-slate-800 hover:bg-red-900 p-1.5  text-slate-400 hover:text-slate-100 ">
                <X className="size-5" />
              </Dialog.Close>
              {isDialogOpen && <NewMember />}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger>
            <MinusCircledIcon
              onClick={() => handlePlusMemberClick()}
              className="hover: cursor-pointer hover:text-slate-100"
            />
          </Dialog.Trigger>
          <Dialog.Overlay className="inset-0 fixed bg-black/50" />
          <Dialog.Portal>
            <Dialog.Content aria-describedby="dialog-description" className="overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-[#0f0f0f] md:rounded-lg flex flex-col outline-none overflow-y-auto">
              <Dialog.DialogTitle>
              </Dialog.DialogTitle>
              <Dialog.DialogDescription id="dialog-description">
              </Dialog.DialogDescription>
              <Dialog.Close className="absolute top-0 right-0 bg-slate-800 hover:bg-red-900 p-1.5  text-slate-400 hover:text-slate-100 ">
                <X className="size-5" />
              </Dialog.Close>
              {isDialogOpen && <DeleteMember />}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </h1>
      <div className="h-px bg-pink-100"></div>

      <div className="grid grid-cols-2 items-center justify-center">
        <h3 className="text-pink-200 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[14px] md:py-6 md:px-20 py-3 px-8">
          Introducing the all Death Chases Yoou players separated by classes.
        </h3>
        <div className="relative flex items-center justify-end ">
          <input
            type="text"
            placeholder="Search a specific member name"
            className="items-center justify-end sm:mr-10 mr-3 sm:text-sm text-[10px] rounded-full outline-none sm:pl-10 sm:pr-4 sm:py-2 pl-6 pr-2 py-1 sm:w-[20rem] w-[10rem] bg-green-900/50 text-slate-300 placeholder-slate-500 border border-slate-500"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className="sm:size-7 size-4 absolute sm:right-[20.25rem] right-[9.25rem] text-slate-400 hover:cursor-pointer" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-8">
          <p className="text-pink-300 text-sm">Carregando membros...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center mt-8">
          <p className="text-red-500 text-sm">Erro ao carregar membros: {error}</p>
        </div>
      ) : (
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="grid md:grid-cols-5 md:gap-12 md:py-8 md:px-16 sm:grid-cols-3 sm:gap-10 sm:py-6 sm:px-14 justify-items-center w-auto grid-cols-2 gap-4 py-6 px-2">
              <Dialog.Root>
                {filteredClasses.map(({ key, color, icon }) => (
                  <div
                    key={key}
                    className="sm:text-lg text-sm p-4 rounded-md"
                  >
                    <span className="flex items-center gap-3 mb-3">
                      <img
                        src={icon}
                        alt={`${key} icon`}
                        className="size-10"
                      />
                      <p
                        className={`sm:text-[22px] text-[18px] ${color} font-bold`}
                      >
                        {key}
                      </p>
                    </span>
                    {filteredMembers
                      .filter((member) => member.class === key)
                      .map((member) => (
                        <div key={member.name}>
                          <ul
                            className={`ml-5 grid items-center justify-start list-disc mt-1 ${color}`}
                          >
                            <li className="text-sm hover:scale-[1.2] duration-200 hover:cursor-pointer">
                              <Dialog.Trigger
                                className="hover:underline duration-200"
                                onClick={() => handleClick(`${member.name}`)}
                              >
                                <span className="text-sm hover:scale-[1.2] duration-200 hover:cursor-pointer">
                                  {member.name}
                                </span>
                              </Dialog.Trigger>
                            </li>
                            {/* Adicione outras informações do membro que deseja exibir */}
                          </ul>
                        </div>
                      ))}
                  </div>
                ))}

                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="overflow-hidden fixed inset-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[640px] sm:w-full w-[300px] bg-[#0f0f0f] md:rounded-lg flex flex-col outline-none">
                  <Dialog.Close className="absolute top-0 right-0 bg-slate-800 hover:bg-red-900 p-1.5  text-slate-400 hover:text-slate-100 ">
                    <X className="size-5" />
                  </Dialog.Close>
                  {memberClicked && (
                    <MemberBox
                      member={
                        filteredMembers.find(
                          (member) => member.name === memberClicked
                        ) || {
                          name: '',
                          class: '',
                          race: '',
                          specialization: '',
                          note: '',
                          tier: '',
                          image: '',
                        }
                      }
                    />
                  )}
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

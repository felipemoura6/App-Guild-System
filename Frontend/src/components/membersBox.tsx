import React from 'react';
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

interface MemberBoxProps {
  member: {
    name: string;
    class: string;
    race: string;
    specialization: string;
    note: string;
    tier: string;
    image: string;
    role: string;
  };
}

export const MemberBox: React.FC<MemberBoxProps> = ({ member }) => {

  const dpsIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/DPS-role.png?raw=true'
  const tankIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/Tank-role.png?raw=true'
  const healerIcon = 'https://github.com/felipemoura6/App-Guild-System/blob/main/Frontend/src/assets/icon/Healer-role.png?raw=true'

  const roleIcons: Record<string, string> = {
    DPS: dpsIcon,
    Healer: healerIcon,
    Tank: tankIcon,
  };
  

  // Função para calcular a classe com base no valor do tier
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

  // Obtém a classe do tier com base no valor de member.tier
  const tierClass = getTierClass(member.tier);
  const classMember = getMemberClass(member.class);

  return (
    <div className='flex flex-col sm:justify-between flex-1'>
      <span className="inline-flex justify-center items-center gap-3 bg-red-900/40">
        <img src={classMember} alt="" className="size-10"/>
        <h1 className="flex text-pink-200 text-[1.5rem] my-2 font-bold justify-center">{member.name}</h1>
      </span>
      <div className="h-px bg-red-900/40"></div>
      <img className="h-[22rem] w-[19rem] flex inset-0 mx-auto relative mt-2 mb-4" src={member.image} alt={`Image of ${member.name}`} />
      <div className={`relative bg-red-900/40 h-auto m-2 px-4 pt-2 bottom-0 border-2 border-solid rounded-lg ${getTierClass(member.tier)}`}>
        <div className='flex space-x-2'>
          <p className="text-pink-100 text-sm ml-5">Class: {member.class}</p>
          {roleIcons[member.role] ? (
            <img src={roleIcons[member.role]} alt={`${member.role} Icon`} className="size-5" />
          ) : (
            null
          )}
        </div>
        <p className="text-pink-100 text-sm ml-5">Race: {member.race}</p>
        <p className="text-pink-100 text-sm ml-5">Specialization: {member.specialization}</p>
        <p className="text-pink-100 text-sm ml-5">Note: {member.note}</p>
        <p className={`ml-5 ${tierClass}`}>Tier: {member.tier}</p>
      </div>
      
    </div>
  );
};



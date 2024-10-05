import { FormInputText } from "./form/formInputText";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { toast } from 'sonner'
import { registerNewMember } from "../api";
//import { useNavigate } from 'react-router-dom';

interface MemberData {
  name: string;
  classe: string;
  specialization: string;
  race: string;
  tier: string;
  ranking: string;
  note: string;
  image: string;
  role: string;
}

export function NewMember() {
  const [image, setImage] = useState("https://github.com/felipemoura6/App_Guild_System_Backup/blob/master/site-deathchasesyoou-react-radix/src/assets/characters_imgs/UNKNOWN_img.png?raw=true");

  const [memberData, setMemberData] = useState<MemberData>({
    name: '',
    classe: '',
    specialization: '',
    race: '',
    ranking: 'Member',
    tier: '',
    note: '',
    role: '',
    image: 'https://github.com/felipemoura6/App_Guild_System_Backup/blob/master/site-deathchasesyoou-react-radix/src/assets/characters_imgs/UNKNOWN_img.png?raw=true'
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberData({
      ...memberData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMemberData({
      ...memberData,
      [e.target.name]: e.target.value
    });
  };

  // UseEffect para definir a role automaticamente
  useEffect(() => {
    switch (memberData.classe) {
      case 'Rogue':
      case 'Hunter':
      case 'Mage':
      case 'Warlock':
        setMemberData((prevData) => ({
          ...prevData,
          role: 'DPS',
          specialization: '',
          race: '',
        }));
        break;
      case 'Paladin':
        setMemberData((prevData) => ({
          ...prevData,
          race: 'Blood Elf',
          role: '',
          specialization: '',
        }));
        break;
        case 'Druid':
        setMemberData((prevData) => ({
          ...prevData,
          race: 'Tauren',
          role: '',
          specialization: '',
        }));
        break;
      // Adicione outras classes se necessário
      default:
        setMemberData((prevData) => ({
          ...prevData,
          role: '',
          specialization: '',
          race: ''
        }));
        break;
    }
  }, [memberData.classe]); // Sempre que a classe mudar, a role será atualizada


  useEffect(() => {
    switch (memberData.specialization) {
      case 'Retribuition':
      case 'Fury':
      case 'Arms':
      case 'Shadow':
      case 'Elemental':
      case 'Enhancement':
      case 'Balance':
        setMemberData((prevData) => ({
          ...prevData,
          role: 'DPS',
        }));
        break;
      
      case 'Holy':
      case 'Restoration':
      case 'Discipline':
        setMemberData((prevData) => ({
          ...prevData,
          role: 'Healer',
        }));
        break;
      
      // Adicione outras classes se necessário
      default:
        setMemberData((prevData) => ({
          ...prevData,
          role: '',
        }));
        break;
    }
  }, [memberData.specialization]); // Sempre que a classe mudar, a role será atualizada

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const uniqueName = memberData.name.toLowerCase();
      const newFileName = `./src/assets/characters_imgs/${uniqueName}_img.png`;
      setImage(newFileName);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      setMemberData({
        ...memberData,
        image: imageUrl // ou newFileName dependendo do que deseja armazenar
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(memberData)

    if (!memberData.name || !memberData.classe|| !memberData.specialization || !memberData.race || !memberData.tier || !memberData.note) {
      toast.error('Please, informations field can not be empty!');
      return;
    }


    try {
      await registerNewMember(memberData);
      toast.success(`${memberData.name} adicionado com sucesso!`);
    } catch (error) {
      toast.error('Usuário já existente!');
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div className="w-full h-full mb-2 overflow-y-auto">
            <h1 className="text-slate-300 text-2xl p-5 flex justify-center">New Member</h1>
            <div className="h-px bg-pink-100 mb-2"></div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member name in-game:</p>
                    <FormInputText
                        type="text"
                        name="name"
                        id="name"
                        placeholder="type new member name"
                        text="name"
                        handleOnChange={handleChange}
                        value={memberData.name}
                    />
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Select new member class:</p>
                    <select
                      name="classe" // Corrigir aqui
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleSelectChange}
                      value={memberData.classe}
                    >
                      <option value="" disabled hidden>
                        Select class
                      </option>
                      <option value="Warrior">Warrior</option>
                      <option value="Paladin">Paladin</option>
                      <option value="Death Knight">Death Knight</option>
                      <option value="Rogue">Rogue</option>
                      <option value="Hunter">Hunter</option>
                      <option value="Priest">Priest</option>
                      <option value="Mage">Mage</option>
                      <option value="Warlock">Warlock</option>
                      <option value="Shaman">Shaman</option>
                      <option value="Druid">Druid</option>
                    </select>

                </div>
            </div> 

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member spec:</p>
                    <select
                      name="specialization"
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleSelectChange}
                      value={memberData.specialization}
                    >
                      <option value="" disabled hidden>
                        Select specialization
                      </option>

                      {memberData.classe === "Warrior" && (
                      <>
                          <option value="Arms">Arms</option>
                          <option value="Fury">Fury</option>
                          <option value="Protection">Protection</option>
                      </>
                      )}

                      {memberData.classe=== "Paladin" && (
                        <>
                          <option value="Holy">Holy</option>
                          <option value="Retribuition">Retribuition</option>
                          <option value="Protection">Protection</option>
                        </>
                      )}

                      {memberData.classe=== "Death Knight" && (
                        <>
                          <option value="Blood">Blood</option>
                          <option value="Frost">Frost</option>
                          <option value="Unholy">Unholy</option>
                        </>
                      )}

                      {memberData.classe=== "Rogue" && (
                        <>
                          <option value="Assassination">Assassination</option>
                          <option value="Combat">Combat</option>
                          <option value="Subtlety">Subtlety</option>
                        </>
                      )}

                      {memberData.classe=== "Hunter" && (
                        <>
                          <option value="Beast Mastery">Beast Mastery</option>
                          <option value="Marksmanship">Marksmanship</option>
                          <option value="Survival">Survival</option>
                        </>
                      )}

                      {memberData.classe=== "Priest" && (
                        <>
                          <option value="Discipline">Discipline</option>
                          <option value="Holy">Holy</option>
                          <option value="Shadow">Shadow</option>
                        </>
                      )}

                      {memberData.classe=== "Mage" && (
                        <>
                          <option value="Arcane">Arcane</option>
                          <option value="Fire">Fire</option>
                          <option value="Frost">Frost</option>
                        </>
                      )}

                      {memberData.classe=== "Warlock" && (
                        <>
                          <option value="Afflyction">Afflyction</option>
                          <option value="Demonology">Demonology</option>
                          <option value="Destruction">Destruction</option>
                        </>
                      )}

                      {memberData.classe=== "Shaman" && (
                        <>
                          <option value="Enhancement">Enhancement</option>
                          <option value="Elemental">Elemental</option>
                          <option value="Restoration">Restoration</option>
                        </>
                      )}

                      {memberData.classe=== "Druid" && (
                        <>
                          <option value="Balance">Balance</option>
                          <option value="Feral">Feral</option>
                          <option value="Restoration">Restoration</option>
                        </>
                      )}
                    </select>
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member role:</p>
                    <select
                      name="role"
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleSelectChange}
                      value={memberData.role}
                    >
                      <option value="" disabled hidden>
                        Select role
                      </option>

                      {memberData.classe === "Warrior" && memberData.specialization === "Arms" ? (
                          <option value="DPS">DPS</option>
                        ) : memberData.classe === "Warrior" && memberData.specialization === "Fury" ? (
                          <option value="DPS">DPS</option>
                        ) : memberData.classe === "Warrior" && memberData.specialization === "Protection" && (
                          <>
                            <option value="DPS">DPS</option>
                            <option value="Tank">Tank</option>
                          </>
                        )}

                      {memberData.classe === "Paladin" && memberData.specialization === "Retribuition" ? (
                          <option value="DPS">DPS</option>
                        ) : memberData.classe === "Paladin" && memberData.specialization === "Holy" ? (
                          <option value="Healer">Healer</option>
                        ) : memberData.classe === "Paladin" && memberData.specialization === "Protection" && (
                          <>
                            <option value="Tank">Tank</option>
                            <option value="DPS">DPS</option>
                          </>
                        )}

                      {memberData.classe=== "Death Knight" && (
                        <>
                          <option value="DPS">DPS</option>
                          <option value="Tank">Tank</option>
                        </>
                      )}

                      {memberData.classe=== "Rogue" && (
                        <>
                          <option value="DPS">DPS</option>
                        </>
                      )}

                      {memberData.classe=== "Hunter" && (
                        <>
                          <option value="DPS">DPS</option>
                        </>
                      )}

                      {memberData.classe === "Priest" && memberData.specialization === "Shadow" ? (
                          <option value="DPS">DPS</option>
                        ) : memberData.classe === "Priest" && memberData.specialization === "Holy" ? (
                          <option value="Healer">Healer</option>
                        ) : memberData.classe === "Priest" && memberData.specialization === "Discipline" && (
                          <option value="Healer">Healer</option>
                      )}

                      {memberData.classe=== "Mage" && (
                        <>
                          <option value="DPS">DPS</option>
                        </>
                      )}

                      {memberData.classe=== "Warlock" && (
                        <>
                          <option value="DPS">DPS</option>
                        </>
                      )}

                      {memberData.classe === "Shaman" && memberData.specialization === "Enhancement" ? (
                          <option value="DPS">DPS</option>
                        ) : memberData.classe === "Shaman" && memberData.specialization === "Restoration" ? (
                          <option value="Healer">Healer</option>
                        ) : memberData.classe === "Shaman" && memberData.specialization === "Elemental" && (
                          <option value="DPS">DPS</option>
                      )}

                      {memberData.classe === "Druid" && memberData.specialization === "Feral" ? (
                          <>
                            <option value="DPS">DPS</option>
                            <option value="Tank">Tank</option>
                          </>
                        ) : memberData.classe === "Druid" && memberData.specialization === "Balance" ? (
                            <option value="DPS">DPS</option>
                        ) : memberData.classe === "Druid" && memberData.specialization === "Restoration" && (
                          <option value="Healer">Healer</option>
                      )}
                    </select>
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member race:</p>
                    <select
                      name="race"
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleSelectChange}
                      value={memberData.race}
                    >
                      <option value="" disabled hidden>
                        Select race
                      </option>

                      {memberData.classe=== "Warrior" && (
                        <>
                          <option value="Orc">Orc</option>
                          <option value="Tauren">Tauren</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {memberData.classe=== "Paladin" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                        </>
                      )}

                      {memberData.classe=== "Death Knight" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Orc">Orc</option>
                          <option value="Tauren">Tauren</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {memberData.classe=== "Rogue" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Orc">Orc</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {memberData.classe=== "Hunter" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Orc">Orc</option>
                          <option value="Tauren">Tauren</option>
                          <option value="Troll">Troll</option>
                        </>
                      )}

                      {memberData.classe=== "Priest" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {memberData.classe=== "Mage" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Troll">Troll</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {memberData.classe=== "Warlock" && (
                        <>
                          <option value="Blood Elf">Blood Elf</option>
                          <option value="Orc">Orc</option>
                          <option value="Undead">Undead</option>
                        </>
                      )}

                      {memberData.classe=== "Shaman" && (
                        <>
                          <option value="Orc">Orc</option>
                          <option value="Tauren">Tauren</option>
                          <option value="Troll">Troll</option>
                        </>
                      )}

                      {memberData.classe=== "Druid" && (
                        <>
                          <option value="Tauren">Tauren</option>
                        </>
                      )}
                    </select>
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member tier:</p>
                    <select
                      name="tier"
                      className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                      onChange={handleSelectChange}
                      value={memberData.tier}
                    >
                      <option value="">Select a tier</option>
                      <option value="S">Tier S</option>
                      <option value="A">Tier A</option>
                      <option value="B">Tier B</option>
                      <option value="C">Tier C</option>
                      <option value="D">Tier D</option>
                    </select>
                </div>
            </div>

            <div className="block justify-center items-center">
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Type new member note:</p>
                    <FormInputText
                        type="text"
                        name="note"
                        id="note"
                        placeholder="type new member note"
                        text="note"
                        handleOnChange={handleChange}
                        value={memberData.note}
                    />
              </div>

              <div className="block justify-center items-center">
              <label className="mb-1 font-bold sr-only" htmlFor="name">
                {`Image of ${memberData.name}`}
              </label>
                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">Upload new member image:</p>
                      <input
                        className="rounded-md px-2 py-1 border border-gray-300 w-[160px]"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                </div>
              </div>

              {image && <img src={image} alt="New Member image" className="max-w-[80px] max-h-[100px] mt-2 mx-auto" />}
            
          </div>

          <div className="flex justify-center items-center mt-[1rem]">
              <button type="submit" className="bg-slate-700 text-zinc-300 px-3 py-1 border-2 border-zinc-500">Send</button>
          </div>
      </div>
    </form>
  );
}

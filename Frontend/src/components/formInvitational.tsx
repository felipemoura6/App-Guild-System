import { FormSelectText } from "./form/formInputSelect";
import { FormInputText } from "./form/formInputText";
import { useState, ChangeEvent } from "react";
import { Submit } from "./form/submit";
interface FormsInvitationalProps {
    role: string;
}

export const FormsInvitational: React.FC<FormsInvitationalProps> = ({ role }) => {
    const [nickname, setNickname] = useState('');
    const [discord, setDiscord] = useState('');
    const [gearscore, setGearscore] = useState('');
    const [kills, setKills] = useState('');
    const [spec, setSpec] = useState('');

    const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handleDiscordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDiscord(event.target.value);
    };

    const handleGearScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGearscore(event.target.value);
    };

    const handleKillsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKills(event.target.value);
    };

    const handleSelectSpec = (event: ChangeEvent<HTMLSelectElement>) => {
        setSpec(event.target.value);
    };

    
    return (
      <form>
        <div className="w-full h-full mb-2">
            <h1 className="text-slate-300 text-2xl p-5 flex justify-center">Invitational: {role}</h1>
            <div className="h-px bg-pink-100 mb-2"></div>

            <div className="block justify-center items-center">
            <div className="inline-flex items-center">
            <p className="text-slate-300 text-md p-3">Type your nickname in-game:</p>
            <FormInputText
                type="text"
                name="name"
                id="nickname"
                placeholder="nickname"
                text="nickname"
                handleOnChange={handleNicknameChange}
                value={nickname}
            />
            
        </div>

            <div className="inline-flex items-center">
                <p className="text-slate-300 text-md p-3">Type your discord:</p>
                <FormInputText
                    type="text"
                    name="name"
                    id="discord"
                    placeholder="@discord"
                    text="discord"
                    handleOnChange={handleDiscordChange}
                    value={discord}
                />
            </div>

                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">What is your class/specialization? </p>
                    <select
                        name="cageroy-id"
                        className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                    >
                        <option disabled>Choose your class/spec:</option>
                        {role === "Healers" && (
                            <>
                                <option value="disc-priest">Discipline Priest</option>
                                <option value="holy-priest">Holy Priest</option>
                                <option value="holy-paladin">Holy Paladin</option>
                                <option value="resto-shaman">Restoration Shaman</option>
                                <option value="resto-druid">Restoration Druid</option>
                            </> 
                // <FormSelectText
                //   name="name"
                //   text="class/spec"
                //   options={[
                //     "Discipline Priest",
                //     "Holy Priest",
                //     "Restoration Druid",
                //     "Restoration Shaman",
                //     "Holy Paladin",
                //     /* Adicione mais classes conforme necessário */
                //   ]}
                //   handleOnChange={handleSelectSpec}
                //   value={spec}
                //   id="id"
                // />
              )}
                        {role === 'Dps' && (
                            <>
                            <option value="fury-warrior">Warrior Fury</option>
                            <option value="arms-warrior">Warrior Arms</option>
                            <option value="retri-paladin">Paladin Retri</option>
                            <option value="unholy-dk">Death Knight Unholy</option>
                            <option value="frost-dk">Death Knight Frost</option>
                            <option value="blood-dk">Death Knight Blood</option>
                            <option value="combat-rogue">Rogue Combat</option>
                            <option value="assassination-rogue">Rogue Assassination</option>
                            <option value="sub-rogue">Rogue Subtlely</option>
                            <option value="mm-hunter">Hunter Marksmanship</option>
                            <option value="survival-hunter">Hunter Survival</option>
                            <option value="bm-hunter">Hunter Beast Mastery</option>
                            <option value="s-priest">Priest Shadow</option>
                            <option value="arcane-mage">Mage Arcane</option>
                            <option value="frost-mage">Mage Frost</option>
                            <option value="fire-mage">Mage Fire</option>
                            <option value="demonology-lock">Warlock Demonology</option>
                            <option value="affly-lock">Warlock Afflyction</option>
                            <option value="destruction-lock">Warlock Destruction</option>
                            <option value="elemental-shaman">Shaman Elemental</option>
                            <option value="enhanc-shaman">Shaman Enhancement</option>
                            <option value="balance-druid">Druid Balance</option>
                            <option value="feral-druid">Druid Feral</option>
                            {/* Adicione mais classes conforme necessário */}
                            </>
                        )}

                        {role === 'Tanks' && (
                            <>
                            <option value="prot-paladin">Paladin Protection</option>
                            <option value="prot-warrior">Warrior Protection</option>
                            <option value="frost-dk">Death Knight Frost</option>
                            <option value="unholy-dk">Death Knight Unholy</option>
                            <option value="blood-dk">Death Knight Blood</option>
                            <option value="feral-druid">Druid Feral</option>
                            </>
                        )}

                    </select>
                </div>

                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">What is your gearscore?:</p>
                    <FormInputText
                        type="number"
                        name="gearscore"
                        id="gearscore"
                        placeholder="gs"
                        text="gs"
                        handleOnChange={handleGearScoreChange}
                        value={gearscore}
                    />
                </div>

                <div className="inline-flex items-center">
                    <p className="text-slate-300 text-md p-3">How many honorable kills in your char?:</p>
                    <FormInputText
                        type="number"
                        name="honorable kills"
                        id="honorable kills"
                        placeholder="honorable kills"
                        text="honorable kills"
                        handleOnChange={handleKillsChange}
                        value={kills}
                    />
                </div>

                <div className="flex justify-center items-center mt-[10 rem]">
                    {/* <button type="submit" className="bg-slate-700 text-red-600 px-3 py-1 border-2 border-red-800">Send</button> */}
                    <Submit text="Send"/>
                </div>
            </div>
        </div>
        {/* Restante do seu formulário aqui */}
      </form>
    );
};
  
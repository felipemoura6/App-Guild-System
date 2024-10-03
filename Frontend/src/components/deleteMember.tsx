import { FormInputText } from "./form/formInputText";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from 'sonner';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { deleteMember } from "../api";

export function DeleteMember() {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false); // Estado para controlar o modal

  const handleNameDelete = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDeleteConfirmation = async (event: FormEvent) => {
    event.preventDefault();

    if (!name) {
      toast.error('Por favor, preencha o nome do membro a ser deletado!');
      return;
    }

    try {
      await deleteMember(name);
      toast.success(`${name} deletado com sucesso!`);
      setOpen(false); // Fechar o modal após a exclusão
    } catch (error) {
      toast.error('Erro ao deletar o membro. Verifique se o nome está correto!');
    }
  };

  return (
    <div className="w-full h-full mb-2 overflow-y-auto">
      <h1 className="text-slate-300 text-2xl p-5 flex justify-center">Delete Member</h1>
      <div className="h-px bg-pink-100 mb-2"></div>

      <form>
        <div className="block justify-center items-center">
          <div className="inline-flex items-center">
            <p className="text-slate-300 text-md p-3">Type member nick in-game to remove from guild member's list:</p>
            <FormInputText
              type="text"
              name="name"
              id="name"
              placeholder="type member nick"
              text="name"
              handleOnChange={handleNameDelete}
              value={name}
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-[1rem]">
          <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger asChild>
              <button type="button" className="bg-slate-700 text-zinc-300 px-3 py-1 border-2 border-zinc-500" onClick={() => setOpen(true)}>
                Delete
              </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="inset-0 fixed bg-black/50"/>
              <AlertDialog.Content className="sm:w-[90vh] sm:max-w-[500px] w-[40vh] max-w-[500px] max-h-[30vh] rounded-lg p-4 bg-white border-6 fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <AlertDialog.Title className="m-0 text-lg">Are you absolutely sure?</AlertDialog.Title>
                <AlertDialog.Description className="m-5 text-md text-slate-400">This action cannot be undone. This will permanently remove the member data from our servers.</AlertDialog.Description>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                  <AlertDialog.Cancel asChild>
                    <button type="button" className="inline-flex items-center justify-center rounded-md py-2 px-5 h-[35px] bg-slate-100 hover:bg-slate-200 border-2">Cancel</button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button type="button" onClick={handleDeleteConfirmation} className="inline-flex items-center justify-center rounded-md py-2 px-5 h-[35px] bg-red-100 hover:bg-red-200 border-2 border-red-300 text-red-800">Yes, delete member</button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      </form>
    </div>
  );
}

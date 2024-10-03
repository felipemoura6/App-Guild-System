export function Submit({ text }: { text: string }) {
    return (
      <div>
        <button className="bg-slate-700 text-red-600 px-3 py-1 border-2 border-gray-200">{text}</button>
      </div>
    );
  }
  
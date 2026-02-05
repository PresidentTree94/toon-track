export default function Modal({
  children, heading, open, setOpen, handleSubmit
}:Readonly<{
  children: React.ReactNode;
  heading: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}>) {
  return (
    <div className={`fixed inset-0 bg-black/50 z-3 ${open ? "flex" : "hidden"} justify-center items-center`}>
      <div className="card m-8 max-w-sm">
        <h2 className="text-center">{heading}</h2>
        <form className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 mt-6 items-center" onSubmit={handleSubmit}>
          {children}
          <div className="col-span-full grid grid-cols-2 gap-4 mt-6">
            <button type="submit" className="text-sm bg-primary text-white shadow-lg shadow-primary/20 py-2 rounded-2xl font-semibold cursor-pointer">Submit</button>
            <button type="button" className="text-sm border text-emph py-2 rounded-2xl font-semibold cursor-pointer" onClick={() => setOpen(false)}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
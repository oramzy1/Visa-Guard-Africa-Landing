function Pill({text}:{text: string}) {
  return (
    <div className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-primary/30 bg-primary/10 px-1 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-1.5 text-[.55rem] sm:text-[.6rem] md:text-xs font-medium text-primary shadow-sm">
      <span className="h-1 w-1 rounded-full bg-primary" />
      {text}
    </div>
  );
}

export default Pill;

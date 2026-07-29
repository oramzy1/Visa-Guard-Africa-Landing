function Pill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[.6rem] sm:text-[.65rem] md:text-xs font-medium text-primary shadow-sm">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary md:h-2 md:w-2" />
      <span className="leading-none">{text}</span>
    </div>
  );
}

export default Pill;
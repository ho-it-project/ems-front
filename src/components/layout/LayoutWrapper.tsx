export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fontSize-medium h-screen w-full bg-bg text-black">
      <div className="flex h-full w-full px-[2rem] py-[1.6rem]">{children}</div>
    </div>
  );
};

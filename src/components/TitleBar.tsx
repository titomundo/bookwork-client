interface TitleBarProp {
  title: string;
}

export function TitleBar({ title }: TitleBarProp) {
  return (
    <div className="py-2 px-2 border-b border-b-gray-200">
      <h1 className="font-semibold text-left text-xl pl-1">{title}</h1>
    </div>
  );
}

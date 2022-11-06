interface Props {
  icon: JSX.Element;
  badgeNumber: number;
  badgeBgColorClass?: string;
}

const IconWithBadge = ({ icon, badgeNumber, badgeBgColorClass }: Props) => {
  const bgColor = badgeBgColorClass || 'bg-red-500';
  return (
    <div className="relative">
      {icon}
      <div
        className={` inline-flex absolute -top-1 -right-1 justify-center items-center w-4 h-4 text-xs font-bold text-white rounded-full ${bgColor}`}
      >
        {badgeNumber}
      </div>
    </div>
  );
};

export default IconWithBadge;

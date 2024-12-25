const timeList = ["1H", "1D", "1W", "1M", "1Y"];

export default function TimeSelect({
  selectedTime,
  setSelectedTime,
}: {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}) {
  return (
    <div className="flex gap-[12px]">
      {timeList.map((item) => (
        <button
          className={
            "w-[60px] h-[50px] rounded-[15px]  font-poppins text-[22px] text-center italic " +
            (selectedTime === item
              ? "bg-[#4E8AFF26] text-[#4E8AFF]"
              : "text-white")
          }
          key={item}
          onClick={() => {
            setSelectedTime(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

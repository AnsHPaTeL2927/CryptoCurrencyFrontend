const TimeRangeSelector = ({ selected, onSelect }) => {
  const ranges = ["24H", "7D", "30D", "90D", "1Y", "ALL"];

  return (
    <div className="join bg-base-200 p-1 rounded-lg">
      {ranges.map((range) => (
        <button
          key={range}
          className={`
              join-item btn btn-sm min-w-[4rem]
              ${
                selected === range
                  ? "bg-gradient-to-r from-primary to-secondary text-white border-0"
                  : "btn-ghost"
              }
            `}
          onClick={() => onSelect(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;

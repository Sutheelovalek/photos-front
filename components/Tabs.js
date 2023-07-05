


export default function Tabs({ tabs, active, onChange }) {
    return (
      <div className="flex gap-5 pb-5 cursor-pointer">
        {tabs.map((tabName, index) => (
          <span
            className={`text-2xl ${tabName === active ? 'text-black underline' : 'text-[#999]'}`}
            key={index}
            onClick={() => { onChange(tabName)}}
          >
            {tabName}
          </span>
        ))}
      </div>
    );
  }
  
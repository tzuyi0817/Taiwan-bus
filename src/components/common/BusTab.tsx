interface Props {
  options: Array<{
    title: string | number | JSX.Element;
    value: number;
  }>;
  value: number;
  toggleTab: (value: any) => void;
}

function BusTab({ options, value, toggleTab }: Props) {
  return (
    <div className="flex w-full">
      {options.map(option => {
        return (
          <div
            className={`bus_tab ellipsis ${value === option.value ? 'bus_tab-active' : ''}`}
            key={option.value}
            onClick={() => toggleTab(option.value)}
          >
            {option.title}
          </div>
        )
      })}
    </div>
  )
}

export default BusTab;

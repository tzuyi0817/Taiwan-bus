import BusIcon from '@/components/common/BusIcon';
import { CITY_OPTIONS } from '@/configs/city';

function IndexCities() {
  return (
    <ul className="flex p-5 justify-center flex-wrap gap-5">
      {CITY_OPTIONS.map(({ id, value, name, en, color, fill }) => {
        return (
          <li key={id} className={`${color} p-5 bg-white flex flex-col justify-center items-center rounded-[10px] shadow-md min-w-[157px]`}>
            <BusIcon fill={fill} height="41" width="41" />
            <h4 className="mt-1">{name}</h4>
            <p>{en}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default IndexCities;

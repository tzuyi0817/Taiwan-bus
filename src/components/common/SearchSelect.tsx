import Select, { type PropsValue, ActionMeta, OptionsOrGroups, GroupBase } from 'react-select';

interface Props {
  defaultValue: PropsValue<any> | undefined;
  onChange: ((newValue: any, actionMeta: ActionMeta<any>) => void) | undefined;
  options: OptionsOrGroups<any, GroupBase<any>> | undefined;
}

function SearchSelect(props: Props) {
  return (
    <Select
      className="searchSelect"
      placeholder={<div>請選擇縣市</div>}
      {...props}
      styles={{
        control: (baseStyles, { isFocused }) => ({
          ...baseStyles,
          padding: '4px 8px',
          borderRadius: '10px',
          borderStyle: 'none',
          background: isFocused ? '#D5D5D5' : '#EEEEEE',
          boxShadow: isFocused ? '0px 3px 10px rgba(0, 0, 0, 0.15)' : 'none',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          '::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          },
          '::-webkit-scrollbar-track': {
            borderRadius: '10px',
            background: '#D5D5D5',
          },
          '::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: '#888888',
          },
        }),
        option: (baseStyles, { isSelected }) => ({
          ...baseStyles,
          background: isSelected ? '#EEEEEE' : '#FFFFFF',
          color: '#000',
          padding: '12px 16px',
          cursor: 'pointer',
          '&:hover': {
            background: '#EEEEEE',
          },
        }),
      }}
    />
  )
}

export default SearchSelect;

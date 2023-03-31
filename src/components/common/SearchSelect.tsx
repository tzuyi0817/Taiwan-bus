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
          'border-radius': '10px',
          'border-style': 'none',
          background: isFocused ? '#D5D5D5' : '#EEEEEE',
          'box-shadow': isFocused ? '0px 3px 10px rgba(0, 0, 0, 0.15)' : 'none',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          '::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          },
          '::-webkit-scrollbar-track': {
            'border-radius': '10px',
            background: '#D5D5D5',
          },
          '::-webkit-scrollbar-thumb': {
            'border-radius': '10px',
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

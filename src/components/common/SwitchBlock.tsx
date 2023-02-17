interface Props {
  className?: string;
}

function SwitchBlock({ className }: Props) {
  return (
    <div className={`${className}`}>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default SwitchBlock;

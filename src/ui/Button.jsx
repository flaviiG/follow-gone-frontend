// eslint-disable-next-line react/prop-types
function Button({ children, disabled, onClick, type }) {
  const classname =
    type === 'transparent'
      ? 'text-white font-bold py-2 px-4 rounded-full flex items-center justify-center border-[1px] hover:bg-slate-800 transition-all'
      : 'bg-[#833AB4] hover:bg-[#833ab4c9] text-white font-bold py-2 px-4 rounded transition-all';
  return (
    <button onClick={onClick} disabled={disabled} className={classname}>
      {children}
    </button>
  );
}

export default Button;

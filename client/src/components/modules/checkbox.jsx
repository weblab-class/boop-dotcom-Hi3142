const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        style={{ backgroundColor: "#ffffff" }}
      />
      {label}
    </label>
  );
};

export default Checkbox;

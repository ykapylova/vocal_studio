export const CheckBeforeDeleteWindow = (props) => {
  return (
    <div className="check-window">
      <div>
        Вы точно хотите удалить {props.type} {props.date} для {props.group}? {props.note}
      </div>
      <div className="no">❌</div>
      <div className="yes">✅</div>
    </div>
  );
};

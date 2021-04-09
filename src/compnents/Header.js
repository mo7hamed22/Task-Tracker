import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAddTaskBtn }) => {
  // const onClickFunc = () => {
  //   console.log("Header Clicked ");
  // };
  return (
    <header>
      <h1>{title}</h1>
      <Button
        color={showAddTaskBtn ? "red" : "green"}
        text={showAddTaskBtn ? "Close" : "Add"}
        onClick={onAdd}
        showAddTaskBtn={showAddTaskBtn}
      />
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker",
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;

import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAddTaskBtn }) => {
  const location = useLocation();
  // const onClickFunc = () => {
  //   console.log("Header Clicked ");
  // };
  return (
    <header>
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAddTaskBtn ? "red" : "green"}
          text={showAddTaskBtn ? "Close" : "Add"}
          onClick={onAdd}
          showAddTaskBtn={showAddTaskBtn}
        />
      )}
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

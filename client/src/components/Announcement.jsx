import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logout } from "../redux/apiCalls";
import { mobile } from "../responsive";
import "./styles.scss";

const Container = styled.div`
  background-color: #d7dbdc;
  overflow: hidden;

  ${mobile({
    backgroundColor: "white",
  })}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #222222;
  height: 40px;
  color: #a0a0a0;

  ${mobile({
    flexDirection: "column",
    position: "relative",
    marginTop: "5em",
    width: "100%",
    gap: ".4em",
    padding: "10px 1em",
    alignItems: "flex-start",
  })}
`;

const Annon = styled.div``;
const AnnonText = styled.span`
  font-size: 12px;
`;
const AnnonNavbar = styled.ul`
  display: flex;
  list-style: none;
  height: 100%;
  padding: 0;
  margin: 0;
`;
const AnnonItem = styled.li`
  padding-left: 10px;
  padding-right: 5px;
  margin-right: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
  border-left: 1px solid #797878;
  border-right: ${(props) => props.type === "last" && "1px solid #797878"};

  ${mobile({
    zIndex: "7",
  })}

  &:hover {
    color: white;
  }
`;

const Announcement = ({ menuOpen, setMenuOpen }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    Logout(dispatch);
    //  window.location.replace("/");
  };

  return (
    <Container>
      <div className={"topbarAnnon " + (menuOpen && "active")}>
        <Annon>
          <AnnonText>Free shipping for standard order over 200 €</AnnonText>
        </Annon>
        <AnnonNavbar>
          <AnnonItem>Help & FAQs</AnnonItem>

          <AnnonItem>
            {!user ? (
              <Link
                onClick={() => setMenuOpen(false)}
                className="link"
                to="/login"
              >
                My Account
              </Link>
            ) : (
              <Link
                onClick={() => setMenuOpen(false)}
                className="link"
                to={"/settings"}
              >
                Settings
              </Link>
            )}
          </AnnonItem>
          <AnnonItem>EN</AnnonItem>
          {user && (
            <AnnonItem>
              <span onClick={() => setMenuOpen(false)} onClick={handleClick}>
                Logout
              </span>
            </AnnonItem>
          )}
          <AnnonItem type="last">EUR</AnnonItem>
        </AnnonNavbar>
      </div>
    </Container>
  );
};

export default Announcement;

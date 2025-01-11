import React from "react";
import { Moon, SunMoon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../redux/slices/modeSlice";

function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.mode);

  const handleModeToggle = () => {
    dispatch(toggleMode());
  };
  return (
    <header className={`header ${mode === "dark" ? "dark" : ""}`}>
      <div style={{ padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <h1 className={`nav-Logo ${mode === "dark" ? "dark" : ""}`}> Todo-app </h1>
          </div>
          <button
            onClick={handleModeToggle}
            className='mode-Button'
          >
            {mode === 'dark' ? (
              <Moon className={`button-icon ${mode === "dark" ? "dark" : ""}`} />
            ) : (
              <SunMoon className={`button-icon ${mode === "dark" ? "dark" : ""}`}/>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

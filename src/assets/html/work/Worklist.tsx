/**
 * @file EFC014.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Worklist = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/html/Layout.html")}>Layout</Button>
    </>
  );
};

export default Worklist;
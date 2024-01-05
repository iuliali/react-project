import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const NavElement = ({ to, name }) => {

  return <Box>
    <Link to={to}>
      <Button layerStyle={'navLink'}>
        {name}
      </Button>
    </Link>
    </Box>;
};

export default NavElement;

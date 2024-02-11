import { Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const  ReturnButton = ({ navigateTo, text }) => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(navigateTo);
    };

    return (
        <Button bgColor="green.100" leftIcon={<ArrowBackIcon />} onClick={handleReturn}>
            {text}
        </Button>
    );
}

export default ReturnButton;
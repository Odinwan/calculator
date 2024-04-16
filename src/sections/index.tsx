import React, {useState} from 'react';
import Container from './StyledComponents';
import RxBody from "@sections/components/RxXBody";
import MobXBody from "@sections/components/MobXBody";
import IconButton from "@mui/material/IconButton";
import HubIcon from '@mui/icons-material/Hub';

const App = () => {
    const [isMobX, setIsMobX] = useState<boolean>(false);
    const handleSwitchState = () => setIsMobX(current => !current);

    return (
        <Container>
            <div className="calculator">
                <div className="header">
                    {isMobX ? 'MobX state' : 'RX state'}
                    <IconButton onClick={handleSwitchState}>
                        <HubIcon/>
                    </IconButton>
                </div>
                {isMobX && <MobXBody/>}
                {!isMobX && <RxBody/>}
                <div className="footer"/>
            </div>
        </Container>
    );
};

export default App;

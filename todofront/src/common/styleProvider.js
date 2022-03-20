import { isMobile } from "react-device-detect"

export const TextStyle = { width: '100%', minWidth: !isMobile ? 600 : 300, display: 'flex' };

export const SmallTextStyle = { width: '100%', minWidth: 300, display: 'flex' };
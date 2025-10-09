import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ResizableNavbar } from './ui/resizable-navbar';

function Navbar() {
  return (
    <ResizableNavbar>
      <ConnectButton />
    </ResizableNavbar>
  );
}

export default Navbar;

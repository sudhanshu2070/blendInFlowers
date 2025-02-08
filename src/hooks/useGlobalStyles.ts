import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getGlobalColors, globalFonts } from '../styles/globalStyles';

export const useGlobalStyles = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return {
    colors: getGlobalColors(theme),
    fonts: globalFonts,
  };
};
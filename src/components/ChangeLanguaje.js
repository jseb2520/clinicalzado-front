import React from 'react';
import { IconButton } from '@mui/material';
import useLocales from '../hooks/useLocales';
import Iconify from './Iconify';

const ChangeLanguaje = () => {
  const { allLangs, onChangeLang, currentLang } = useLocales();
  return (
    <>
      <IconButton
        onClick={() => onChangeLang('es')}
        color="secondary"
        style={{ marginLeft: '0.5em', outline: currentLang.value === 'es' ? '1px solid' : undefined }}
      >
        <Iconify icon={'circle-flags:es'} width={20} height={20} />
      </IconButton>
      <IconButton
        onClick={() => onChangeLang('en')}
        color="secondary"
        style={{ outline: currentLang.value === 'en' ? '1px solid' : undefined }}
      >
        <Iconify icon={'circle-flags:uk'} width={20} height={20} />
      </IconButton>
    </>
  );
};

export default ChangeLanguaje;

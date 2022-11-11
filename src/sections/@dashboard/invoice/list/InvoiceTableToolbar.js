import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../../components/Iconify';
// hooks
import useLocales from '../../../../hooks/useLocales';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

InvoiceTableToolbar.propTypes = {
  filterName: PropTypes.string,
  filterEndDate: PropTypes.instanceOf(Date),
  filterStartDate: PropTypes.instanceOf(Date),
  onFilterName: PropTypes.func,
  onFilterEndDate: PropTypes.func,
  onFilterStartDate: PropTypes.func,
};

export default function InvoiceTableToolbar({
  filterStartDate,
  filterEndDate,
  filterName,
  onFilterName,
  onFilterStartDate,
  onFilterEndDate,
}) {
  const { translate } = useLocales();
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <DatePicker
        label={translate('app.dashboard.invoices.filters.startDate')}
        value={filterStartDate}
        onChange={onFilterStartDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />

      <DatePicker
        label={translate('app.dashboard.invoices.filters.endDate')}
        value={filterEndDate}
        onChange={onFilterEndDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder={translate('app.dashboard.invoices.filters.search')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}

import sumBy from 'lodash/sumBy';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import useAuth from '../../hooks/useAuth';
import useLocales from '../../hooks/useLocales';
// middlewares
import { Service } from '../../middleware';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../components/table';
// sections
import InvoiceAnalytic from '../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@dashboard/invoice/list';

// ----------------------------------------------------------------------

export default function InvoiceList() {
  const theme = useTheme();
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  const navigate = useNavigate();

  const TABLE_HEAD = [
    { id: 'invoiceNumber', label: translate('app.dashboard.invoices.client'), align: 'left' },
    { id: 'createdAt', label: translate('app.dashboard.invoices.created'), align: 'left' },
    { id: 'price', label: translate('app.dashboard.invoices.price'), align: 'center', width: 140 },
    { id: 'status', label: translate('app.dashboard.invoices.status'), align: 'left' },
    { id: '' },
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createdAt' });

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  // const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Service.getBy(`_where[location].id=${user.location.id}&sort=createdAt:DESC`);
        setTableData(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  // const handleFilterService = (event) => {
  //   setFilterService(event.target.value);
  // };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const denseHeight = dense ? 56 : 76;

  const getLengthByStatus = (status) => tableData.filter((item) => item.attributes.status === status).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      tableData.filter((item) => item.attributes.status === status),
      'attributes.serviceCost'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: translate('app.dashboard.invoices.filters.all'), color: 'info', count: tableData.length },
    {
      value: 'paid',
      label: translate('app.dashboard.invoices.filters.paid'),
      color: 'success',
      count: getLengthByStatus('paid'),
    },
    {
      value: 'unpaid',
      label: translate('app.dashboard.invoices.filters.unpaid'),
      color: 'warning',
      count: getLengthByStatus('unpaid'),
    },
    {
      value: 'overdue',
      label: translate('app.dashboard.invoices.filters.overdue'),
      color: 'error',
      count: getLengthByStatus('overdue'),
    },
    {
      value: 'draft',
      label: translate('app.dashboard.invoices.filters.draft'),
      color: 'default',
      count: getLengthByStatus('draft'),
    },
  ];

  return (
    <Page title="Invoice: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.dashboard.invoices.subtitle')}
          links={[
            { name: translate('app.dashboard.title'), href: PATH_DASHBOARD.root },
            { name: translate('app.dashboard.invoices.title'), href: PATH_DASHBOARD.invoice.root },
            { name: translate('app.dashboard.invoices.list') },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.invoice.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {translate('app.dashboard.invoices.create')}
            </Button>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title={translate('app.dashboard.invoices.analytics.total')}
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'attributes.serviceCost')}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title={translate('app.dashboard.invoices.analytics.paid')}
                total={getLengthByStatus('paid')}
                percent={getPercentByStatus('paid')}
                price={getTotalPriceByStatus('paid')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title={translate('app.dashboard.invoices.analytics.unpaid')}
                total={getLengthByStatus('unpaid')}
                percent={getPercentByStatus('unpaid')}
                price={getTotalPriceByStatus('unpaid')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <InvoiceAnalytic
                title={translate('app.dashboard.invoices.analytics.overdue')}
                total={getLengthByStatus('overdue')}
                percent={getPercentByStatus('overdue')}
                price={getTotalPriceByStatus('overdue')}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
              <InvoiceAnalytic
                title={translate('app.dashboard.invoices.analytics.draft')}
                total={getLengthByStatus('draft')}
                percent={getPercentByStatus('draft')}
                price={getTotalPriceByStatus('draft')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={<Label color={tab.color}> {tab.count} </Label>}
                label={tab.label}
              />
            ))}
          </Tabs>

          <Divider />

          <InvoiceTableToolbar
            filterName={filterName}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Sent">
                        <IconButton color="primary">
                          <Iconify icon={'ic:round-send'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download">
                        <IconButton color="primary">
                          <Iconify icon={'eva:download-outline'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Print">
                        <IconButton color="primary">
                          <Iconify icon={'eva:printer-fill'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <InvoiceTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label={translate('app.dashboard.invoices.dense')}
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterStartDate, filterEndDate }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) =>
        item.attributes.consecutive.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.attributes.client.data.attributes.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.attributes.client.data.attributes.phone.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.attributes.status === filterStatus);
  }

  // if (filterService !== 'all') {
  //   tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  // }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) =>
        new Date(item.attributes.createdAt).getTime() >= filterStartDate.getTime() &&
        new Date(item.attributes.createdAt).getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}

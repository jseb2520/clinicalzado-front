import { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// middlewares
import { Service } from '../../middleware';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    const countServices = async () => {
      try {
        const response = await Service.count();
        setServicesCount(response);
      } catch (error) {
        throw new Error(error);
      }
    };
    countServices();
  }, []);

  return (
    <Page title="Invoices: Create a new invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new invoice"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.list },
            { name: 'New invoice' },
          ]}
        />

        <InvoiceNewEditForm invoiceCount={servicesCount} />
      </Container>
    </Page>
  );
}

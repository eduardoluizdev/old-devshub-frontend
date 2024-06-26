import { PageHeader } from '@/components/page-header'
import { customerResource } from '@/resources/customers'

import { CreateServiceDrawer } from './components/create-service-drawer'
import { ListServicesTable } from './components/list-services-table'

export default async function Services() {
  const initialCustomers = await customerResource.getAll('server')

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Serviços" subtitle="Crie e gerencie seus serviços" />
      <CreateServiceDrawer customers={initialCustomers.customers} />
      <ListServicesTable />
    </div>
  )
}

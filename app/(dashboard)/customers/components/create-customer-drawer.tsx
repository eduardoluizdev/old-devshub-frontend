'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { toast } from '@/components/ui/use-toast'
import { customerResource } from '@/resources/customers'

import { CustomerForm, CustomerFormSchemaProps } from './customer-form'

const CreateCustomerDrawer = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { mutateAsync } = useMutation({
    mutationFn: customerResource.create,
  })

  const handleSubmit = async (data: CustomerFormSchemaProps) => {
    const response = await mutateAsync({
      params: {
        ...data,
        services: data.services ? data.services : undefined,
      },
      requesType: 'client',
    })

    if (response?.error) {
      toast({
        title: 'Erro ao criar cliente',
        description: response.message,
      })
      return
    }

    queryClient.invalidateQueries({ queryKey: ['customers'] })
    queryClient.invalidateQueries({ queryKey: ['services'] })

    toast({
      title: 'Cliente criado com sucesso',
      description: `O cliente ${response?.name} foi criado com sucesso`,
    })

    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 max-w-48">
        Adicionar cliente
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full max-w-[700px] flex flex-col mx-auto py-10">
          <DrawerHeader>
            <DrawerTitle>Adicione um cliente</DrawerTitle>
          </DrawerHeader>
          <CustomerForm handleSubmit={handleSubmit} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { CreateCustomerDrawer }

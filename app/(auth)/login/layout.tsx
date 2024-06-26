import { Metadata } from 'next'

import { Logo } from '@/components/logo'

export const metadata: Metadata = {
  title: 'Login | Devshub',
  description: 'Login | Devshub',
  icons: [
    {
      url: '/images/favicon.ico',
      href: '/images/favicon.ico',
      sizes: '16x16',
    },
  ],
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted-foreground p-10 text-foreground">
        <Logo />

        <footer className="text-sm">
          Painel do parceiro &copy; devshub.io - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}

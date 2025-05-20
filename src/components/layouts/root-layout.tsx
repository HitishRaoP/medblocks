import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { HeaderMain } from '@/components/root/header-main'
import { QueryProvider } from '../providers/query-provider'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '../providers/theme-provider'
import { PgliteProvider } from '../providers/pglite-provider'

const RootLayout = () => {
    return (
        <PgliteProvider>
            <QueryProvider>
                <ThemeProvider>
                    <SidebarProvider style={{fontFamily: "Manrope"}}>
                        <Toaster position="top-right" />
                        <AppSidebar />
                        <SidebarInset>
                            <div className='p-4' style={{ fontFamily: "Manrope" }}>
                                <HeaderMain />
                                <Outlet />
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </ThemeProvider>
            </QueryProvider>
        </PgliteProvider>
    )
}

export { RootLayout }

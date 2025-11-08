'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface EnquiryContextType {
  openEnquiryModal: (serviceName?: string) => void
  closeEnquiryModal: () => void
  isEnquiryModalOpen: boolean
  prefillService?: string
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined)

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [prefillService, setPrefillService] = useState<string | undefined>(undefined)

  const openEnquiryModal = (serviceName?: string) => {
    if (serviceName) {
      setPrefillService(serviceName)
    }
    setIsEnquiryModalOpen(true)
  }

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false)
    setPrefillService(undefined)
  }

  return (
    <EnquiryContext.Provider
      value={{
        openEnquiryModal,
        closeEnquiryModal,
        isEnquiryModalOpen,
        prefillService,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  )
}

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (context === undefined) {
    throw new Error('useEnquiry must be used within an EnquiryProvider')
  }
  return context
}


'use client'

import * as React from 'react'
import { useFormStatus } from 'react-dom'
import { LoadingButton } from '@/components/ui/LoadingButton'

type SubmitFormProps = React.PropsWithChildren<{
  action: (formData: FormData) => void
  className?: string
  buttonText?: string
}>

export function SubmitForm({ action, className, children, buttonText = 'Submit listing' }: SubmitFormProps) {
  const [isValid, setIsValid] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement | null>(null)

  const checkFormValidity = React.useCallback(() => {
    const form = formRef.current
    if (!form) return false

    // Use a timeout to ensure all input events have been processed
    setTimeout(() => {
      setIsValid(form.checkValidity())
    }, 0)

    return form.checkValidity()
  }, [])

  React.useEffect(() => {
    const form = formRef.current
    if (!form) return

    // Initial validation check
    checkFormValidity()

    // Add event listeners for form validation
    const handler = () => checkFormValidity()
    form.addEventListener('input', handler)
    form.addEventListener('change', handler)

    return () => {
      form.removeEventListener('input', handler)
      form.removeEventListener('change', handler)
    }
  }, [checkFormValidity])

  const { pending } = useFormStatus()

  return (
    <form ref={formRef} action={action} className={className} noValidate>
      {children}
      <div className="mt-5">
        <LoadingButton disabled={!isValid || pending}>{buttonText}</LoadingButton>
      </div>
    </form>
  )
}



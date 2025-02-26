import { useToast } from "primevue/usetoast"

let toastInstance: ReturnType<typeof useToast> | null = null

export const setToastInstance = (toast: ReturnType<typeof useToast>) => {
  toastInstance = toast
}

export const showToast = (severity: any, summary: string, detail: string) => {
  if (!toastInstance) {
    console.error("Toast instance is not set!")
    return
  }

  toastInstance.add({
    severity, // success | info | warn | error
    summary, //"Успешно!"
    detail, //"Операция выполнена успешно",
    life: 3000,
  })
}

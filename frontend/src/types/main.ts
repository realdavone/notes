type BaseFetchResponse<T> = {
  success: true
  message: string
  data: T
}

export default BaseFetchResponse